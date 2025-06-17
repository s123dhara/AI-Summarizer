import React from 'react'
import { toast } from 'sonner'

const CTA = ({ ctaRef, visibleElements }) => {
    return (
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
    )
}

export default CTA
