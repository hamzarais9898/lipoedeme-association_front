import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Users, Award, Globe, ArrowRight, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { t } from "../context/translations"

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

export default function Adhesion({ lang = "fr" }) {
    const [mounted, setMounted] = useState(false)
    const [activeCard, setActiveCard] = useState(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const memberTypes = [
        {
            key: "active",
            icon: Users,
            gradient: "from-[#538270] to-[#3d5f52] dark:from-teal-700 dark:to-teal-900",
            icon_bg: "bg-white/15",
        },
        {
            key: "candidate",
            icon: Award,
            gradient: "from-[#B4C9B3] to-[#92a99a] dark:from-teal-600 dark:to-teal-800",
            icon_bg: "bg-white/20",
        },
        {
            key: "honorary",
            icon: Heart,
            gradient: "from-[#538270] to-[#2d4a3d] dark:from-teal-800 dark:to-teal-950",
            icon_bg: "bg-white/15",
        },
        {
            key: "foreign",
            icon: Globe,
            gradient: "from-[#B4C9B3] to-[#6b9a8a] dark:from-teal-500 dark:to-teal-700",
            icon_bg: "bg-white/20",
        }
    ]

    const stepIcons = ["📋", "🤝", "👥", "🗳️", "🎉"]

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
            {/* Page Header / Hero Area */}
            <section className="relative pt-10 pb-20 px-4 bg-gradient-to-br from-[#F5F1EB] via-white to-[#F5F1EB] dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors">
                <div className="absolute inset-0 overflow-hidden pointer-events-none text-start">
                    <motion.div
                        animate={{
                            y: [0, 30, 0],
                        }}
                        transition={{ duration: 7, repeat: Infinity }}
                        className="absolute top-10 right-20 w-80 h-80 bg-[#538270] rounded-full opacity-8 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            y: [30, 0, 30],
                        }}
                        transition={{ duration: 9, repeat: Infinity }}
                        className="absolute bottom-40 left-5 w-96 h-96 bg-[#B4C9B3] rounded-full opacity-5 blur-3xl"
                    />
                </div>

                <div className="relative max-w-5xl mx-auto text-center z-10 font-dir">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
                        <span className="px-4 py-2 bg-[#B4C9B3]/20 dark:bg-teal-900/30 text-[#538270] dark:text-teal-400 rounded-full text-sm font-semibold transition-colors">
                            {t("membership.hero.badge", lang)}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold text-[#538270] dark:text-teal-500 mb-6 leading-tight transition-colors"
                    >
                        {t("membership.hero.title", lang)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed transition-colors"
                    >
                        {t("membership.hero.subtitle", lang)}
                    </motion.p>
                </div>
            </section>

            {/* Member Types Grid */}
            <section className="py-24 px-4 bg-[#F5F1EB] dark:bg-slate-800 transition-colors">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-[#538270] dark:text-teal-500 mb-6 transition-colors">{t("membership.types.title", lang)}</h2>
                        <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">{t("membership.types.subtitle", lang)}</p>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {memberTypes.map((type, i) => {
                            const Icon = type.icon
                            const content = t(`membership.types.${type.key}`, lang)
                            return (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    transition={{ delay: i * 0.1 }}
                                    onHoverStart={() => setActiveCard(i)}
                                    onHoverEnd={() => setActiveCard(null)}
                                    className="relative group cursor-pointer text-start font-dir"
                                >
                                    <div
                                        className={`bg-gradient-to-br ${type.gradient} text-white rounded-2xl overflow-hidden h-full hover:shadow-2xl transition-all duration-300`}
                                    >
                                        {/* Background animation */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.15, 1],
                                                opacity: [0.2, 0.1, 0.2],
                                            }}
                                            transition={{ duration: 5, repeat: Infinity }}
                                            className="absolute -right-16 -top-16 w-64 h-64 bg-white rounded-full blur-3xl pointer-events-none"
                                        />

                                        {/* Badge */}
                                        <div className="relative p-6 border-b border-white/20">
                                            <div className="flex items-center justify-between">
                                                <div className={`${type.icon_bg} rounded-xl p-3`}>
                                                    <Icon size={32} className="text-white" />
                                                </div>
                                                <motion.span
                                                    animate={activeCard === i ? { scale: 1.1 } : { scale: 1 }}
                                                    className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider"
                                                >
                                                    {content.badge}
                                                </motion.span>
                                            </div>
                                            <h3 className="text-3xl font-bold mt-4">{content.name}</h3>
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-6 space-y-4">
                                            {content.requirements.map((req, j) => (
                                                <motion.div
                                                    key={j}
                                                    initial={{ opacity: 0.8 }}
                                                    animate={{
                                                        opacity: activeCard === i ? 1 : 0.8,
                                                    }}
                                                    transition={{ delay: j * 0.05 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <CheckCircle2 size={20} className="text-white/80 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90 leading-relaxed">{req}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.div
                                            animate={activeCard === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative p-6 pt-0 flex items-center gap-2 text-white"
                                        >
                                            <span className="text-sm font-semibold">
                                                {t("membership.learnMore", lang)}
                                            </span>
                                            <ArrowRight size={16} />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#538270] dark:text-teal-500 text-center mb-20 transition-colors"
                    >
                        {t("membership.process.title", lang)}
                    </motion.h2>

                    <div className="relative font-dir">
                        {/* Timeline connector line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#538270] to-[#B4C9B3] dark:from-teal-600 dark:to-teal-400 transform -translate-x-1/2 transition-colors" />

                        <div className="space-y-12">
                            {t("membership.process.steps", lang).map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex items-start gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                                >
                                    {/* Step number */}
                                    <div className="hidden md:flex flex-shrink-0 w-20 justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#538270] to-[#3d5f52] dark:from-teal-600 dark:to-teal-800 text-white font-bold text-xl shadow-lg z-10 transition-colors"
                                        >
                                            {i + 1}
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="md:w-1/2 bg-white dark:bg-slate-700 p-8 rounded-xl border border-[#B4C9B3] dark:border-slate-600 shadow-md hover:shadow-xl transition-all text-start">
                                        <div className="text-3xl mb-3">{stepIcons[i % stepIcons.length]}</div>
                                        <h3 className="text-2xl font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">{item.title}</h3>
                                        <p className="text-gray-700 dark:text-slate-300 leading-relaxed transition-colors">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 relative overflow-hidden bg-[#F5F1EB] dark:bg-slate-800 transition-colors">
                <motion.div
                    animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.15, 0.08, 0.15],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute right-0 bottom-0 w-96 h-96 bg-[#538270] rounded-full blur-3xl pointer-events-none"
                />

                <div className="relative max-w-4xl mx-auto text-center z-10 font-dir">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#538270] dark:text-teal-500 mb-6 transition-colors"
                    >
                        {t("membership.cta.title", lang)}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-700 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors"
                    >
                        {t("membership.cta.subtitle", lang)}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-[#538270] dark:bg-teal-600 text-white rounded-lg hover:bg-[#3d5f52] transition-all font-bold shadow-lg hover:shadow-xl text-center"
                        >
                            {t("membership.cta.button1", lang)}
                        </Link>
                        <Link
                            to="/"
                            className="px-8 py-4 border-2 border-[#538270] dark:border-teal-500 text-[#538270] dark:text-teal-400 rounded-lg hover:bg-[#538270]/10 transition-all font-bold text-center"
                        >
                            {t("membership.cta.button2", lang)}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
