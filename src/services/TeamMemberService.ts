import api, { _ } from '../api';
import { auth } from '../context/AuthContext';
import { OK } from '../utils/Status';


export async function index(teamId: number): Promise<TeamMember[]> {

  const { status, data } = await _(api.get(
    `/teams/${teamId}/members`,
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @param accountId string
 *
 * @throws
 * -  BAD_REQUEST
 *        problem convert ids
 *
 */
export async function store(teamId: number, body: FormData): Promise<TeamMember> {

  const { status, data } = await _(api.post(
    `/teams/${teamId}/members`,
    body,
    { headers: auth() }));

  if (status === OK) {
    return data;
  } else {
    throw status;
  }
}

/**
 * @param operator string
 *
 * @throws
 * -  BAD_REQUEST
 *        problem convert operator
 *
 */
export async function update(teamId: number, accountId: number, body: FormData): Promise<TeamMember> {

  const { status, data } = await _(api.patch(
    `/teams/${teamId}/members/${accountId}`,
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
 * -  LOCKED
 *        remove last operator
 *
 * -  UNAUTHORIZED
 *        not Operator
 */
export async function destroy(teamId: number, accountId: number): Promise<void> {

  const { status, data } = await _(api.delete(
    `/teams/${teamId}/members/${accountId}`,
    { headers: auth() }));

  if (status !== OK) {
    throw status;
  }
}
