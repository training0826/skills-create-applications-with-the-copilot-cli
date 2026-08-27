#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the following operations:
 *   - addition       (+ or add)
 *   - subtraction     (- or subtract)
 *   - multiplication  (* or multiply)
 *   - division        (/ or divide)
 *   - modulo          (% or mod or modulo)
 *   - exponentiation  (** or pow or exponentiate)
 *   - square root     (sqrt or squareroot)  — takes a single operand
 *
 * Usage:
 *   node src/calculator.js <number1> <operation> [number2]
 *   node src/calculator.js 16 sqrt
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 10 divide 2
 *   node src/calculator.js 10 % 3
 *   node src/calculator.js 2 ** 8
 *   node src/calculator.js 16 sqrt
 */

// Performs addition of two numbers.
function add(a, b) {
  return a + b;
}

// Performs subtraction of two numbers.
function subtract(a, b) {
  return a - b;
}

// Performs multiplication of two numbers.
function multiply(a, b) {
  return a * b;
}

// Performs division of two numbers, guarding against division by zero.
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

// Performs modulo (remainder) of two numbers, guarding against division by zero.
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a % b;
}

// Raises a to the power of b.
function exponentiate(a, b) {
  return Math.pow(a, b);
}

// Returns the square root of a, guarding against negative input.
function squareRoot(a) {
  if (a < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(a);
}

// Maps supported operation names/symbols to their corresponding function.
const operations = {
  '+': add,
  add: add,
  addition: add,
  '-': subtract,
  subtract: subtract,
  subtraction: subtract,
  '*': multiply,
  multiply: multiply,
  multiplication: multiply,
  '/': divide,
  divide: divide,
  division: divide,
  '%': modulo,
  mod: modulo,
  modulo: modulo,
  '**': exponentiate,
  pow: exponentiate,
  exponentiate: exponentiate,
  exponentiation: exponentiate,
  sqrt: squareRoot,
  squareroot: squareRoot,
};

// Set of operation keys that take only one operand.
const unaryOperations = new Set(['sqrt', 'squareroot']);

// Parses and validates CLI arguments, then executes the requested operation.
function calculate(args) {
  if (args.length !== 2 && args.length !== 3) {
    throw new Error(
      'Usage: node src/calculator.js <number1> <operation> [number2]'
    );
  }

  const [rawA, rawOperation, rawB] = args;
  const a = Number(rawA);

  if (Number.isNaN(a)) {
    throw new Error(
      `Invalid number input: "${rawA}" is not a valid number.`
    );
  }

  const opKey = rawOperation.toLowerCase();
  const operation = operations[opKey];
  if (!operation) {
    throw new Error(
      `Unsupported operation: "${rawOperation}". Supported operations: +, -, *, /, %, ** (or add, subtract, multiply, divide, mod, pow, sqrt).`
    );
  }

  // Unary operations (e.g. sqrt) only need one operand.
  if (args.length === 2) {
    if (!unaryOperations.has(opKey)) {
      throw new Error(
        `Operation "${rawOperation}" requires two operands.`
      );
    }
    return operation(a);
  }

  const b = Number(rawB);
  if (Number.isNaN(b)) {
    throw new Error(
      `Invalid number input: "${rawB}" is not a valid number.`
    );
  }

  return operation(a, b);
}

// Entry point: runs the calculator when this file is executed directly.
function main() {
  const args = process.argv.slice(2);

  try {
    const result = calculate(args);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, modulo, exponentiate, squareRoot, calculate };
