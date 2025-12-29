import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api';

export const useAuth = () => {
    const login = useMutation({
        mutationFn: async (data: any) => {
            const response = await apiClient.post('/auth/login', data);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userRole', response.data.role);
            return response.data;
        },
    });

    const register = useMutation({
        mutationFn: async (data: any) => {
            const response = await apiClient.post('/auth/register', data);
            return response.data;
        },
    });

    const logout = useMutation({
        mutationFn: async () => {
            await apiClient.post('/auth/logout');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
        },
    });

    return { login, register, logout };
};
