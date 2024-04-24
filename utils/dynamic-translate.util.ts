export const dynamicTranslate = (
  str: string,
  options: Record<string, string>,
) => {
  let result = "";
  Object.keys(options).forEach((key) => {
    result = str.replaceAll(`{${key}}`, options[key]);
  });

  return result;
};
