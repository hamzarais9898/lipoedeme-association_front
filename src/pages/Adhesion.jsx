import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Users, Award, Globe, ArrowRight, Heart, FileText, ClipboardCheck, Vote, PartyPopper } from "lucide-react"
import { Link } from "react-router-dom"
import { t } from "../context/translations"
import SEO from "../components/SEO"

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
            gradient: "from-[#538270] to-[#3d5f52]",
            icon_bg: "bg-white/15",
        },
        {
            key: "candidate",
            icon: Award,
            gradient: "from-[#B4C9B3] to-[#92a99a]",
            icon_bg: "bg-white/20",
        },
        {
            key: "honorary",
            icon: Heart,
            gradient: "from-[#538270] to-[#2d4a3d]",
            icon_bg: "bg-white/15",
        },
        {
            key: "foreign",
            icon: Globe,
            gradient: "from-[#B4C9B3] to-[#6b9a8a]",
            icon_bg: "bg-white/20",
        }
    ]

    const stepIcons = [FileText, Users, ClipboardCheck, Vote, PartyPopper]

    return (
        <div className="min-h-screen bg-white transition-colors duration-300 overflow-hidden">
            <SEO
                title={t("nav.adhesion", lang)}
                description={t("membership.hero.subtitle", lang)}
                lang={lang}
            />
            {/* Page Header / Hero Area */}
            <section className="relative pt-10 pb-20 px-4 bg-gradient-to-br from-[#F5F1EB] via-white to-[#F5F1EB] transition-colors">
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
                        <span className="px-4 py-2 bg-[#B4C9B3]/20 text-[#538270] rounded-full text-sm font-semibold transition-colors">
                            {t("membership.hero.badge", lang)}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold text-[#538270] mb-6 leading-tight transition-colors"
                    >
                        {t("membership.hero.title", lang)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed transition-colors"
                    >
                        {t("membership.hero.subtitle", lang)}
                    </motion.p>
                </div>
            </section>

            {/* Member Types Grid */}
            <section className="py-24 px-4 bg-[#F5F1EB] transition-colors">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-[#538270] mb-6 transition-colors">{t("membership.types.title", lang)}</h2>
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
            <section className="relative py-24 px-4 bg-white transition-colors overflow-hidden">
                {/* Decorative animated SVG background */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern id="adhesion-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0H0V40" fill="none" stroke="#538270" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#adhesion-grid)" />
                </svg>

                <div className="relative max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#538270] text-center mb-20 transition-colors"
                    >
                        {t("membership.process.title", lang)}
                    </motion.h2>

                    <div className="relative font-dir">
                        {/* Animated timeline connector line (self-drawing) */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 rounded-full bg-[#B4C9B3]/30" />
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.4, ease: "easeInOut" }}
                            style={{ originY: 0 }}
                            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 rounded-full bg-gradient-to-b from-[#538270] via-[#538270] to-[#B4C9B3]"
                        />

                        <div className="space-y-12">
                            {t("membership.process.steps", lang).map((item, i) => {
                                const Icon = stepIcons[i % stepIcons.length]
                                const isLeft = i % 2 === 0

                                const Card = (
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        className="group relative bg-white p-6 md:p-8 rounded-2xl border border-[#B4C9B3]/60 shadow-md hover:shadow-2xl hover:border-[#538270] transition-all duration-300 overflow-hidden"
                                    >
                                        {/* hover glow */}
                                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#538270]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className={`relative flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : "justify-start"}`}>
                                            <motion.span
                                                whileHover={{ rotate: -8, scale: 1.1 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#538270]/10 text-[#538270] group-hover:bg-[#538270] group-hover:text-white transition-colors duration-300"
                                            >
                                                <Icon size={26} strokeWidth={2} />
                                            </motion.span>
                                        </div>
                                        <h3 className={`relative text-xl md:text-2xl font-bold text-[#538270] mb-2 transition-colors ${isLeft ? "md:text-right" : "text-left"}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`relative text-gray-700 leading-relaxed transition-colors text-sm md:text-base ${isLeft ? "md:text-right" : "text-left"}`}>
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                )

                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative flex items-center justify-between"
                                    >
                                        {/* Left Side (Desktop: Even items) */}
                                        <div className="hidden md:block w-[45%] order-1 pr-8">
                                            {isLeft && Card}
                                        </div>

                                        {/* Center Marker with animated SVG progress ring */}
                                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                                            <motion.div
                                                whileHover={{ scale: 1.12 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16"
                                            >
                                                {/* pulsing halo */}
                                                <motion.span
                                                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                                                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                                                    className="absolute inset-0 rounded-full bg-[#538270]/40"
                                                />
                                                {/* animated progress ring */}
                                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="46" fill="none" stroke="#B4C9B3" strokeOpacity="0.35" strokeWidth="5" />
                                                    <motion.circle
                                                        cx="50" cy="50" r="46" fill="none"
                                                        stroke="#538270" strokeWidth="5" strokeLinecap="round"
                                                        initial={{ pathLength: 0 }}
                                                        whileInView={{ pathLength: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeInOut" }}
                                                    />
                                                </svg>
                                                {/* number */}
                                                <span className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-[#538270] to-[#3d5f52] text-white font-bold text-lg shadow-lg">
                                                    {i + 1}
                                                </span>
                                            </motion.div>
                                        </div>

                                        {/* Right Side (Desktop: Odd items | Mobile: All items) */}
                                        <div className="w-full md:w-[45%] pl-20 md:pl-8 md:order-3">
                                            <div className={`${isLeft ? "md:hidden" : ""} block`}>
                                                {Card}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 relative overflow-hidden bg-[#F5F1EB] transition-colors">
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
                        className="text-4xl md:text-5xl font-bold text-[#538270] mb-6 transition-colors"
                    >
                        {t("membership.cta.title", lang)}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors"
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
                            className="px-8 py-4 bg-[#538270] text-white rounded-lg hover:bg-[#3d5f52] transition-all font-bold shadow-lg hover:shadow-xl text-center"
                        >
                            {t("membership.cta.button1", lang)}
                        </Link>
                        <Link
                            to="/"
                            className="px-8 py-4 border-2 border-[#538270] text-[#538270] rounded-lg hover:bg-[#538270]/10 transition-all font-bold text-center"
                        >
                            {t("membership.cta.button2", lang)}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
