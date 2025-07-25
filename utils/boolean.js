const parseBoolean = (value) => {
  const truthyValues = ["true", "1"];
  const falsyValues = ["false", "0", "null", "undefined"];

  const strValue = String(value).trim().toLowerCase();

  if (truthyValues.includes(strValue)) {
    return true;
  }

  if (falsyValues.includes(strValue)) {
    return false;
  }

  if (strValue) {
    return true;
  }

  return false;
};

export { parseBoolean };
