import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Send,
    Paperclip,
    Plus,
    MessageSquare,
    FileText,
    Image,
    Download,
    Copy,
    ThumbsUp,
    ThumbsDown,
    Zap,
    Menu,
    X,
    Search,
    Settings,
    User,
    Trash2,
    Edit3,
    MoreVertical,
    ChevronDown,
    Sparkles,
    Clock,
    CheckCircle
} from 'lucide-react';

export default function SamarizeChatApp() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: "Hello! I'm your AI document assistant. Upload any file and I'll help you summarize, analyze, and extract insights from it. What would you like to explore today?",
            timestamp: new Date(Date.now() - 300000),
            status: 'delivered'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [conversations, setConversations] = useState([
        { id: 1, title: 'Welcome to Samarize.ai', timestamp: new Date(), active: true },
        { id: 2, title: 'Research Paper Analysis', timestamp: new Date(Date.now() - 86400000), active: false },
        { id: 3, title: 'Contract Summary', timestamp: new Date(Date.now() - 172800000), active: false },
    ]);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    }, [inputValue]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            content: inputValue,
            timestamp: new Date(),
            status: 'sent'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                content: "I understand you're looking for help with document analysis. Based on your query, I can help you summarize key points, extract important data, identify trends, and provide actionable insights. Would you like to upload a document to get started?",
                timestamp: new Date(),
                status: 'delivered'
            };
            setMessages(prev => [...prev, botMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileUpload = (files) => {
        const newFiles = Array.from(files).map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        }));

        setUploadedFiles(prev => [...prev, ...newFiles]);

        // Add file upload message
        const fileMessage = {
            id: messages.length + 1,
            type: 'user',
            content: `Uploaded ${newFiles.length} file(s): ${newFiles.map(f => f.name).join(', ')}`,
            timestamp: new Date(),
            status: 'sent',
            files: newFiles
        };

        setMessages(prev => [...prev, fileMessage]);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFileIcon = (type) => {
        if (type.includes('image')) return <Image className="w-4 h-4" />;
        return <FileText className="w-4 h-4" />;
    };

    const MessageBubble = ({ message }) => {
        const isUser = message.type === 'user';

        return (
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 group animate-in slide-in-from-bottom-4 duration-500`}>
                {!isUser && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                )}

                <Helmet>
                    <title>Samarize.ai</title>
                    <meta name="description" content="Welcome to MySite, best of Analyst, Summerize" />
                    <meta property="og:title" content="AI Summerize" />
                    <meta property="og:description" content="Explore the best of Analyst, Summerize on MySite." />
                    <meta property="og:type" content="website" />
                </Helmet>

                <div className={`max-w-[70%] ${isUser ? 'order-1' : 'order-2'}`}>
                    <div className={`p-4 rounded-2xl ${isUser
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto'
                        : 'bg-slate-800/80 backdrop-blur-sm text-gray-100 border border-slate-700'
                        } hover:shadow-lg transition-all duration-300`}>
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>

                        {message.files && (
                            <div className="mt-3 space-y-2">
                                {message.files.map(file => (
                                    <div key={file.id} className="flex items-center space-x-2 bg-black/20 rounded-lg p-2">
                                        {getFileIcon(file.type)}
                                        <span className="text-sm font-medium">{file.name}</span>
                                        <span className="text-xs opacity-70">({formatFileSize(file.size)})</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={`flex items-center mt-2 space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-xs text-gray-500">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.status === 'sent' && <CheckCircle className="w-3 h-3 text-blue-500" />}
                        {!isUser && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                                <button className="p-1 hover:bg-slate-700 rounded text-gray-400 hover:text-white transition-colors">
                                    <Copy className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-slate-700 rounded text-gray-400 hover:text-white transition-colors">
                                    <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-slate-700 rounded text-gray-400 hover:text-white transition-colors">
                                    <ThumbsDown className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {isUser && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center ml-3 mt-1">
                        <User className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex overflow-hidden">
            {/* Sidebar */}
            <div className={`bg-slate-800/90 backdrop-blur-xl border-r border-slate-700 transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'
                } overflow-hidden flex flex-col`}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white"><a href="/">Samarize.ai</a></span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition-colors lg:hidden"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl p-3 flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                        <Plus className="w-4 h-4" />
                        <span>New Chat</span>
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-slate-700">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {conversations.map(conv => (
                        <div key={conv.id} className={`group p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-700/50 ${conv.active ? 'bg-slate-700/70 border border-slate-600' : ''
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{conv.title}</p>
                                        <p className="text-xs text-gray-400">
                                            {conv.timestamp.toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-slate-600 rounded text-gray-400 hover:text-white">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-slate-700">
                    <div className="flex items-center space-x-3 p-3 hover:bg-slate-700/50 rounded-xl cursor-pointer transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">John Doe</p>
                            <p className="text-xs text-gray-400">Free Plan</p>
                        </div>
                        <Settings className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {!isSidebarOpen && (
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="p-2 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                            )}
                            <div>
                                <h1 className="text-xl font-semibold text-white">Document Chat</h1>
                                <p className="text-sm text-gray-400">AI-powered document analysis and summarization</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                Online
                            </span>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div
                    className={`flex-1 overflow-y-auto p-6 ${dragActive ? 'bg-blue-500/10' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {dragActive && (
                        <div className="fixed inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center z-10 border-2 border-dashed border-blue-500 m-4 rounded-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Paperclip className="w-8 h-8 text-blue-400" />
                                </div>
                                <p className="text-xl font-semibold text-white mb-2">Drop your files here</p>
                                <p className="text-gray-300">Supported formats: PDF, DOC, TXT, PNG, JPG</p>
                            </div>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto">
                        {messages.map(message => (
                            <MessageBubble key={message.id} message={message} />
                        ))}

                        {isLoading && (
                            <div className="flex justify-start mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-1">
                                    <Zap className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                        </div>
                                        <span className="text-gray-400 text-sm">AI is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="bg-slate-800/80 backdrop-blur-xl border-t border-slate-700 p-4">
                    <div className="max-w-4xl mx-auto">
                        {/* File Upload Area */}
                        {uploadedFiles.length > 0 && (
                            <div className="mb-4 p-3 bg-slate-700/50 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-300">Uploaded Files</span>
                                    <button
                                        onClick={() => setUploadedFiles([])}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {uploadedFiles.map(file => (
                                        <div key={file.id} className="flex items-center space-x-3 bg-slate-600/50 rounded-lg p-2">
                                            {getFileIcon(file.type)}
                                            <span className="text-sm text-gray-300 flex-1">{file.name}</span>
                                            <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                                            <button className="text-gray-400 hover:text-red-400 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Box */}
                        <div className="relative bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-600 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                            <textarea
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything about your documents..."
                                className="w-full bg-transparent text-white placeholder-gray-400 p-4 pr-20 resize-none focus:outline-none max-h-32 min-h-[3rem]"
                                rows={1}
                            />

                            <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-600 rounded-lg transition-all duration-200"
                                    title="Upload file"
                                >
                                    <Paperclip className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isLoading}
                                    className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex space-x-2">
                                {['Summarize', 'Extract Key Points', 'Analyze Sentiment'].map(action => (
                                    <button
                                        key={action}
                                        onClick={() => setInputValue(action)}
                                        className="px-3 py-1 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white rounded-full transition-colors"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Sparkles className="w-3 h-3" />
                                <span>Enhanced by AI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}