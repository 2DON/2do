import { AxiosResponse } from 'axios';
import api from '../api';
import { auth } from '../context/AuthContext';

export async function getProject(id: number): Promise<Project> {
  return (await api.get(`/projects/show/${encodeURIComponent(id)}`)).data;
}

export async function canCreateProject(): Promise<boolean> {
  return (await api.get('/projects/can-create', { headers: auth() })).data;
}

export async function edit(
  changes: FormData
): Promise<Promise<AxiosResponse<Project>>> {
  return api.patch('/projects/edit', changes, { headers: auth() });
}

export async function store(
  description: string,
  observation: string
): Promise<AxiosResponse<void>> {
  return (
    await api.post(
      '/projects',
      { description, observation },
      { headers: auth() }
    )
  ).data;
}
