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
  return words.reduce((group, word) => {
    const receivedWord = word.toLowerCase();
    if (group[receivedWord]) {
      group[receivedWord] += 1;
    } else {
      group[receivedWord] = 1;
    }
    return group;
  }, {});
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
  .then(console.log);
