import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';

export async function index(archived?: boolean): Promise<Project[]> {

  const { status, data } = await _(api.get(
    '/projects',
    { headers: auth(), params: { archived } }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @param description string
 * @param observation? string
 * @param ordinal? boolean
 *
 * @throws
 * -  BAD_REQUEST
 *        description.length() <= 1 || > 1024 bytes
 *        observation.length() <= 1 || > 250 bytes
 */
export async function store(body: FormData): Promise<Project> {

  const { status, data } = await _(api.post(
    '/projects',
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
 *
 * -  NOT_FOUND
 */
export async function show(projectId: number): Promise<Project> {

  const { status, data } = await _(api.get(
    `/projects/${projectId}`,
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @param description string
 * @param observation? string
 * @param ordinal? boolean
 * @param options? string
 *
 * @throws
 * -  BAD_REQUEST
 *        description.length() <= 1 || > 1024 bytes
 *        observation.length() <= 1 || > 250 bytes
 */
export async function update(projectId: number, body: FormData): Promise<Project> {

  const { status, data } = await _(api.patch(
    `/projects/${projectId}`,
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
 *
 * -  BAD_REQUEST
 *        IOException || !ImageEncoder.supports(icon)
 *
 */
export async function updateIcon(projectId: number, body: FormData): Promise<Project> {

  const { status, data } = await _(api.put(
    `/projects/${projectId}/icon`,
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
 *
 * -  NOT_FOUND
 *
 * -  UNAUTHORIZED
 *        account not owner
 *
 */
export async function toggleArchived(projectId: number): Promise<Project> {

  const { status, data } = await _(api.get(
    `/projects/${projectId}/toggle-archived`,
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @throws
 *
 * -  BAD_REQUEST
 *        if ownerId.equals(newOwnerId)
 *
 * -  UPGRADE_REQUIRED
 *
 */
export async function transferOwnership(projectId: number, newOwnerId: number): Promise<void> {

  const { status, data } = await _(api.get(
    `/projects/${projectId}/transfer-to/${newOwnerId}`,
    { headers: auth() }));

  if (status !== OK) {
    throw status;
  }
}

/**
 * @throws
 *
 * -  BAD_REQUEST
 *        not owner
 */
export async function destroy(projectId: number): Promise<void> {

  const { status, data } = await _(api.delete(
    `/projects/${projectId}`,
    { headers: auth() }));

  if (status !== OK) {
    throw status;
  }
}
