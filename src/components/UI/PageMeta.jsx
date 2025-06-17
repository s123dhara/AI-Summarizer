import React from 'react'
import { Helmet } from 'react-helmet-async';
const PageMeta = () => {
    return (
        <Helmet>
            <title>Samarize.ai</title>
            <meta name="description" content="Welcome to MySite, best of Analyst, Summerize" />
            <meta property="og:title" content="AI Summerize" />
            <meta property="og:description" content="Explore the best of Analyst, Summerize on MySite." />
            <meta property="og:type" content="website" />
        </Helmet>
    )
}
export default PageMeta
