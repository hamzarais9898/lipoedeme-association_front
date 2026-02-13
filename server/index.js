require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://othmanmekouar99:hawd54ZM2eXNljlQ@clusteresisaintranetbet.axsghy0.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
    dbName: 'lipodemenewletters' // Explicitly set the database name/collection context
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema
const SubscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
    emailCount: { type: Number, default: 0 },
    lastEmailSentAt: { type: Date }
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

const EmailTemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const EmailTemplate = mongoose.model('EmailTemplate', EmailTemplateSchema);

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Standard for nodemailer, requires app-specific password if 2FA is on
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes

// 1. Subscribe to Newsletter
app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if already exists
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Email already subscribed' });
        }

        // Save to DB
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        // Send Welcome Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Bienvenue à la Newsletter MOSLIPOD',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h1 style="color: #538270;">Bienvenue chez MOSLIPOD !</h1>
                    <p>Merci de vous être inscrit à notre newsletter.</p>
                    <p>Vous recevrez désormais nos dernières actualités concernant le lipœdème et nos actions.</p>
                    <br>
                    <p>Cordialement,</p>
                    <p><strong>L'équipe MOSLIPOD</strong></p>
                </div>
            `
        };

        // Don't block response on email sending, but log errors
        transporter.sendMail(mailOptions, async (error, info) => {
            if (!error) {
                // Update stats for welcome email too
                newSubscriber.emailCount = 1;
                newSubscriber.lastEmailSentAt = new Date();
                await newSubscriber.save();
                console.log('Welcome email sent: ' + info.response);
            } else {
                console.log('Error sending welcome email:', error);
            }
        });

        res.status(201).json({ message: 'Subscribed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// 2. Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // Hardcoded credentials as requested
    if (username === 'fahd' && password === 'fahd12AA??') {
        res.json({ success: true, token: 'admin-token-secret' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// 3. Get Subscribers (Protected)
app.get('/api/admin/subscribers', async (req, res) => {
    const token = req.headers.authorization;
    
    if (token !== 'Bearer admin-token-secret') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 4. Send Email (Protected)
app.post('/api/admin/send-email', async (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'Bearer admin-token-secret') return res.status(401).json({ error: 'Unauthorized' });

    try {
        const { recipients, subject, body } = req.body; // recipients is array of emails
        
        // Loop through recipients and send
        for (const email of recipients) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: body
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (!error) {
                    await Subscriber.updateOne(
                        { email: email },
                        { 
                            $inc: { emailCount: 1 },
                            $set: { lastEmailSentAt: new Date() }
                        }
                    );
                    console.log(`Email sent to ${email}`);
                } else {
                    console.log(`Failed to send to ${email}:`, error);
                }
            });
        }

        res.json({ message: 'Emails queued for sending' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// 5. Template Routes
app.get('/api/admin/templates', async (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'Bearer admin-token-secret') return res.status(401).json({ error: 'Unauthorized' });

    try {
        const templates = await EmailTemplate.find().sort({ createdAt: -1 });
        res.json(templates);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/admin/templates', async (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'Bearer admin-token-secret') return res.status(401).json({ error: 'Unauthorized' });

    try {
        const { name, subject, body } = req.body;
        const newTemplate = new EmailTemplate({ name, subject, body });
        await newTemplate.save();
        res.status(201).json(newTemplate);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 6. Delete Subscriber
app.delete('/api/admin/subscribers/:id', async (req, res) => {
    const token = req.headers.authorization;
    if (token !== 'Bearer admin-token-secret') return res.status(401).json({ error: 'Unauthorized' });

    try {
        await Subscriber.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subscriber deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen( process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

