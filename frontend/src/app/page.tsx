'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import Link from 'next/link';

export default function HomePage() {
    const { data: jobs, isLoading } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const response = await apiClient.get('/jobs');
            return response.data;
        },
    });

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-indigo-600 py-6 text-white shadow-lg">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <h1 className="text-2xl font-bold">SportsMajors</h1>
                    <nav className="space-x-4">
                        <Link href="/login" className="hover:text-indigo-200">Login</Link>
                        <Link href="/register" className="bg-white px-4 py-2 text-indigo-600 rounded-md font-semibold hover:bg-gray-100 transition">Join Now</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <section className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Elite Careers for Student-Athletes</h2>
                    <p className="text-lg text-gray-600">Find OPT-friendly roles in top sports organizations.</p>
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-6">Recent Job Openings</h3>
                    {isLoading ? (
                        <p>Loading jobs...</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {jobs?.content?.map((job: any) => (
                                <div key={job.id} className="border rounded-xl p-6 hover:shadow-xl transition-shadow border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">{job.sport}</span>
                                        {job.optFriendly && (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">OPT Friendly</span>
                                        )}
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                                    <p className="text-gray-500 text-sm mb-4">{job.location}</p>
                                    <Link href={`/jobs/${job.id}`} className="text-indigo-600 font-semibold hover:underline">View Details →</Link>
                                </div>
                            ))}
                            {jobs?.content?.length === 0 && <p>No jobs found. Be the first to post!</p>}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
