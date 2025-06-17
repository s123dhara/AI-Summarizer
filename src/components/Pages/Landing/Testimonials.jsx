import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react'


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



const Testimonials = ({ testimonialsRef, visibleElements }) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    // Auto-rotating testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
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
    )
}

export default Testimonials
