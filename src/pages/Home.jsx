import React, { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, ArrowRight, Send, CheckCircle2, AlertCircle, Droplet, Activity, Zap, Heart, Users } from "lucide-react"
import { t } from "../context/translations"
import image1 from "../assets/images/logo1.png"
import image2 from "../assets/images/logo2.png"

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

export default function Home({ lang = "fr" }) {
    const [mounted, setMounted] = useState(false)
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        organisation: "",
        telephone: "",
        countryCode: "+212",
        email: "",
        message: "",
        newsletter: false,
    })

    const { scrollY } = useScroll()
    const videoScale = useTransform(scrollY, [0, 300], [1, 0.95])

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const countryCodes = [
        { code: "+212", country: "Maroc" },
        { code: "+33", country: "France" },
        { code: "+41", country: "Suisse" },
        { code: "+44", country: "UK" },
        { code: "+1", country: "USA" },
    ]

    const symptomsIcons = [AlertCircle, Droplet, Activity, Zap, Heart, Users]

    return (
        <div className="bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
            {/* HERO SECTION - Ultra Creative */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-10 pb-20">
                {/* Animated gradient background */}
                <div className="absolute inset-0 -z-10">
                    <motion.div
                        animate={{
                            background: [
                                "radial-gradient(circle at 20% 50%, rgba(179, 201, 179, 0.1) 0%, transparent 50%)",
                                "radial-gradient(circle at 80% 50%, rgba(83, 130, 112, 0.1) 0%, transparent 50%)",
                                "radial-gradient(circle at 20% 50%, rgba(179, 201, 179, 0.1) 0%, transparent 50%)",
                            ],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute inset-0"
                    />
                </div>

                {/* Floating orbs */}
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#B4C9B3]/15 to-transparent rounded-full blur-3xl -z-10"
                />
                <motion.div
                    animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#538270]/10 to-transparent rounded-full blur-3xl -z-10"
                />

                <div className="max-w-7xl mx-auto px-4 z-10 w-full">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
                    >
                        {/* Left Content */}
                        <motion.div variants={itemVariants} className="flex-1 space-y-8 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-4"
                            >
                                <motion.div
                                    className="inline-block"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="px-4 py-2 rounded-full bg-[#B4C9B3]/20 dark:bg-teal-900/30 text-[#538270] dark:text-teal-400 font-semibold text-sm border border-[#B4C9B3]/40 dark:border-teal-800/50 transition-colors">
                                        {t("home.hero.badge", lang)}
                                    </span>
                                </motion.div>

                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#538270] dark:text-teal-500 leading-tight transition-colors">
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="block"
                                    >
                                        {t("home.hero.title1", lang)}
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="block relative inline-block"
                                    >
                                        {t("home.hero.title2", lang)}
                                        <motion.div
                                            className="absolute -bottom-5 left-0 w-full h-1.5 bg-gradient-to-r from-[#B4C9B3] to-[#538270] dark:from-teal-600 dark:to-teal-400"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: 0.6, duration: 0.8 }}
                                            style={{ originX: 0 }}
                                        />
                                    </motion.span>
                                </h1>
                            </motion.div>

                            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-700 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-colors">
                                {t("home.hero.description", lang)}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/lipoedeme" className="group">
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-gradient-to-r from-[#538270] to-[#3d5f52] dark:from-teal-600 dark:to-teal-800 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg flex items-center gap-3 w-full sm:w-auto justify-center"
                                    >
                                        {t("home.hero.cta1", lang)}
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </Link>
                                <Link to="/about" className="group">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 border-2 border-[#538270] dark:border-teal-500 text-[#538270] dark:text-teal-500 rounded-xl hover:bg-[#F5F1EB] dark:hover:bg-slate-800 transition-all duration-300 font-bold text-lg w-full sm:w-auto"
                                    >
                                        {t("home.hero.cta2", lang)}
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Visual - Text Showcase */}
                        <motion.div variants={itemVariants} className="flex-1 flex items-center justify-center relative">
                            <motion.div
                                className="relative w-full aspect-square flex items-center justify-center p-8"
                            >
                                {/* Animated circle background */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-2 border-[#B4C9B3]/30"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-4 rounded-full border-2 border-[#538270]/20"
                                />

                                {/* Text */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative z-10 text-center"
                                >
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#538270] dark:text-teal-500 leading-tight">
                                        The Moroccan Society of Lipoedema and Associated Pathologies
                                    </h2>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* WHAT IS LIPEDEMA SECTION - Interactive Cards */}
            <section className="py-32 px-4 bg-gradient-to-b from-white via-[#F5F1EB]/40 to-white dark:from-slate-900 dark:via-slate-800/40 dark:to-slate-900 relative transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#538270] dark:text-teal-500 mb-6 transition-colors">{t("home.whatIs.title", lang)}</h2>
                        <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed transition-colors">
                            {t("home.whatIs.subtitle", lang)}
                        </p>
                    </motion.div>

                    {/* Key Characteristics Grid (Symptoms) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                    >
                        {t("lipoedeme.symptoms.items", lang).map((symptom, i) => {
                            const Icon = symptomsIcons[i % symptomsIcons.length]
                            return (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
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

                    {/* Description & CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#F5F1EB] dark:from-slate-800 dark:to-slate-900 rounded-2xl p-12 border border-[#B4C9B3]/40 dark:border-slate-700/50 text-center transition-colors shadow-xl"
                    >
                        <p className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed mb-8 transition-colors">
                            {t("home.whatIs.description", lang)}
                        </p>
                        <Link to="/lipoedeme" className="inline-block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-[#538270] dark:bg-teal-600 text-white rounded-xl font-bold text-lg flex items-center gap-2 group transition-colors"
                            >
                                {t("home.whatIs.cta", lang)}
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* WHO ARE WE SECTION - Modern Layout */}
            <section className="py-32 px-4 bg-[#538270] dark:bg-slate-800 text-white relative overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{lang === "fr" ? "Qui sommes-nous ?" : lang === "en" ? "Who are we?" : "من نحن؟"}</h2>
                        <p className="text-xl text-white/90 dark:text-slate-300 max-w-2xl mx-auto transition-colors">
                            {lang === "fr" ? "Créée en 2025 à Casablanca, fondée par le Dr Fahd Benslimane" : lang === "en" ? "Created in 2025 in Casablanca, founded by Dr. Fahd Benslimane" : "تأسست في 2025 بالدار البيضاء، من قبل الدكتور فهد بنسليمان"}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-16 items-center"
                    >
                        <motion.div variants={itemVariants} className="space-y-8">
                            <p className="text-xl text-white/90 leading-relaxed">
                                {lang === "fr"
                                    ? "La Société Marocaine du Lipœdème et des Pathologies Associées est une association médicale à but non lucratif dédiée à la reconnaissance du lipœdème, à la formation des professionnels de santé et à l'amélioration de la prise en charge."
                                    : lang === "en"
                                        ? "The Moroccan Society of Lipedema and Associated Pathologies is a non-profit medical association dedicated to the recognition of lipedema, the training of healthcare professionals and the improvement of care."
                                        : "الجمعية المغربية للوذمة الشحمية والأمراض المرتبطة بها هي جمعية طبية غير ربحية مكرسة للتعريف بالوذمة الشحمية، وتدريب المهنيين الصحيين وتحسين التكفل بالمرضى."
                                }
                            </p>

                            <div className="space-y-4">
                                {[
                                    lang === "fr" ? "Approche multidisciplinaire intégrée" : lang === "en" ? "Integrated multidisciplinary approach" : "نهج متكامل متعدد التخصصات",
                                    lang === "fr" ? "Experts de différentes spécialités médicales" : lang === "en" ? "Experts from different medical specialties" : "خبراء من تخصصات طبية مختلفة",
                                    lang === "fr" ? "Standards scientifiques internationaux" : lang === "en" ? "International scientific standards" : "معايير علمية دولية",
                                    lang === "fr" ? "Dynamique de plaidoyer et formation continue" : lang === "en" ? "Advocacy and continuous training dynamics" : "ديناميكية المرافعة والتكوين المستمر",
                                ].map((text, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                                    >
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.5 }}>
                                            <CheckCircle2 size={24} className="text-[#B4C9B3] flex-shrink-0 mt-1" />
                                        </motion.div>
                                        <span className="text-white/90 font-medium">{text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <Link to="/about" className="inline-block pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#B4C9B3] text-[#538270] rounded-xl font-bold text-lg flex items-center gap-2 group hover:bg-white transition-all duration-300"
                                >
                                    {lang === "fr" ? "Découvrir les membres du bureau" : lang === "en" ? "Discover Our Team" : "اكتشف فريقنا"}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="relative h-80 sm:h-[500px] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20"
                        >
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-full h-full flex items-center justify-center p-10"
                            >
                                <img src={image1} alt="MOSLIPO" className="w-full h-full object-contain" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* LATEST NEWS SECTION */}
            <section className="py-32 px-4 bg-gradient-to-b from-white to-[#F5F1EB]/50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#538270] dark:text-teal-500 mb-6 transition-colors">{t("nav.news", lang)}</h2>
                        <p className="text-xl text-gray-600 dark:text-slate-400 transition-colors">{lang === "fr" ? "Restez informés des événements et actualités de MOSLIPO" : lang === "en" ? "Stay informed about MOSLIPO events and news" : "ابقوا على اطلاع بأحداث وأخبار MOSLIPO"}</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8 mb-12"
                    >
                        {[
                            {
                                title: lang === "fr" ? "Lancement officiel de MOSLIPO" : lang === "en" ? "Official launch of MOSLIPO" : "الإطلاق الرسمي لـ MOSLIPO",
                                date: lang === "fr" ? "Janvier 2025" : lang === "en" ? "January 2025" : "يناير 2025",
                                excerpt: lang === "fr" ? "La Société Marocaine du Lipœdème annonce officiellement son lancement et ses objectifs ambitieux pour 2025." : lang === "en" ? "The Moroccan Lipedema Society officially announces its launch and ambitious goals for 2025." : "تعلن الجمعية المغربية للوذمة الشحمية رسمياً عن إطلاقها وأهدافها الطموحة لعام 2025.",
                                color: "from-[#538270] to-[#3d5f52]",
                            },
                            {
                                title: lang === "fr" ? "Formation médicale continue" : lang === "en" ? "Continuing medical education" : "التكوين الطبي المستمر",
                                date: lang === "fr" ? "À venir" : lang === "en" ? "Upcoming" : "قريباً",
                                excerpt: lang === "fr" ? "Programme de formation destiné aux professionnels de santé sur la prise en charge du lipœdème." : lang === "en" ? "Training program for healthcare professionals on lipedema management." : "برنامج تدريبي للأطر الصحية حول التكفل بالوذمة الشحمية.",
                                color: "from-[#B4C9B3] to-[#88a89c]",
                            },
                        ].map((article, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -12, boxShadow: "0 30px 60px rgba(83, 130, 112, 0.2)" }}
                                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer"
                            >
                                {/* Gradient background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${article.color}`} />

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                                    <div>
                                        <span className="text-sm font-bold uppercase text-white/80 tracking-wide">{article.date}</span>
                                        <h3 className="text-2xl font-bold mt-4 group-hover:text-[#B4C9B3] transition-colors">
                                            {article.title}
                                        </h3>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-white/90"
                                    >
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                        <span className="font-semibold">{lang === "fr" ? "Lire plus" : lang === "en" ? "Read more" : "اقرأ ألمزيد"}</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                    >
                        <Link to="/news" className="inline-block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-[#538270] dark:border-teal-500 text-[#538270] dark:text-teal-500 rounded-xl hover:bg-[#F5F1EB] dark:hover:bg-slate-800 transition-all font-bold text-lg flex items-center gap-2 group"
                            >
                                {lang === "fr" ? "Voir toutes les actualités" : lang === "en" ? "View all news" : "مشاهدة جميع الأخبار"}
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="py-32 px-4 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-20"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#538270] dark:text-teal-500 mb-6 transition-colors">{t("nav.contact", lang)}</h2>
                        <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
                            {lang === "fr" ? "Une question ? Remplissez le formulaire ou contactez-nous directement" : lang === "en" ? "A question? Fill out the form or contact us directly" : "لديك سؤال؟ املأ النموذج أو اتصل بنا مباشرة"}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-3 gap-12"
                    >
                        {/* Contact Info */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            {[
                                {
                                    icon: MapPin,
                                    title: lang === "fr" ? "Adresse" : lang === "en" ? "Address" : "العنوان",
                                    content: t("footer.address", lang),
                                },
                                {
                                    icon: Mail,
                                    title: "Email",
                                    content: t("footer.email", lang),
                                },
                                {
                                    icon: Phone,
                                    title: lang === "fr" ? "Téléphone" : lang === "en" ? "Phone" : "الهاتف",
                                    content: t("footer.phone", lang),
                                },
                            ].map((item, i) => (
                                <motion.div key={i} variants={itemVariants} whileHover={{ x: 10 }} className="flex gap-4 group">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#B4C9B3] to-[#538270] dark:from-teal-400 dark:to-teal-600 flex items-center justify-center group-hover:shadow-lg transition-all"
                                    >
                                        <item.icon size={24} className="text-white" />
                                    </motion.div>
                                    <div>
                                        <h4 className="font-bold text-[#538270] dark:text-teal-400 mb-1 transition-colors">{item.title}</h4>
                                        <p className="text-gray-600 dark:text-slate-400 whitespace-pre-line text-sm transition-colors">{item.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Contact Form */}
                        <motion.form
                            variants={itemVariants}
                            onSubmit={handleSubmit}
                            className="lg:col-span-2 space-y-6 bg-gradient-to-br from-[#F5F1EB] to-white dark:from-slate-800 dark:to-slate-900 p-10 rounded-2xl border border-[#B4C9B3]/40 dark:border-slate-700/50 transition-colors shadow-2xl"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">{lang === "fr" ? "Prénom *" : lang === "en" ? "First Name *" : "الاسم الشخصي *"}</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-[#B4C9B3]/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#538270] focus:border-transparent transition-all bg-white dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">{lang === "fr" ? "Nom *" : lang === "en" ? "Last Name *" : "الاسم العائلي *"}</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-[#B4C9B3]/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#538270] focus:border-transparent transition-all bg-white dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">Organisation</label>
                                <input
                                    type="text"
                                    name="organisation"
                                    value={formData.organisation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-[#B4C9B3]/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#538270] focus:border-transparent transition-all bg-white dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">{lang === "fr" ? "Indicatif Pays *" : lang === "en" ? "Country Code *" : "رمز الدولة *"}</label>
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-[#B4C9B3]/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#538270] focus:border-transparent transition-all bg-white dark:bg-slate-800 dark:text-white"
                                    >
                                        {countryCodes.map((item) => (
                                            <option key={item.code} value={item.code}>
                                                {item.code} {item.country}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">{lang === "fr" ? "Téléphone *" : lang === "en" ? "Phone *" : "الهاتف *"}</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-[#B4C9B3]/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#538270] focus:border-transparent transition-all bg-white dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-[#B4C9B3]/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#538270] focus:border-transparent transition-all bg-white dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#538270] dark:text-teal-400 mb-2 transition-colors">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-[#B4C9B3]/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#538270] focus:border-transparent transition-all bg-white dark:bg-slate-800 dark:text-white resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    name="newsletter"
                                    checked={formData.newsletter}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-[#B4C9B3] dark:border-slate-600 text-[#538270] dark:text-teal-500 focus:ring-[#538270]"
                                />
                                <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-slate-300 transition-colors">
                                    {lang === "fr" ? "J'accepte de recevoir la Newsletter de l'association" : lang === "en" ? "I agree to receive the association's newsletter" : "أوافق على تلقي النشرة الإخبارية للجمعية"}
                                </label>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full px-8 py-4 bg-gradient-to-r from-[#538270] to-[#3d5f52] dark:from-teal-600 dark:to-teal-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 group hover:shadow-xl transition-all duration-300 mt-6"
                            >
                                {lang === "fr" ? "Envoyer le Message" : lang === "en" ? "Send Message" : "إرسال الرسالة"}
                                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
