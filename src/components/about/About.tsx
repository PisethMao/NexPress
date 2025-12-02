"use client";
import { motion } from "framer-motion";
import { teams } from "@/Data/teamData";

export default function About() {
  return (
    <section className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto mt-50">
        <section className="py-14 mb-20">
          <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                NexPress was born from a simple belief:{" "}
                <strong>
                  blogging should feel effortless, inspiring, and beautifully
                  crafted.
                </strong>
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Frustrated by platforms that were slow, cluttered, and
                creatively limiting, our founder set out to design something
                different— a tool that empowers creators instead of holding them
                back.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Today, NexPress is trusted by writers, designers, and
                storytellers who value{" "}
                <strong>speed, elegance, and control.</strong>
                Every feature is intentional: minimalist layouts that highlight
                your words, lightning-fast performance that keeps readers
                engaged, and workflows that let you focus on what matters
                most—your voice.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                NexPress is more than a platform. It's a{" "}
                <strong>next-generation publishing experience</strong>, blending
                expressive design with technical precision to redefine how
                creators share their ideas with the world.
              </p>
              <blockquote className="italic text-xl text-gray-900 dark:text-gray-500 mt-8">
                “We don't just build tools. We build freedom for creators.”
              </blockquote>
            </div>
            <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="AI Neural Network Visualization"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
              {teams.map((team, index) => (
                <div
                  key={team.id}
                  className="w-full group relative rounded-3xl overflow-hidden cursor-pointer backdrop-blur-xl bg-white/20 dark:bg-white/10 shadow-[0_8px_20px_rgba(0, 0, 0, 0.1)] border border-white/30 dark:border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0, 0, 0, 0.15)]"
                >
                  <motion.figure
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="w-full group relative rounded-3xl overflow-hidden cursor-pointer backdrop-blur-xl bg-white/20 dark:bg-white/10 shadow-[0_8px_20px_rgba(0, 0, 0, 0.1)] border border-white/30 dark:border-white/10 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0, 0, 0, 0.15)]"
                  >
                    <div className="aspect-video overflow-hidden rounded-full mx-auto w-40 h-40 mt-6">
                      <motion.img
                        src={team.image}
                        alt={team.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      ></motion.img>
                    </div>
                    <div className="p-6">
                      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {team.name}
                      </h3>
                      <p className="mt-2 text-blue-600 font-bold text-sm leading-relaxed">
                        {team.position}
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {team.description}
                      </p>
                    </div>
                  </motion.figure>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
    </section>
  );
}
