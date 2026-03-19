import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { Skill, ApiResponse, SkillFormData } from '../types';

const SKILLS_KEY = 'skills';

export const useSkills = () => {
  return useQuery({
    queryKey: [SKILLS_KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<Skill[]>>('/skills');
      return data.data ?? [];
    },
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skillData: SkillFormData) => {
      const { data } = await axiosInstance.post<ApiResponse<Skill>>('/skills', skillData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKILLS_KEY] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data: skillData }: { id: string; data: Partial<SkillFormData> }) => {
      const { data } = await axiosInstance.put<ApiResponse<Skill>>(`/skills/${id}`, skillData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKILLS_KEY] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/skills/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKILLS_KEY] });
    },
  });
};
