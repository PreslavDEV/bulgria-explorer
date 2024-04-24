/* eslint-disable no-useless-escape */
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/;
