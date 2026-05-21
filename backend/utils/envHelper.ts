import "dotenv/config";

/**
 * Transforms a string into a valid slug.
 *
 * @example
 * getEnv("VERSION"); // "v1"
 * getEnv("PORT"); // "3000"
 *
 * @param {string} key The .env variable
 * @returns The value of the variable
 */
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Variable d'environnement manquante : ${key}`);
  return value;
};

export default getEnv;
