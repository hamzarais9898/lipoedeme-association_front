import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, CheckCircle2, ArrowRight, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { t } from "../context/translations"
import SEO from "../components/SEO"


const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
}

export default function Actions({ lang = "fr" }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const statIcons = [Zap, Users, CheckCircle2]
    const statColors = ["#538270", "#B4C9B3", "#538270"]

    const translatedActions = t("actions.items", lang)
    const translatedStats = t("actions.stats", lang)

    return (
        <div className="min-h-screen bg-white transition-colors duration-300 overflow-hidden">
            <SEO
                title={t("nav.actions", lang)}
                description={t("actions.hero.subtitle", lang)}
                lang={lang}
            />
            {/* Hero Section with Animated Background */}
            <section className="relative pt-10 pb-20 px-4 bg-gradient-to-br from-[#F5F1EB] via-white to-[#F5F1EB] transition-colors">
                <div className="absolute inset-0 overflow-hidden pointer-events-none text-start">
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-20 right-10 w-72 h-72 bg-[#B4C9B3] rounded-full opacity-10 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            y: [20, 0, 20],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute bottom-32 left-10 w-96 h-96 bg-[#538270] rounded-full opacity-5 blur-3xl"
                    />
                </div>

                <div className="relative max-w-5xl mx-auto text-center z-10 font-dir">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
                        <span className="px-4 py-2 bg-[#B4C9B3]/20 text-[#538270] rounded-full text-sm font-semibold transition-colors">
                            {t("actions.hero.badge", lang)}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold text-[#538270] mb-6 leading-tight transition-colors"
                    >
                        {t("actions.hero.title", lang)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed transition-colors"
                    >
                        {t("actions.hero.subtitle", lang)}
                    </motion.p>
                </div>
            </section>

            {/* Actions Grid */}
            <section className="py-24 px-4 bg-white transition-colors">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {translatedActions.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-[#F5F1EB] rounded-3xl p-8 hover:bg-[#538270] transition-all duration-500 overflow-hidden text-start font-dir"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4C9B3]/20 rounded-bl-[100px] -z-0 group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#538270] mb-8 border border-[#B4C9B3]/30 group-hover:bg-[#538270] group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                                        <ArrowRight size={32} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#538270] mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-gray-700 leading-relaxed mb-8 group-hover:text-white/90 transition-colors text-sm sm:text-base">{item.desc}</p>

                                    <div className="flex items-center gap-2 text-[#538270] font-bold group-hover:text-white transition-colors">
                                        {t("actions.discoverMore", lang)}
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Impact Statistics Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
                    >
                        {translatedStats.map((stat, i) => {
                            const Icon = statIcons[i % statIcons.length]
                            return (
                                <motion.div
                                    key={i}
                                    variants={scaleIn}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-gradient-to-br from-[#F5F1EB] to-white p-8 rounded-xl border border-[#B4C9B3] text-center hover:shadow-lg transition-all"
                                >
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                                        className="inline-block p-3 rounded-lg mb-4"
                                        style={{ backgroundColor: `${statColors[i % statColors.length]}20` }}
                                    >
                                        <Icon size={28} className="" style={{ color: statColors[i % statColors.length] }} />
                                    </motion.div>
                                    <p className="text-4xl font-bold text-[#538270] mb-2 transition-colors">{stat.number}</p>
                                    <p className="text-gray-700 text-sm transition-colors">{stat.label}</p>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-[#538270] to-[#3d5f52] text-white relative overflow-hidden transition-colors">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.1, 0.2],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl pointer-events-none"
                />

                <div className="relative max-w-4xl mx-auto text-center z-10 font-dir">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        {t("actions.cta.title", lang)}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/90 mb-12 max-w-2xl mx-auto"
                    >
                        {t("actions.cta.subtitle", lang)}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            to="/adhesion"
                            className="px-8 py-4 bg-white text-[#538270] rounded-lg hover:bg-[#F5F1EB] transition-all font-bold shadow-lg hover:shadow-xl text-center"
                        >
                            {t("actions.cta.button1", lang)}
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-bold text-center"
                        >
                            {t("actions.cta.button2", lang)}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
