import * as types from '../types';
import {axios, api_url} from '../../api-url';

export const handleGetCheckIn = token => ({
  type: types.GET_CHECKIN,
  payload: axios({
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    url: `${api_url}/checkin`,
  }),
});
