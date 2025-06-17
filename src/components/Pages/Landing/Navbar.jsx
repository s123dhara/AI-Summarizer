import { Menu, X, Zap } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ isLoaded, isMenuOpen, setIsMenuOpen }) => {
    return (
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
    )
}

export default Navbar
