"use client";
/* eslint-disable react-hooks/exhaustive-deps */
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
    Calendar,
    TrendingUp,
    Heart,
    Share2,
    Bookmark,
    MoreHorizontal,
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
    const [selectedRecipe, setSelectedRecipe] = useState<Blog | null>(null);
    const [selectedBlogForComments, setSelectedBlogForComments] = useState<Blog | null>(null);
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

    const openCommentsModal = async (blog: Blog) => {
        setSelectedBlogForComments(blog);
        setLoadingComments(true);
        try {
            const response = await fetch("https://dummyjson.com/comments?limit=8");
            const data = await response.json();
            setComments(data.comments || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
        setLoadingComments(false);
    };

    const closeCommentsModal = () => {
        setSelectedBlogForComments(null);
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
        const iconProps = "w-5 h-5";
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

    const getRandomColor = (id: number) => {
        const colors = [
            "from-blue-400 via-purple-500 to-pink-500",
            "from-green-400 via-teal-500 to-blue-500",
            "from-orange-400 via-red-500 to-pink-500",
            "from-purple-400 via-pink-500 to-red-500",
            "from-cyan-400 via-blue-500 to-indigo-500",
            "from-yellow-400 via-orange-500 to-red-500",
        ];
        return colors[id % colors.length];
    };

    // Enhanced Twitter-style card for quotes and posts
    const renderContentCard = (blog: Blog) => (
        <div
            key={blog.id}
            className="group relative backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:shadow-purple-500/20 flex flex-col h-full"
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

            <div className="relative p-5 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="relative shrink-0">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRandomColor(blog.id)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                {blog.author?.[0] || "U"}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-black dark:text-white text-base truncate">
                                    {blog.author || "Anonymous"}
                                </span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full shrink-0"></span>
                                <span className="text-sm text-gray-400 shrink-0">2h</span>
                            </div>
                            {activeTab === "posts" && blog.tags && (
                                <span className="inline-flex items-center text-xs px-2.5 py-0.5 mt-1 bg-purple-500/20 text-gray-900 dark:text-purple-300 rounded-full font-semibold border border-purple-500/30">
                                    #{blog.tags[0]}
                                </span>
                            )}
                        </div>
                    </div>
                    <button className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors shrink-0">
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content - Fixed height section */}
                <div className="flex-1 mb-4 min-h-0">
                    {activeTab === "quotes" ? (
                        <div className="flex flex-col h-full">
                            <div className="relative flex-1">
                                <Quote className="ml-2 w-6 h-6 text-black dark:text-white absolute -top-1 -left-1" />
                                <p className="text-xl text-gray-900 dark:text-white pt-2 text-lg leading-relaxed font-medium italic pl-6 line-clamp-4">
                                    {blog.quote}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 pt-3 mt-auto">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-gray-400">
                                    Inspirational Quote
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-gray-900 dark:text-gray-300 leading-relaxed text-sm line-clamp-3 flex-1">
                                {blog.body}
                            </p>
                            {blog.tags && blog.tags.length > 1 && (
                                <div className="flex flex-wrap gap-1.5 pt-3 mt-auto">
                                    {blog.tags.slice(1, 4).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-2.5 py-1 bg-white/3 text-gray-900 dark:text-gray-300 rounded-full font-medium transition-colors cursor-pointer border border-slate-600/30"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Stats section - Always at bottom */}
                <div className="mt-auto">
                    {activeTab === "posts" && blog.reactions && (
                        <div className="mb-3 pb-3 border-b border-slate-700/50 flex items-center gap-5 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                                <Eye className="w-4 h-4" />
                                <span className="font-semibold">{blog.views?.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-green-400 transition-colors cursor-pointer">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="font-semibold">{blog.reactions.likes}</span>
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-purple-400 transition-colors cursor-pointer">
                                <MessageSquare className="w-4 h-4" />
                                <span className="font-semibold">24</span>
                            </span>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="grid grid-cols-4 gap-1">
                        <button
                            onClick={() => openCommentsModal(blog)}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg hover:bg-blue-500/10 text-gray-900 dark:text-gray-400 hover:text-blue-400 transition-all duration-200 group/btn"
                        >
                            <MessageSquare className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            <span className="text-xs font-semibold hidden sm:inline">Comment</span>
                        </button>
                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg hover:bg-green-500/10 text-gray-900 dark:text-gray-400 hover:text-green-400 transition-all duration-200 group/btn">
                            <Share2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            <span className="text-xs font-semibold hidden sm:inline">Share</span>
                        </button>
                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg hover:bg-red-500/10 text-gray-900 dark:text-gray-400 hover:text-red-400 transition-all duration-200 group/btn">
                            <Heart className="w-4 h-4 group-hover/btn:scale-110 group-hover/btn:fill-red-400 transition-all" />
                            <span className="text-xs font-semibold hidden sm:inline">Like</span>
                        </button>
                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg hover:bg-yellow-500/10 text-gray-900 dark:text-gray-400 hover:text-yellow-400 transition-all duration-200 group/btn">
                            <Bookmark className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            <span className="text-xs font-semibold hidden sm:inline">Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Recipe card
    const renderRecipeCard = (blog: Blog) => (
        <div
            key={blog.id}
            onClick={() => setSelectedRecipe(blog)}
            className="group relative backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1"
        >
            <div className="relative h-56 overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-2 rounded-full shadow-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {blog.rating?.toFixed(1)}
                    </span>
                </div>

                {/* Difficulty badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg capitalize">
                        {blog.difficulty}
                    </span>
                </div>

                {/* Time info overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-full">
                        <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {(blog.prepTimeMinutes || 0) + (blog.cookTimeMinutes || 0)}m
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-full">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {blog.servings}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {blog.name}
                </h3>

                {blog.tags && (
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 rounded-full font-semibold"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 dark:from-blue-600/30 dark:via-purple-600/30 dark:to-pink-600/30 blur-3xl" />

            <div className="relative z-10 w-[95%] md:w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-40">

                {/* Tabs */}
                <div className="backdrop-blur-xl bg-white/40 dark:bg-white/5 rounded-2xl p-3 mb-8 border border-white/50 dark:border-white/20 flex gap-3 shadow-xl">
                    {Object.keys(endpoints).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab as TabType);
                                setCurrentPage(1);
                            }}
                            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                                activeTab === tab
                                    ? "bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-lg scale-[1.02]"
                                    : "text-gray-600 dark:text-white/70 hover:bg-white/60 dark:hover:bg-white/10"
                            }`}
                        >
                            {getIcon(tab as TabType)}
                            <span className="capitalize">{tab}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center min-h-[500px]">
                        <div className="backdrop-blur-2xl bg-white/60 dark:bg-white/10 rounded-3xl p-16 border border-white/50 dark:border-white/20 shadow-2xl">
                            <Loader2 className="w-16 h-16 mx-auto text-purple-600 dark:text-white animate-spin mb-4" />
                            <p className="text-gray-800 dark:text-white/80 text-xl font-semibold">
                                Loading {activeTab}...
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                            {activeTab === "recipes"
                                ? blogs.map(renderRecipeCard)
                                : blogs.map(renderContentCard)}
                        </div>

                        {/* Pagination */}
                        <div className="backdrop-blur-xl bg-white/50 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 flex items-center justify-between shadow-xl">
                            <button
                                onClick={() => changePage("prev")}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white/80 dark:bg-white/15 text-gray-900 dark:text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-white/20 hover:shadow-lg transition-all duration-300"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>

                            <div className="flex items-center gap-3 bg-white/70 dark:bg-white/10 px-6 py-3 rounded-xl border border-white/50 dark:border-white/20">
                                <span className="text-gray-900 dark:text-white font-bold text-lg">
                                    Page {currentPage}
                                </span>
                                <span className="text-gray-600 dark:text-white/50">of</span>
                                <span className="text-gray-800 dark:text-white/80 font-semibold text-lg">
                                    {totalPages}
                                </span>
                            </div>

                            <button
                                onClick={() => changePage("next")}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white/80 dark:bg-white/15 text-gray-900 dark:text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-white/20 hover:shadow-lg transition-all duration-300"
                            >
                                Next
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                )}

                {/* Comments Modal */}
                {selectedBlogForComments && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
                        onClick={closeCommentsModal}
                    >
                        <div
                            className="mt-30 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-white/50 dark:border-white/20 animate-in slide-in-from-bottom-8 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-gray-200 dark:border-gray-700 px-6 py-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                Comments
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                                {selectedBlogForComments.quote || selectedBlogForComments.title}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeCommentsModal}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all hover:rotate-90 duration-300"
                                    >
                                        <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Comments List */}
                            <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-6">
                                {loadingComments ? (
                                    <div className="flex flex-col items-center justify-center py-16">
                                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                                            Loading comments...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {comments.map((comment, index) => (
                                            <div
                                                key={comment.id}
                                                className="backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 rounded-2xl p-5 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <div className="flex gap-4">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg">
                                                            {comment.user?.username?.[0]?.toUpperCase() || "U"}
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-bold text-gray-900 dark:text-white">
                                                                {comment.user?.username || "Anonymous"}
                                                            </span>
                                                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                {Math.floor(Math.random() * 24)}h ago
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                                            {comment.body}
                                                        </p>
                                                        <div className="flex items-center gap-6 mt-3">
                                                            <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                                <ThumbsUp className="w-4 h-4" />
                                                                <span className="font-semibold">{Math.floor(Math.random() * 50)}</span>
                                                            </button>
                                                            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Comment Input */}
                            <div className="sticky bottom-0 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold shrink-0">
                                        Y
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    />
                                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recipe Detail Modal */}
                {selectedRecipe && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
                        onClick={() => setSelectedRecipe(null)}
                    >
                        <div
                            className="mt-25 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 rounded-3xl w-[70%] sm:w-[50%] max-h-[80vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-8 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Hero Image */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={selectedRecipe.image}
                                    alt={selectedRecipe.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                <button
                                    onClick={() => setSelectedRecipe(null)}
                                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all hover:rotate-90 duration-300"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h2 className="text-4xl font-bold text-white mb-3">
                                        {selectedRecipe.name}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < Math.round(selectedRecipe.rating!)
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                        ))}
                                        <span className="text-white font-bold ml-2 text-lg">
                                            {selectedRecipe.rating?.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                {/* Recipe Stats */}
                                <div className="flex item-center justify-center flex-col md:flex-row gap-4 mb-8">
                                    <div className="text-center bg-blue-100 dark:bg-blue-900/30 p-5 rounded-2xl lg:w-[20%]">
                                        <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                        <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Prep</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            {selectedRecipe.prepTimeMinutes}m
                                        </div>
                                    </div>
                                    <div className="text-center bg-purple-100 dark:bg-purple-900/30 p-5 rounded-2xl lg:w-[20%]">
                                        <ChefHat className="w-7 h-7 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                                        <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Cook</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            {selectedRecipe.cookTimeMinutes}m
                                        </div>
                                    </div>
                                    <div className="text-center bg-pink-100 dark:bg-pink-900/30 p-5 rounded-2xl lg:w-[20%]">
                                        <Users className="w-7 h-7 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
                                        <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Servings</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            {selectedRecipe.servings}
                                        </div>
                                    </div>
                                    <div className="text-center bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl">
                                        <Sparkles className="w-7 h-7 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                                        <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Level</div>
                                        <div className="text-lg md:text-lg font-bold text-gray-900 dark:text-white capitalize">
                                            {selectedRecipe.difficulty}
                                        </div>
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
                                        Ingredients
                                    </h3>
                                    <div className="grid gap-3">
                                        {selectedRecipe.ingredients?.map((ing, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                                <span className="text-gray-800 dark:text-gray-200 font-medium">{ing}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
                                        Instructions
                                    </h3>
                                    <div className="space-y-4">
                                        {selectedRecipe.instructions?.map((inst, i) => (
                                            <div key={i} className="flex gap-4 p-5 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shrink-0">
                                                    {i + 1}
                                                </div>
                                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed pt-1.5 font-medium">
                                                    {inst}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
                                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex flex-wrap gap-3">
                                            {selectedRecipe.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold hover:scale-105 transition-transform cursor-pointer"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogManagement;
