import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from "lucide-react"

const VIDEOS = {
    fr: { src: "/videos/presentation-fr.mp4", poster: "/videos/poster-fr.jpg" },
    ar: { src: "/videos/presentation-ar.mp4", poster: "/videos/poster-ar.jpg" },
}

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00"
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
}

export default function VideoShowcase({ lang = "fr" }) {
    const videoRef = useRef(null)
    const hideControlsTimer = useRef(null)
    const [version, setVersion] = useState(lang === "ar" ? "ar" : "fr")
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [controlsVisible, setControlsVisible] = useState(true)

    // Follow the site language when the user switches it
    useEffect(() => {
        setVersion(lang === "ar" ? "ar" : "fr")
    }, [lang])

    // Reset the player when the video version changes
    useEffect(() => {
        setIsPlaying(false)
        setHasStarted(false)
        setCurrentTime(0)
        setDuration(0)
    }, [version])

    useEffect(() => () => clearTimeout(hideControlsTimer.current), [])

    const revealControls = useCallback(() => {
        setControlsVisible(true)
        clearTimeout(hideControlsTimer.current)
        hideControlsTimer.current = setTimeout(() => setControlsVisible(false), 2500)
    }, [])

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return
        if (video.paused) {
            video.play().then(() => {
                setIsPlaying(true)
                setHasStarted(true)
                revealControls()
            }).catch(() => setIsPlaying(false))
        } else {
            video.pause()
            setIsPlaying(false)
            setControlsVisible(true)
            clearTimeout(hideControlsTimer.current)
        }
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (!video) return
        video.muted = !video.muted
        setIsMuted(video.muted)
    }

    const handleSeek = (e) => {
        const video = videoRef.current
        if (!video) return
        const nextTime = Number(e.target.value)
        video.currentTime = nextTime
        setCurrentTime(nextTime)
    }

    const goFullscreen = () => {
        const video = videoRef.current
        if (!video) return
        if (video.requestFullscreen) video.requestFullscreen()
        else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen()
    }

    const isAr = version === "ar"

    const labels = {
        badge: lang === "fr" ? "Vidéo de présentation" : lang === "en" ? "Presentation video" : "فيديو تقديمي",
        title: lang === "fr" ? "Découvrez MOSLIPOD en vidéo" : lang === "en" ? "Discover MOSLIPOD in video" : "اكتشفوا MOSLIPOD بالفيديو",
        subtitle: lang === "fr"
            ? "Notre mission, nos actions et notre engagement pour la reconnaissance du lipœdème — en images."
            : lang === "en"
                ? "Our mission, our actions and our commitment to lipedema recognition — on screen."
                : "مهمتنا وأعمالنا والتزامنا من أجل الاعتراف بالوذمة الشحمية — بالصورة.",
        watchIn: lang === "fr" ? "Choisir la langue de la vidéo" : lang === "en" ? "Choose the video language" : "اختر لغة الفيديو",
    }

    return (
        <section className="py-24 sm:py-32 px-4 bg-gradient-to-b from-white via-[#F5F1EB]/50 to-white relative overflow-hidden transition-colors duration-300">
            {/* Decorative glow orbs */}
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-[#B4C9B3]/25 to-transparent rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
                transition={{ duration: 14, repeat: Infinity }}
                className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] bg-gradient-to-tr from-[#538270]/15 to-transparent rounded-full blur-3xl pointer-events-none"
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B4C9B3]/20 text-[#538270] font-semibold text-sm border border-[#B4C9B3]/40 mb-6">
                        <Film size={15} />
                        {labels.badge}
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#538270] mb-5 transition-colors">
                        {labels.title}
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {labels.subtitle}
                    </p>
                </motion.div>

                {/* Language switch pills */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex justify-center mb-8"
                    role="group"
                    aria-label={labels.watchIn}
                >
                    <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white border border-[#B4C9B3]/50 shadow-md">
                        {[
                            { key: "fr", label: "Français" },
                            { key: "ar", label: "العربية" },
                        ].map((option) => (
                            <button
                                key={option.key}
                                type="button"
                                onClick={() => setVersion(option.key)}
                                className={`relative px-6 py-2.5 rounded-full font-bold text-sm transition-colors duration-300 ${version === option.key ? "text-white" : "text-[#538270] hover:bg-[#F5F1EB]"}`}
                            >
                                {version === option.key && (
                                    <motion.span
                                        layoutId="video-lang-pill"
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#538270] to-[#3d5f52] shadow-lg"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Video player */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Gradient frame glow */}
                    <div className="absolute -inset-1.5 sm:-inset-2 rounded-[2rem] bg-gradient-to-br from-[#B4C9B3] via-[#538270]/60 to-[#B4C9B3] opacity-40 blur-lg" />

                    <div
                        className="relative rounded-[1.75rem] overflow-hidden shadow-2xl bg-black aspect-video group"
                        onMouseMove={revealControls}
                        onTouchStart={revealControls}
                        dir="ltr"
                    >
                        <AnimatePresence mode="wait">
                            <motion.video
                                key={version}
                                ref={videoRef}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full object-cover"
                                src={VIDEOS[version].src}
                                poster={VIDEOS[version].poster}
                                preload="none"
                                playsInline
                                onClick={togglePlay}
                                onLoadedMetadata={(e) => setDuration(e.target.duration || 0)}
                                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime || 0)}
                                onEnded={() => { setIsPlaying(false); setControlsVisible(true) }}
                            />
                        </AnimatePresence>

                        {/* Center play button */}
                        <AnimatePresence>
                            {!isPlaying && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-black/10 to-transparent cursor-pointer"
                                    onClick={togglePlay}
                                >
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.92 }}
                                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/95 text-[#538270] flex items-center justify-center shadow-2xl"
                                        aria-label={lang === "fr" ? "Lire la vidéo" : lang === "en" ? "Play video" : "تشغيل الفيديو"}
                                    >
                                        <motion.span
                                            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2.2, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full border-2 border-white"
                                        />
                                        <Play size={34} className="ml-1.5" fill="currentColor" />
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Bottom control bar */}
                        <AnimatePresence>
                            {hasStarted && (controlsVisible || !isPlaying) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.25 }}
                                    className="absolute bottom-0 inset-x-0 px-4 sm:px-6 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent"
                                >
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 0}
                                        step="0.1"
                                        value={currentTime}
                                        onChange={handleSeek}
                                        className="w-full accent-[#B4C9B3] cursor-pointer"
                                        aria-label="Progress"
                                    />
                                    <div className="flex items-center justify-between mt-1.5">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={togglePlay}
                                                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                                                aria-label={isPlaying ? "Pause" : "Play"}
                                            >
                                                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={toggleMute}
                                                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                                                aria-label={isMuted ? "Unmute" : "Mute"}
                                            >
                                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                            </button>
                                            <span className="text-white/90 text-sm font-medium tabular-nums">
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={goFullscreen}
                                            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                                            aria-label="Fullscreen"
                                        >
                                            <Maximize size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Version badge */}
                        <div className={`absolute top-4 ${isAr ? "right-4" : "left-4"} px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold tracking-wide border border-white/20`}>
                            {isAr ? "النسخة العربية" : "Version française"}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
