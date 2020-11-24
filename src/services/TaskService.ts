
import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';

/**
 * @throws
 * - NOT_FOUND
 */
export async function index(projectId: number): Promise<Task[]> {
    const { status, data } = await _(api.get(
        `/projects/${projectId}/tasks`,
        { headers: auth() }));

    if (status === OK) {
        return data;
    } else {
        throw status;
    }

}

/**
 * @param description string
 * @param ordinal ?number
 * 
 * @throws
 * - UNAUTORIZED    if the current account cannot manage project members
 * - BAD_REQUEST    
 *          description.length() < 1 || >= 80
 */
export async function store(projectId: number, body: FormData): Promise<Task> {
    const { status, data } = await _(api.post(
        `/projects/${projectId}/tasks`,
        body,
        { headers: auth() }));

    if (status === OK) {
        return data;
    } else {
        throw status;
    }
}



/**
 * @param description ?string
 * @param ordinal ?number
 * @param status ?string
 * @param options ?string
 * @param assingTo? :tring
 * 
 * @throws
 * - UNAUTORIZED    if the current account cannot manage project members
 * - NOT_FOUND      not found task id and account id
 * - BAD_REQUEST    description.length() < 1 || >= 80
 */
export async function uptade(projectId: number, taskId: number, body: FormData): Promise<Task> {
    const { status, data } = await _(api.patch(
        `/projects/${projectId}/tasks/${taskId}`,
        body,
        { headers: auth() }));

    if (status === OK) {
        return data;
    } else {
        throw status;
    }
}

/**
 * @throws
 * - UNAUTORIZED    if the current account cannot manage project members
 * - NOT_FOUND
 */
export async function destroy(projectId: number, taskId: number): Promise<void> {
    const { status } = await _(api.delete(
        `/projects/${projectId}/tasks${taskId}`,
        { headers: auth() }));

    if (status === OK) {
        return;
    } else {
        throw status;
    }
}
