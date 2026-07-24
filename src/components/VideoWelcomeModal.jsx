import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, X, Film } from "lucide-react"

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

export default function VideoWelcomeModal({ lang = "fr" }) {
    const videoRef = useRef(null)
    const hideControlsTimer = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [version, setVersion] = useState(lang === "ar" ? "ar" : "fr")
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [isBuffering, setIsBuffering] = useState(false)
    const [controlsVisible, setControlsVisible] = useState(true)

    // Open on every arrival on the site, shortly after load
    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 700)
        return () => clearTimeout(timer)
    }, [])

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
        setIsBuffering(false)
    }, [version])

    // Lock body scroll + close on Escape while open
    useEffect(() => {
        if (!isOpen) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        const onKeyDown = (e) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        window.addEventListener("keydown", onKeyDown)
        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [isOpen])

    useEffect(() => () => clearTimeout(hideControlsTimer.current), [])

    const close = useCallback(() => {
        videoRef.current?.pause()
        setIsPlaying(false)
        setIsOpen(false)
    }, [])

    const revealControls = useCallback(() => {
        setControlsVisible(true)
        clearTimeout(hideControlsTimer.current)
        hideControlsTimer.current = setTimeout(() => setControlsVisible(false), 2500)
    }, [])

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return
        if (video.paused) {
            setIsBuffering(true)
            video.play().then(() => {
                setIsPlaying(true)
                setHasStarted(true)
                revealControls()
            }).catch(() => {
                setIsPlaying(false)
                setIsBuffering(false)
            })
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
        close: lang === "fr" ? "Fermer" : lang === "en" ? "Close" : "إغلاق",
        watchIn: lang === "fr" ? "Choisir la langue de la vidéo" : lang === "en" ? "Choose the video language" : "اختر لغة الفيديو",
        loading: lang === "fr" ? "Chargement de la vidéo…" : lang === "en" ? "Loading video…" : "جارٍ تحميل الفيديو…",
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={labels.title}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="relative w-full max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Gradient frame glow */}
                        <div className="absolute -inset-1.5 sm:-inset-2 rounded-[2rem] bg-gradient-to-br from-[#B4C9B3] via-[#538270]/60 to-[#B4C9B3] opacity-40 blur-lg pointer-events-none" />

                        <div className="relative rounded-[1.75rem] overflow-hidden bg-white shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[#B4C9B3]/30 bg-gradient-to-r from-white to-[#F5F1EB]/60">
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B4C9B3]/20 text-[#538270] font-semibold text-xs border border-[#B4C9B3]/40 flex-shrink-0">
                                        <Film size={13} />
                                        {labels.badge}
                                    </span>
                                    <h2 className="text-base sm:text-lg font-bold text-[#538270] truncate">
                                        {labels.title}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                    {/* Language switch pills */}
                                    <div
                                        className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-[#B4C9B3]/50 shadow-sm"
                                        role="group"
                                        aria-label={labels.watchIn}
                                    >
                                        {[
                                            { key: "fr", label: "Français" },
                                            { key: "ar", label: "العربية" },
                                        ].map((option) => (
                                            <button
                                                key={option.key}
                                                type="button"
                                                onClick={() => setVersion(option.key)}
                                                className={`relative px-3.5 sm:px-5 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-colors duration-300 ${version === option.key ? "text-white" : "text-[#538270] hover:bg-[#F5F1EB]"}`}
                                            >
                                                {version === option.key && (
                                                    <motion.span
                                                        layoutId="welcome-video-lang-pill"
                                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#538270] to-[#3d5f52] shadow-md"
                                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                                    />
                                                )}
                                                <span className="relative z-10">{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={close}
                                        className="w-9 h-9 rounded-full bg-[#F5F1EB] hover:bg-[#538270] text-[#538270] hover:text-white flex items-center justify-center transition-colors"
                                        aria-label={labels.close}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Video player */}
                            <div
                                className="relative bg-black aspect-video group"
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
                                        preload="metadata"
                                        playsInline
                                        onClick={togglePlay}
                                        onLoadedMetadata={(e) => setDuration(e.target.duration || 0)}
                                        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime || 0)}
                                        onWaiting={() => setIsBuffering(true)}
                                        onPlaying={() => setIsBuffering(false)}
                                        onCanPlay={() => setIsBuffering(false)}
                                        onEnded={() => { setIsPlaying(false); setControlsVisible(true) }}
                                    />
                                </AnimatePresence>

                                {/* Buffering spinner */}
                                <AnimatePresence>
                                    {isBuffering && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/50 pointer-events-none"
                                        >
                                            <div className="relative w-14 h-14">
                                                <div className="absolute inset-0 rounded-full border-4 border-white/25" />
                                                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#B4C9B3] animate-spin" />
                                            </div>
                                            <span className="text-white/90 text-sm font-semibold tracking-wide">
                                                {labels.loading}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Center play button */}
                                <AnimatePresence>
                                    {!isPlaying && !isBuffering && (
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
                                                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#538270] flex items-center justify-center shadow-2xl"
                                                aria-label={lang === "fr" ? "Lire la vidéo" : lang === "en" ? "Play video" : "تشغيل الفيديو"}
                                            >
                                                <motion.span
                                                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                                                    transition={{ duration: 2.2, repeat: Infinity }}
                                                    className="absolute inset-0 rounded-full border-2 border-white"
                                                />
                                                <Play size={30} className="ml-1.5" fill="currentColor" />
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
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
