"use client";
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import {
    X,
    Quote,
    FileText,
    ChefHat,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    Clock,
    Users,
    Eye,
    ThumbsUp,
    ThumbsDown,
    Sparkles,
    Star,
    Loader2,
} from "lucide-react";

interface Blog {
    id: number;
    quote?: string;
    title?: string;
    name?: string;
    author?: string;
    body?: string;
    instructions?: string[];
    tags?: string[];
    rating?: number;
    reactions?: {
        likes: number;
        dislikes: number;
    };
    views?: number;
    image?: string;
    prepTimeMinutes?: number;
    cookTimeMinutes?: number;
    servings?: number;
    difficulty?: string;
    ingredients?: string[];
}

interface Comment {
    id: number;
    body: string;
    user?: {
        username?: string;
    };
}

type TabType = "quotes" | "posts" | "recipes";

const BlogManagement = () => {
    const [activeTab, setActiveTab] = useState<TabType>("quotes");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 9;

    const endpoints: Record<TabType, string> = {
        quotes: "https://dummyjson.com/quotes",
        posts: "https://dummyjson.com/posts",
        recipes: "https://dummyjson.com/recipes",
    };

    useEffect(() => {
        fetchBlogs();
    }, [activeTab, currentPage]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const skip = (currentPage - 1) * itemsPerPage;
            const response = await fetch(
                `${endpoints[activeTab]}?limit=${itemsPerPage}&skip=${skip}`
            );
            const data = await response.json();
            setBlogs(data[activeTab] || []);
            setTotalPages(Math.ceil(data.total / itemsPerPage));
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
        setLoading(false);
    };

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const response = await fetch(
                "https://dummyjson.com/comments?limit=8"
            );
            const data = await response.json();
            setComments(data.comments || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
        setLoadingComments(false);
    };

    const handleBlogClick = (blog: Blog) => {
        setSelectedBlog(blog);
        fetchComments();
    };

    const closeModal = () => {
        setSelectedBlog(null);
        setComments([]);
    };

    const changePage = (direction: "next" | "prev") => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getIcon = (type: TabType) => {
        const iconProps = "w-5 h-5 sm:w-6 sm:h-6";
        switch (type) {
            case "quotes":
                return <Quote className={iconProps} />;
            case "posts":
                return <FileText className={iconProps} />;
            case "recipes":
                return <ChefHat className={iconProps} />;
            default:
                return null;
        }
    };

    const renderBlogCard = (blog: Blog) => (
        <div
            key={blog.id}
            onClick={() => handleBlogClick(blog)}
            className="group relative backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] dark:from-white/[0.08] dark:to-white/[0.03] rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-white/20 hover:border-white/30 dark:hover:border-white/30 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-[0_25px_70px_-15px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_25px_70px_-15px_rgba(255,255,255,0.15)] overflow-hidden"
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-3xl transition-all duration-700" />

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-5 sm:mb-6">
                    <div className="p-3 sm:p-3.5 backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 dark:from-white/15 dark:to-white/5 rounded-2xl border border-white/20 dark:border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        {getIcon(activeTab)}
                    </div>
                    {blog.tags && (
                        <span className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-xl bg-gradient-to-r from-white/15 to-white/10 dark:from-white/15 dark:to-white/10 rounded-full border border-white/20 dark:border-white/20 text-gray-900 dark:text-white font-medium shadow-lg">
                            {blog.tags[0]}
                        </span>
                    )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-gray-800 dark:group-hover:text-white/95 transition-colors">
                    {blog.quote || blog.title || blog.name}
                </h3>

                <p className="text-sm sm:text-base text-gray-700 dark:text-white/70 line-clamp-3 leading-relaxed mb-4">
                    {blog.author ||
                        blog.body ||
                        blog.instructions?.[0] ||
                        "No description available"}
                </p>

                {blog.rating && (
                    <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-300/20 dark:border-white/10">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                        i < Math.round(blog.rating!)
                                            ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400"
                                            : "text-gray-300 dark:text-white/20"
                                    } transition-all duration-300`}
                                />
                            ))}
                        </div>
                        <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                            {blog.rating.toFixed(1)}
                        </span>
                    </div>
                )}

                {activeTab === "posts" && blog.reactions && (
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-700 dark:text-white/70">
                        <span className="flex items-center gap-2 backdrop-blur-xl bg-white/10 dark:bg-white/10 px-3 py-1.5 rounded-full">
                            <ThumbsUp className="w-4 h-4" />
                            {blog.reactions.likes}
                        </span>
                        <span className="flex items-center gap-2 backdrop-blur-xl bg-white/10 dark:bg-white/10 px-3 py-1.5 rounded-full">
                            <Eye className="w-4 h-4" />
                            {blog.views}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 py-35">
            {/* Enhanced Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 dark:from-blue-600/30 dark:via-purple-600/30 dark:to-pink-600/30 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

            {/* Animated orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Header */}
                <div className="backdrop-blur-2xl bg-gradient-to-br from-white/60 to-white/40 dark:from-white/10 dark:to-white/5 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 lg:p-12 mb-8 sm:mb-10 lg:mb-12 border border-white/40 dark:border-white/20 shadow-2xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-3">
                        <div className="p-3.5 sm:p-4 backdrop-blur-xl bg-gradient-to-br from-white/40 to-white/20 dark:from-white/20 dark:to-white/10 rounded-2xl border border-white/50 dark:border-white/30 shadow-xl">
                            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 dark:text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Blog Management
                        </h1>
                    </div>
                    <p className="text-gray-700 dark:text-white/80 text-base sm:text-lg lg:text-xl sm:ml-[4.5rem] lg:ml-[5.5rem] font-light">
                        Discover and explore curated content across multiple categories
                    </p>
                </div>

                {/* Tabs */}
                <div className="backdrop-blur-xl bg-white/30 dark:bg-white/5 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 mb-8 sm:mb-10 border border-white/40 dark:border-white/20 flex flex-col sm:flex-row gap-2.5 shadow-xl">
                    {Object.keys(endpoints).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab as TabType);
                                setCurrentPage(1);
                            }}
                            className={`flex-1 py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 text-base sm:text-lg relative overflow-hidden group ${
                                activeTab === tab
                                    ? "bg-gradient-to-r from-white/50 to-white/30 dark:from-white/20 dark:to-white/10 text-gray-900 dark:text-white shadow-xl border border-white/50 dark:border-white/30 scale-[1.02]"
                                    : "text-gray-700 dark:text-white/70 hover:bg-white/20 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white/90 border border-transparent hover:border-white/30 dark:hover:border-white/10"
                            }`}
                        >
                            {activeTab === tab && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-500/10 dark:to-purple-500/10 animate-pulse" />
                            )}
                            <span className="relative z-10">{getIcon(tab as TabType)}</span>
                            <span className="capitalize relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-[600px]">
                        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/50 to-white/30 dark:from-white/10 dark:to-white/5 rounded-3xl p-16 border border-white/40 dark:border-white/20 shadow-2xl">
                            <div className="relative">
                                <Loader2 className="w-16 h-16 text-purple-600 dark:text-white animate-spin" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/30 to-purple-400/30 dark:from-blue-500/30 dark:to-purple-500/30 blur-2xl animate-pulse"></div>
                            </div>
                            <p className="text-gray-800 dark:text-white/80 text-lg mt-6 font-medium">Loading {activeTab}...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Blog Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
                            {blogs.map(renderBlogCard)}
                        </div>

                        {/* Pagination */}
                        <div className="backdrop-blur-xl bg-gradient-to-r from-white/40 to-white/30 dark:from-white/10 dark:to-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/40 dark:border-white/20 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                            <button
                                onClick={() => changePage("prev")}
                                disabled={currentPage === 1}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl sm:rounded-2xl backdrop-blur-xl bg-gradient-to-r from-white/40 to-white/30 dark:from-white/15 dark:to-white/10 text-gray-900 dark:text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:from-white/50 hover:to-white/40 dark:hover:from-white/20 dark:hover:to-white/15 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/50 dark:border-white/20 shadow-lg disabled:hover:scale-100"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span className="text-base sm:text-lg">Previous</span>
                            </button>

                            <div className="flex items-center gap-3 backdrop-blur-xl bg-white/30 dark:bg-white/10 px-6 py-3 rounded-2xl border border-white/40 dark:border-white/20">
                                <span className="text-gray-900 dark:text-white font-bold text-lg sm:text-xl">
                                    Page {currentPage}
                                </span>
                                <span className="text-gray-600 dark:text-white/50 text-base sm:text-lg">of</span>
                                <span className="text-gray-800 dark:text-white/80 font-semibold text-base sm:text-lg">
                                    {totalPages}
                                </span>
                            </div>

                            <button
                                onClick={() => changePage("next")}
                                disabled={currentPage === totalPages}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl sm:rounded-2xl backdrop-blur-xl bg-gradient-to-r from-white/40 to-white/30 dark:from-white/15 dark:to-white/10 text-gray-900 dark:text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:from-white/50 hover:to-white/40 dark:hover:from-white/20 dark:hover:to-white/15 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/50 dark:border-white/20 shadow-lg disabled:hover:scale-100"
                            >
                                <span className="text-base sm:text-lg">Next</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                )}

                {/* Modal */}
                {selectedBlog && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-xl"
                        onClick={closeModal}
                    >
                        <div
                            className="backdrop-blur-2xl bg-gradient-to-br from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-white/60 dark:border-white/20 max-w-5xl w-full max-h-[70vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-8 duration-500 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/20 scrollbar-track-transparent"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                                <div className="flex items-center gap-4 flex-1 pr-4">
                                    <div className="p-4 backdrop-blur-xl bg-gradient-to-br from-white/60 to-white/40 dark:from-white/20 dark:to-white/10 rounded-2xl border border-white/60 dark:border-white/30 shrink-0 shadow-xl">
                                        {getIcon(activeTab)}
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                        {selectedBlog.quote ||
                                            selectedBlog.title ||
                                            selectedBlog.name}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-3 hover:bg-white/30 dark:hover:bg-white/10 rounded-2xl transition-all duration-300 border border-transparent hover:border-white/40 dark:hover:border-white/20 shrink-0 self-end sm:self-start hover:rotate-90 hover:scale-110"
                                >
                                    <X className="w-6 h-6 text-gray-900 dark:text-white" />
                                </button>
                            </div>

                            <div className="space-y-6 sm:space-y-8">
                                {activeTab === "quotes" && (
                                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/70 to-white/50 dark:from-white/10 dark:to-white/5 rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-white/60 dark:border-white/20 shadow-xl">
                                        <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 dark:text-white/30 mb-5" />
                                        <p className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white mb-8 leading-relaxed italic">
                                            {selectedBlog.quote}
                                        </p>
                                        <div className="flex items-center gap-4 pt-6 border-t border-gray-300 dark:border-white/20">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/50 to-purple-400/50 dark:from-blue-500/40 dark:to-purple-500/40 flex items-center justify-center text-gray-900 dark:text-white font-bold text-lg border-2 border-white/40 dark:border-white/20 shadow-lg">
                                                {selectedBlog.author?.[0]}
                                            </div>
                                            <span className="text-lg text-gray-800 dark:text-white/90 font-semibold">
                                                {selectedBlog.author}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "posts" && (
                                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/70 to-white/50 dark:from-white/10 dark:to-white/5 rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-white/60 dark:border-white/20 shadow-xl">
                                        <p className="text-gray-800 dark:text-white/90 leading-relaxed text-base sm:text-lg mb-6">
                                            {selectedBlog.body}
                                        </p>

                                        {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                                            <div className="flex gap-2 flex-wrap mb-6 pb-6 border-b border-gray-300 dark:border-white/20">
                                                {selectedBlog.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-white/50 to-white/40 dark:from-white/15 dark:to-white/10 rounded-xl text-sm text-gray-900 dark:text-white font-medium border border-white/60 dark:border-white/20 shadow-lg hover:scale-105 transition-transform cursor-default"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-800 dark:text-white/80">
                                            <span className="flex items-center gap-2 backdrop-blur-xl bg-white/40 dark:bg-white/10 px-4 py-2 rounded-xl border border-white/50 dark:border-white/20">
                                                <ThumbsUp className="w-4 h-4" />
                                                {selectedBlog.reactions?.likes || 0}
                                            </span>
                                            <span className="flex items-center gap-2 backdrop-blur-xl bg-white/40 dark:bg-white/10 px-4 py-2 rounded-xl border border-white/50 dark:border-white/20">
                                                <ThumbsDown className="w-4 h-4" />
                                                {selectedBlog.reactions?.dislikes || 0}
                                            </span>
                                            <span className="flex items-center gap-2 backdrop-blur-xl bg-white/40 dark:bg-white/10 px-4 py-2 rounded-xl border border-white/50 dark:border-white/20">
                                                <Eye className="w-4 h-4" />
                                                {selectedBlog.views || 0} views
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "recipes" && (
                                    <div className="space-y-6">
                                        <div className="backdrop-blur-xl bg-gradient-to-br from-white/70 to-white/50 dark:from-white/10 dark:to-white/5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/60 dark:border-white/20 shadow-xl">
                                            <div className="relative overflow-hidden group">
                                                <img
                                                    src={selectedBlog.image}
                                                    alt={selectedBlog.name}
                                                    className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            </div>
                                            <div className="p-8 sm:p-10">
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-300 dark:border-white/20">
                                                    <div className="text-center backdrop-blur-xl bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-white/50 dark:border-white/10">
                                                        <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                                                        <div className="text-sm text-gray-600 dark:text-white/60 mb-1">Prep</div>
                                                        <div className="text-lg text-gray-900 dark:text-white font-bold">
                                                            {selectedBlog.prepTimeMinutes}m
                                                        </div>
                                                    </div>
                                                    <div className="text-center backdrop-blur-xl bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-white/50 dark:border-white/10">
                                                        <ChefHat className="w-6 h-6 text-purple-500 dark:text-purple-400 mx-auto mb-2" />
                                                        <div className="text-sm text-gray-600 dark:text-white/60 mb-1">Cook</div>
                                                        <div className="text-lg text-gray-900 dark:text-white font-bold">
                                                            {selectedBlog.cookTimeMinutes}m
                                                        </div>
                                                    </div>
                                                    <div className="text-center backdrop-blur-xl bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-white/50 dark:border-white/10">
                                                        <Users className="w-6 h-6 text-pink-500 dark:text-pink-400 mx-auto mb-2" />
                                                        <div className="text-sm text-gray-600 dark:text-white/60 mb-1">Servings</div>
                                                        <div className="text-lg text-gray-900 dark:text-white font-bold">
                                                            {selectedBlog.servings}
                                                        </div>
                                                    </div>
                                                    <div className="text-center backdrop-blur-xl bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-white/50 dark:border-white/10">
                                                        <Sparkles className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mx-auto mb-2" />
                                                        <div className="text-sm text-gray-600 dark:text-white/60 mb-1">Level</div>
                                                        <div className="text-lg text-gray-900 dark:text-white font-bold capitalize">
                                                            {selectedBlog.difficulty}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-8">
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-5">
                                                        Ingredients
                                                    </h4>
                                                    <div className="grid gap-3">
                                                        {selectedBlog.ingredients?.map((ing, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-start gap-3 text-base text-gray-800 dark:text-white/90 backdrop-blur-xl bg-white/40 dark:bg-white/5 p-4 rounded-xl border border-white/50 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
                                                            >
                                                                <span className="text-blue-500 dark:text-blue-400 font-bold mt-0.5">•</span>
                                                                <span>{ing}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-5">
                                                        Instructions
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {selectedBlog.instructions?.map((inst, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex gap-4 backdrop-blur-xl bg-white/40 dark:bg-white/5 p-5 rounded-xl border border-white/50 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition-colors group"
                                                            >
                                                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/60 to-purple-400/60 dark:from-blue-500/40 dark:to-purple-500/40 text-gray-900 dark:text-white font-bold text-base shrink-0 border-2 border-white/50 dark:border-white/20 group-hover:scale-110 transition-transform">
                                                                    {i + 1}
                                                                </span>
                                                                <p className="text-base text-gray-800 dark:text-white/90 leading-relaxed pt-1.5">
                                                                    {inst}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Comments Section */}
                                <div className="backdrop-blur-xl bg-gradient-to-br from-white/70 to-white/50 dark:from-white/10 dark:to-white/5 rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-white/60 dark:border-white/20 shadow-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900 dark:text-white" />
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                            Comments
                                        </h3>
                                        <span className="text-gray-700 dark:text-white/60 text-base bg-white/40 dark:bg-white/10 px-3 py-1 rounded-full">
                                            {comments.length}
                                        </span>
                                    </div>

                                    {loadingComments ? (
                                        <div className="flex justify-center py-12">
                                            <Loader2 className="w-10 h-10 text-purple-600 dark:text-white animate-spin" />
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {comments.map((comment) => (
                                                <div
                                                    key={comment.id}
                                                    className="backdrop-blur-xl bg-white/40 dark:bg-white/5 rounded-2xl p-5 border border-white/50 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 group"
                                                >
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400/60 to-purple-400/60 dark:from-blue-500/40 dark:to-purple-500/40 rounded-full flex items-center justify-center text-gray-900 dark:text-white font-bold text-sm border-2 border-white/50 dark:border-white/20 group-hover:scale-110 transition-transform">
                                                            {comment.user?.username?.[0]?.toUpperCase() || "U"}
                                                        </div>
                                                        <span className="font-bold text-base text-gray-900 dark:text-white">
                                                            {comment.user?.username || "Anonymous"}
                                                        </span>
                                                    </div>
                                                    <p className="text-base text-gray-800 dark:text-white/80 leading-relaxed pl-[3.25rem]">
                                                        {comment.body}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogManagement;
