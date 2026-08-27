const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  exponentiate,
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
});

describe('modulo', () => {
  test.each([
    [10, 3, 1],
    [7, 2, 1],
    [-7, 3, -1],
  ])('modulo %p %% %p returns %p', (a, b, expected) => {
    expect(modulo(a, b)).toBe(expected);
  });

  test('rejects modulo by zero', () => {
    expect(() => modulo(10, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('exponentiate', () => {
  test.each([
    [2, 8, 256],
    [3, 3, 27],
    [5, 0, 1],
    [4, 0.5, 2],
  ])('%p ** %p returns %p', (a, b, expected) => {
    expect(exponentiate(a, b)).toBe(expected);
  });
});

describe('squareRoot', () => {
  test.each([
    [16, 4],
    [9, 3],
    [2, Math.sqrt(2)],
    [0, 0],
  ])('sqrt(%p) returns %p', (a, expected) => {
    expect(squareRoot(a)).toBe(expected);
  });

  test('rejects negative input', () => {
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
    [['10', '%', '3'], 1],
    [['10', 'mod', '3'], 1],
    [['2', '**', '8'], 256],
    [['2', 'pow', '8'], 256],
    [['16', 'sqrt'], 4],
    [['16', 'squareroot'], 4],
  ])('calculates %p as %p', (args, expected) => {
    expect(calculate(args)).toBe(expected);
  });

  test('rejects an incorrect number of arguments', () => {
    expect(() => calculate(['2'])).toThrow(
      'Usage: node src/calculator.js <number1> <operation> [number2]'
    );
  });

  test('rejects invalid numeric input', () => {
    expect(() => calculate(['two', '+', '3'])).toThrow(
      'Invalid number input: "two" is not a valid number.'
    );
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate(['2', '?', '3'])).toThrow(
      'Unsupported operation: "?".'
    );
  });

  test('surfaces division-by-zero errors', () => {
    expect(() => calculate(['20', '/', '0'])).toThrow(
      'Division by zero is not allowed.'
    );
  });

  test('surfaces modulo-by-zero errors', () => {
    expect(() => calculate(['20', '%', '0'])).toThrow(
      'Division by zero is not allowed.'
    );
  });

  test('surfaces square-root-of-negative errors', () => {
    expect(() => calculate(['-1', 'sqrt'])).toThrow(
      'Square root of a negative number is not allowed.'
    );
  });

  test('rejects binary operation called with one argument', () => {
    expect(() => calculate(['5', '+'])).toThrow(
      'Operation "+" requires two operands.'
    );
  });
});
