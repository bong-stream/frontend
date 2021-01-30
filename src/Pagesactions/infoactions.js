import React from "react";
import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://bong-backend.herokuapp.com";
//
const getTags = async () => {
  let Tags;

  Tags = await axios.get(`${url}/api/tags`);
  // Tags = await axios.get(`http://localhost:3001/api/`);
  // console.log(Tags);
  return Tags.data;
};
const getLabels = async () => {
  let Labels;

  Labels = await axios.get(`${url}/api/labels`);
  // Labels = await axios.get(`http://localhost:3001/api/`);
  // console.log(Labels);
  return Labels.data;
};
const getProfession = async () => {
  let Profession;

  Profession = await axios.get(`${url}/api/profession`);
  // Profession = await axios.get(`http://localhost:3001/api/`);
  // console.log(Profession);
  return Profession.data;
};

const findTags = async (id) => {
  let Tags;

  Tags = await axios.get(`${url}/api/tags/id`);
  // Tags = await axios.get(`http://localhost:3001/api/`);
  // console.log(Tags);
  return Tags.data;
};

const activeTags = async (active, id) => {
  let Tags;
  let data = { active, id };
  Tags = await axios.put(`${url}/api/tags/activeTags`, data);
  // console.log(Tags);
  return Tags.data;
};

const addTags = async (data) => {
  let Tags;
  console.log(data);
  Tags = await axios.post(`${url}/api/tags`, data);
  console.log(Tags);
  return Tags.data;
};
const addLabels = async (data) => {
  let Labels;
  console.log(data);
  Labels = await axios.post(`${url}/api/labels`, data);
  console.log(Labels);
  return Labels.data;
};
const addProfession = async (data) => {
  let Profession;
  console.log(data);
  Profession = await axios.post(`${url}/api/profession`, data);
  console.log(Profession);
  return Profession.data;
};

const editTags = async (data) => {
  let Tags;
  Tags = await axios.put(`${url}/api/tags`, data);
  return Tags.data;
};
const editLabels = async (data) => {
  let Labels;
  Labels = await axios.put(`${url}/api/labels`, data);
  return Labels.data;
};
const editProfession = async (data) => {
  let Profession;
  Profession = await axios.put(`${url}/api/profession`, data);
  return Profession.data;
};

const deleteTags = async (id) => {
  let Tags;

  const response = await axios({
    method: `DELETE`,
    url: `${url}/api/tags`,
    data: {
      id: id,
    },
  });
  console.log(response);
  return response.data;
};
const deleteLabels = async (id) => {
  let Labels;

  const response = await axios({
    method: `DELETE`,
    url: `${url}/api/labels`,
    data: {
      id: id,
    },
  });
  console.log(response);
  return response.data;
};
const deleteProfession = async (id) => {
  let Profession;

  const response = await axios({
    method: `DELETE`,
    url: `${url}/api/profession`,
    data: {
      id: id,
    },
  });
  console.log(response);
  return response.data;
};

export {
  getTags,
  addTags,
  deleteTags,
  editTags,
  activeTags,
  getLabels,
  addLabels,
  deleteLabels,
  editLabels,
  getProfession,
  addProfession,
  deleteProfession,
  editProfession,
};
