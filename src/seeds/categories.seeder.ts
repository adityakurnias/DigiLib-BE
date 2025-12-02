import { db } from "../databases/index";
import { categories } from "../databases/schema/categories";
import { eq } from "drizzle-orm";

async function seedCategories() {
  console.log("🔍 Checking categories...");

  const existing = await db.select().from(categories).limit(1);

  if (existing.length > 0) {
    console.log("✅ Categories already exist. Skipping seeder.");
    return;
  }

  console.log("🆕 Seeding default categories...");

  const defaultCategories = [
    { name: "Action", description: "Action genre" },
    { name: "Adventure", description: "Adventure genre" },
    { name: "Comedy", description: "Comedy genre" },
    { name: "Drama", description: "Drama genre" },
    { name: "Fantasy", description: "Fantasy genre" },
    { name: "Horror", description: "Horror genre" },
    { name: "Mystery", description: "Mystery genre" },
    { name: "Romance", description: "Romance genre" },
    { name: "Sci-Fi", description: "Sci-Fi genre" },
    { name: "Thriller", description: "Thriller genre" },
  ];

  await db.insert(categories).values(defaultCategories);

  console.log("🎉 Categories seeded!");
}

seedCategories()
  .then(() => {
    console.log("🌱 Category seeder completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  });
