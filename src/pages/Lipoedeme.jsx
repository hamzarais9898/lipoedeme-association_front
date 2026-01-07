import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertCircle, Pill, Users, Zap, Heart, Droplet, Activity, Apple, Brain, ArrowRight, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { t } from "../context/translations"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Lipoedeme({ lang = "fr" }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const symptomsIcons = [AlertCircle, Droplet, Activity, Zap, Heart, Users]
    const treatmentIcons = [Activity, Pill, Heart, Zap, AlertCircle, Apple]
    const treatmentColors = [
        "from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20",
        "from-purple-50/50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20",
        "from-pink-50/50 to-pink-100/50 dark:from-pink-900/20 dark:to-pink-800/20",
        "from-orange-50/50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20",
        "from-cyan-50/50 to-cyan-100/50 dark:from-cyan-900/20 dark:to-cyan-800/20",
        "from-green-50/50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20",
    ]

    const renderHighlight = (text, highlight) => {
        if (!text || !highlight) return text;
        const parts = text.split(highlight);
        if (parts.length === 1) return text;
        return (
            <>
                {parts[0]}
                <span className="font-semibold text-[#538270] dark:text-teal-400">{highlight}</span>
                {parts.slice(1).join(highlight)}
            </>
        );
    };

    const renderDoubleHighlight = (text, high1, high2) => {
        if (!text) return "";
        let result = [text];

        if (high1) {
            let nextResult = [];
            result.forEach(part => {
                if (typeof part === 'string') {
                    const subParts = part.split(high1);
                    if (subParts.length > 1) {
                        subParts.forEach((sp, idx) => {
                            nextResult.push(sp);
                            if (idx < subParts.length - 1) {
                                nextResult.push(<span key={`h1-${idx}`} className="font-semibold text-[#538270] dark:text-teal-400">{high1}</span>);
                            }
                        });
                    } else {
                        nextResult.push(part);
                    }
                } else {
                    nextResult.push(part);
                }
            });
            result = nextResult;
        }

        if (high2) {
            let nextResult = [];
            result.forEach(part => {
                if (typeof part === 'string') {
                    const subParts = part.split(high2);
                    if (subParts.length > 1) {
                        subParts.forEach((sp, idx) => {
                            nextResult.push(sp);
                            if (idx < subParts.length - 1) {
                                nextResult.push(<span key={`h2-${idx}`} className="font-semibold text-[#538270] dark:text-teal-400">{high2}</span>);
                            }
                        });
                    } else {
                        nextResult.push(part);
                    }
                } else {
                    nextResult.push(part);
                }
            });
            result = nextResult;
        }

        return result;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-10 pb-20 px-4 bg-gradient-to-br from-[#F5F1EB] via-white to-[#F5F1EB] dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-[#B4C9B3]/30 to-transparent rounded-full blur-3xl opacity-50"
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tl from-[#538270]/20 to-transparent rounded-full blur-3xl opacity-50"
                        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className="relative max-w-5xl mx-auto text-center z-10 font-dir">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-block">
                        <span className="px-4 py-2 bg-[#B4C9B3]/20 dark:bg-teal-900/30 text-[#538270] dark:text-teal-400 rounded-full text-sm font-semibold transition-colors">
                            {t("lipoedeme.hero.badge", lang)}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold text-[#538270] dark:text-teal-500 mb-6 leading-tight transition-colors"
                    >
                        {t("lipoedeme.hero.title", lang)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed transition-colors"
                    >
                        {t("lipoedeme.hero.subtitle", lang)}
                    </motion.p>
                </div>
            </section>

            {/* Definition Section with Card */}
            <section className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-white via-white to-[#B4C9B3]/5 dark:from-slate-800 dark:to-slate-900 p-8 sm:p-12 rounded-3xl border border-[#B4C9B3]/30 dark:border-slate-700 shadow-lg transition-colors"
                    >
                        <div className="text-center sm:text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#538270] dark:text-teal-500 mb-8 transition-colors">{t("lipoedeme.definition.title", lang)}</h2>
                            <div className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed mb-6 transition-colors">
                                {renderHighlight(t("lipoedeme.definition.p1", lang), t("lipoedeme.definition.p1High", lang))}
                            </div>
                            <div className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed mb-6 transition-colors">
                                {renderHighlight(t("lipoedeme.definition.p2", lang), t("lipoedeme.definition.p2High", lang))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-start gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-2xl border-l-4 border-[#538270] dark:border-teal-500 shadow-sm transition-colors"
                        >
                            <AlertCircle className="text-[#538270] dark:text-teal-500 flex-shrink-0 mt-1" size={28} />
                            <div>
                                <h3 className="font-bold text-[#538270] dark:text-teal-500 mb-2 transition-colors">{t("lipoedeme.definition.omsTitle", lang)}</h3>
                                <div className="text-gray-700 dark:text-slate-300 transition-colors">
                                    {renderHighlight(t("lipoedeme.definition.omsDesc", lang), t("lipoedeme.definition.omsHigh", lang))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Symptoms Section */}
            <section className="py-24 px-4 bg-[#F5F1EB] dark:bg-slate-800 transition-colors">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#538270] dark:text-teal-500 mb-4 transition-colors">{t("lipoedeme.symptoms.title", lang)}</h2>
                        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
                            {t("lipoedeme.symptoms.subtitle", lang)}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {t("lipoedeme.symptoms.items", lang).map((symptom, i) => {
                            const Icon = symptomsIcons[i % symptomsIcons.length]
                            return (
                                <motion.div
                                    key={i}
                                    variants={itemVariant}
                                    whileHover={{ y: -5 }}
                                    className="group bg-white dark:bg-slate-700 p-6 sm:p-8 rounded-2xl border-2 border-[#B4C9B3]/30 dark:border-slate-600 hover:border-[#538270] dark:hover:border-teal-500 shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4 text-start font-dir">
                                        <div className="p-3 bg-[#B4C9B3]/20 dark:bg-teal-900/40 rounded-xl group-hover:bg-[#538270]/10 transition-colors">
                                            <Icon className="text-[#538270] dark:text-teal-400 group-hover:scale-110 transition-transform" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">{symptom.title}</h3>
                                            <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed transition-colors">{symptom.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Psychological Impact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 p-8 bg-white dark:bg-slate-700 rounded-2xl border border-[#B4C9B3]/20 dark:border-slate-600 transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left font-dir">
                            <Brain className="text-[#538270] dark:text-teal-400 flex-shrink-0" size={28} />
                            <div>
                                <h3 className="text-xl font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">{t("lipoedeme.symptoms.psych.title", lang)}</h3>
                                <div className="text-gray-700 dark:text-slate-300 transition-colors">
                                    {renderHighlight(t("lipoedeme.symptoms.psych.desc", lang), t("lipoedeme.symptoms.psych.high", lang))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stages Section */}
            <section className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-[#538270] dark:text-teal-500 text-center mb-16 transition-colors"
                    >
                        {t("lipoedeme.stages.title", lang)}
                    </motion.h2>

                    <div className="space-y-12">
                        {t("lipoedeme.stages.items", lang).map((stage, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="w-full md:w-1/2 h-64 bg-[#538270]/5 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center text-[#538270] dark:text-teal-400 font-bold text-6xl shadow-inner transition-all">
                                    {i + 1}
                                </div>
                                <div className="w-full md:w-1/2 space-y-4 font-dir">
                                    <h3 className="text-2xl font-bold text-[#538270] dark:text-teal-400 transition-colors">{stage.title}</h3>
                                    <p className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed transition-colors">{stage.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Treatments Section */}
            <section className="py-24 px-4 bg-[#F5F1EB] dark:bg-slate-800 transition-colors">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#538270] dark:text-teal-500 mb-4 transition-colors">{t("lipoedeme.treatments.title", lang)}</h2>
                        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
                            {t("lipoedeme.treatments.subtitle", lang)}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
                    >
                        {t("lipoedeme.treatments.conservative", lang).map((treatment, i) => {
                            const Icon = treatmentIcons[i % treatmentIcons.length]
                            return (
                                <motion.div
                                    key={i}
                                    variants={itemVariant}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className={`bg-gradient-to-br ${treatmentColors[i % treatmentColors.length]} p-8 rounded-2xl border-2 border-white dark:border-slate-600 shadow-lg hover:shadow-2xl transition-all duration-300`}
                                >
                                    <div className="mb-4 inline-block p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-inner text-center transition-colors">
                                        <Icon className="text-[#538270] dark:text-teal-400" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#538270] dark:text-teal-400 mb-3 transition-colors">{treatment.title}</h3>
                                    <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base transition-colors">{treatment.desc}</p>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Surgical Treatment Note */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-slate-700 p-6 sm:p-10 rounded-2xl border-2 border-[#538270] dark:border-teal-500 shadow-lg transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left font-dir">
                            <Pill className="text-[#538270] dark:text-teal-500 flex-shrink-0 mt-1" size={32} />
                            <div>
                                <h3 className="text-2xl font-bold text-[#538270] dark:text-teal-500 mb-4 transition-colors">{t("lipoedeme.treatments.surgical.title", lang)}</h3>
                                <div className="text-gray-700 dark:text-slate-200 mb-4 leading-relaxed transition-colors">
                                    {renderDoubleHighlight(
                                        t("lipoedeme.treatments.surgical.p1", lang),
                                        t("lipoedeme.treatments.surgical.p1High1", lang),
                                        t("lipoedeme.treatments.surgical.p1High2", lang)
                                    )}
                                </div>
                                <p className="text-gray-700 dark:text-slate-300 leading-relaxed transition-colors">
                                    {t("lipoedeme.treatments.surgical.p2", lang)}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-[#538270] to-[#3d5f52] dark:from-teal-600 dark:to-teal-800 text-white transition-colors">
                <div className="max-w-4xl mx-auto text-center font-dir">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                    >
                        {t("lipoedeme.cta.title", lang)}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed"
                    >
                        {t("lipoedeme.cta.subtitle", lang)}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white dark:bg-teal-50 text-[#538270] dark:text-slate-900 rounded-xl hover:shadow-xl transition-all font-bold text-lg"
                        >
                            <Link to="/contact">{t("lipoedeme.cta.button1", lang)}</Link>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all font-bold text-lg flex items-center justify-center gap-2 group"
                        >
                            <Link to="/adhesion" className="flex items-center gap-2">
                                {t("lipoedeme.cta.button2", lang)}
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
