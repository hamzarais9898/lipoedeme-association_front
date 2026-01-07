import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { t } from "../context/translations"

export default function Contact({ lang = "fr" }) {
    const [mounted, setMounted] = useState(false)
    const [status, setStatus] = useState("idle") // "idle", "loading", "success", "error"
    const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        organisation: "",
        subject: "",
        message: "",
        website: "" // Honeypot
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Prevent submissions if honeypot is filled
        if (formData.website) {
            console.log("Honeypot caught a bot!")
            return
        }

        setStatus("loading")
        setErrorMessage("")

        try {
            const response = await fetch("https://backend-association-medical.vercel.app/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus("success")
                setFormData({
                    prenom: "",
                    nom: "",
                    email: "",
                    telephone: "",
                    organisation: "",
                    subject: "",
                    message: "",
                    website: ""
                })
            } else {
                setStatus("error")
                setErrorMessage(data.error || (lang === 'ar' ? 'حدث خطأ ما.' : 'Une erreur est survenue.'))
            }
        } catch (error) {
            console.error("Submission error:", error)
            setStatus("error")
            setErrorMessage(lang === 'ar' ? 'تعذر الاتصال بالخادم.' : 'Impossible de contacter le serveur.')
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden text-start">
            {/* Hero Section */}
            <section className="relative pt-10 pb-20 px-4 bg-gradient-to-br from-[#F5F1EB] via-white to-[#F5F1EB] dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors">
                <div className="absolute inset-0 z-0 pointer-events-none text-start">
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
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
                        <span className="px-4 py-2 bg-[#B4C9B3]/20 dark:bg-teal-900/30 text-[#538270] dark:text-teal-400 rounded-full text-sm font-semibold transition-colors">
                            {t("contactPage.hero.badge", lang)}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-bold text-[#538270] dark:text-teal-500 mb-6 leading-tight transition-colors"
                    >
                        {t("contactPage.hero.title", lang)}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed transition-colors"
                    >
                        {t("contactPage.hero.subtitle", lang)}
                    </motion.p>
                </div>
            </section>

            {/* Contact Details & Form */}
            <section className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Info Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-dir text-start"
                        >
                            <h2 className="text-3xl font-bold text-[#538270] dark:text-teal-500 mb-8 transition-colors">{t("contactPage.info.title", lang)}</h2>
                            <p className="text-lg text-gray-600 dark:text-slate-300 mb-12 transition-colors">{t("contactPage.info.subtitle", lang)}</p>

                            <div className="space-y-8">
                                {[
                                    { icon: MapPin, title: t("contactPage.info.addressTitle", lang), desc: t("footer.address", lang) },
                                    { icon: Phone, title: t("contactPage.info.phoneTitle", lang), desc: t("footer.phone", lang) },
                                    { icon: Mail, title: t("contactPage.info.emailTitle", lang), desc: t("footer.email", lang) }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-14 h-14 bg-[#B4C9B3]/20 dark:bg-teal-900/40 rounded-2xl flex items-center justify-center text-[#538270] dark:text-teal-400 group-hover:bg-[#538270] group-hover:text-white transition-all duration-300 shadow-sm">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#538270] dark:text-teal-500 transition-colors">{item.title}</h3>
                                            <p className="text-gray-600 dark:text-slate-400 transition-colors">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#F5F1EB] dark:bg-slate-800 p-8 sm:p-12 rounded-3xl shadow-xl border border-[#B4C9B3]/30 dark:border-slate-700 transition-colors font-dir"
                        >
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-[#538270] dark:bg-teal-600 text-white rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#538270] dark:text-teal-400 mb-2">Message Envoyé !</h3>
                                    <p className="text-gray-600 dark:text-slate-300">{t("contactPage.form.success", lang)}</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-8 text-[#538270] dark:text-teal-400 font-bold hover:underline"
                                    >
                                        {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Envoyer un autre message'}
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Honeypot */}
                                    <div className="hidden" aria-hidden="true">
                                        <input
                                            type="text"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            tabIndex="-1"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2 text-start">
                                            <label className="text-sm font-bold text-[#538270] dark:text-teal-500 uppercase tracking-wider transition-colors">{t("contactPage.form.firstName", lang)}</label>
                                            <input
                                                required
                                                type="text"
                                                name="prenom"
                                                value={formData.prenom}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-white dark:bg-slate-700 rounded-xl border border-[#B4C9B3]/30 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#538270] dark:focus:ring-teal-500 transition-all dark:text-white"
                                                placeholder={t("contactPage.form.firstName", lang)}
                                            />
                                        </div>
                                        <div className="space-y-2 text-start">
                                            <label className="text-sm font-bold text-[#538270] dark:text-teal-500 uppercase tracking-wider transition-colors">{t("contactPage.form.lastName", lang)}</label>
                                            <input
                                                required
                                                type="text"
                                                name="nom"
                                                value={formData.nom}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-white dark:bg-slate-700 rounded-xl border border-[#B4C9B3]/30 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#538270] dark:focus:ring-teal-500 transition-all dark:text-white"
                                                placeholder={t("contactPage.form.lastName", lang)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2 text-start">
                                            <label className="text-sm font-bold text-[#538270] dark:text-teal-500 uppercase tracking-wider transition-colors">{t("contactPage.form.email", lang)}</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-white dark:bg-slate-700 rounded-xl border border-[#B4C9B3]/30 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#538270] dark:focus:ring-teal-500 transition-all dark:text-white"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2 text-start">
                                            <label className="text-sm font-bold text-[#538270] dark:text-teal-500 uppercase tracking-wider transition-colors">{t("contactPage.form.phone", lang)}</label>
                                            <input
                                                required
                                                type="tel"
                                                name="telephone"
                                                value={formData.telephone}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-white dark:bg-slate-700 rounded-xl border border-[#B4C9B3]/30 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#538270] dark:focus:ring-teal-500 transition-all dark:text-white"
                                                placeholder="+212 ..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-start">
                                        <label className="text-sm font-bold text-[#538270] dark:text-teal-500 uppercase tracking-wider transition-colors">{t("contactPage.form.organisation", lang)}</label>
                                        <input
                                            type="text"
                                            name="organisation"
                                            value={formData.organisation}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white dark:bg-slate-700 rounded-xl border border-[#B4C9B3]/30 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#538270] dark:focus:ring-teal-500 transition-all dark:text-white"
                                            placeholder={t("contactPage.form.organisation", lang)}
                                        />
                                    </div>

                                    <div className="space-y-2 text-start">
                                        <label className="text-sm font-bold text-[#538270] dark:text-teal-500 uppercase tracking-wider transition-colors">{t("contactPage.form.subject", lang)}</label>
                                        <input
                                            required
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white dark:bg-slate-700 rounded-xl border border-[#B4C9B3]/30 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#538270] dark:focus:ring-teal-500 transition-all dark:text-white"
                                            placeholder={t("contactPage.form.subject", lang)}
                                        />
                                    </div>

                                    <div className="space-y-2 text-start">
                                        <label className="text-sm font-bold text-[#538270] dark:text-teal-500 uppercase tracking-wider transition-colors">{t("contactPage.form.message", lang)}</label>
                                        <textarea
                                            required
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white dark:bg-slate-700 rounded-xl border border-[#B4C9B3]/30 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#538270] dark:focus:ring-teal-500 transition-all dark:text-white"
                                            placeholder={t("contactPage.form.message", lang)}
                                        ></textarea>
                                    </div>

                                    {status === "error" && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm font-dir animate-shake">
                                            <AlertCircle size={16} />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                                        whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                                        type="submit"
                                        disabled={status === "loading"}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 group ${status === "loading"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#538270] dark:bg-teal-600 text-white hover:shadow-2xl"
                                            }`}
                                    >
                                        {status === "loading" ? t("contactPage.form.sending", lang) : t("contactPage.form.send", lang)}
                                        {status !== "loading" && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
