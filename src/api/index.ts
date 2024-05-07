import request from '../libs/api';

export function _getUser(id: number) {
  return request('GET', `/api/user/detail?id=${id}`);
}

export function _updateUser(id: number, user: any) {
  return request('POST', `/api/user/edit?id=${id}`, user);
}
