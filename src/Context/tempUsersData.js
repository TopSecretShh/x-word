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

/* TODO I think rows and cols need to be saved and passed */
// TODO does cellId also need to be passed? it is a prop in App for puzzle-editor
export const userPuzzles = [
  {
    id: 1,
    username: "Bob",
    title: "Big",
    rows: "",
    cols: "",
    cells: [],
    clues_across: [],
    clues_down: [],
  },
  {
    id: 2,
    username: "Bob",
    title: "Small",
    rows: 3,
    cols: 3,
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
    rows: 4,
    cols: 4,
    cells: [
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
    ],
    clues_across: [],
    clues_down: [],
  },
];
