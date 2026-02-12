import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { t } from "../context/translations"
import { Menu, X, ChevronDown } from "lucide-react"
import image1 from "../assets/images/logo1.png"

export function Header({ currentLang = "fr", onLangChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const languages = ["fr", "en", "ar"]

    // Updated navigation items
    const navKeys = ["about", "lipoedeme", "actions", "adhesion", "news", "contact"]

    return (
        <header
            dir="ltr"
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white shadow-lg"
                : "bg-white/95 backdrop-blur"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-28">
                    {/* Logo */}
                    <Link to="/" className="relative z-50 hover:opacity-95 transition h-full flex items-center">
                        {/* Placeholder to reserve width */}
                        <div className="w-28" />

                        {/* Actual Logo positioned absolutely to break out of bounds */}
                        <div className="absolute top-0 left-0 w-28 h-28 rounded-b-3xl shadow-sm flex items-center justify-center transition-all duration-300 bg-white">
                            <img src={image1} alt="MOSLIPO Logo" className="w-full h-full object-contain p-2" />
                        </div>
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden lg:flex gap-8 xl:gap-10">
                        {navKeys.map(
                            (key) =>
                                key !== "contact" && (
                                    <Link
                                        key={key}
                                        to={`/${key === "home" ? "" : key}`}
                                        className="transition-colors font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap text-gray-700 hover:text-[#538270]"
                                    >
                                        {t(`nav.${key}`, currentLang)}
                                    </Link>
                                ),
                        )}
                    </nav>

                    {/* Right side tools */}
                    <div className="flex items-center gap-3 sm:gap-6">
                        {/* Language Selector */}
                        <div className="relative group hidden sm:block">
                            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition font-semibold text-sm text-[#538270] hover:bg-[#F5F1EB]">
                                {currentLang.toUpperCase()}
                                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                            </button>
                            {/* Invisible bridge with no gap to ensure hover persistence */}
                            <div className="absolute left-0 right-0 h-4 top-full" />
                            <div className="absolute right-0 top-full rounded-xl shadow-xl hidden group-hover:block border min-w-[110px] bg-white border-[#B4C9B3]/30 overflow-hidden text-[#538270] animate-in fade-in slide-in-from-top-1 duration-200">
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            if (onLangChange) {
                                                onLangChange(lang);
                                                setIsOpen(false);
                                            }
                                        }}
                                        className="w-full text-left block px-5 py-2.5 first:rounded-t-lg last:rounded-b-lg font-medium text-sm transition-colors hover:bg-[#F5F1EB]"
                                    >
                                        {lang.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contact Button - Desktop */}
                        <Link
                            to="/contact"
                            className="hidden sm:block px-6 py-2.5 rounded-lg transition-all font-semibold text-sm bg-[#538270] text-white hover:bg-[#3d5f52] shadow-sm hover:shadow-md"
                        >
                            {t("nav.contact", currentLang).toUpperCase()}
                        </Link>

                        {/* Burger Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-[#F5F1EB] text-[#538270]"
                            aria-label="Menu toggle"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out border-t bg-white border-[#B4C9B3]/20 ${isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"}`}
            >
                <div className="max-w-7xl mx-auto px-4 space-y-6">
                    <nav className="flex flex-col gap-4">
                        {navKeys.map((key) => (
                            <Link
                                key={key}
                                to={`/${key === "home" ? "" : key}`}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium transition-colors ${key === "contact" ? "text-[#538270]" : "text-gray-700 hover:text-[#538270]"}`}
                            >
                                {t(`nav.${key}`, currentLang)}
                            </Link>
                        ))}
                    </nav>

                    {/* Language Selection - Mobile */}
                    <div className="pt-4 border-t border-[#B4C9B3]/20">
                        <p className="text-xs mb-3 uppercase tracking-wider font-semibold text-gray-500">
                            {currentLang === "ar" ? "اللغة" : "Language"}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {languages.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => {
                                        if (onLangChange) {
                                            onLangChange(lang);
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-lg border transition-all ${currentLang === lang
                                        ? "bg-[#538270] text-white border-[#538270]"
                                        : "border-[#B4C9B3]/40 text-gray-700 hover:text-[#538270] hover:border-[#538270]"
                                        }`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
