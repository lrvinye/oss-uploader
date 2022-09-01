import { customAlphabet, urlAlphabet } from 'nanoid';

const urlAlphabets = customAlphabet(urlAlphabet);

export const generateRandomName = (size?: number) => {
  return urlAlphabets(size);
};
