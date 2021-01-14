import config from "../config";

const NonGetApiService = {
  addUser(newUser) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  addPuzzle(newPuzzle) {
    return fetch(`${config.API_ENDPOINT}/puzzles`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPuzzle),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updatePuzzle(puzzleId, newPuzzle) {
    return fetch(`${config.API_ENDPOINT}/puzzles/${puzzleId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPuzzle),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : true
    );
  },
  deletePuzzle(puzzleId) {
    return fetch(`${config.API_ENDPOINT}/puzzles/${puzzleId}`, {
      method: "DELETE",
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : true
    );
  },
};

export default NonGetApiService;
