export async function hashPassword(password: string) {
  return await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });
}

export async function comparePassword(password: string, hash: string) {
  return await Bun.password.verify(password, hash);
}
