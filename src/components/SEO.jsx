import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { t } from '../context/translations';

export default function SEO({
    title,
    description,
    keywords,
    image,
    article = false,
    lang = 'fr',
    jsonLd = null
}) {
    const { pathname } = useLocation();
    const siteUrl = 'https://www.lipoedemee.com';
    const canonical = `${siteUrl}${pathname}`;
    const defaultImage = `${siteUrl}/logo-association.png`;

    // Default translations if props aren't provided
    const siteTitle = "MOSLIPOD - Association Marocaine du Lipoedème";
    const defaultDescription = t("home.hero.description", lang);

    const metaTitle = title ? `${title} | MOSLIPOD` : siteTitle;
    const metaDescription = description || defaultDescription;
    const metaImage = image ? `${siteUrl}${image}` : defaultImage;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <html lang={lang} />
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={keywords || "lipoedeme, lipedema, maladie, jambes poteaux, graisse douloureuse, association maroc, moslipod, santé femme, jambes lourdes"} />
            <link rel="canonical" href={canonical} />
            <meta name="author" content="MOSLIPOD" />
            <meta name="robots" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content="MOSLIPOD" />
            <meta property="og:locale" content={lang === 'ar' ? 'ar_MA' : lang === 'en' ? 'en_US' : 'fr_FR'} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonical} />
            <meta property="twitter:title" content={metaTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />

            {/* Structured Data (JSON-LD) */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
}
