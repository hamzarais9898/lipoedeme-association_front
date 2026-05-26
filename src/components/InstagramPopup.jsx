import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/association.lipoedeme.maroc?utm_source=qr';
const BANNER_SRC = `${process.env.PUBLIC_URL}/web-banner.png`;

export default function InstagramPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal — format web (large) */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        {/* Clickable banner → Instagram */}
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <img
                                src={BANNER_SRC}
                                alt="Suivez l'Association Lipœdème Maroc sur Instagram"
                                className="w-full h-auto max-h-[80vh] object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                            />

                            {/* Badge sobre « Cliquez ici » */}
                            <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
                                <span className="flex items-center gap-2 rounded-full bg-[#538270] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors group-hover:bg-[#3d5f52]">
                                    <Instagram size={18} />
                                    Cliquez pour nous suivre
                                </span>
                            </div>
                        </a>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label="Fermer"
                            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
