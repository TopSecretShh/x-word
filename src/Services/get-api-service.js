import config from "../config";

const GetApiService = {
  // TODO do we ever need to get all users?!?
  getUsers() {
    return fetch(`${config.API_ENDPOINT}/users`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json((e) => Promise.reject(e)) : res.json()
    );
  },
  getUserByUsername(user_name) {
    return fetch(`${config.API_ENDPOINT}/users/:${user_name}`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  //   TODO is it better to get all puzzles and filter for the user, or just pull user specific puzzles? Probably the latter...
  getPuzzles() {
    return fetch(`${config.API_ENDPOINT}/puzzles`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getUserPuzzles(userId) {
    return fetch(`${config.API_ENDPOINT}/puzzles/users/${userId}`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default GetApiService;
