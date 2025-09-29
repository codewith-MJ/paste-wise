const toMs = (input: string | number | Date): number => {
  if (typeof input === "number") return input;
  if (input instanceof Date) return input.getTime();
  return new Date(input).getTime();
};

export default toMs;
