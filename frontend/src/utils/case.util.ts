/**
 * Transforms a string into kebab-case.
 *
 * @example
 * kebabCase("Hello"); // "hello"
 * kebabCase("hello"); // "hello"
 * kebabCase("HelloWorld"); // "hello-world"
 * kebabCase("HelloWorld"); // "hello-world"
 *
 * @param {string} str The string to transform
 * @returns The kebab-cased string
 */
export const kebabCase = (str: string): string => {
  const REGEX = /\p{Lu}/gu;
  const result = str.replace(REGEX, (match) => `-${match.toLowerCase()}`);

  if (result.startsWith("-")) {
    return result.slice(1);
  }

  return result;
};

/**
 * Transforms a string into pascal-case.
 *
 * @example
 * pascalCase("Hello"); // "Hello"
 * pascalCase("hello"); // "Hello"
 * pascalCase("HelloWorld"); // "HelloWorld"
 * pascalCase("HelloWorld"); // "Hello-world"
 *
 * @param {string} str The string to transform
 * @returns The pascal-cased string
 */
export const pascalCase = (str: string): string => {
  return str
    .replace(/[-_ ]+(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());
};
