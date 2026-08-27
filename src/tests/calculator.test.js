const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
} = require('../calculator');

describe('calculator arithmetic functions', () => {
  test.each([
    [2, 3, 5],
    [-2, 3, 1],
    [1.5, 2.5, 4],
  ])('adds %p and %p to return %p', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });

  test.each([
    [10, 4, 6],
    [3, 5, -2],
    [5.5, 2.25, 3.25],
  ])('subtracts %p from %p to return %p', (a, b, expected) => {
    expect(subtract(a, b)).toBe(expected);
  });

  test.each([
    [45, 2, 90],
    [-3, 4, -12],
    [2.5, 4, 10],
    [0, 8, 0],
  ])('multiplies %p by %p to return %p', (a, b, expected) => {
    expect(multiply(a, b)).toBe(expected);
  });

  test.each([
    [20, 5, 4],
    [-12, 3, -4],
    [7.5, 2.5, 3],
  ])('divides %p by %p to return %p', (a, b, expected) => {
    expect(divide(a, b)).toBe(expected);
  });

  test('rejects division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed.');
  });

  test.each([
    [5, 2, 1],
    [10, 3, 1],
    [-10, 3, -1],
    [5.5, 2, 1.5],
  ])('returns the remainder of %p divided by %p as %p', (a, b, expected) => {
    expect(modulo(a, b)).toBe(expected);
  });

  test.each([
    [2, 3, 8],
    [-2, 4, 16],
    [5, 0, 1],
    [4, -1, 0.25],
  ])('raises %p to %p to return %p', (base, exponent, expected) => {
    expect(power(base, exponent)).toBe(expected);
  });

  test.each([
    [16, 4],
    [9, 3],
    [2.25, 1.5],
    [0, 0],
  ])('returns the square root of %p as %p', (n, expected) => {
    expect(squareRoot(n)).toBe(expected);
  });

  test('returns an accurate square root for non-perfect squares', () => {
    expect(squareRoot(2)).toBeCloseTo(1.41421356237);
  });

  test('rejects square roots of negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow(
      'Square root of a negative number is not allowed.'
    );
  });
});

describe('calculate', () => {
  test.each([
    [['2', '+', '3'], 5],
    [['10', '-', '4'], 6],
    [['45', '*', '2'], 90],
    [['20', '/', '5'], 4],
    [['2', 'add', '3'], 5],
    [['10', 'subtraction', '4'], 6],
    [['45', 'MULTIPLY', '2'], 90],
    [['20', 'division', '5'], 4],
    [['5', '%', '2'], 1],
    [['10', '%', '3'], 1],
    [['2', '^', '3'], 8],
    [['2', 'power', '3'], 8],
    [['16', 'sqrt'], 4],
    [['9', 'sqrt'], 3],
  ])('calculates %p as %p', (args, expected) => {
    expect(calculate(args)).toBe(expected);
  });

  test('rejects an incorrect number of arguments', () => {
    expect(() => calculate(['2', '+'])).toThrow(
      'Usage: node src/calculator.js <number1> <operation> <number2>'
    );
  });

  test('rejects invalid numeric input', () => {
    expect(() => calculate(['two', '+', '3'])).toThrow(
      'Invalid number input: "two" is not a valid number.'
    );
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate(['2', 'unknown', '3'])).toThrow(
      'Unsupported operation: "unknown". Supported operations: +, -, *, /, %, ^ (or add, subtract, multiply, divide, modulo, power).'
    );
  });

  test('surfaces division-by-zero errors', () => {
    expect(() => calculate(['20', '/', '0'])).toThrow(
      'Division by zero is not allowed.'
    );
  });

  test('surfaces negative square-root errors', () => {
    expect(() => calculate(['-9', 'sqrt'])).toThrow(
      'Square root of a negative number is not allowed.'
    );
  });
});
