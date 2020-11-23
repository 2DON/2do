import Axios, { AxiosPromise, AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';
import { API_URL } from './config';

const isAxiosError = (error: any): error is AxiosError => 'response' in error;

export async function _(promisse: AxiosPromise<any>): Promise<AxiosResponse<any>> {
  try {
    return await promisse;
  } catch(error) {
    if (isAxiosError(error) && error.response) {
      return error.response;
    }
    throw new Error(error);
  }
}

export default axios.create({
  baseURL: API_URL,
});
