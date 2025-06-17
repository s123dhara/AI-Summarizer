import { CheckCircle, Clock, FileText, Shield, Star, Zap } from 'lucide-react';
import React from 'react'

const features = [
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
];

const Features = ({ visibleElements, featuresRef }) => {
    return (
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
                    {features.map((feature, index) => (
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
    )
}

export default Features
