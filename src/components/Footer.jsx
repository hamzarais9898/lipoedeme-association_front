import { Link } from "react-router-dom"
import translations from "../context/translations"
import { Mail, Phone, MapPin, Loader2 } from "lucide-react"
import { useState } from "react"
import FeedbackModal from "./FeedbackModal"

export function Footer({ lang = "fr" }) {
    const t = translations[lang]
    const [isLoading, setIsLoading] = useState(false)
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: ''
    })

    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }))

    return (
        <>
            <FeedbackModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                type={modalConfig.type}
                title={modalConfig.title}
                message={modalConfig.message}
            />

            <footer dir="ltr" className="bg-[#538270] text-white pt-20 pb-10 mt-auto">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
                        {/* About */}
                        <div className="space-y-4 text-left">
                            <h3 className="font-bold text-xl tracking-tight text-white text-left">MOSLIPO</h3>
                            <p className="text-white/80 text-sm leading-relaxed max-w-xs text-left">
                                {lang === "ar"
                                    ? "الجمعية المغربية للوذمة الشحمية والأمراض المرتبطة بها"
                                    : "La Société Marocaine du Lipœdème et des Pathologies Associées"
                                }
                            </p>
                        </div>

                        {/* Links */}
                        <div className="space-y-4 text-left">
                            <h4 className="font-bold text-sm uppercase tracking-wider text-white/90 text-left">
                                {lang === "fr" ? "Navigation" : lang === "en" ? "Navigation" : "الملاحة"}
                            </h4>
                            <ul className="space-y-3 text-sm text-white/80">
                                {Object.entries(t.nav)
                                    .slice(0, 4)
                                    .map(([key, label]) => (
                                        <li key={key}>
                                            <Link to={`/${key === "home" ? "" : key}`} className="hover:text-white transition-colors duration-200 flex items-center gap-2 text-left justify-start">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6 text-left">
                            <h4 className="font-bold text-sm uppercase tracking-wider text-white/90 text-left">
                                {lang === "fr" ? "Contact" : lang === "en" ? "Contact" : "اتصال"}
                            </h4>
                            <ul className="space-y-6 text-sm text-white/80">
                                <li className="flex items-start gap-4 text-left justify-start">
                                    <div className="p-2 rounded-lg bg-white/10 shrink-0">
                                        <MapPin size={18} className="text-white/90" />
                                    </div>
                                    <span className="leading-relaxed pt-1 text-left">{t.footer.address}</span>
                                </li>
                                <li className="flex items-center gap-4 text-left justify-start">
                                    <div className="p-2 rounded-lg bg-white/10 shrink-0">
                                        <Mail size={18} className="text-white/90" />
                                    </div>
                                    <a href={`mailto:${t.footer.email}`} className="hover:text-white transition-colors duration-200 pt-0.5 text-left">
                                        {t.footer.email}
                                    </a>
                                </li>
                                <li className="flex items-center gap-4 text-left justify-start">
                                    <div className="p-2 rounded-lg bg-white/10 shrink-0">
                                        <Phone size={18} className="text-white/90" />
                                    </div>
                                    <a href={`tel:${t.footer.phone}`} className="hover:text-white transition-colors duration-200 pt-0.5 text-left">
                                        {t.footer.phone}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-6 text-left">
                            <h4 className="font-bold text-sm uppercase tracking-wider text-white/90 text-left">
                                {lang === "fr" ? "Newsletter" : lang === "en" ? "Newsletter" : "النشرة"}
                            </h4>
                            <p className="text-sm text-white/80 leading-relaxed text-left">
                                {lang === "fr" ? "Restez informé" : lang === "en" ? "Stay updated" : "ابقَ مطلعاً"}
                            </p>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const email = e.target.email.value;
                                setIsLoading(true);

                                try {
                                    const apiUrl = process.env.REACT_APP_API_URL || "https://moslipod-75df6c235fd9.herokuapp.com/";
                                    const response = await fetch(`${apiUrl}/api/newsletter`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ email })
                                    });

                                    const data = await response.json();

                                    if (response.ok) {
                                        setModalConfig({
                                            isOpen: true,
                                            type: 'success',
                                            title: lang === 'ar' ? 'شكرا لاشتراكك!' : 'Inscription réussie !',
                                            message: lang === 'ar' ? 'لقد تم تسجيل بريدك الإلكتروني بنجاح.' : 'Vous êtes maintenant inscrit à notre newsletter.'
                                        });
                                        e.target.reset();
                                    } else {
                                        let errorMsg = "Une erreur est survenue";
                                        if (data.error === "Email already subscribed") {
                                            errorMsg = lang === 'ar' ? 'هذا البريد الإلكتروني مسجل بالفعل' : 'Cet email est déjà inscrit à la newsletter.';
                                        }
                                        setModalConfig({
                                            isOpen: true,
                                            type: 'error',
                                            title: lang === 'ar' ? 'عذراً!' : 'Oups !',
                                            message: errorMsg
                                        });
                                    }
                                } catch (err) {
                                    setModalConfig({
                                        isOpen: true,
                                        type: 'error',
                                        title: 'Erreur de connexion',
                                        message: 'Impossible de contacter le serveur. Veuillez réessayer plus tard.'
                                    });
                                } finally {
                                    setIsLoading(false);
                                }
                            }} className="flex flex-col gap-3">
                                <input
                                    name="email"
                                    type="email"
                                    disabled={isLoading}
                                    placeholder={lang === "fr" ? "Votre email" : lang === "en" ? "Your email" : "بريدك الإلكتروني"}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-left disabled:opacity-50"
                                    required
                                />
                                <button
                                    name="submitBtn"
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full px-4 py-3 rounded-xl bg-white text-[#538270] font-bold text-sm hover:bg-opacity-90 transition-all shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        lang === "fr" ? "S'abonner" : lang === "en" ? "Subscribe" : "اشترك"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs font-medium text-white/50 uppercase tracking-widest order-last md:order-first">
                            {t.footer.rights.replace('{year}', new Date().getFullYear())}
                        </p>
                        <div className="flex gap-8 text-xs font-semibold text-white/60 uppercase tracking-wider">
                            <Link to="/confidentialite" className="hover:text-white transition-colors duration-200">
                                {lang === "ar" ? "سياسة الخصوصية" : lang === "en" ? "Privacy Policy" : "Politique de confidentialité"}
                            </Link>
                            <Link to="/mentions-legales" className="hover:text-white transition-colors duration-200">
                                {lang === "ar" ? "إشعار قانوني" : lang === "en" ? "Legal Mentions" : "Mentions légales"}
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
