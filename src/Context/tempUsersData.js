export const users = [
  {
    id: 0,
    username: "Bob",
    password: "bob",
  },
  {
    id: 1,
    username: "Jon",
    password: "jon",
  },
];

// TODO NEED TO CHANGE username to user_id in order to function with backend
export const userPuzzles = [
  {
    id: 0,
    username: "Bob",
    title: "Small",
    rows: 3,
    cols: 3,
    blocks: [true, true, true, true, false, true, true, true, true],
    letters: ["", "", "", "", "", "", "", "", ""],
    cell_id: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    clues_across: [
      {
        id: "1 across",
        clue: "a",
      },
      {
        id: "3 across",
        clue: "b",
      },
    ],
    clues_down: [
      {
        id: "1 down",
        clue: "c",
      },
      {
        id: "2 down",
        clue: "d",
      },
    ],
  },
  {
    id: 1,
    username: "Bob",
    title: "Medium",
    rows: 4,
    cols: 4,
    blocks: [
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
    ],
    letters: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    cell_id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    clues_across: [
      {
        id: "1 across",
        clue: "a",
      },
      {
        id: "3 across",
        clue: "b",
      },
    ],
    clues_down: [
      {
        id: "1 down",
        clue: "c",
      },
      {
        id: "2 down",
        clue: "d",
      },
    ],
  },
];
