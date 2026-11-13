export function evaluateExpression(expression: string, degrees = false): number {
  if (!expression.trim() || expression.length > 256) throw new Error("Enter an expression of up to 256 characters.");
  const tokens = expression.toLowerCase().match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[a-z]+|[()+\-*/^]|\S/g) ?? [];
  let position = 0;
  let depth = 0;
  const angle = degrees ? Math.PI / 180 : 1;
  const factorial = (value: number) => {
    if (!Number.isInteger(value) || value < 0 || value > 170) throw new Error("Factorial requires an integer between 0 and 170.");
    let product = 1;
    for (let factor = 2; factor <= value; factor++) product *= factor;
    return product;
  };
  const functions: Record<string, (value: number) => number> = {
    sin: value => Math.sin(value * angle), cos: value => Math.cos(value * angle), tan: value => Math.tan(value * angle),
    asin: value => Math.asin(value) / angle, acos: value => Math.acos(value) / angle, atan: value => Math.atan(value) / angle,
    sqrt: Math.sqrt, abs: Math.abs, ln: Math.log, log: Math.log10, exp: Math.exp, fact: factorial,
  };
  function primary(): number {
    depth += 1;
    if (depth > 32) throw new Error("Expression is too deeply nested.");
    const token = tokens[position++];
    let value: number;
    if (token === "(") {
      value = sum();
      if (tokens[position++] !== ")") throw new Error("Close each parenthesis.");
    } else if (token === "pi") value = Math.PI;
    else if (token === "e") value = Math.E;
    else if (functions[token]) {
      if (tokens[position++] !== "(") throw new Error("Functions need parentheses, for example sqrt(9).");
      value = functions[token](sum());
      if (tokens[position++] !== ")") throw new Error("Close each function parenthesis.");
    } else {
      value = Number(token);
      if (!token || !Number.isFinite(value)) throw new Error("Use numbers, supported functions and arithmetic operators.");
    }
    depth -= 1;
    return value;
  }
  function power(): number {
    const value = primary();
    if (tokens[position] !== "^") return value;
    position += 1;
    return value ** unary();
  }
  function unary(): number {
    if (tokens[position] === "+") { position++; return unary(); }
    if (tokens[position] === "-") { position++; return -unary(); }
    return power();
  }
  function product(): number {
    let value = unary();
    while (tokens[position] === "*" || tokens[position] === "/") {
      const operator = tokens[position++];
      const operand = unary();
      if (operator === "/" && operand === 0) throw new Error("Cannot divide by zero.");
      value = operator === "*" ? value * operand : value / operand;
    }
    return value;
  }
  function sum(): number {
    let value = product();
    while (tokens[position] === "+" || tokens[position] === "-") {
      const operator = tokens[position++];
      const operand = product();
      value = operator === "+" ? value + operand : value - operand;
    }
    return value;
  }
  const result = sum();
  if (position !== tokens.length || !Number.isFinite(result)) throw new Error("Expression has no finite real result. Check its syntax and domain.");
  return Number(result.toPrecision(14));
}

export function matrixCalculation(firstText: string, secondText: string, size: number, operation: string): string {
  const parse = (text: string): number[][] => {
    if (text.length > 4096 || ![2, 3].includes(size)) throw new Error("Choose a 2 × 2 or 3 × 3 matrix.");
    let matrix: unknown;
    try { matrix = JSON.parse(text); } catch { throw new Error("Enter matrices as JSON rows, for example [[1,2],[3,4]]."); }
    if (!Array.isArray(matrix) || matrix.length !== size || matrix.some(row => !Array.isArray(row) || row.length !== size || row.some(value => !["number", "string"].includes(typeof value) || String(value).trim() === "" || !Number.isFinite(Number(value))))) throw new Error(`Enter a valid number in every cell of each ${size} × ${size} matrix.`);
    return matrix.map(row => row.map(Number));
  };
  const first = parse(firstText);
  const second = parse(secondText);
  if (!["add", "subtract", "multiply"].includes(operation)) throw new Error("Choose a supported matrix operation.");
  const result = first.map((row, rowIndex) => row.map((value, columnIndex) => operation === "add" ? value + second[rowIndex][columnIndex] : operation === "subtract" ? value - second[rowIndex][columnIndex] : row.reduce((total, entry, innerIndex) => total + entry * second[innerIndex][columnIndex], 0)));
  if (result.some(row => row.some(value => !Number.isFinite(value)))) throw new Error("Matrix values are too large.");
  return result.map(row => `[ ${row.join(", ")} ]`).join(" ; ");
}
