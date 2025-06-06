import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Zap, FileText, Clock, Shield, Star, Menu, X, Play, CheckCircle, ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster, toast } from 'sonner';


export default function SamarizeLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [visibleElements, setVisibleElements] = useState(new Set());

    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const testimonialsRef = useRef(null);
    const ctaRef = useRef(null);

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Content Manager",
            company: "TechCorp",
            text: "Samarize.ai has transformed how we process research documents. What used to take hours now takes minutes.",
            rating: 5
        },
        {
            name: "Michael Rodriguez",
            role: "Legal Analyst",
            company: "LawFirm Pro",
            text: "The accuracy and speed of document summarization is incredible. It's become essential to our workflow.",
            rating: 5
        },
        {
            name: "Emma Thompson",
            role: "Research Director",
            company: "Innovation Labs",
            text: "Best AI summarization tool we've tried. The insights it extracts are consistently relevant and actionable.",
            rating: 5
        }
    ];

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

    // Auto-rotating testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Floating particles animation
    const FloatingParticles = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}
                />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            <FloatingParticles />
            <Toaster position="bottom-right" theme="light" />
            <Helmet>
                <title>Samarize.ai</title>
                <meta name="description" content="Welcome to MySite, best of Analyst, Summerize" />
                <meta property="og:title" content="AI Summerize" />
                <meta property="og:description" content="Explore the best of Analyst, Summerize on MySite." />
                <meta property="og:type" content="website" />
            </Helmet>
            {/* Loading Screen */}
            <div className={`fixed inset-0 z-50 bg-slate-900 flex items-center justify-center transition-all duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 animate-spin">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-white text-xl font-semibold">Samarize.ai</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className={`relative z-40 px-6 py-4 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">Samarize.ai</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Features</a>
                        <a href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Pricing</a>
                        <a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">About</a>
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                            <Link to='/generate'>
                                Get Started
                            </Link>
                        </button>
                    </div>

                    <button
                        className="md:hidden text-white hover:scale-110 transition-transform duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-lg border-t border-slate-700 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                    <div className="px-6 py-4 space-y-4">
                        <a href="#features" className="block text-gray-300 hover:text-white transition-colors hover:translate-x-2 duration-200">Features</a>
                        <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors hover:translate-x-2 duration-200">Pricing</a>
                        <a href="#about" className="block text-gray-300 hover:text-white transition-colors hover:translate-x-2 duration-200">About</a>
                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full text-white font-medium hover:shadow-lg transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                ref={heroRef}
                id="hero"
                className="px-6 py-20 relative"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    {/* Animated Badge */}
                    <div className={`inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-slate-700 transition-all duration-1000 delay-300 ${visibleElements.has('hero') || isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                        <span className="text-sm text-gray-300">Trusted by 10,000+ professionals</span>
                        <Sparkles className="w-4 h-4 text-blue-400 animate-bounce" />
                    </div>

                    {/* Main Headline with Typewriter Effect */}
                    <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-500 ${visibleElements.has('hero') || isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        Transform Any Document Into
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent block animate-gradient bg-300% animate-pulse">
                            Actionable Insights
                        </span>
                    </h1>

                    <p className={`text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${visibleElements.has('hero') || isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        Harness the power of advanced AI to instantly summarize documents, extract key insights,
                        and accelerate your decision-making process with unprecedented accuracy.
                    </p>

                    {/* CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-900 ${visibleElements.has('hero') || isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <button className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-2xl hover:shadow-purple-500/25">
                            <span><a href='/generate' > Start Summarizing Now </a></span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        <button
                            className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 px-8 py-4 hover:scale-105"
                            onClick={() => toast.error('Oops! This feature is not available yet. Please check back soon.')}
                        >
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:rotate-12">
                                <Play className="w-5 h-5 ml-1" />
                            </div>
                            <span className="font-medium">
                                Watch Demo
                            </span>
                        </button>
                    </div>

                    {/* Animated Stats */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-1100 ${visibleElements.has('hero') || isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        {[
                            { value: "99.9%", label: "Accuracy Rate" },
                            { value: "10x", label: "Faster Processing" },
                            { value: "50+", label: "File Formats" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                                <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{stat.value}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <ArrowDown className="w-6 h-6 text-gray-400" />
                    </div>
                </div >

                {/* Animated Background Elements */}
                < div className="absolute inset-0 overflow-hidden" >
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div >
            </section >

            {/* Features Section */}
            < section
                ref={featuresRef}
                id="features"
                className="px-6 py-20"
            >
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-1000 ${visibleElements.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Why Choose Samarize.ai?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Experience the next generation of document intelligence with features designed for modern professionals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-6 h-6 text-white" />,
                                title: "Lightning Fast",
                                description: "Process documents in seconds, not hours. Our advanced AI algorithms deliver instant results without compromising quality.",
                                gradient: "from-blue-500 to-purple-600",
                                delay: "delay-200"
                            },
                            {
                                icon: <FileText className="w-6 h-6 text-white" />,
                                title: "Universal Format Support",
                                description: "From PDFs to Word docs, spreadsheets to presentations - we handle all major file formats seamlessly.",
                                gradient: "from-green-500 to-blue-600",
                                delay: "delay-400"
                            },
                            {
                                icon: <Clock className="w-6 h-6 text-white" />,
                                title: "Save 90% Time",
                                description: "Transform hours of reading into minutes of insight extraction. Focus on what matters most.",
                                gradient: "from-purple-500 to-pink-600",
                                delay: "delay-600"
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-white" />,
                                title: "Enterprise Security",
                                description: "Bank-level encryption and compliance standards ensure your sensitive documents remain secure.",
                                gradient: "from-orange-500 to-red-600",
                                delay: "delay-800"
                            },
                            {
                                icon: <CheckCircle className="w-6 h-6 text-white" />,
                                title: "Smart Insights",
                                description: "Beyond summaries - get actionable insights, key themes, and important highlights automatically extracted.",
                                gradient: "from-teal-500 to-green-600",
                                delay: "delay-1000"
                            },
                            {
                                icon: <Star className="w-6 h-6 text-white" />,
                                title: "API Integration",
                                description: "Seamlessly integrate with your existing workflow through our robust API and extensive documentation.",
                                gradient: "from-indigo-500 to-purple-600",
                                delay: "delay-1200"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`group bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 ${visibleElements.has('features') ? `translate-y-0 opacity-100 ${feature.delay}` : 'translate-y-12 opacity-0'}`}
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Testimonials */}
            < section
                ref={testimonialsRef}
                id="testimonials"
                className="px-6 py-20"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className={`text-4xl font-bold text-white mb-16 transition-all duration-1000 ${visibleElements.has('testimonials') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        What Our Users Say
                    </h2>

                    <div className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 ${visibleElements.has('testimonials') ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-12 opacity-0'}`}>
                        <div className="flex justify-center mb-6">
                            {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-5 h-5 text-yellow-400 fill-current animate-pulse"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                />
                            ))}
                        </div>

                        <blockquote className="text-xl text-gray-300 mb-8 leading-relaxed transition-all duration-500">
                            "{testimonials[currentTestimonial].text}"
                        </blockquote>

                        <div className="transition-all duration-500">
                            <div className="text-white font-semibold">{testimonials[currentTestimonial].name}</div>
                            <div className="text-gray-400">{testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}</div>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${index === currentTestimonial ? 'bg-purple-500 scale-110' : 'bg-slate-600'
                                    }`}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section
                ref={ctaRef}
                id="cta"
                className="px-6 py-20"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <div className={`bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm p-12 rounded-3xl border border-slate-700 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 ${visibleElements.has('cta') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Workflow?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of professionals who have revolutionized their document processing with Samarize.ai
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/30"
                                onClick={() => toast.warning('Oops! This feature is not available yet. Please check back soon.')}
                            >
                                Start Free Trial
                            </button>
                            <button className="border border-slate-600 px-8 py-4 rounded-full text-white font-semibold hover:bg-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                                onClick={() => toast.warning('Oops! This feature is not available yet. Please check back soon.')}
                            >
                                Schedule Demo
                            </button>
                        </div>

                        <p className="text-sm text-gray-400 mt-6 animate-pulse">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="px-6 py-12 border-t border-slate-700" >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0 group hover:scale-105 transition-transform duration-300">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Samarize.ai</span>
                        </div>

                        <div className="flex space-x-8 text-gray-400">
                            {['Privacy', 'Terms', 'Support', 'Contact'].map((link) => (
                                <a key={link} href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1">{link}</a>
                            ))}
                        </div>
                    </div>

                    <div className="text-center text-gray-500 mt-8 pt-8 border-t border-slate-700">
                        © 2025 Samarize.ai. All rights reserved.
                    </div>
                </div>
            </footer >

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