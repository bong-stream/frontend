import React from "react";
import axios from "axios";
// let url = "http://localhost:3001";
let url = "https://bong-backend.herokuapp.com";

const getCategory = async () => {
  let Category;

  Category = await axios.get(`${url}/api/category`);
  return Category.data;
};

const activeCategory = async (active, id) => {
  let Category;
  let data = { active, id };
  Category = await axios.put(`${url}/api/category/activecategory`, data);
  // console.log(Category);
  return Category.data;
};

const addCategory = async (data) => {
  let Category;
  console.log(data);
  Category = await axios.post(`${url}/api/category`, data);
  console.log(Category);
  return Category.data;
};

const editCategory = async (data) => {
  let Category;
  Category = await axios.put(`${url}/api/category`, data);
  return Category.data;
};

const deleteCategory = async (id) => {
  let Category;

  const response = await axios({
    method: `DELETE`,
    url: `${url}/api/category`,
    data: {
      id: id,
    },
  });
  console.log(response);
  return response.data;
};

export {
  getCategory,
  addCategory,
  deleteCategory,
  editCategory,
  activeCategory,
};
