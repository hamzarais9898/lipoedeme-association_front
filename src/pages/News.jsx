import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink, Mic2, Newspaper, Radio, Volume2 } from "lucide-react"
import { t } from "../context/translations"
import SEO from "../components/SEO"

export default function News({ lang = "fr" }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isRTL = lang === "ar"
    const ArrowForwardIcon = isRTL ? ArrowLeft : ArrowRight

    const coverage = [
        {
            source: "LE TEMPS MAGAZINE",
            date: {
                fr: "17 Fevrier 2026",
                en: "February 17, 2026",
                ar: "17 فبراير 2026",
            },
            title: {
                fr: "Demarrage de la Societe Marocaine du Lipœdeme et des Pathologies Associees",
                en: "Launch of the Moroccan Society of Lipedema and Associated Pathologies",
                ar: "انطلاق الجمعية المغربية للوذمة الشحمية والامراض المصاحبة",
            },
            url: "https://letempsmag.ma/?p=42539",
            accent: "#1D3557",
        },
        {
            source: "LALLA FATEMA",
            date: {
                fr: "18 Fevrier 2026",
                en: "February 18, 2026",
                ar: "18 فبراير 2026",
            },
            title: {
                fr: "Association marocaine: le lipœdeme au coeur du debat de sante",
                en: "Moroccan association puts lipedema at the center of the health debate",
                ar: "جمعية مغربية تضع الوذمة الشحمية في قلب النقاش الصحي",
            },
            url: "https://lallafatema.ma/%D8%AC%D9%85%D8%B9%D9%8A%D8%A9-%D9%85%D8%BA%D8%B1%D8%A8%D9%8A%D8%A9-%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9-%D8%AA%D8%B6%D8%B9-%D8%A7%D9%84%D9%88%D8%B0%D9%85%D8%A9-%D8%A7%D9%84%D8%B4%D8%AD%D9%85%D9%8A%D8%A9",
            accent: "#A03D6D",
        },
        {
            source: "AUJOURD'HUI LE MAROC",
            date: {
                fr: "20 Fevrier 2026",
                en: "February 20, 2026",
                ar: "20 فبراير 2026",
            },
            title: {
                fr: "Creation de MOSLIPOD: une avancee majeure pour la reconnaissance du lipœdeme au Maroc",
                en: "Creation of MOSLIPOD: a major milestone for lipedema recognition in Morocco",
                ar: "تاسيس MOSLIPOD خطوة مهمة نحو الاعتراف بالوذمة الشحمية في المغرب",
            },
            url: "https://aujourdhui.ma/lifestyle/creation-de-moslipod-une-avancee-majeure-pour-la-reconnaissance-du-lipoedeme-au-maroc#google_vignette",
            accent: "#2C6E91",
        },
        {
            source: "LE MATIN",
            date: {
                fr: "22 Fevrier 2026",
                en: "February 22, 2026",
                ar: "22 فبراير 2026",
            },
            title: {
                fr: "Lipœdeme: une association voit le jour pour briser le silence autour d'une maladie meconnue",
                en: "Lipedema: a new association is born to break the silence around an underrecognized disease",
                ar: "الوذمة الشحمية جمعية جديدة لكسر الصمت حول مرض غير معروف",
            },
            url: "https://lematin.ma/societe/lipdeme-la-creation-de-moslipod-pour-briser-le-silence/331201",
            accent: "#264653",
        },
        {
            source: "2M.MA",
            date: {
                fr: "24 Fevrier 2026",
                en: "February 24, 2026",
                ar: "24 فبراير 2026",
            },
            title: {
                fr: "Lipœdeme: le Maroc se dote d'une association scientifique pour mieux reconnaitre cette maladie meconnue",
                en: "Lipedema: Morocco launches a scientific society to improve recognition of this little-known condition",
                ar: "الوذمة الشحمية المغرب يطلق جمعية علمية لتعزيز التعرف على هذا المرض",
            },
            url: "https://2m.ma//fr/news/Lip%C5%93d%C3%A8me-le-Maroc-se-dote-d-une-association-scientifique-pour-20260224",
            accent: "#457B9D",
        },
    ]

    return (
        <div className="min-h-screen bg-white transition-colors duration-300 overflow-hidden relative">
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

            <section className="relative pt-10 pb-20 px-4 bg-gradient-to-br from-[#F5F1EB] via-white to-[#F5F1EB] transition-colors">
                <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-5xl mx-auto text-center mb-12 sm:mb-16 font-dir"
                >
                    <motion.div
                        animate={{ y: [0, 24, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute -top-12 -right-28 w-[320px] h-[320px] bg-[#538270] rounded-full opacity-15 blur-3xl pointer-events-none"
                    />

                    <motion.div
                        animate={{ y: [20, 0, 20] }}
                        transition={{ duration: 9, repeat: Infinity }}
                        className="absolute -bottom-20 -left-20 w-[260px] h-[260px] bg-[#B4C9B3] rounded-full opacity-10 blur-3xl pointer-events-none"
                    />

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
                        <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#B4C9B3]/20 text-[#538270] rounded-full text-sm font-semibold">
                            <Volume2 size={15} />
                            {lang === "fr" ? "Dossier Special" : lang === "en" ? "Special Coverage" : "تغطية خاصة"}
                        </span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-7xl font-bold text-[#538270] mb-6 leading-tight">
                        {lang === "fr" ? "MOSLIPOD Sous Les Projecteurs" : lang === "en" ? "MOSLIPOD In The Spotlight" : "MOSLIPOD تحت الاضواء"}
                    </h1>

                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        {lang === "fr"
                            ? "De la presse ecrite aux ondes radio, le lancement de MOSLIPOD a provoque une vraie conversation nationale autour du lipœdeme."
                            : lang === "en"
                                ? "From print media to radio waves, MOSLIPOD's launch sparked a real national conversation around lipedema."
                                : "من الصحافة المكتوبة الى الاذاعة، اطلاق MOSLIPOD اثار نقاشا وطنيا حقيقيا حول الوذمة الشحمية."}
                    </p>
                </motion.div>
                </div>
            </section>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-20">

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-11 h-11 rounded-xl bg-[#2F6B57] text-white flex items-center justify-center shadow-md">
                            <Newspaper size={20} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f4f41] font-dir tracking-tight">
                            {lang === "fr" ? "Presse Ecrite & Web" : lang === "en" ? "Print & Web Press" : "الصحافة المكتوبة والويب"}
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {coverage.map((item, idx) => (
                            <motion.article
                                key={item.source}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -8, boxShadow: "0 22px 40px rgba(26, 49, 39, 0.18)" }}
                                className="rounded-2xl border border-[#d0d5c4] bg-[#fefdf9] shadow-md overflow-hidden"
                            >
                                <div className="h-1.5" style={{ backgroundColor: item.accent }} />

                                <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3">
                                    <span className="inline-flex items-center gap-1.5 text-[#1f4f41] text-xs font-extrabold uppercase tracking-wider">
                                        <Newspaper size={13} />
                                        {item.source}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs text-[#64736b] font-semibold whitespace-nowrap">
                                        <CalendarDays size={13} />
                                        {item.date[lang] || item.date.fr}
                                    </span>
                                </div>

                                <div className="px-5 pb-4 min-h-[120px]">
                                    <h3 className="text-[15px] sm:text-base font-bold text-[#1f2622] leading-snug">
                                        {item.title[lang] || item.title.fr}
                                    </h3>
                                </div>

                                <div className="px-5 pb-5">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[#2F6B57] font-semibold text-sm hover:text-[#1f4f41] transition-colors"
                                    >
                                        {lang === "fr" ? "Lire l'article" : lang === "en" ? "Read Article" : "اقرا المقال"}
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-11 h-11 rounded-xl bg-[#204b3c] text-white flex items-center justify-center shadow-md">
                            <Radio size={20} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f4f41] font-dir tracking-tight">
                            {lang === "fr" ? "Radio & Podcasts" : lang === "en" ? "Radio & Podcasts" : "الاذاعة والبودكاست"}
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        <article className="rounded-2xl border border-[#d0d5c4] bg-[#fefdf9] shadow-md p-6">
                            <div className="flex items-center justify-between mb-4 gap-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#2D728F] to-[#3B8EA5] text-white text-xs font-bold uppercase tracking-wider">
                                    <Radio size={13} />
                                    Lux Radio
                                </span>
                                <span className="text-xs text-[#64736b] font-semibold">
                                    {lang === "fr" ? "18 Fevrier 2026" : lang === "en" ? "February 18, 2026" : "18 فبراير 2026"}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-[#1f2622] mb-2 leading-snug">
                                {lang === "fr" ? "Creation au Maroc d'une societe dediee au lipœdeme" : lang === "en" ? "Creation in Morocco of a society dedicated to lipedema" : "تاسيس جمعية متخصصة في الوذمة الشحمية بالمغرب"}
                            </h3>
                            <p className="text-sm text-[#4f5c55] mb-5 leading-relaxed">
                                {lang === "fr"
                                    ? "Une intervention axee sur la naissance de MOSLIPOD, les enjeux de diagnostic precoce et l'importance d'une prise en charge multidisciplinaire."
                                    : lang === "en"
                                        ? "An interview focused on MOSLIPOD's launch, early diagnosis challenges, and the need for multidisciplinary care."
                                        : "مداخلة ركزت على انطلاق MOSLIPOD، تحديات التشخيص المبكر، واهمية الرعاية متعددة التخصصات."}
                            </p>

                            <a
                                href="https://open.luxeradio.ma/show/track/b0114171a30638cfa7bbbd0e0a17c16b?audio=creation-au-maroc-dune-societe-dediee-au-lipoedeme"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2F6B57] text-white font-semibold text-sm hover:bg-[#204b3c] transition-colors"
                            >
                                {lang === "fr" ? "Ecouter l'emission" : lang === "en" ? "Listen To The Show" : "استمع الى الحلقة"}
                                <ArrowForwardIcon size={14} />
                            </a>
                        </article>

                        <article className="rounded-2xl bg-gradient-to-br from-[#1f4f41] to-[#2F6B57] shadow-xl p-6 text-white border border-[#345a4d]">
                            <div className="flex items-center justify-between mb-4 gap-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                                    <Mic2 size={13} />
                                    RADIO ASWAT
                                </span>
                                <span className="text-xs text-white/80 font-medium">
                                    {lang === "fr" ? "Extrait audio" : lang === "en" ? "Audio Excerpt" : "مقتطف صوتي"}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold mb-2 leading-snug">
                                {lang === "fr" ? "Interview radio - Radio ASWAT" : lang === "en" ? "Radio Interview - Radio ASWAT" : "مقابلة اذاعية - راديو اصوات"}
                            </h3>
                            <p className="text-sm text-white/90 mb-5 leading-relaxed">
                                {lang === "fr"
                                    ? "Ecoutez l'extrait de notre intervention sur Radio ASWAT, disponible directement depuis cette page."
                                    : lang === "en"
                                        ? "Listen to the excerpt from our Radio ASWAT intervention directly from this page."
                                        : "استمع الى مقتطف مداخلتنا على راديو اصوات مباشرة من هذه الصفحة."}
                            </p>

                            <audio controls className="w-full rounded-lg">
                                <source src="/media/hdit-04-03-2026.mpeg" type="audio/mpeg" />
                                {lang === "fr" ? "Votre navigateur ne supporte pas la lecture audio." : lang === "en" ? "Your browser does not support audio playback." : "متصفحكم لا يدعم تشغيل الصوت."}
                            </audio>
                        </article>
                    </div>
                </motion.section>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    className="text-center text-[#3f4d47] bg-[#f0ece1] border border-[#d6d8c8] rounded-2xl px-5 py-4 font-medium max-w-4xl mx-auto font-dir"
                >
                    {lang === "fr"
                        ? "Cette section sera enrichie en continu avec les prochaines parutions, interviews et analyses autour du lipœdeme."
                        : lang === "en"
                            ? "This section will be updated continuously with upcoming publications, interviews, and analysis around lipedema."
                            : "سيتم تحديث هذه الصفحة باستمرار باحدث المقالات والمقابلات والتحليلات حول الوذمة الشحمية."}
                </motion.p>
            </div>
        </div>
    )
}
