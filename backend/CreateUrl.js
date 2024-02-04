const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const characters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "-",
  "_",
];

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function getURL() {
  let URL = "";
  const rand = () => Math.floor(Math.random() * 3);

  for (let i = 0; i < 11; i++) {
    const random = rand();
    if (random === 1) {
      URL += getRandomElement(numbers).toString();
    } else {
      URL += getRandomElement(characters).toString();
    }
  }
  return URL;
}

