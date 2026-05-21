/**
 * Transforms a string into a valid slug.
 *
 * @example
 * getSlug("My company"); // "my-company"
 * getSlug("hello"); // "hello"
 * getSlug("HelloWorld"); // "hello-world"
 * getSlug("HelloWorld"); // "hello-world"
 *
 * @param {string} value The string to transform
 * @returns The slug modified
 */
const getSlug = (value: string): string => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export default getSlug;
