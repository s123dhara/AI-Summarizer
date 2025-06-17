import { Zap } from 'lucide-react'
import React from 'react'

const LoadingScreen = ({ isLoaded }) => {
    return (
        <div className={`fixed inset-0 z-50 bg-slate-900 flex items-center justify-center transition-all duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 animate-spin">
                    <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-white text-xl font-semibold">Samarize.ai</div>
            </div>
        </div>
    )
}

export default LoadingScreen
