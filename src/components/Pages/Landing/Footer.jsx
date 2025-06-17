import { Zap } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="px-6 py-12 border-t border-slate-700" >
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
    )
}

export default Footer
