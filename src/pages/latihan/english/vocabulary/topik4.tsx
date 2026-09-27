import { VocabularyQuizPage } from '../../components/PracticeQuizPage';

type TopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
  terms: Array<{ word: string; meaning: string }>;
};

type QuizQuestion = {
  id: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  prompt: string;
  answer: string;
  options: string[];
};

const material: TopicMaterial = {
  "id": "food-restaurant",
  "title": "Foods, Cooking & Restaurant",
  "description": "Kosakata makanan, memasak, dan restoran.",
  "topicNumber": 4,
  "terms": [
    {
      "word": "Menu",
      "meaning": "a list of food and drinks in a restaurant"
    },
    {
      "word": "Appetizer",
      "meaning": "a small dish eaten before the main meal"
    },
    {
      "word": "Ingredient",
      "meaning": "one item used to make food"
    },
    {
      "word": "Recipe",
      "meaning": "instructions for cooking a dish"
    },
    {
      "word": "Waiter",
      "meaning": "a person who serves food in a restaurant"
    },
    {
      "word": "Dessert",
      "meaning": "sweet food eaten after the main course"
    },
    {
      "word": "Spicy",
      "meaning": "having a hot taste from spices"
    },
    {
      "word": "Beverage",
      "meaning": "a drink"
    },
    {
      "word": "Cuisine",
      "meaning": "a style of cooking"
    },
    {
      "word": "Reservation",
      "meaning": "an arrangement for a restaurant table"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "food-restaurant-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a list of food and drinks in a restaurant\"?",
      "answer": "Menu",
      "options": [
        "Menu",
        "Recipe",
        "Spicy",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a small dish eaten before the main meal\"?",
      "answer": "Appetizer",
      "options": [
        "Waiter",
        "Beverage",
        "Menu",
        "Appetizer"
      ]
    },
    {
      "id": "food-restaurant-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"one item used to make food\"?",
      "answer": "Ingredient",
      "options": [
        "Cuisine",
        "Appetizer",
        "Ingredient",
        "Dessert"
      ]
    },
    {
      "id": "food-restaurant-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"instructions for cooking a dish\"?",
      "answer": "Recipe",
      "options": [
        "Ingredient",
        "Recipe",
        "Spicy",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a person who serves food in a restaurant\"?",
      "answer": "Waiter",
      "options": [
        "Waiter",
        "Beverage",
        "Menu",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"sweet food eaten after the main course\"?",
      "answer": "Dessert",
      "options": [
        "Cuisine",
        "Appetizer",
        "Waiter",
        "Dessert"
      ]
    },
    {
      "id": "food-restaurant-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"having a hot taste from spices\"?",
      "answer": "Spicy",
      "options": [
        "Ingredient",
        "Dessert",
        "Spicy",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a drink\"?",
      "answer": "Beverage",
      "options": [
        "Spicy",
        "Beverage",
        "Menu",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"a style of cooking\"?",
      "answer": "Cuisine",
      "options": [
        "Cuisine",
        "Appetizer",
        "Waiter",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"an arrangement for a restaurant table\"?",
      "answer": "Reservation",
      "options": [
        "Ingredient",
        "Dessert",
        "Cuisine",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"instructions for cooking a dish\".",
      "answer": "Recipe",
      "options": [
        "Ingredient",
        "Spicy",
        "Reservation",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"a person who serves food in a restaurant\".",
      "answer": "Waiter",
      "options": [
        "Beverage",
        "Menu",
        "Waiter",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"sweet food eaten after the main course\".",
      "answer": "Dessert",
      "options": [
        "Appetizer",
        "Dessert",
        "Waiter",
        "Cuisine"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"having a hot taste from spices\".",
      "answer": "Spicy",
      "options": [
        "Spicy",
        "Dessert",
        "Reservation",
        "Ingredient"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"a drink\".",
      "answer": "Beverage",
      "options": [
        "Spicy",
        "Menu",
        "Recipe",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"a style of cooking\".",
      "answer": "Cuisine",
      "options": [
        "Appetizer",
        "Waiter",
        "Cuisine",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"an arrangement for a restaurant table\".",
      "answer": "Reservation",
      "options": [
        "Dessert",
        "Reservation",
        "Cuisine",
        "Ingredient"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"a list of food and drinks in a restaurant\".",
      "answer": "Menu",
      "options": [
        "Menu",
        "Appetizer",
        "Waiter",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"a small dish eaten before the main meal\".",
      "answer": "Appetizer",
      "options": [
        "Ingredient",
        "Dessert",
        "Cuisine",
        "Appetizer"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Foods, Cooking & Restaurant: \"one item used to make food\".",
      "answer": "Ingredient",
      "options": [
        "Spicy",
        "Reservation",
        "Ingredient",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"having a hot taste from spices\"?",
      "answer": "Spicy",
      "options": [
        "Dessert",
        "Reservation",
        "Spicy",
        "Ingredient"
      ]
    },
    {
      "id": "food-restaurant-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"a drink\"?",
      "answer": "Beverage",
      "options": [
        "Menu",
        "Beverage",
        "Recipe",
        "Spicy"
      ]
    },
    {
      "id": "food-restaurant-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"a style of cooking\"?",
      "answer": "Cuisine",
      "options": [
        "Cuisine",
        "Waiter",
        "Beverage",
        "Appetizer"
      ]
    },
    {
      "id": "food-restaurant-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"an arrangement for a restaurant table\"?",
      "answer": "Reservation",
      "options": [
        "Dessert",
        "Cuisine",
        "Ingredient",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"a list of food and drinks in a restaurant\"?",
      "answer": "Menu",
      "options": [
        "Appetizer",
        "Waiter",
        "Menu",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"a small dish eaten before the main meal\"?",
      "answer": "Appetizer",
      "options": [
        "Dessert",
        "Appetizer",
        "Cuisine",
        "Ingredient"
      ]
    },
    {
      "id": "food-restaurant-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"one item used to make food\"?",
      "answer": "Ingredient",
      "options": [
        "Ingredient",
        "Reservation",
        "Recipe",
        "Spicy"
      ]
    },
    {
      "id": "food-restaurant-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"instructions for cooking a dish\"?",
      "answer": "Recipe",
      "options": [
        "Menu",
        "Waiter",
        "Beverage",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"a person who serves food in a restaurant\"?",
      "answer": "Waiter",
      "options": [
        "Dessert",
        "Cuisine",
        "Waiter",
        "Appetizer"
      ]
    },
    {
      "id": "food-restaurant-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal foods, cooking & restaurant context, which term best matches: \"sweet food eaten after the main course\"?",
      "answer": "Dessert",
      "options": [
        "Reservation",
        "Dessert",
        "Ingredient",
        "Spicy"
      ]
    }
  ],
  "id": [
    {
      "id": "food-restaurant-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a list of food and drinks in a restaurant\"?",
      "answer": "Menu",
      "options": [
        "Menu",
        "Recipe",
        "Spicy",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a small dish eaten before the main meal\"?",
      "answer": "Appetizer",
      "options": [
        "Waiter",
        "Beverage",
        "Menu",
        "Appetizer"
      ]
    },
    {
      "id": "food-restaurant-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"one item used to make food\"?",
      "answer": "Ingredient",
      "options": [
        "Cuisine",
        "Appetizer",
        "Ingredient",
        "Dessert"
      ]
    },
    {
      "id": "food-restaurant-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"instructions for cooking a dish\"?",
      "answer": "Recipe",
      "options": [
        "Ingredient",
        "Recipe",
        "Spicy",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who serves food in a restaurant\"?",
      "answer": "Waiter",
      "options": [
        "Waiter",
        "Beverage",
        "Menu",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"sweet food eaten after the main course\"?",
      "answer": "Dessert",
      "options": [
        "Cuisine",
        "Appetizer",
        "Waiter",
        "Dessert"
      ]
    },
    {
      "id": "food-restaurant-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"having a hot taste from spices\"?",
      "answer": "Spicy",
      "options": [
        "Ingredient",
        "Dessert",
        "Spicy",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a drink\"?",
      "answer": "Beverage",
      "options": [
        "Spicy",
        "Beverage",
        "Menu",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a style of cooking\"?",
      "answer": "Cuisine",
      "options": [
        "Cuisine",
        "Appetizer",
        "Waiter",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an arrangement for a restaurant table\"?",
      "answer": "Reservation",
      "options": [
        "Ingredient",
        "Dessert",
        "Cuisine",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"instructions for cooking a dish\".",
      "answer": "Recipe",
      "options": [
        "Ingredient",
        "Spicy",
        "Reservation",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"a person who serves food in a restaurant\".",
      "answer": "Waiter",
      "options": [
        "Beverage",
        "Menu",
        "Waiter",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"sweet food eaten after the main course\".",
      "answer": "Dessert",
      "options": [
        "Appetizer",
        "Dessert",
        "Waiter",
        "Cuisine"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"having a hot taste from spices\".",
      "answer": "Spicy",
      "options": [
        "Spicy",
        "Dessert",
        "Reservation",
        "Ingredient"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"a drink\".",
      "answer": "Beverage",
      "options": [
        "Spicy",
        "Menu",
        "Recipe",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"a style of cooking\".",
      "answer": "Cuisine",
      "options": [
        "Appetizer",
        "Waiter",
        "Cuisine",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"an arrangement for a restaurant table\".",
      "answer": "Reservation",
      "options": [
        "Dessert",
        "Reservation",
        "Cuisine",
        "Ingredient"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"a list of food and drinks in a restaurant\".",
      "answer": "Menu",
      "options": [
        "Menu",
        "Appetizer",
        "Waiter",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"a small dish eaten before the main meal\".",
      "answer": "Appetizer",
      "options": [
        "Ingredient",
        "Dessert",
        "Cuisine",
        "Appetizer"
      ]
    },
    {
      "id": "food-restaurant-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Foods, Cooking & Restaurant: \"one item used to make food\".",
      "answer": "Ingredient",
      "options": [
        "Spicy",
        "Reservation",
        "Ingredient",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"having a hot taste from spices\"?",
      "answer": "Spicy",
      "options": [
        "Dessert",
        "Reservation",
        "Spicy",
        "Ingredient"
      ]
    },
    {
      "id": "food-restaurant-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"a drink\"?",
      "answer": "Beverage",
      "options": [
        "Menu",
        "Beverage",
        "Recipe",
        "Spicy"
      ]
    },
    {
      "id": "food-restaurant-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"a style of cooking\"?",
      "answer": "Cuisine",
      "options": [
        "Cuisine",
        "Waiter",
        "Beverage",
        "Appetizer"
      ]
    },
    {
      "id": "food-restaurant-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"an arrangement for a restaurant table\"?",
      "answer": "Reservation",
      "options": [
        "Dessert",
        "Cuisine",
        "Ingredient",
        "Reservation"
      ]
    },
    {
      "id": "food-restaurant-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"a list of food and drinks in a restaurant\"?",
      "answer": "Menu",
      "options": [
        "Appetizer",
        "Waiter",
        "Menu",
        "Beverage"
      ]
    },
    {
      "id": "food-restaurant-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"a small dish eaten before the main meal\"?",
      "answer": "Appetizer",
      "options": [
        "Dessert",
        "Appetizer",
        "Cuisine",
        "Ingredient"
      ]
    },
    {
      "id": "food-restaurant-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"one item used to make food\"?",
      "answer": "Ingredient",
      "options": [
        "Ingredient",
        "Reservation",
        "Recipe",
        "Spicy"
      ]
    },
    {
      "id": "food-restaurant-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"instructions for cooking a dish\"?",
      "answer": "Recipe",
      "options": [
        "Menu",
        "Waiter",
        "Beverage",
        "Recipe"
      ]
    },
    {
      "id": "food-restaurant-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who serves food in a restaurant\"?",
      "answer": "Waiter",
      "options": [
        "Dessert",
        "Cuisine",
        "Waiter",
        "Appetizer"
      ]
    },
    {
      "id": "food-restaurant-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks foods, cooking & restaurant yang lebih formal, istilah mana yang paling sesuai dengan: \"sweet food eaten after the main course\"?",
      "answer": "Dessert",
      "options": [
        "Reservation",
        "Dessert",
        "Ingredient",
        "Spicy"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik4Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik4"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
