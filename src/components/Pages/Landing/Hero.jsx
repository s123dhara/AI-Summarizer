import { ArrowDown, ChevronRight, Play, Sparkles, Star } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const Hero = ({ scrollY, visibleElements, isLoaded, heroRef }) => {
    return (
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
    )
}

export default Hero
