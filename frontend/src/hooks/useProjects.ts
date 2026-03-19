import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { Project, ApiResponse, ProjectFormData } from '../types';

const PROJECTS_KEY = 'projects';

export const useProjects = () => {
  return useQuery({
    queryKey: [PROJECTS_KEY],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<Project[]>>('/projects');
      return data.data ?? [];
    },
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: [PROJECTS_KEY, 'featured'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<Project[]>>('/projects/featured');
      return data.data ?? [];
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: [PROJECTS_KEY, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<Project>>(`/projects/${id}`);
      return data.data;
    },
    enabled: Boolean(id),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectData: ProjectFormData) => {
      const { data } = await axiosInstance.post<ApiResponse<Project>>('/projects', projectData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data: projectData }: { id: string; data: Partial<ProjectFormData> }) => {
      const { data } = await axiosInstance.put<ApiResponse<Project>>(`/projects/${id}`, projectData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/projects/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
    },
  });
};
