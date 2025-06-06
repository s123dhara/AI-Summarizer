import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCheck, FiZap, FiBarChart2, FiClock, FiGlobe } from 'react-icons/fi';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        // Hero section animation - fixed selector
        gsap.from(heroRef.current.querySelectorAll('.hero-element'), {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Features section animation
        gsap.from(".feature-card", {
            scrollTrigger: {
                trigger: featuresRef.current,
                start: "top 80%",
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out"
        });

        // CTA section animation
        gsap.from(ctaRef.current.children, {
            scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 80%",
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Floating animation for hero illustration
        gsap.to(".floating", {
            duration: 3,
            y: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Clean up ScrollTrigger instances
        return () => {
            ScrollTrigger.getAll().forEach(instance => instance.kill());
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <FiZap className="text-indigo-600 text-2xl" />
                    <span className="text-xl font-bold text-gray-800">samarize.ai</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How it works</a>
                    <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</a>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-300">
                    Get Started
                </button>
            </nav>

            {/* Hero Section - Added hero-element class to all children */}
            <section ref={heroRef} className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-12 md:mb-0 hero-element">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight hero-element">
                        Summarize <span className="text-indigo-600">any content</span> in seconds
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 hero-element">
                        Samarize.ai uses advanced AI to extract key insights from articles, documents, and videos, saving you hours of reading time.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 hero-element">
                        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center shadow-lg hover:shadow-indigo-300">
                            Try for free <FiArrowRight className="ml-2" />
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center">
                            See how it works
                        </button>
                    </div>
                    <div className="mt-8 flex items-center hero-element">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <img
                                    key={i}
                                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                                    alt="User"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                            ))}
                        </div>
                        <div className="ml-4">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <FiCheck key={i} className="text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">Trusted by 10,000+ users worldwide</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center floating hero-element">
                    <div className="relative w-full max-w-md">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                        <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                            <div className="mb-6">
                                <div className="h-3 w-3 rounded-full bg-red-500 inline-block mr-2"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500 inline-block mr-2"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500 inline-block"></div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                                <div className="h-4 bg-indigo-300 rounded w-full mb-2"></div>
                                <div className="h-4 bg-indigo-300 rounded w-5/6 mb-2"></div>
                                <div className="h-4 bg-indigo-300 rounded w-2/3"></div>
                            </div>
                            <div className="mt-6 flex justify-between items-center">
                                <div className="text-sm text-gray-500">Summarized in 1.2s</div>
                                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                    Copy Summary
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Cloud */}
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-6">
                    <p className="text-center text-gray-500 mb-8">Trusted by teams at</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
                        {['Google', 'Microsoft', 'Spotify', 'Airbnb', 'Netflix', 'Slack'].map((company) => (
                            <div key={company} className="text-2xl font-bold text-gray-700 hover:text-indigo-600 transition">
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section ref={featuresRef} id="features" className="container mx-auto px-6 py-20 md:py-32">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Powerful AI Summarization</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our advanced algorithms extract the essence of any content while preserving key information and context.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-indigo-200 transition">
                        <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                            <FiBarChart2 className="text-indigo-600 text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Key Points Extraction</h3>
                        <p className="text-gray-600">
                            Identifies and highlights the most important information from any document or video.
                        </p>
                    </div>

                    <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-indigo-200 transition">
                        <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                            <FiClock className="text-indigo-600 text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Time-Saving</h3>
                        <p className="text-gray-600">
                            Reduce reading time by up to 80% while retaining comprehension of the material.
                        </p>
                    </div>

                    <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-indigo-200 transition">
                        <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                            <FiGlobe className="text-indigo-600 text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Language</h3>
                        <p className="text-gray-600">
                            Supports content in over 20 languages with accurate summarization.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="bg-gray-50 py-20 md:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">How Samarize.ai Works</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get summarized content in just three simple steps.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: '1', title: 'Upload Content', desc: 'Paste text, upload documents, or share video/audio links' },
                            { number: '2', title: 'AI Processing', desc: 'Our algorithms analyze and extract key information' },
                            { number: '3', title: 'Get Summary', desc: 'Receive concise, accurate summary in your preferred format' }
                        ].map((step, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-indigo-600 text-white rounded-lg flex items-center justify-center mb-6 text-xl font-bold">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-600">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section ref={ctaRef} className="container mx-auto px-6 py-20 md:py-32">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to save hours of reading time?</h2>
                        <p className="text-xl text-indigo-100 mb-8">
                            Join thousands of professionals who use Samarize.ai to stay informed in minutes, not hours.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg">
                                Start Free Trial
                            </button>
                            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition">
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <FiZap className="text-indigo-400 text-2xl" />
                                <span className="text-xl font-bold text-white">samarize.ai</span>
                            </div>
                            <p className="mb-4">
                                Advanced AI summarization technology to help you consume information faster.
                            </p>
                            <div className="flex space-x-4">
                                {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((social) => (
                                    <a key={social} href="#" className="hover:text-white transition">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Product</h4>
                            <ul className="space-y-2">
                                {['Features', 'Pricing', 'API', 'Integrations'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-white transition">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Resources</h4>
                            <ul className="space-y-2">
                                {['Documentation', 'Blog', 'Help Center', 'Community'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-white transition">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Company</h4>
                            <ul className="space-y-2">
                                {['About', 'Careers', 'Privacy', 'Terms'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-white transition">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                        <p>© {new Date().getFullYear()} Samarize.ai. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}