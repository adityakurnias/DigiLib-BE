import { db } from "../databases";
import { books } from "../databases/schema/books";
import { eq } from "drizzle-orm";

async function seedBooks() {
  console.log("📚 Checking existing books...");

  const existing = await db.select().from(books).limit(1);
  if (existing.length > 0) {
    console.log("✔ Books already exist. Skipping seeder.");
    return;
  }

  console.log("🆕 Seeding books...");

  const data = [
    {
      categoryId: 5,
      title: "Kumo desuga, Nani ka?",
      author: "Baba Okina",
      publisher: "Unknown",
      isbn: "978000000001",
      year: 2024,
      stock: 10,
      available: 10,
      description: "When a mysterious explosion killed an entire class full of high school students, the souls of everyone in class were transported into a fantasy world and reincarnated. While some students were reincarnated as princes or prodigies, others were not as blessed. Our heroine, who was the lowest in the class, discovered that she was reincarnated as a spider! Now at the bottom of the food chain, she needs to adapt to the current situation with willpower in order to live. Stuck in a dangerous labyrinth filled with monsters, it's eat or be eaten! This is the story of a spider doing whatever she can in order to survive!",
      coverImage: "kumodesu.jpg",
      uploadedBy: 1,
    },
    {
      categoryId: 8,
      title: "I Became the Patron of Villains",
      author: "LICO",
      publisher: "Unknown",
      isbn: "978000000002",
      year: 2025,
      stock: 10,
      available: 10,
      description: "I, a corporate slave, transmigrated into a game as a noble But I'm just an extra that will die at the hands of the villains in the future? Not a chance! I'll somehow reform them and live a lavish life! For this I started sponsoring the future villains to prevent them from turning evil and helped them overcome their difficult circumstances. As a result, they all grew up to be upstanding and ordinary, enough to make me feel proud. And so, I became the ultimate mastermind of the kingdom... Huh?",
      coverImage: "ibecome.jpg",
      uploadedBy: 1,
    },
    {
      categoryId: 2,
      title: "Ougon no Keikenchi",
      author: "Harajun",
      publisher: "Unknown",
      isbn: "978000000003",
      year: 2023,
      stock: 10,
      available: 10,
      description: "'Boot Hour, Shoot Curse' is a VRMMORPG that has no concept of levels or professions. Instead, players must farm experience points to gain new skills and increase their status. Rare, a girl who participated in the closed beta test, has acquired the hidden skill 'Subordinate', which allows her to turn NPCs into her subordinates. The skill also transfers the experience points gained by the subordinates to Rare. She used the skill to gradually add new NPCs she encountered to her party. As a result of the unprecedented amount of experience gained from her minions, she was able to evolve into a Demon Lord.",
      coverImage: "ougonno.jpg",
      uploadedBy: 1,
    },
    {
      categoryId: 5,
      title: "Sister and Giant: A Young Lady Is Reborn in Another World",
      author: "Be-con",
      publisher: "Unknown",
      isbn: "978000000004",
      year: 2021,
      stock: 10,
      available: 10,
      description: "Hinako, a girl who came from another world, made a vow of sisterhood with a giant called Elis, and together they became known as 'The Smallest Giants'. They both have goals that aligned in tracking down people who were significant to them. For Hinako, it is her 'Onee-sama' who was also transported to this world, and for Elis it's the kin she was separated from. However, when collecting their reward after fulfilling a request at the guild, Hinako caught the eye of a knight who serves the church...",
      coverImage: "sisgian.jpg",
      uploadedBy: 1,
    },
    {
      categoryId: 1,
      title: "Jujutsu Kaisen: Modulo",
      author: "Akutami Gege",
      publisher: "Unknown",
      isbn: "978000000005",
      year: 2024,
      stock: 10,
      available: 10,
      description: "It's been 68 years since the Culling Game. In 2086, an alien race known as the Simurians arrive on Earth in a spaceship. The fate of the world lies in the hands of two jujutsu sorcerers Yuka and Tsurugi Okkotsu. Jujutsu sorcerers and aliens, what chaos will be born from this meeting?",
      coverImage: "jujutsu.jpg",
      uploadedBy: 1,
    },
    {
      categoryId: 1,
      title: "Meririrarariri",
      author: "Hakuri",
      publisher: "Unknown",
      isbn: "978000000006",
      year: 2024,
      stock: 10,
      available: 10,
      description: "When she loses her calm, she is unable to use magic. In order to become a great witch, Merrily has lived her life according to her mother's teachings, keeping her mind clear no matter what. Then one day, Merrily meets a boy named Danka. As she interacts with him, Merrily's heart changes...",
      coverImage: "meriri.jpg",
      uploadedBy: 1,
    },
  ];

  await db.insert(books).values(data);

  console.log("🎉 Books seeded successfully!");
}

seedBooks()
  .then(() => {
    console.log("🌱 Book seeder completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  });
