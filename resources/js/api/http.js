import axios from "axios";

const http = axios.create({
  baseURL: 'http://laraveltest.test/',
  timeout: 60000,
});

export { http };