import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';

/**
 * @function
 * @async
 * @description returns the index of project members
 * @param projectId: number
 * @returns Promise<ProjectMember[]>
 */
export async function index(projectId: number): Promise<ProjectMember[]> {

  const { status, data } = await _(api.get(
    `/projects/${projectId}/members`,
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @function
 * @async
 * @param accountId string
 * @param teamId? string
 * @param permission string
 *
 * @throws
 * -  BAD_REQUEST
 *        problems to convert ids and permission
 */
export async function add(projectId: number, body: FormData): Promise<ProjectMember> {

  const { status, data } = await _(api.post(
    `/projects/${projectId}/members`,
    body,
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @function
 * @async
 * @param accountId string
 * @param teamId? string
 * @param permission? string
 * @returns Promise<ProjectMember>
 *
 * @throws
 * -  BAD_REQUEST
 *        problems to convert ids and permission
 */
export async function update(projectId: number, accountId: number, body: FormData): Promise<ProjectMember> {

  const { status, data } = await _(api.patch(
    `/projects/${projectId}/members/${accountId}`,
    body,
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @function
 * @async
 * @param projectId: number
 * @param accountId: number
 * @returns Promise<void>
 *
 * @throws
 *
 * -  BAD_REQUEST
 *        not owner
 *        problems to convert ids
 */
export async function destroy(projectId: number, accountId: number): Promise<void> {

  const { status, data } = await _(api.delete(
    `/projects/${projectId}/members/${accountId}`,
    { headers: auth() }));

  if (status !== OK) {
    throw status;
  }
}
