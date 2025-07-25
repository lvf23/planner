const isTest = () => {
  return process.env.NODE_ENV === "test";
};

export { isTest };
