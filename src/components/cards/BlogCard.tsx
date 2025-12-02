/* eslint-disable @next/next/no-img-element */
import { PostType } from "@/types/postType";

// This is a Server Component by default
const BlogCard = async () => {
  // Fetching data on the server side
  const ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${ENDPOINT}posts`);
  const data: PostType[] = await response.json();

  return (
    <main className="min-h-screen py-16 px-4">
      {/* Hero Section */}
      <header className="container mx-auto text-center mt-32 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-7">
          Explore Categories
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Discover amazing content across different topics
        </p>
      </header>

      {/* Cards Grid */}
      <section className="container mx-auto mt-32 cursor-pointer">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {data.map((post, index) => (
            <article
              key={post.id}
              className="group relative bg-white/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image Container */}
              <figure className="relative h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  src={post.thumbnail || post.image}
                  alt={post.title}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-indigo-600 shadow-md transform -translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                  {post.category}
                </span>

                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 backdrop-blur-sm rounded-full text-xs font-semibold shadow-md transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500 ${
                    post.status === "published"
                      ? "bg-green-500/90 text-white"
                      : "bg-yellow-500/90 text-white"
                  }`}
                >
                  {post.status}
                </span>
              </figure>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {post.content}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200/50">
                  <time className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>

                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    ID: {post.id}
                  </span>
                </div>

                {/* Read More Button */}
                <a
                  href={post.url}
                  className="block w-full mt-4 py-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center rounded-xl font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Read More
                    <svg
                      className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </a>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-purple-400/20 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogCard;
