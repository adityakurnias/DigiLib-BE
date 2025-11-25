import { db } from "../databases/index";
import { users } from "../databases/schema/users";
import { eq } from "drizzle-orm";
import { hashPassword } from "../utils/hash";

async function seedAdmin() {
  console.log("🔍 Checking admin user...");

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, "admin@digilib.local"))
    .limit(1);

  if (existing.length > 0) {
    console.log("✅ Admin already exists. Skipping seeder.");
    return;
  }

  console.log("🆕 Creating admin user...");

  const hashed = await hashPassword("admin123");

  await db.insert(users).values({
    name: "Administrator",
    email: "admin@digilib.local",
    password: hashed,
    role: "admin",
  });

  console.log("🎉 Admin created!");
  console.log("➡ Email: admin@digilib.local");
  console.log("➡ Password: admin123");
}

seedAdmin()
  .then(() => {
    console.log("🌱 Admin seeder completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  });
