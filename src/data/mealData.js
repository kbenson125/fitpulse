export const mealPlans = [
  {
    id: 'm1',
    name: 'Grilled Chicken & Sweet Potato Bowl',
    category: 'Lunch',
    calories: 550,
    protein: 45,
    carbs: 50,
    fat: 12,
    prepTime: '20 mins',
    tags: ['Chicken', 'Poultry'],
    ingredients: ['6 oz Chicken Breast', '1 medium Sweet Potato', '1 cup Steamed Broccoli', '1 tbsp Olive Oil'],
    instructions: [
      'Season chicken breast with salt, pepper, and garlic powder.',
      'Grill or pan-sear chicken over medium-high heat for 6-8 minutes per side until internal temp hits 165°F.',
      'Dice sweet potato and roast at 400°F for 25 minutes.',
      'Assemble in a bowl with steamed broccoli and drizzle with olive oil.'
    ]
  },
  {
    id: 'm2',
    name: 'Lean Beef & Whole Grain Rice Skillet',
    category: 'Dinner',
    calories: 650,
    protein: 50,
    carbs: 60,
    fat: 18,
    prepTime: '25 mins',
    tags: ['Beef', 'Red Meat'],
    ingredients: ['6 oz Grass-Fed Beef Strips', '1 cup Brown Rice', '1/2 diced Onion', '1 Bell Pepper'],
    instructions: [
      'Cook brown rice according to package directions.',
      'Sauté onions and bell peppers in a hot skillet until softened.',
      'Add beef strips and cook quickly over high heat for 4-5 minutes.',
      'Mix in cooked rice and season with low-sodium soy sauce.'
    ]
  },
  {
    id: 'm3',
    name: 'Egg White Veggie Scramble & Avocado Toast',
    category: 'Breakfast',
    calories: 420,
    protein: 30,
    carbs: 35,
    fat: 16,
    prepTime: '12 mins',
    tags: ['Egg', 'Vegetarian'],
    ingredients: ['1 cup Egg Whites', '1 whole Egg', '1 slice Whole Grain Toast', '1/2 Avocado'],
    instructions: [
      'Whisk egg whites with 1 whole egg.',
      'Scramble in a non-stick pan with spinach and cherry tomatoes.',
      'Toast bread, mash avocado on top with a pinch of red pepper flakes.'
    ]
  },
  {
    id: 'm4',
    name: 'Seafood Salmon & Asparagus Bake',
    category: 'Dinner',
    calories: 580,
    protein: 42,
    carbs: 15,
    fat: 26,
    prepTime: '20 mins',
    tags: ['Seafood', 'Fish'],
    ingredients: ['6 oz Salmon Filet', '1 bundle Asparagus', '1/2 Lemon', '1 tbsp Butter'],
    instructions: [
      'Preheat oven to 400°F.',
      'Place salmon and trimmed asparagus on a baking sheet lined with foil.',
      'Top salmon with butter slice and lemon juice.',
      'Bake for 12-15 minutes until salmon flakes easily.'
    ]
  },
  {
    id: 'm5',
    name: 'Turkey Protein Bowl & Quinoa',
    category: 'Lunch',
    calories: 490,
    protein: 40,
    carbs: 45,
    fat: 14,
    prepTime: '15 mins',
    tags: ['Turkey', 'Poultry'],
    ingredients: ['5 oz Ground Turkey 93/7', '3/4 cup Cooked Quinoa', 'Salsa', 'Black Beans'],
    instructions: [
      'Brown ground turkey in skillet with taco seasoning.',
      'Layer quinoa, black beans, and browned turkey into a storage container.',
      'Top with fresh salsa.'
    ]
  },
  {
    id: 'm6',
    name: 'Greek Yogurt & Berry Medley Bowl',
    category: 'Breakfast',
    calories: 340,
    protein: 28,
    carbs: 40,
    fat: 5,
    prepTime: '5 mins',
    tags: ['Dairy'],
    ingredients: ['1 cup Plain Non-Fat Greek Yogurt', '1/2 cup Mixed Berries', '1 tbsp Honey', '2 tbsp Granola'],
    instructions: [
      'Scoop Greek yogurt into a bowl.',
      'Top with fresh blueberries and strawberries.',
      'Drizzle with honey and sprinkle granola for crunch.'
    ]
  },
  {
    id: 'm7',
    name: 'Tofu & Vegetable Stir-Fry',
    category: 'Dinner',
    calories: 410,
    protein: 25,
    carbs: 48,
    fat: 12,
    prepTime: '20 mins',
    tags: ['Tofu', 'Vegetarian'],
    ingredients: ['6 oz Extra Firm Tofu', 'Snap Peas', 'Carrots', '1 tbsp Sesame Oil'],
    instructions: [
      'Press and cube tofu, then pan-fry until golden.',
      'Stir-fry snap peas and sliced carrots in sesame oil.',
      'Combine tofu and veggies with low-sodium stir-fry sauce.'
    ]
  }
];

// Backup replacement pool when main meals are excluded
export const backupMeals = [
  {
    id: 'b1',
    name: 'Lentil & Spinach Power Salad',
    category: 'Lunch',
    calories: 460,
    protein: 26,
    carbs: 58,
    fat: 10,
    prepTime: '15 mins',
    tags: ['Vegetarian', 'Vegan'],
    ingredients: ['1 cup Brown Lentils', '2 cups Fresh Spinach', 'Feta Cheese', 'Olive Oil Vinaigrette'],
    instructions: [
      'Toss cooked brown lentils with fresh baby spinach.',
      'Top with crumbled feta cheese and olive oil dressing.'
    ]
  },
  {
    id: 'b2',
    name: 'Cod Filet & Roasted Squash',
    category: 'Dinner',
    calories: 440,
    protein: 38,
    carbs: 30,
    fat: 8,
    prepTime: '22 mins',
    tags: ['Fish', 'Seafood'],
    ingredients: ['6 oz Pacific Cod', '1 cup Butternut Squash Cubes', 'Herbs de Provence'],
    instructions: [
      'Roast squash cubes at 400°F for 20 minutes.',
      'Pan-sear cod filet for 3-4 minutes per side with herbs and lemon.'
    ]
  }
];