const fs = require("fs");
const path = require("path");

function readingDirectory(directory) {
  return new Promise((resolve, reject) => {
    try {
      let files = fs.readdirSync(directory);
      files = files.map((file) => path.join(directory, file));
      resolve(files);
    } catch (e) {
      reject(e);
    }
  });
}
function readFile(caminho) {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(caminho, { encoding: "utf-8" });
      resolve(content.toString());
    } catch (e) {
      reject(e);
    }
  });
}
function readFiles(caminhos) {
  return Promise.all(caminhos.map((caminho) => readFile(caminho)));
}
function removeEmptyLine(arry) {
  return arry.filter((el) => el.trim());
}
function removeIfInclude(arry, text) {
  return arry.filter((el) => {
    return !el.includes(text);
  });
}
function filteringFiles(arry, extension) {
  return arry.filter((el) => el.endsWith(extension));
}

function removeIfANumber(arry) {
  return arry.filter((el) => {
    let num = parseInt(el.trim());
    return num !== num;
  });
}

function removeCharacters(arry, chars) {
  return arry.map((el) => {
    let newText = el;
    chars.forEach((char) => {
      newText = newText.split(char).join("");
    });
    return newText;
  });
}

function sortByNumericAttribute(attr, order = "dec") {
  return function (arry) {
    const dec = (ob01, ob02) => ob02[attr] - ob01[attr];
    const crec = (ob01, ob02) => ob01[attr] - ob02[attr];

    return arry.sort(order === "dec" ? dec : crec);
  };
}

module.exports = {
  readingDirectory,
  filteringFiles,
  readFiles,
  removeIfInclude,
  removeEmptyLine,
  removeIfANumber,
  removeCharacters,
  sortByNumericAttribute,
};
