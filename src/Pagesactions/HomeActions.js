import axios from 'axios';
import { API_BASE_URL } from '../Utils/APU_URL';

export const getTopCharts = async () => {
   let topCharts;
   topCharts = await axios.get(`${API_BASE_URL}/topcharts/`);
   //   console.log(topCharts);
   return topCharts.data;
};
export const getRecentPlay = async () => {
   let bongplaylist;
   bongplaylist = await axios.get(`${API_BASE_URL}/bongplaylist/`);
   //   console.log(bongplaylist);
   return bongplaylist.data;
};
export const getRecomended = async () => {
   let recomended;
   recomended = await axios.get(`${API_BASE_URL}/recommended/`);
   console.log('recomended', recomended);
   return recomended.data[0];
};
export const getPopular = async () => {
   let popualar;
   popualar = await axios.get(`${API_BASE_URL}/popular/`);
   console.log(popualar);
   return popualar.data;
};
