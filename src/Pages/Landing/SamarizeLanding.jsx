import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';

//UI
import PageMeta from '../../components/UI/PageMeta';
import FloatingParticles from '../../components/UI/FloatingParticles';

// Components
import LoadingScreen from '../../components/Loading/LoadingScreen';
import Navbar from '../../components/Pages/Landing/Navbar';
import Hero from '../../components/Pages/Landing/Hero';
import Features from '../../components/Pages/Landing/Features';
import Testimonials from '../../components/Pages/Landing/Testimonials';
import CTA from '../../components/Pages/Landing/CTA';
import Footer from '../../components/Pages/Landing/Footer';


export default function SamarizeLanding() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [visibleElements, setVisibleElements] = useState(new Set());

    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const testimonialsRef = useRef(null);
    const ctaRef = useRef(null);

    // Loading animation
    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleElements(prev => new Set([...prev, entry.target.id]));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        const elements = [heroRef, featuresRef, testimonialsRef, ctaRef].filter(ref => ref.current);
        elements.forEach(ref => observer.observe(ref.current));

        return () => elements.forEach(ref => ref.current && observer.unobserve(ref.current));
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            <FloatingParticles />
            <Toaster position="bottom-right" theme="light" />
            <PageMeta />

            {/* Loading Screen */}
            <LoadingScreen isLoaded={isLoaded} />
            {/* Navigation */}
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isLoaded={isLoaded} />
            {/* Hero Section */}
            <Hero heroRef={heroRef} isLoaded={isLoaded} visibleElements={visibleElements} scrollY={scrollY} />
            {/* Features Section */}
            <Features featuresRef={featuresRef} visibleElements={visibleElements} />
            {/* Testimonials */}
            <Testimonials testimonialsRef={testimonialsRef} visibleElements={visibleElements} />
            {/* CTA Section */}
            <CTA ctaRef={ctaRef} visibleElements={visibleElements} />
            {/* Footer */}
            <Footer />

            <style>
                {`
                    @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    }
                    .animate-gradient {
                    animation: gradient 3s ease infinite;
                    }
                    .bg-300\\% {
                    background-size: 300% 300%;
                    }
                `}
            </style>

        </div >
    );
}