import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose, type = 'success', title, message }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full mx-4 text-center z-10 overflow-hidden"
                    >
                        {/* Decorative background blob */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-20 ${type === 'success' ? 'bg-emerald-500' : 'bg-orange-500'}`} />

                        {/* Icon */}
                        <div className="relative mb-4 flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                className={`w-16 h-16 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }`}
                            >
                                {type === 'success' ? (
                                    <CheckCircle2 size={32} strokeWidth={3} />
                                ) : (
                                    <XCircle size={32} strokeWidth={3} />
                                )}
                            </motion.div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 relative">
                            {title}
                        </h3>
                        <p className="text-gray-500 leading-relaxed mb-6 text-sm relative">
                            {message}
                        </p>

                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className={`w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-black/5 transition-all ${type === 'success'
                                    ? 'bg-[#538270] hover:bg-[#3d5f52]'
                                    : 'bg-red-500 hover:bg-red-600'
                                }`}
                        >
                            {type === 'success' ? 'Super !' : 'Fermer'}
                        </motion.button>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
