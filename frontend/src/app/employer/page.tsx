'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import Link from 'next/link';

export default function EmployerDashboard() {
    const { data: org } = useQuery({
        queryKey: ['organization'],
        queryFn: async () => {
            const response = await apiClient.get('/employers/me');
            return response.data;
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Employer Portal</h1>
                    <Link href="/jobs/new" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">Post a Job</Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
                        <h2 className="text-xl font-bold mb-4">{org?.companyName || 'My Organization'}</h2>
                        <p className="text-gray-600 mb-6">{org?.description || 'No description provided.'}</p>
                        <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">Settings</button>
                    </div>

                    <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-indigo-50 p-6 rounded-xl">
                                <span className="block text-3xl font-bold text-indigo-600">0</span>
                                <span className="text-sm text-gray-600">Active Jobs</span>
                            </div>
                            <div className="bg-green-50 p-6 rounded-xl">
                                <span className="block text-3xl font-bold text-green-600">0</span>
                                <span className="text-sm text-gray-600">Applications Received</span>
                            </div>
                        </div>
                        <p className="mt-8 text-center text-gray-400">Manage your jobs and candidates efficiently.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
