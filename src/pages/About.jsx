import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Users, Target, Lightbulb, BookOpen, Award, Globe, ArrowRight, FileText } from "lucide-react"
import { t } from "../context/translations"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

export default function About({ lang = "fr" }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const objectivesIcons = [Globe, Users, BookOpen, Lightbulb, Award, Target]
    const teamGradients = [
        "from-[#538270] to-[#3d5f52]",
        "from-[#B4C9B3] to-[#88a89c]",
        "from-[#538270] to-[#3d5f52]",
        "from-[#B4C9B3] to-[#88a89c]",
        "from-[#538270] to-[#3d5f52]",
        "from-[#B4C9B3] to-[#88a89c]",
        "from-[#538270] to-[#3d5f52]",
    ]

    return (
        <div className="min-h-screen bg-white transition-colors duration-300 overflow-hidden">
            {/* Page Header / Hero */}
            <section className="relative pt-10 pb-20 px-4 bg-gradient-to-br from-[#F5F1EB] via-white to-[#F5F1EB] transition-colors">
                {/* Animated background */}
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 50%, rgba(179, 201, 179, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(83, 130, 112, 0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 50%, rgba(179, 201, 179, 0.1) 0%, transparent 50%)",
                        ],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute inset-0 -z-10"
                />

                {/* Floating orbs */}
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-[#B4C9B3]/15 to-transparent rounded-full blur-3xl -z-10"
                />

                <div className="relative max-w-5xl mx-auto text-center z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-block">
                        <span className="px-4 py-2 bg-[#B4C9B3]/20 text-[#538270] rounded-full text-sm font-semibold transition-colors">
                            {t("about.hero.badge", lang)}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold text-[#538270] mb-6 leading-tight transition-colors"
                    >
                        {t("about.hero.title", lang)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed transition-colors"
                    >
                        {t("about.hero.subtitle", lang)}
                    </motion.p>
                </div>
            </section>

            {/* Genesis Section */}
            <section className="py-24 px-4 bg-white transition-colors">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-[#538270] mb-8 transition-colors">{t("about.genesis.title", lang)}</h2>
                        <div className="space-y-6 text-lg text-gray-700 transition-colors leading-relaxed">
                            {t("about.genesis.content", lang).map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-[#B4C9B3] to-[#538270] p-8 flex flex-col items-center justify-center shadow-2xl transition-colors"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-10"
                        >
                            <div className="w-full h-full border-4 border-white rounded-full" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [-15, 15, -15] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="relative z-10 text-center"
                        >
                            <div className="text-6xl sm:text-7xl font-bold text-white/90 mb-2">{t("about.genesis.year", lang)}</div>
                            <p className="text-white/80 text-lg font-semibold">{t("about.genesis.yearTitle", lang)}</p>
                            <p className="text-white/70 text-sm mt-4">{t("about.genesis.location", lang)}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* OBJECTIVES SECTION */}
            <section className="py-20 sm:py-32 px-4 bg-[#538270] text-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{t("about.objectives.title", lang)}</h2>
                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                            {t("about.objectives.subtitle", lang)}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    >
                        {t("about.objectives.items", lang).map((obj, i) => {
                            const Icon = objectivesIcons[i % objectivesIcons.length]
                            return (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" }}
                                    className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        className="mb-6 p-4 rounded-xl bg-white/20 w-fit group-hover:bg-white/30 transition-all"
                                    >
                                        <Icon size={32} className="text-[#B4C9B3]" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#B4C9B3] transition-colors">{obj.title}</h3>
                                    <p className="text-white/80 leading-relaxed text-sm sm:text-base">{obj.desc}</p>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* TEAM SECTION */}
            <section className="py-20 sm:py-32 px-4 bg-gradient-to-b from-white via-[#F5F1EB]/40 to-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#538270] mb-6 transition-colors">{t("about.team.title", lang)}</h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto transition-colors">
                            {t("about.team.subtitle", lang)}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {t("about.team.members", lang).map((member, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -12, boxShadow: "0 30px 60px rgba(83, 130, 112, 0.15)" }}
                                className="group bg-white rounded-2xl overflow-hidden border-2 border-[#B4C9B3]/40 hover:border-[#B4C9B3] transition-all duration-300 shadow-sm"
                            >
                                <div className={`h-40 sm:h-48 relative overflow-hidden bg-gradient-to-br ${teamGradients[i % teamGradients.length]}`}>
                                    <motion.div whileHover={{ scale: 1.1 }} className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl sm:text-7xl font-bold text-white/40">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    </motion.div>

                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold ring-1 ring-white/30">
                                        {member.role}
                                    </div>
                                </div>

                                <div className="p-6 space-y-3">
                                    <h3 className="text-xl font-bold text-[#538270] leading-snug transition-colors">{member.name}</h3>
                                    <p className="text-sm font-semibold text-[#B4C9B3] uppercase tracking-wider transition-colors">{member.specialty}</p>
                                    <p className="text-sm text-gray-700 leading-relaxed transition-colors">{member.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Statuts Section */}
            <section className="py-24 px-4 bg-[#F5F1EB] transition-colors">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-[#538270] mb-8 transition-colors"
                    >
                        {t("about.stats.title", lang)}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-3xl shadow-xl border border-[#B4C9B3]/30 transition-colors"
                    >
                        <p className="text-xl text-gray-700 leading-relaxed mb-10 transition-colors">
                            {t("about.stats.description", lang)}
                        </p>
                        <button className="px-10 py-4 bg-[#538270] text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group">
                            <FileText size={24} />
                            {t("about.stats.cta", lang)}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 sm:py-32 px-4 bg-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#538270] transition-colors">{t("about.cta.title", lang)}</h2>
                        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed transition-colors">
                            {t("about.cta.subtitle", lang)}
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-[#538270] to-[#3d5f52] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 group hover:shadow-xl transition-all"
                            >
                                <Link to="/adhesion" className="flex items-center gap-2">
                                    {t("about.cta.button1", lang)}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-[#538270] text-[#538270] rounded-xl font-bold text-lg hover:bg-[#F5F1EB] transition-all"
                            >
                                <Link to="/">{t("about.cta.button2", lang)}</Link>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
