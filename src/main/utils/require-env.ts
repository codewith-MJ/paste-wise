const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`[env] Missing ${name}`);
  }
  return value;
};

export default requireEnv;
