const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "\ncreate kids story on description for 5-8 Years kids, Educational story, and all images in Paper cut style: story of boy and Magic School, give me 5 chapter, With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "Leo and the Whispering Woods School",\n  "cover": {\n    "image_prompt": "Paper cut style illustration for a children\'s book cover. A wide-eyed boy named Leo stands in front of a magical school building built into a giant, ancient tree in a whispering forest. The school has glowing windows and friendly-looking animals peeking out. Title: \'Leo and the Whispering Woods School\' in playful, whimsical font. Papercut elements include layered trees, leaves, and a bright, inviting sky."\n  },\n  "chapters": [\n    {\n      "chapter_number": 1,\n      "chapter_title": "The Letter That Bloomed",\n      "story": "Leo loved playing in his garden. One day, a seed fell from the sky! He planted it, and instead of a flower, a letter bloomed! The letter shimmered and invited him to the Whispering Woods School – a school hidden deep in the woods, where learning was an adventure. He packed his favorite magnifying glass and a peanut butter sandwich, and bravely set off.",\n      "image_prompt": "Paper cut style illustration. Leo, a boy with bright eyes and messy brown hair, kneels in his garden, planting a shimmering letter-seed in the soil. Giant papercut flowers surround him, and a sunny blue sky peeks through the layered leaves. His magnifying glass is tucked into his pocket."\n    },\n    {\n      "chapter_number": 2,\n      "chapter_title": "A School in a Tree!",\n      "story": "The Whispering Woods was even more magical than Leo imagined! Talking squirrels chattered secrets, and glowing mushrooms lit his way. Finally, he reached a gigantic tree. Built into its trunk was the school! Windows winked, and the door had a knocker shaped like a friendly owl. A kind-faced ladybug, Ms. Dot, greeted him with a warm smile.",\n      "image_prompt": "Paper cut style illustration. Leo stands in front of a massive tree that is also a school. The school has colorful windows and a door knocker shaped like an owl. Talking squirrels with speech bubbles are in the trees. Ms. Dot, a friendly ladybug with glasses, is greeting Leo at the door."\n    },\n    {\n      "chapter_number": 3,\n      "chapter_title": "Lessons with Lizards and Letters",\n      "story": "At the Whispering Woods School, learning was never boring! Mr. Scales, a wise old lizard, taught them about science by exploring the forest floor. They learned their letters by tracing them in the dew on giant leaves. And during music class, they played instruments made of hollow reeds with Mrs. Hoot the owl, making sounds that echoed through the woods.",\n      "image_prompt": "Paper cut style illustration. Leo sits with other animal students (a fox, a rabbit, a bird) on the forest floor. Mr. Scales, a lizard with a pointer, is explaining something about a mushroom. Letters are traced in the dew on a large leaf. Layered trees and mushrooms create a magical forest atmosphere."\n    },\n    {\n      "chapter_number": 4,\n      "chapter_title": "The Mystery of the Missing Moonbeams",\n      "story": "One night, Ms. Dot announced that the moonbeams were missing! Without moonbeams, the nocturnal flowers wouldn\'t bloom, and the fireflies wouldn\'t glow. Leo, with his trusty magnifying glass, decided to investigate. He followed tiny, sparkly tracks that led deeper into the Whispering Woods.",\n      "image_prompt": "Paper cut style illustration. Ms. Dot, the ladybug teacher, looks worriedly at the night sky. Leo, with his magnifying glass, examines tiny, sparkly tracks on the forest floor. The scene is lit by the dim light of fireflies. Papercut stars and a crescent moon are in the background."\n    },\n    {\n      "chapter_number": 5,\n      "chapter_title": "Leo Saves the Night!",\n      "story": "The tracks led Leo to a grumpy badger who had accidentally blocked the moonbeams with a giant pile of leaves! Using his new science knowledge, Leo explained to the badger how important the moonbeams were. The badger felt terrible and helped Leo move the leaves. Soon, the moonbeams shone brightly again, the nocturnal flowers bloomed, and the fireflies danced. Leo was a hero!",\n      "image_prompt": "Paper cut style illustration. Leo is talking to a grumpy badger who is pushing leaves away from the moon\'s path. Moonbeams are shining down on a field of glowing flowers and dancing fireflies. Ms. Dot and other animal students are cheering. Layered papercut trees create a sense of depth and wonder."\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
