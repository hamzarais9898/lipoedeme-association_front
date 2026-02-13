import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import translations from '../context/translations';

const PrivacyPolicy = ({ lang = 'fr' }) => {
    const t = translations[lang].privacy;

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col">
            <SEO
                title={`${t.title} - MOSLIPOD`}
                description={t.intro}
            />
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100"
                    >
                        <div className="flex items-center gap-4 mb-8 border-b border-stone-100 pb-8">
                            <div className="w-16 h-16 bg-[#538270]/10 rounded-2xl flex items-center justify-center">
                                <Shield className="text-[#538270]" size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t.title}</h1>
                                <p className="text-gray-500 mt-2">{t.subtitle}</p>
                            </div>
                        </div>

                        <div className="prose prose-stone max-w-none">
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                {t.intro}
                            </p>

                            <div className="grid gap-8">
                                <section className="p-6 bg-stone-50 rounded-2xl">
                                    <h2 className="text-xl font-bold text-[#538270] mb-4 flex items-center gap-2">
                                        <FileText size={20} />
                                        {t.collection.title}
                                    </h2>
                                    <p className="text-gray-600">{t.collection.content}</p>
                                </section>

                                <section className="p-6 bg-stone-50 rounded-2xl">
                                    <h2 className="text-xl font-bold text-[#538270] mb-4 flex items-center gap-2">
                                        <Eye size={20} />
                                        {t.usage.title}
                                    </h2>
                                    <p className="text-gray-600">{t.usage.content}</p>
                                </section>

                                <section className="p-6 bg-stone-50 rounded-2xl">
                                    <h2 className="text-xl font-bold text-[#538270] mb-4 flex items-center gap-2">
                                        <Lock size={20} />
                                        {t.protection.title}
                                    </h2>
                                    <p className="text-gray-600">{t.protection.content}</p>
                                </section>

                                <section className="p-6 bg-stone-50 rounded-2xl">
                                    <h2 className="text-xl font-bold text-[#538270] mb-4 flex items-center gap-2">
                                        <Shield size={20} />
                                        {t.rights.title}
                                    </h2>
                                    <p className="text-gray-600">{t.rights.content}</p>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
