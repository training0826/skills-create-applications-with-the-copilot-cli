#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic math operations:
 *   - addition       (+ or add)
 *   - subtraction     (- or subtract)
 *   - multiplication  (* or multiply)
 *   - division        (/ or divide)
 *
 * Usage:
 *   node src/calculator.js <number1> <operation> <number2>
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 10 divide 2
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
};

// Parses and validates CLI arguments, then executes the requested operation.
function calculate(args) {
  if (args.length !== 3) {
    throw new Error(
      'Usage: node src/calculator.js <number1> <operation> <number2>'
    );
  }

  const [rawA, rawOperation, rawB] = args;
  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error(
      `Invalid number input: "${Number.isNaN(a) ? rawA : rawB}" is not a valid number.`
    );
  }

  const operation = operations[rawOperation.toLowerCase()];
  if (!operation) {
    throw new Error(
      `Unsupported operation: "${rawOperation}". Supported operations: +, -, *, / (or add, subtract, multiply, divide).`
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

module.exports = { add, subtract, multiply, divide, calculate };
