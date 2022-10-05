function execute(fn, ...params) {
  return fn(...params);
}

function somar(n1, n2, n3) {
  return n1 + n2 + n3;
}

function multiplicar(n1, n2) {
  return n1 * n2;
}

console.log(execute(somar, 5, 10, 20));

console.log(execute(multiplicar, 5, 10));
