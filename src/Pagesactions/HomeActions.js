import React from "react";
import axios from "axios";

export const getTopCharts = async () => {
  let topCharts;
  topCharts = await axios.get(
    "https://bong-backend.herokuapp.com/api/topcharts/"
  );
  //   console.log(topCharts);
  return topCharts.data;
};
export const getRecentPlay = async () => {
  let bongplaylist;
  bongplaylist = await axios.get(
    "https://bong-backend.herokuapp.com/api/bongplaylist/"
  );
  //   console.log(bongplaylist);
  return bongplaylist.data;
};
export const getRecomended = async () => {
  let recomended;
  recomended = await axios.get(
    "https://bong-backend.herokuapp.com/api/recommended/"
  );
  console.log(recomended);
  return recomended.data;
};
export const getPopular = async () => {
  let popualar;
  popualar = await axios.get("https://bong-backend.herokuapp.com/api/popular/");
  console.log(popualar);
  return popualar.data;
};
