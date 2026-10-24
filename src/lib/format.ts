/** Basic shape check used by the contact form before anything is sent */
export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
