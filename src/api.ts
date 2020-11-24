import Axios, { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
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

export default Axios.create({
  baseURL: API_URL,
});
