import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Newspaper } from "lucide-react" // Importing icons
import { t } from "../context/translations"
import SEO from "../components/SEO"

export default function News({ lang = "fr" }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isRTL = lang === "ar"
    const ArrowIcon = isRTL ? ArrowRight : ArrowLeft

    return (
        <div className="min-h-screen bg-white transition-colors duration-300 overflow-hidden flex flex-col items-center justify-center relative">
            <SEO
                title={t("newsPage.title", lang)}
                description={t("newsPage.description", lang)}
                lang={lang}
            />

            {/* Background Animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#538270] to-[#B4C9B3] rounded-full blur-[100px] opacity-10"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -60, 0],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#92a99a] to-[#3d5f52] rounded-full blur-[80px] opacity-10"
                />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1.5 }}
                    className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl border border-[#B4C9B3]/30"
                >
                    <Newspaper size={48} className="text-[#538270] sm:w-16 sm:h-16" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl sm:text-6xl font-bold text-[#538270] mb-6 font-dir"
                >
                    {t("newsPage.comingSoon", lang)}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed font-dir"
                >
                    {t("newsPage.description", lang)}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#538270] text-white rounded-xl hover:bg-[#3d5f52] transition-colors shadow-lg hover:shadow-xl font-bold text-lg group"
                    >
                        <ArrowIcon size={20} className="group-hover:-translate-x-1 transition-transform" />
                        {t("newsPage.backHome", lang)}
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
