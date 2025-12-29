'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api';

export default function CandidateDashboard() {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await apiClient.get('/candidates/me');
            return response.data;
        },
    });

    const { data: applications } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const response = await apiClient.get('/applications/me');
            return response.data;
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-8">Candidate Dashboard</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm h-fit">
                        <h2 className="text-xl font-bold mb-4">My Profile</h2>
                        {profile ? (
                            <div className="space-y-4">
                                <p><strong>University:</strong> {profile.university}</p>
                                <p><strong>Sport:</strong> {profile.sport}</p>
                                <p><strong>Graduation:</strong> {profile.graduationDate}</p>
                            </div>
                        ) : (
                            <p className="text-gray-500">No profile found. Please complete it.</p>
                        )}
                        <button className="mt-6 w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">Edit Profile</button>
                    </div>

                    <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-4">My Applications</h2>
                        {applications?.length > 0 ? (
                            <div className="space-y-4">
                                {applications.map((app: any) => (
                                    <div key={app.id} className="border-b pb-4 last:border-0">
                                        <div className="flex justify-between">
                                            <h4 className="font-bold">Job #{app.jobId}</h4>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${app.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                                }`}>{app.status}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
