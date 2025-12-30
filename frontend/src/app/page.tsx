'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import Link from 'next/link';
import HeroScene from '@/components/HeroScene';
import AnimatedCard from '@/components/AnimatedCard';
import { motion } from 'framer-motion';

export default function HomePage() {
    const { data: jobs, isLoading } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const response = await apiClient.get('/jobs');
            return response.data;
        },
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <HeroScene />

            <header className="fixed top-0 z-50 w-full border-b border-white/10 glass">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold tracking-tighter text-indigo-400"
                    >
                        SportsMajors
                    </motion.h1>
                    <nav className="flex items-center space-x-8 text-sm font-medium">
                        <Link href="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                        <Link href="/register" className="bg-indigo-600 px-5 py-2.5 rounded-full font-semibold hover:bg-indigo-500 hover:scale-105 transition-all active:scale-95">Join Now</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-6 pt-32 pb-24">
                <section className="text-center mb-24 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-500">
                            Elite Careers for Student-Athletes
                        </h2>
                        <p className="text-xl text-slate-400 font-medium">
                            Find OPT-friendly roles in top sports organizations. Fast-track your career trajectory.
                        </p>
                    </motion.div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-3xl font-bold tracking-tight">Recent Job Openings</h3>
                        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-indigo-500/50 to-transparent" />
                    </div>

                    {isLoading ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-64 rounded-xl bg-slate-900 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {jobs?.content?.map((job: any, idx: number) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <AnimatedCard>
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{job.sport}</span>
                                                {job.optFriendly && (
                                                    <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">OPT Friendly</span>
                                                )}
                                            </div>
                                            <h4 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{job.title}</h4>
                                            <p className="text-slate-500 font-medium mb-6 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {job.location}
                                            </p>
                                            <Link href={`/jobs/${job.id}`} className="inline-flex items-center text-indigo-400 font-bold hover:text-indigo-300 transition-colors group">
                                                View Details
                                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                            </Link>
                                        </div>
                                    </AnimatedCard>
                                </motion.div>
                            ))}
                            {jobs?.content?.length === 0 && (
                                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                                    <p className="text-slate-500 text-lg">No jobs found. Be the first to post!</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
