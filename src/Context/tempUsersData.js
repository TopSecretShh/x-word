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

export const userPuzzles = [
  {
    id: 1,
    username: "Bob",
    title: "Big",
    cells: [],
    clues_across: [],
    clues_down: [],
  },
  {
    id: 2,
    username: "Bob",
    title: "Small",
    cells: [true, true, true, true, false, true, true, true, true],
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
    id: 3,
    username: "Bob",
    title: "Medium",
    cells: [],
    clues_across: [],
    clues_down: [],
  },
];
