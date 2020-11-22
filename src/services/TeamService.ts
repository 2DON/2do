import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';

export async function index(): Promise<Team[]> {

  const { status, data } = await _(api.get(
    '/teams',
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @param name string
 *
 * @throws
 * -  BAD_REQUEST
 *        name.length() < 1 || >= 45 bytes
 *
 * -  UPGRADE_REQUIRED
 */
export async function store(body: FormData): Promise<Team> {

  const { status, data } = await _(api.post(
    '/teams',
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
export async function show(teamId: number): Promise<Team> {

  const { status, data } = await _(api.get(
    `/teams/${teamId}`,
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @param name string
 *
 * @throws
 * -  BAD_REQUEST
 *        name.length() < 1 || >= 45 bytes
 *
 * -  UPGRADE_REQUIRED
 */
export async function update(teamId: number, body: FormData): Promise<Team> {

  const { status, data } = await _(api.patch(
    `/teams/${teamId}`,
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
export async function updateIcon(teamId: number, body: FormData): Promise<Team> {

  const { status, data } = await _(api.put(
    `/teams/${teamId}/icon`,
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
 * -  UNAUTHORIZED
 *        not Operator
 */
export async function destroy(teamId: number): Promise<void> {

  const { status, data } = await _(api.delete(
    `/teams/${teamId}`,
    { headers: auth() }));

  if (status !== OK) {
    throw status;
  }
}
