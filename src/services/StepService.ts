import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';


/**
 * 
 * @throws
 * 
 * UNAUTHORIZED   project and account exists and the account is part of the project
 */
export async function index(projectId: number, taskId: number): Promise<Step[]> {
    const { status, data } = await _(api.get(
        `/projects/${projectId}/tasks/${taskId}/steps`,
        { headers: auth() }));

    if (status === OK) {
        return data;
    } else {
        throw status;
    }
}


/**
 * 
 * description: string
 * 
 * ordinal?: number
 * 
 * @throws
 * 
 * UNAUTHORIZED    if the current account cannot manage steps
 * 
 * BAD_REQUEST     (description.length() < 1 || >= 80
 */
export async function store(projectId: number, taskId: number, body: FormData): Promise<Step> {
    const { status, data } = await _(api.post(
        `/projects/${projectId}/tasks/${taskId}/steps`,
        body,
        { headers: auth() }));

    if (status === OK) {
        return data;
    } else {
        throw status;
    }
}


/**
 * 
 * descriprion?: string
 * 
 * status?: string
 * 
 * ordinal?: number
 * 
 * observation?: string
 * 
 * @throws
 * 
 * UNAUTHORIZED   not have permission to modified
 * 
 * NOT_FOUND      not found task id, project id or step id
 * 
 * BAD_REQUEST    description.length() < 1 || >= 80
 */
export async function update(projectId: number, taskId: number, stepId: number, body: FormData): Promise<Step> {
    const { status, data } = await _(api.patch(
        `/projects/${projectId}/tasks/${taskId}/steps/${stepId}`,
        body,
        { headers: auth() }));

    if (status === OK) {
        return data;
    } else {
        throw status;
    }
}



/**
 * 
 * @throws
 * 
 * UNAUTHORIZED    not have permission to delete the step
 * 
 * NOT_FOUND       not find step id, task id or project id
 */
export async function destroy(projectId: number, taskId: number, stepId: number): Promise<void> {
    const { status } = await _(api.delete(
        `/projects/${projectId}/tasks/${taskId}/steps/${stepId}`,
        { headers: auth() }));

    if (status === OK) {
        return;
    } else {
        throw status;
    }
}