import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { t } from "../context/translations"
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react"
import image1 from "../assets/images/logo1.png"

export function Header({ currentLang = "fr", onLangChange, isDark, onThemeToggle }) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const languages = ["fr", "en", "ar"]

    // Updated navigation items
    const navKeys = ["home", "about", "lipoedeme", "actions", "adhesion", "news", "contact"]

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? (isDark ? "bg-slate-900 border-b border-slate-800 shadow-xl" : "bg-white shadow-lg")
                : (isDark ? "bg-slate-900/90 backdrop-blur" : "bg-white/95 backdrop-blur")
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-12 h-12 relative">
                            <img src={image1} alt="MOSLIPO Logo" width={48} height={48} className="object-contain" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-[#538270] text-lg">MOSLIPO</div>
                            <div className="text-xs text-[#538270]/70">Lipœdème</div>
                        </div>
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden lg:flex gap-6">
                        {navKeys.map(
                            (key) =>
                                key !== "contact" && (
                                    <Link
                                        key={key}
                                        to={`/${key === "home" ? "" : key}`}
                                        className={`transition-colors font-medium text-sm whitespace-nowrap ${isDark ? "text-slate-300 hover:text-white" : "text-gray-700 hover:text-[#538270]"
                                            }`}
                                    >
                                        {t(`nav.${key}`, currentLang)}
                                    </Link>
                                ),
                        )}
                    </nav>

                    {/* Right side tools */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={onThemeToggle}
                            className={`p-2 rounded-lg transition-all duration-300 ${isDark
                                ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                                : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                                }`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Language Selector */}
                        <div className="relative group hidden sm:block">
                            <button className={`flex items-center gap-1 px-3 py-2 rounded-lg transition font-medium text-sm ${isDark ? "text-slate-300 hover:bg-slate-800" : "text-[#538270] hover:bg-[#F5F1EB]"
                                }`}>
                                {currentLang.toUpperCase()}
                                <ChevronDown size={16} />
                            </button>
                            <div className={`absolute right-0 top-full mt-1 rounded-lg shadow-lg hidden group-hover:block border min-w-[80px] ${isDark ? "bg-slate-900 border-slate-700 text-slate-300" : "bg-white border-[#B4C9B3] text-[#538270]"
                                }`}>
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            if (onLangChange) {
                                                onLangChange(lang);
                                                setIsOpen(false);
                                            }
                                        }}
                                        className={`w-full text-left block px-4 py-2 first:rounded-t-lg last:rounded-b-lg font-medium text-sm transition-colors ${isDark ? "hover:bg-slate-800" : "hover:bg-[#F5F1EB]"
                                            }`}
                                    >
                                        {lang.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contact Button - Desktop */}
                        <Link
                            to="/contact"
                            className={`hidden sm:block px-4 py-2 rounded-lg transition-colors font-medium text-sm ${isDark ? "bg-teal-600 text-white hover:bg-teal-500" : "bg-[#538270] text-white hover:bg-[#3d5f52]"
                                }`}
                        >
                            {t("nav.contact", currentLang)}
                        </Link>

                        {/* Burger Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? "hover:bg-slate-800 text-slate-300" : "hover:bg-[#F5F1EB] text-[#538270]"
                                }`}
                            aria-label="Menu toggle"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out border-t ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-[#B4C9B3]/20"
                    } ${isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"}`}
            >
                <div className="max-w-7xl mx-auto px-4 space-y-6">
                    <nav className="flex flex-col gap-4">
                        {navKeys.map((key) => (
                            <Link
                                key={key}
                                to={`/${key === "home" ? "" : key}`}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium transition-colors ${isDark
                                    ? (key === "contact" ? "text-teal-400" : "text-slate-300 hover:text-white")
                                    : (key === "contact" ? "text-[#538270]" : "text-gray-700 hover:text-[#538270]")
                                    }`}
                            >
                                {t(`nav.${key}`, currentLang)}
                            </Link>
                        ))}
                    </nav>

                    {/* Language Selection - Mobile */}
                    <div className={`pt-4 border-t ${isDark ? "border-slate-800" : "border-[#B4C9B3]/20"}`}>
                        <p className={`text-xs mb-3 uppercase tracking-wider font-semibold ${isDark ? "text-slate-500" : "text-gray-500"}`}>
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
                                        ? (isDark ? "bg-teal-600 text-white border-teal-600" : "bg-[#538270] text-white border-[#538270]")
                                        : (isDark ? "border-slate-700 text-slate-400 hover:text-white hover:border-slate-500" : "border-[#B4C9B3]/40 text-gray-700 hover:text-[#538270] hover:border-[#538270]")
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
