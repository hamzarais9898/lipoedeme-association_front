import { Link } from "react-router-dom"
import translations from "../context/translations"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer({ lang = "fr" }) {
    const t = translations[lang]

    return (
        <footer className="bg-[#538270] text-white pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* About */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">MOSLIPO</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                            {lang === "ar"
                                ? "الجمعية المغربية للوذمة الشحمية والأمراض المرتبطة بها"
                                : "La Société Marocaine du Lipœdème et des Pathologies Associées"
                            }
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            {lang === "fr" ? "Navigation" : lang === "en" ? "Navigation" : "الملاحة"}
                        </h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            {Object.entries(t.nav)
                                .slice(0, 4)
                                .map(([key, label]) => (
                                    <li key={key}>
                                        <Link to={`/${key === "home" ? "" : key}`} className="hover:text-white transition">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4">{lang === "fr" ? "Contact" : lang === "en" ? "Contact" : "اتصال"}</h4>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                                <span>{t.footer.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} />
                                <a href={`mailto:${t.footer.email}`} className="hover:text-white transition">
                                    {t.footer.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} />
                                <a href={`tel:${t.footer.phone}`} className="hover:text-white transition">
                                    {t.footer.phone}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            {lang === "fr" ? "Newsletter" : lang === "en" ? "Newsletter" : "النشرة"}
                        </h4>
                        <p className="text-sm text-white/80 mb-3">
                            {lang === "fr" ? "Restez informé" : lang === "en" ? "Stay updated" : "ابقَ مطلعاً"}
                        </p>
                        <input
                            type="email"
                            placeholder={lang === "fr" ? "Votre email" : lang === "en" ? "Your email" : "بريدك الإلكتروني"}
                            className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/70">{t.footer.rights}</p>
                    <div className="flex gap-6 text-sm text-white/70">
                        <Link to="/" className="hover:text-white transition">
                            {lang === "ar" ? "سياسة الخصوصية" : "Politique de confidentialité"}
                        </Link>
                        <Link to="/" className="hover:text-white transition">
                            {lang === "ar" ? "إشعار قانوني" : "Mentions légales"}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
