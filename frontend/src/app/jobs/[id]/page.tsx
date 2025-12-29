'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

export default function JobDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data: job, isLoading } = useQuery({
        queryKey: ['job', id],
        queryFn: async () => {
            const response = await apiClient.get(`/jobs/${id}`);
            return response.data;
        },
    });

    const applyMutation = useMutation({
        mutationFn: async () => {
            await apiClient.post('/applications', { jobId: id });
        },
        onSuccess: () => {
            alert('Application submitted successfully!');
            router.push('/');
        },
        onError: () => {
            alert('You have already applied or there was an error.');
        }
    });

    if (isLoading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto max-w-3xl bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{job.title}</h1>
                    <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-semibold">{job.sport}</span>
                </div>

                <div className="mb-8">
                    <p className="text-gray-500 mb-2">Location: <span className="text-gray-900 font-medium">{job.location}</span></p>
                    {job.optFriendly && (
                        <span className="text-green-600 font-bold">✓ OPT Friendly Organization</span>
                    )}
                </div>

                <div className="prose max-w-none mb-10">
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                </div>

                <button
                    onClick={() => applyMutation.mutate()}
                    disabled={applyMutation.isPending}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition"
                >
                    {applyMutation.isPending ? 'Submitting...' : 'Apply Now'}
                </button>
            </div>
        </div>
    );
}
