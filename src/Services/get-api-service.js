import config from "../config";
import TokenService from "./token-service";

const GetApiService = {
  getUsers() {
    return fetch(`${config.API_ENDPOINT}/users`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json((e) => Promise.reject(e)) : res.json()
    );
  },
  getUserByUsername(user_name) {
    return fetch(`${config.API_ENDPOINT}/users/:${user_name}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getUser() {
    return fetch(`${config.API_ENDPOINT}/users/getusername`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getPuzzles() {
    return fetch(`${config.API_ENDPOINT}/puzzles`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getUserPuzzles(userId) {
    return fetch(`${config.API_ENDPOINT}/puzzles/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default GetApiService;
