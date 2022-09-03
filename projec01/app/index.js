const path = require("path");
const fns = require("./funcoes.js");
const realPath = path.join(__dirname, "..", "legendas");
const symbols = [
  ".",
  "?",
  "-",
  ",",
  '"',
  "♪",
  "_",
  "<i>",
  "</i>",
  "\r",
  "[",
  "]",
  "(",
  ")",
];
function groupWords(words) {
  return Object.values(
    words.reduce((acc, word) => {
      const receivedWord = word.toLowerCase();
      const amount = acc[receivedWord] ? acc[receivedWord].amount + 1 : 1;
      acc[receivedWord] = { el: receivedWord, amount };
      return acc;
    }, {})
  );
}
fns
  .readingDirectory(realPath)
  .then((result) => fns.filteringFiles(result, ".srt"))
  .then((result) => fns.readFiles(result))
  .then((contents) => contents.join("\n"))
  .then((allContent) => allContent.split("\n"))
  .then((lines) => fns.removeEmptyLine(lines))
  .then((lines) => fns.removeIfInclude(lines, "-->"))
  .then((lines) => fns.removeCharacters(lines, symbols))
  .then((contents) => contents.join(" "))
  .then((allContent) => allContent.split(" "))
  .then(fns.removeEmptyLine)
  .then(fns.removeIfANumber)
  .then(groupWords)
  .then(fns.sortByNumericAttribute("amount"))
  .then(console.log);
