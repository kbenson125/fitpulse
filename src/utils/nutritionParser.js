// Base reference values per 100 grams or standard single unit
export const foodDatabase = {
  // Fruits
  apple: { per100g: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 }, unitWeightGrams: 182 },
  banana: { per100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 }, unitWeightGrams: 118 },
  orange: { per100g: { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 }, unitWeightGrams: 131 },
  berries: { per100g: { calories: 57, protein: 0.7, carbs: 14, fat: 0.3 }, unitWeightGrams: 150 },
  avocado: { per100g: { calories: 160, protein: 2, carbs: 8.5, fat: 15 }, unitWeightGrams: 150 },

  // Grains & Carbs
  rice: { per100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 }, unitWeightGrams: 158 },
  oats: { per100g: { calories: 389, protein: 16.9, carbs: 66, fat: 6.9 }, unitWeightGrams: 80 },
  bread: { per100g: { calories: 265, protein: 9, carbs: 49, fat: 3.2 }, unitWeightGrams: 35 },
  pasta: { per100g: { calories: 131, protein: 5, carbs: 25, fat: 1.1 }, unitWeightGrams: 140 },
  potato: { per100g: { calories: 77, protein: 2, carbs: 17, fat: 0.1 }, unitWeightGrams: 170 },

  // Proteins
  chicken: { per100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }, unitWeightGrams: 140 },
  steak: { per100g: { calories: 271, protein: 26, carbs: 0, fat: 19 }, unitWeightGrams: 200 },
  salmon: { per100g: { calories: 208, protein: 20, carbs: 0, fat: 13 }, unitWeightGrams: 150 },
  tuna: { per100g: { calories: 132, protein: 28, carbs: 0, fat: 1.3 }, unitWeightGrams: 112 },
  egg: { per100g: { calories: 155, protein: 13, carbs: 1.1, fat: 11 }, unitWeightGrams: 50 },
  tofu: { per100g: { calories: 76, protein: 8, carbs: 1.9, fat: 4.8 }, unitWeightGrams: 120 },

  // Dairy & Nuts (keys with spaces must be enclosed in quotes)
  milk: { per100g: { calories: 42, protein: 3.4, carbs: 5, fat: 1 }, unitWeightGrams: 244 },
  'greek yogurt': { per100g: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 }, unitWeightGrams: 170 },
  almonds: { per100g: { calories: 579, protein: 21, carbs: 22, fat: 50 }, unitWeightGrams: 28 },
  'peanut butter': { per100g: { calories: 588, protein: 25, carbs: 20, fat: 50 }, unitWeightGrams: 32 }
};

export function parseFoodInput(inputString) {
  if (!inputString || typeof inputString !== 'string') return null;

  const str = inputString.toLowerCase().trim();

  // 1. Extract Quantity (supports integers, decimals, and fractions like 1/2, 3/4)
  let quantity = 1;
  const fractionMatch = str.match(/(\d+)\/(\d+)/);
  const numberMatch = str.match(/(\d+\.?\d*)/);

  if (fractionMatch) {
    quantity = parseFloat(fractionMatch[1]) / parseFloat(fractionMatch[2]);
  } else if (numberMatch) {
    quantity = parseFloat(numberMatch[1]);
  }

  // 2. Identify Food Key
  const foodKey = Object.keys(foodDatabase).find((key) => str.includes(key));
  if (!foodKey) return null;

  const foodData = foodDatabase[foodKey];
  let calculatedGrams = 0;

  // 3. Determine Unit Type
  if (str.includes('gram') || str.includes('g ')) {
    calculatedGrams = quantity;
  } else if (str.includes('oz') || str.includes('ounce')) {
    calculatedGrams = quantity * 28.35;
  } else if (str.includes('cup')) {
    calculatedGrams = quantity * 150;
  } else {
    calculatedGrams = quantity * foodData.unitWeightGrams;
  }

  // 4. Calculate Final Nutrition Values
  const multiplier = calculatedGrams / 100;

  return {
    foodName: foodKey.charAt(0).toUpperCase() + foodKey.slice(1),
    grams: Math.round(calculatedGrams),
    calories: Math.round(foodData.per100g.calories * multiplier),
    protein: Math.round(foodData.per100g.protein * multiplier),
    carbs: Math.round(foodData.per100g.carbs * multiplier),
    fat: Math.round(foodData.per100g.fat * multiplier)
  };
}

// Fallback manual entry parser when natural language match fails
export function createManualFoodEntry(name, calories, protein = 0, carbs = 0, fat = 0) {
  return {
    foodName: name || 'Custom Meal',
    grams: 0,
    calories: parseInt(calories, 10) || 0,
    protein: parseInt(protein, 10) || 0,
    carbs: parseInt(carbs, 10) || 0,
    fat: parseInt(fat, 10) || 0
  };
}