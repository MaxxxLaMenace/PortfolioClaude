import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const useSendContact = () => {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const { data } = await axiosInstance.post('/contact', formData);
      return data;
    },
  });
};
