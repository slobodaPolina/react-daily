import axios, { AxiosResponse } from 'axios';

interface CatPicture {
  id: number;
  url: string;
}

export const getCatUrl = async () =>
  axios
    .get('https://api.thecatapi.com/v1/images/search')
    .then(({ data }: AxiosResponse<CatPicture[]>) => data[0]?.url);
