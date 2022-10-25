import axios from "axios";
const instance = axios.create({
  baseURL:
    "https://www.fastmock.site/mock/0bc3a0b8ff81fcf4862a9ad2d714479c/api",
  timeout: 10000,
});
// post请求
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: { "Content-type": "application/json" },
      })
      .then(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
  });
};
// get请求
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
export { post, get };
