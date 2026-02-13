import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, User, LogIn, Users, Download, Search, LayoutDashboard, Mail, Send, X, ChevronDown, Eye, Trash2 } from "lucide-react"

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [subscribers, setSubscribers] = useState([])
    const [templates, setTemplates] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    // Email Modal State
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
    const [emailRecipients, setEmailRecipients] = useState([]) // Array of emails
    const [emailSubject, setEmailSubject] = useState("")
    const [emailBody, setEmailBody] = useState("") // Plain text
    const [selectedTemplateId, setSelectedTemplateId] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [newTemplateName, setNewTemplateName] = useState("")
    const [saveAsTemplate, setSaveAsTemplate] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if (token) {
            setIsAuthenticated(true)
            fetchData(token)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async (token) => {
        const t = token.startsWith("Bearer ") ? token : "Bearer " + token
        try {
            // Fetch Subscribers
            const subRes = await fetch("http://localhost:5000/api/admin/subscribers", {
                headers: { "Authorization": t },
            })
            if (subRes.ok) {
                setSubscribers(await subRes.json())
            } else if (subRes.status === 401) {
                logout()
                return;
            }

            // Fetch Templates
            const tempRes = await fetch("http://localhost:5000/api/admin/templates", {
                headers: { "Authorization": t },
            })
            if (tempRes.ok) {
                setTemplates(await tempRes.json())
            }
        } catch (err) {
            console.error("Failed to fetch data", err)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (response.ok) {
                const token = "Bearer " + data.token
                localStorage.setItem("adminToken", token)
                setIsAuthenticated(true)
                fetchData(token)
            } else {
                setError(data.error || "Invalid credentials")
            }
        } catch (err) {
            setError("Cannot connect to server")
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("adminToken")
        setIsAuthenticated(false)
        setSubscribers([])
        setUsername("")
        setPassword("")
    }

    // Email Functions
    const openEmailModal = (recipients) => {
        setEmailRecipients(recipients)
        setIsEmailModalOpen(true)
        setEmailSubject("")
        setEmailBody("")
        setSelectedTemplateId("")
        setSaveAsTemplate(false)
    }

    const handleTemplateChange = (e) => {
        const templateId = e.target.value
        setSelectedTemplateId(templateId)
        if (templateId) {
            const template = templates.find(t => t._id === templateId)
            if (template) {
                setEmailSubject(template.subject)
                setEmailBody(template.body) // Assumed to be plain text or compatible
            }
        }
    }

    // Generate HTML for Preview and Sending
    const generateEmailHtml = (text) => {
        const formattedText = text.replace(/\n/g, '<br/>');
        return `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <div style="background-color: #538270; padding: 0 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; padding: 20px; letter-spacing: 1px;">MOSLIPO</h1>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 40px 30px; color: #333333; line-height: 1.6; font-size: 16px;">
                        ${formattedText}
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #888888;">
                        <p style="margin: 0;">Société Marocaine du Lipœdème et des Pathologies Associées</p>
                        <p style="margin: 5px 0 0;"><a href="#" style="color: #538270; text-decoration: none;">Se désinscrire</a></p>
                    </div>
                </div>
            </div>
        `;
    }

    const sendEmail = async (e) => {
        e.preventDefault()
        setIsSending(true)
        const token = localStorage.getItem("adminToken")

        // Generate final HTML
        const finalHtml = generateEmailHtml(emailBody);

        try {
            // 1. Save Template if requested (Save raw text, not HTML)
            if (saveAsTemplate && newTemplateName) {
                await fetch("http://localhost:5000/api/admin/templates", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        name: newTemplateName,
                        subject: emailSubject,
                        body: emailBody // Save plain text for editing later
                    })
                })
            }

            // 2. Send Email
            await fetch("http://localhost:5000/api/admin/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    recipients: emailRecipients,
                    subject: emailSubject,
                    body: finalHtml // Send styled HTML
                })
            })

            alert(`Email sent successfully to ${emailRecipients.length} recipients!`)
            setIsEmailModalOpen(false)
            fetchData(token) // Refresh to update KPIs

        } catch (err) {
            alert("Failed to send email")
        } finally {
            setIsSending(false)
        }
    }

    const handleDelete = async (id, email) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ${email} de la newsletter ?`)) return;

        const token = localStorage.getItem("adminToken");
        try {
            const res = await fetch(`http://localhost:5000/api/admin/subscribers/${id}`, {
                method: "DELETE",
                headers: { "Authorization": token }
            });

            if (res.ok) {
                setSubscribers(subscribers.filter(sub => sub._id !== id));
                alert("Abonné supprimé avec succès.");
            } else {
                alert("Erreur lors de la suppression.");
            }
        } catch (err) {
            console.error("Failed to delete", err);
            alert("Erreur serveur.");
        }
    }

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Email,Date Inscription,Emails Sent,Last Contact\n"
            + subscribers.map(e => `${e.email},${new Date(e.subscribedAt).toLocaleDateString()},${e.emailCount || 0},${e.lastEmailSentAt ? new Date(e.lastEmailSentAt).toLocaleDateString() : 'Never'}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "newsletter_subscribers.csv");
        document.body.appendChild(link);
        link.click();
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#538270]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-[#538270]" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Connexion Admin</h1>
                        <p className="text-gray-500 mt-2">Accès sécurisé pour les administrateurs</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Utilisateur</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#538270] focus:ring-2 focus:ring-[#538270]/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#538270] focus:ring-2 focus:ring-[#538270]/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#538270] text-white rounded-xl font-bold hover:bg-[#3d5f52] transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? "Vérification..." : (<><LogIn size={20} /> Accéder au tableau de bord</>)}
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <LayoutDashboard className="text-[#538270]" />
                            Tableau de Bord Newsletter
                        </h1>
                        <p className="text-gray-500 mt-1">Gérer, Suivre et Contacter les Abonnés</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Abonnés</p>
                            <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Emails Envoyés</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {subscribers.reduce((acc, curr) => acc + (curr.emailCount || 0), 0)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => openEmailModal(subscribers.map(s => s.email))}
                        className="bg-[#538270] hover:bg-[#3d5f52] p-6 rounded-2xl shadow-lg shadow-[#538270]/20 flex items-center justify-between group transition-all"
                    >
                        <div className="text-left">
                            <p className="text-white/80 font-medium mb-1">Action Rapide</p>
                            <p className="text-2xl font-bold text-white">Envoyer Email Groupé</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Send className="text-white" size={24} />
                        </div>
                    </button>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher un email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#538270]/20"
                            />
                        </div>
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-[#F5F1EB] text-[#538270] rounded-xl font-bold hover:bg-[#e8e2d8] transition-colors"
                        >
                            <Download size={18} />
                            Exporter CSV
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Adresse Email</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Inscrit le</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-center">Emails Envoyés</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">Dernier Contact</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSubscribers.length > 0 ? (
                                    filteredSubscribers.map((sub, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{sub.email}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(sub.subscribedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.emailCount > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {sub.emailCount || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {sub.lastEmailSentAt ? new Date(sub.lastEmailSentAt).toLocaleDateString() : 'Jamais'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => openEmailModal([sub.email])}
                                                    className="p-2 text-gray-400 hover:text-[#538270] hover:bg-[#538270]/10 rounded-lg transition-colors mr-2"
                                                    title="Envoyer un email"
                                                >
                                                    <Mail size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(sub._id, sub.email)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Supprimer l'abonné"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            Aucun abonné trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            <AnimatePresence>
                {isEmailModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEmailModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                    <Send size={20} className="text-[#538270]" />
                                    Rédiger un Email
                                    <span className="text-sm font-normal text-gray-500 ml-2">
                                        (À {emailRecipients.length} destinataires)
                                    </span>
                                </h3>
                                <button onClick={() => setIsEmailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={sendEmail} className="p-6 overflow-y-auto flex-1 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
                                        <div className="relative">
                                            <select
                                                value={selectedTemplateId}
                                                onChange={handleTemplateChange}
                                                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#538270] focus:ring-2 focus:ring-[#538270]/20 appearance-none outline-none text-sm"
                                            >
                                                <option value="">Sélectionner un modèle...</option>
                                                {templates.map(t => (
                                                    <option key={t._id} value={t._id}>{t.name}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
                                        <input
                                            type="text"
                                            value={emailSubject}
                                            onChange={(e) => setEmailSubject(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#538270] focus:ring-2 focus:ring-[#538270]/20 outline-none text-sm"
                                            placeholder="Objet de l'email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        value={emailBody}
                                        onChange={(e) => setEmailBody(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#538270] focus:ring-2 focus:ring-[#538270]/20 outline-none min-h-[150px] resize-y"
                                        placeholder="Écrivez votre message ici. Nous le mettrons en forme automatiquement !"
                                        required
                                    />
                                </div>

                                {/* Live Preview */}
                                <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50">
                                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                                        <Eye size={14} className="text-gray-500" />
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Aperçu en direct</span>
                                    </div>
                                    <div className="h-[250px] overflow-y-auto bg-white p-4">
                                        <div dangerouslySetInnerHTML={{ __html: generateEmailHtml(emailBody || "Commencez à écrire pour voir l'aperçu...") }} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="saveTemplate"
                                        checked={saveAsTemplate}
                                        onChange={(e) => setSaveAsTemplate(e.target.checked)}
                                        className="rounded border-gray-300 text-[#538270] focus:ring-[#538270]"
                                    />
                                    <label htmlFor="saveTemplate" className="text-sm text-gray-700">Sauvegarder comme nouveau modèle ?</label>
                                </div>

                                {saveAsTemplate && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                                        <input
                                            type="text"
                                            value={newTemplateName}
                                            onChange={(e) => setNewTemplateName(e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#538270] outline-none text-sm"
                                            placeholder="Nom du modèle (ex: 'Newsletter Mai')"
                                            required={saveAsTemplate}
                                        />
                                    </motion.div>
                                )}

                                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsEmailModalOpen(false)}
                                        className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="px-6 py-2.5 rounded-xl bg-[#538270] text-white font-bold hover:bg-[#3d5f52] transition-colors shadow-lg shadow-[#538270]/20 flex items-center gap-2"
                                    >
                                        {isSending ? 'Envoi...' : <><Send size={18} /> Envoyer</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
