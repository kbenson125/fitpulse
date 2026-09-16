import React, { useState, useMemo } from 'react';
import { 
  Utensils, 
  Plus, 
  Flame, 
  Trash2, 
  Apple, 
  ShoppingCart, 
  Calendar,
  ChefHat,
  X,
  Ban,
  RefreshCw,
  ScanLine,
  ArrowRightLeft,
  BookOpen
} from 'lucide-react';

import BarcodeScannerModal from './BarcodeScannerModal';

const initialDetailedRecipes = {
  // BREAKFAST
  'Overnight Oats with Chia Seeds & Berries': { category: 'breakfast', prep: '5 mins', cals: '380 kcal', protein: '24g', carbs: '52g', fat: '8g', ingredients: ['Rolled Oats', 'Chia Seeds', 'Almond Milk', 'Berries', 'Honey'], instructions: ['Combine oats, chia seeds, and almond milk in a jar.', 'Stir well, cover, and refrigerate overnight.', 'Top with berries and honey.'] },
  'Greek Yogurt Parfait with Granola': { category: 'breakfast', prep: '5 mins', cals: '350 kcal', protein: '28g', carbs: '45g', fat: '6g', ingredients: ['Greek Yogurt', 'Granola', 'Berries', 'Honey'], instructions: ['Layer yogurt, granola, and berries in a glass.', 'Drizzle with honey before serving.'] },
  'Scrambled Eggs on Whole Grain Toast': { category: 'breakfast', prep: '10 mins', cals: '400 kcal', protein: '24g', carbs: '30g', fat: '20g', ingredients: ['Eggs', 'Whole Grain Bread', 'Avocado', 'Butter'], instructions: ['Whisk and scramble eggs over medium-low heat.', 'Toast bread and top with smashed avocado and eggs.'] },
  'Protein Smoothie with Spinach & Banana': { category: 'breakfast', prep: '5 mins', cals: '340 kcal', protein: '30g', carbs: '42g', fat: '5g', ingredients: ['Protein Powder', 'Banana', 'Spinach', 'Almond Milk', 'Flaxseed'], instructions: ['Add all ingredients to blender and blend until smooth.'] },
  'Avocado & Egg White Breakfast Wrap': { category: 'breakfast', prep: '12 mins', cals: '390 kcal', protein: '26g', carbs: '38g', fat: '14g', ingredients: ['Egg Whites', 'Whole Wheat Tortilla', 'Avocado', 'Salsa', 'Spinach'], instructions: ['Scramble egg whites with spinach.', 'Warm tortilla, fill with egg whites, avocado, and salsa, then wrap tightly.'] },
  'Peanut Butter Banana Oatmeal': { category: 'breakfast', prep: '8 mins', cals: '420 kcal', protein: '18g', carbs: '58g', fat: '14g', ingredients: ['Rolled Oats', 'Peanut Butter', 'Banana', 'Cinnamon', 'Milk'], instructions: ['Cook oats with milk.', 'Stir in peanut butter and top with sliced banana and cinnamon.'] },

  // LUNCH
  'Grilled Chicken Quinoa Bowl': { category: 'lunch', prep: '20 mins', cals: '550 kcal', protein: '45g', carbs: '40g', fat: '22g', ingredients: ['Chicken Breast', 'Quinoa', 'Avocado', 'Greens', 'Olive Oil'], instructions: ['Grill chicken and serve over a bed of quinoa and greens with sliced avocado.'] },
  'Turkey Wrap with Avocado & Greens': { category: 'lunch', prep: '10 mins', cals: '450 kcal', protein: '35g', carbs: '42g', fat: '16g', ingredients: ['Tortilla', 'Deli Turkey', 'Avocado', 'Spinach', 'Tomato'], instructions: ['Spread avocado on tortilla, add sliced turkey, tomato, and spinach, then roll up.'] },
  'Tuna Salad Stuffed Bell Peppers': { category: 'lunch', prep: '10 mins', cals: '360 kcal', protein: '38g', carbs: '18g', fat: '14g', ingredients: ['Tuna', 'Greek Yogurt', 'Celery', 'Bell Peppers', 'Dijon Mustard'], instructions: ['Mix tuna with Greek yogurt, celery, and mustard.', 'Spoon into halved bell peppers.'] },
  'Mediterranean Chickpea Salad': { category: 'lunch', prep: '15 mins', cals: '410 kcal', protein: '16g', carbs: '50g', fat: '18g', ingredients: ['Chickpeas', 'Cucumbers', 'Cherry Tomatoes', 'Feta Cheese', 'Olive Oil', 'Lemon'], instructions: ['Combine chopped vegetables and chickpeas in a bowl.', 'Toss with olive oil, lemon juice, and top with feta.'] },
  'Chicken Caesar Whole Wheat Wrap': { category: 'lunch', prep: '12 mins', cals: '480 kcal', protein: '40g', carbs: '36g', fat: '18g', ingredients: ['Chicken Breast', 'Romaine Lettuce', 'Light Caesar Dressing', 'Parmesan', 'Whole Wheat Wrap'], instructions: ['Slice grilled chicken.', 'Toss lettuce with dressing and parmesan, roll in wrap with chicken.'] },
  'Southwest Black Bean & Corn Bowl': { category: 'lunch', prep: '15 mins', cals: '460 kcal', protein: '20g', carbs: '68g', fat: '12g', ingredients: ['Black Beans', 'Corn', 'Brown Rice', 'Salsa', 'Cilantro', 'Lime'], instructions: ['Warm black beans and corn.', 'Serve over brown rice with salsa, fresh cilantro, and lime squeeze.'] },

  // DINNER
  'Baked Salmon with Asparagus & Sweet Potato': { category: 'dinner', prep: '25 mins', cals: '520 kcal', protein: '42g', carbs: '35g', fat: '20g', ingredients: ['Salmon', 'Asparagus', 'Sweet Potato', 'Olive Oil', 'Garlic'], instructions: ['Bake salmon, sweet potato wedges, and asparagus at 400°F until tender and cooked.'] },
  'Lean Beef Stir-Fry with Broccoli & Brown Rice': { category: 'dinner', prep: '20 mins', cals: '510 kcal', protein: '40g', carbs: '48g', fat: '15g', ingredients: ['Lean Beef', 'Broccoli', 'Brown Rice', 'Soy Sauce', 'Sesame Oil', 'Garlic'], instructions: ['Stir-fry beef strips and broccoli with soy sauce and garlic.', 'Serve over warm brown rice.'] },
  'Turkey Meatballs with Zucchini Noodles': { category: 'dinner', prep: '25 mins', cals: '430 kcal', protein: '38g', carbs: '20g', fat: '22g', ingredients: ['Lean Ground Turkey', 'Zucchini Noodles', 'Marinara Sauce', 'Parmesan', 'Italian Seasoning'], instructions: ['Bake ground turkey meatballs.', 'Sauté zucchini noodles briefly and top with warm marinara and meatballs.'] },
  'Grilled Shrimp & Cauliflower Rice Bowl': { category: 'dinner', prep: '18 mins', cals: '380 kcal', protein: '36g', carbs: '18g', fat: '16g', ingredients: ['Shrimp', 'Cauliflower Rice', 'Bell Peppers', 'Avocado Oil', 'Cilantro'], instructions: ['Sauté shrimp and bell peppers.', 'Serve over cooked cauliflower rice seasoned with herbs.'] },
  'Baked Cod with Roasted Vegetables': { category: 'dinner', prep: '22 mins', cals: '390 kcal', protein: '35g', carbs: '24g', fat: '14g', ingredients: ['Cod Filet', 'Zucchini', 'Cherry Tomatoes', 'Olive Oil', 'Lemon', 'Herbs'], instructions: ['Arrange cod and chopped vegetables on a baking sheet.', 'Drizzle with olive oil and lemon juice, bake at 375°F.'] },
  'Chicken Breast with Quinoa & Steamed Green Beans': { category: 'dinner', prep: '20 mins', cals: '470 kcal', protein: '44g', carbs: '42g', fat: '10g', ingredients: ['Chicken Breast', 'Quinoa', 'Green Beans', 'Lemon Pepper'], instructions: ['Season and pan-sear chicken breast.', 'Serve with fluffy quinoa and steamed green beans.'] },

  // SNACK
  'Apple & Almond Butter': { category: 'snack', prep: '2 mins', cals: '220 kcal', protein: '4g', carbs: '28g', fat: '10g', ingredients: ['Apple', 'Almond Butter'], instructions: ['Slice apple and serve with almond butter for dipping.'] },
  'Protein Shake & Walnuts': { category: 'snack', prep: '3 mins', cals: '290 kcal', protein: '26g', carbs: '10g', fat: '16g', ingredients: ['Protein Powder', 'Walnuts', 'Water or Almond Milk'], instructions: ['Mix protein powder with liquid, pair with a handful of walnuts.'] },
  'Cottage Cheese with Pineapple': { category: 'snack', prep: '2 mins', cals: '180 kcal', protein: '20g', carbs: '18g', fat: '3g', ingredients: ['Low-Fat Cottage Cheese', 'Pineapple Chunks'], instructions: ['Top cottage cheese with fresh or canned pineapple.'] },
  'Edamame with Sea Salt': { category: 'snack', prep: '5 mins', cals: '160 kcal', protein: '14g', carbs: '12g', fat: '6g', ingredients: ['Steamed Edamame', 'Sea Salt'], instructions: ['Steam edamame pods and sprinkle generously with sea salt.'] },
  'Hard-Boiled Eggs with Hummus': { category: 'snack', prep: '8 mins', cals: '210 kcal', protein: '14g', carbs: '8g', fat: '13g', ingredients: ['Hard-Boiled Eggs', 'Hummus', 'Paprika'], instructions: ['Halve hard-boiled eggs and serve with a side of hummus sprinkled with paprika.'] }
};

const generateVariedWeeklyPlan = (recipes, exclusions) => {
  const isMatchExcluded = (name, data) => {
    const lowerName = name.toLowerCase();
    return exclusions.some(ex => {
      const lowerEx = ex.toLowerCase();
      if (lowerEx === 'seafood' || lowerEx === 'fish') {
        const seafoodKeywords = ['salmon', 'tuna', 'cod', 'shrimp', 'fish', 'seafood'];
        if (seafoodKeywords.some(kw => lowerName.includes(kw))) return true;
        if (data.ingredients?.some(i => seafoodKeywords.some(kw => i.toLowerCase().includes(kw)))) return true;
      }
      if (lowerName.includes(lowerEx)) return true;
      if (data.ingredients?.some(i => i.toLowerCase().includes(lowerEx))) return true;
      return false;
    });
  };

  const getPool = (category) => 
    Object.keys(recipes).filter(name => {
      const data = recipes[name];
      if (data.category !== category) return false;
      return !isMatchExcluded(name, data);
    });

  const breakfasts = getPool('breakfast');
  const lunches = getPool('lunch');
  const dinners = getPool('dinner');
  const snacks = getPool('snack');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return days.map((day, idx) => ({
    day,
    b: breakfasts[idx % breakfasts.length] || breakfasts[0] || 'Custom Meal',
    l: lunches[idx % lunches.length] || lunches[0] || 'Custom Meal',
    d: dinners[idx % dinners.length] || dinners[0] || 'Custom Meal',
    snacks: snacks[idx % snacks.length] || snacks[0] || 'Custom Meal'
  }));
};

export default function NutritionSection({ profile = {} }) {
  const [activeTab, setActiveTab] = useState('tracker');
  const [selectedRecipeModal, setSelectedRecipeModal] = useState(null);
  const [showScannerModal, setShowScannerModal] = useState(false);

  const [detailedRecipes, setDetailedRecipes] = useState(initialDetailedRecipes);
  const [showCustomRecipeModal, setShowCustomRecipeModal] = useState(false);
  const [newCustomRecipe, setNewCustomRecipe] = useState({
    title: '', category: 'breakfast', prep: '15 mins', cals: '400 kcal',
    protein: '25g', carbs: '35g', fat: '12g', ingredientsInput: '', instructionsInput: ''
  });

  const [swapModalState, setSwapModalState] = useState(null);
  const [excludedFoods, setExcludedFoods] = useState(['Seafood', 'Peanuts']);
  const [newExclusion, setNewExclusion] = useState('');
  const [meals, setMeals] = useState([]);

  const [newMeal, setNewMeal] = useState({
    type: 'Dinner', name: '', calories: '', protein: '', carbs: '', fat: ''
  });

  const [groceryItems, setGroceryItems] = useState([
    { id: 'g1', item: 'Chicken Breast (3 lbs)', category: 'Proteins', checked: false },
    { id: 'g2', item: 'Brown Rice (2 bags)', category: 'Grains & Carbs', checked: false },
    { id: 'g3', item: 'Fresh Broccoli & Spinach', category: 'Produce', checked: true },
  ]);
  const [customGrocery, setCustomGrocery] = useState('');

  const [mealPlansData, setMealPlansData] = useState(() => 
    generateVariedWeeklyPlan(initialDetailedRecipes, ['Seafood', 'Peanuts'])
  );

  const targets = useMemo(() => {
    const current = profile?.currentWeight || 180;
    const goal = profile?.goal || 'weight_loss';

    let baseCalories = current * 12;
    if (goal === 'weight_loss') baseCalories -= 500;
    if (goal === 'muscle_gain') baseCalories += 300;

    return {
      calories: Math.round(baseCalories),
      protein: Math.round(current * 1.0),
      carbs: Math.round((baseCalories * 0.4) / 4),
      fat: Math.round((baseCalories * 0.25) / 9)
    };
  }, [profile]);

  const consumed = useMemo(() => {
    return meals.reduce(
      (acc, curr) => ({
        calories: acc.calories + Number(curr.calories),
        protein: acc.protein + Number(curr.protein),
        carbs: acc.carbs + Number(curr.carbs),
        fat: acc.fat + Number(curr.fat),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [meals]);

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!newMeal.name || !newMeal.calories) return;

    setMeals((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: newMeal.type,
        name: newMeal.name,
        calories: Number(newMeal.calories) || 0,
        protein: Number(newMeal.protein) || 0,
        carbs: Number(newMeal.carbs) || 0,
        fat: Number(newMeal.fat) || 0,
      }
    ]);

    setNewMeal({ type: 'Snack', name: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const handleScanSuccess = ({ barcode, servings, unit }) => {
    const baseCals = 200;
    const baseProtein = 10;
    const baseCarbs = 24;
    const baseFat = 6;

    const multiplier = Number(servings) || 1;

    setMeals((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'Snack',
        name: `Scanned Item (${servings} ${unit})`,
        calories: Math.round(baseCals * multiplier),
        protein: Math.round(baseProtein * multiplier),
        carbs: Math.round(baseCarbs * multiplier),
        fat: Math.round(baseFat * multiplier)
      }
    ]);
  };

  const handleDeleteMeal = (id) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleGroceryItem = (id) => {
    setGroceryItems((prev) =>
      prev.map((g) => (g.id === id ? { ...g, checked: !g.checked } : g))
    );
  };

  const handleAddCustomGrocery = (e) => {
    e.preventDefault();
    if (!customGrocery.trim()) return;
    setGroceryItems((prev) => [
      ...prev,
      { id: Date.now().toString(), item: customGrocery.trim(), category: 'Custom Items', checked: false }
    ]);
    setCustomGrocery('');
  };

  const removeGroceryItem = (id) => {
    setGroceryItems((prev) => prev.filter((g) => g.id !== id));
  };

  const handleAddRecipeIngredientsToGrocery = (recipeName) => {
    const details = detailedRecipes[recipeName];
    if (!details || !details.ingredients) return;

    const newItems = details.ingredients.map((ing, idx) => ({
      id: `${Date.now()}-${idx}`,
      item: `${ing} (for ${recipeName})`,
      category: 'Recipe Ingredients',
      checked: false
    }));

    setGroceryItems((prev) => [...prev, ...newItems]);
  };

  const handleAddExclusion = (e) => {
    e.preventDefault();
    if (!newExclusion.trim() || excludedFoods.includes(newExclusion.trim())) return;
    const updatedExclusions = [...excludedFoods, newExclusion.trim()];
    setExcludedFoods(updatedExclusions);
    setMealPlansData(generateVariedWeeklyPlan(detailedRecipes, updatedExclusions));
    setNewExclusion('');
  };

  const handleRemoveExclusion = (item) => {
    const updatedExclusions = excludedFoods.filter((f) => f !== item);
    setExcludedFoods(updatedExclusions);
    setMealPlansData(generateVariedWeeklyPlan(detailedRecipes, updatedExclusions));
  };

  const handleOpenRecipe = (mealName) => {
    const details = detailedRecipes[mealName] || {
      category: 'General', prep: '15 mins', cals: '450 kcal', protein: '30g', carbs: '40g', fat: '15g',
      ingredients: ['Fresh healthy ingredients tailored to this meal'],
      instructions: ['Prepare ingredients.', 'Cook over medium heat until ready.']
    };

    setSelectedRecipeModal({ 
      title: mealName, 
      ...details, 
      instructions: Array.isArray(details.instructions) ? details.instructions : [details.instructions] 
    });
  };

  const isMealExcluded = (mealName) => {
    if (!mealName) return false;
    const lowerName = mealName.toLowerCase();
    const recipe = detailedRecipes[mealName];

    return excludedFoods.some((ex) => {
      const lowerEx = ex.toLowerCase();
      if (lowerEx === 'seafood' || lowerEx === 'fish') {
        const seafoodKeywords = ['salmon', 'tuna', 'cod', 'shrimp', 'fish', 'seafood'];
        if (seafoodKeywords.some((kw) => lowerName.includes(kw))) return true;
        if (recipe?.ingredients?.some((ing) => seafoodKeywords.some((kw) => ing.toLowerCase().includes(kw)))) return true;
      }
      if (lowerName.includes(lowerEx)) return true;
      if (recipe?.ingredients?.some((ing) => ing.toLowerCase().includes(lowerEx))) return true;
      return false;
    });
  };

  const getSwapSuggestions = (targetCategory) => {
    return Object.entries(detailedRecipes)
      .filter(([name, data]) => data.category === targetCategory && !isMealExcluded(name))
      .map(([name, data]) => ({ name, ...data }));
  };

  const handleExecuteManualSwap = (newRecipeName) => {
    if (!swapModalState) return;
    const { dayIndex, mealKey } = swapModalState;

    setMealPlansData((prev) => {
      const updated = [...prev];
      updated[dayIndex] = { ...updated[dayIndex], [mealKey]: newRecipeName };
      return updated;
    });
    setSwapModalState(null);
  };

  const handleSaveCustomRecipe = (e) => {
    e.preventDefault();
    if (!newCustomRecipe.title.trim()) return;

    const formattedIngredients = newCustomRecipe.ingredientsInput.split('\n').map(i => i.trim()).filter(Boolean);
    const formattedInstructions = newCustomRecipe.instructionsInput.split('\n').map(i => i.trim()).filter(Boolean);

    const recipeObj = {
      category: newCustomRecipe.category,
      prep: newCustomRecipe.prep.includes('mins') ? newCustomRecipe.prep : `${newCustomRecipe.prep} mins`,
      cals: newCustomRecipe.cals.includes('kcal') ? newCustomRecipe.cals : `${newCustomRecipe.cals} kcal`,
      protein: newCustomRecipe.protein.includes('g') ? newCustomRecipe.protein : `${newCustomRecipe.protein}g`,
      carbs: newCustomRecipe.carbs.includes('g') ? newCustomRecipe.carbs : `${newCustomRecipe.carbs}g`,
      fat: newCustomRecipe.fat.includes('g') ? newCustomRecipe.fat : `${newCustomRecipe.fat}g`,
      ingredients: formattedIngredients.length > 0 ? formattedIngredients : ['Custom ingredients'],
      instructions: formattedInstructions.length > 0 ? formattedInstructions : ['Follow personal preparation steps.']
    };

    const updatedRecipes = { ...detailedRecipes, [newCustomRecipe.title.trim()]: recipeObj };

    setDetailedRecipes(updatedRecipes);
    setMealPlansData(generateVariedWeeklyPlan(updatedRecipes, excludedFoods));
    setNewCustomRecipe({
      title: '', category: 'breakfast', prep: '15 mins', cals: '400 kcal',
      protein: '25g', carbs: '35g', fat: '12g', ingredientsInput: '', instructionsInput: ''
    });
    setShowCustomRecipeModal(false);
  };

  return (
    <section className="space-y-6">
      {/* Navigation Header */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Utensils className="text-emerald-400 w-5 h-5" /> Nutrition & Meal Planner Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track macros, scan barcodes with portion tracking, customize weekly plans, and explore recipes.
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700/80 overflow-x-auto">
          <button onClick={() => setActiveTab('tracker')} className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${activeTab === 'tracker' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
            <Flame className="w-3.5 h-3.5" /> Macro Tracker
          </button>
          <button onClick={() => setActiveTab('plans')} className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${activeTab === 'plans' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
            <Calendar className="w-3.5 h-3.5" /> Meal Plans
          </button>
          <button onClick={() => setActiveTab('customRecipes')} className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${activeTab === 'customRecipes' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
            <BookOpen className="w-3.5 h-3.5" /> Recipe Library
          </button>
          <button onClick={() => setActiveTab('grocery')} className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${activeTab === 'grocery' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
            <ShoppingCart className="w-3.5 h-3.5" /> Grocery List
          </button>
        </div>
      </div>

      {/* TAB 1: MACRO TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Calories</span>
                <span className="text-white font-bold">{consumed.calories} / {targets.calories}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${Math.min(Math.round((consumed.calories / targets.calories) * 100), 100)}%` }}></div>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Protein</span>
                <span className="text-white font-bold">{consumed.protein}g / {targets.protein}g</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${Math.min(Math.round((consumed.protein / targets.protein) * 100), 100)}%` }}></div>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Carbs</span>
                <span className="text-white font-bold">{consumed.carbs}g / {targets.carbs}g</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
                <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${Math.min(Math.round((consumed.carbs / targets.carbs) * 100), 100)}%` }}></div>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Fats</span>
                <span className="text-white font-bold">{consumed.fat}g / {targets.fat}g</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
                <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${Math.min(Math.round((consumed.fat / targets.fat) * 100), 100)}%` }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Today's Logged Meals</h3>
                <button
                  onClick={() => setShowScannerModal(true)}
                  className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <ScanLine className="w-4 h-4" /> Scan Barcode
                </button>
              </div>

              {meals.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">No meals logged yet today.</div>
              ) : (
                <div className="space-y-2.5">
                  {meals.map((meal) => (
                    <div key={meal.id} className="bg-slate-900 border border-slate-700/80 p-3.5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                          <Apple className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{meal.name}</span>
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">{meal.type}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">
                            {meal.calories} kcal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                          </span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteMeal(meal.id)} className="text-slate-500 hover:text-red-400 transition cursor-pointer p-1.5">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Add Custom Meal</h3>
              <form onSubmit={handleAddMeal} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Meal Type</label>
                  <select value={newMeal.type} onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Meal Name</label>
                  <input type="text" placeholder="e.g. Chicken Rice Bowl" value={newMeal.name} onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Calories (kcal)</label>
                    <input type="number" placeholder="450" value={newMeal.calories} onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Protein (g)</label>
                    <input type="number" placeholder="30" value={newMeal.protein} onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Carbs (g)</label>
                    <input type="number" placeholder="40" value={newMeal.carbs} onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fat (g)</label>
                    <input type="number" placeholder="12" value={newMeal.fat} onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md">
                  <Plus className="w-4 h-4" /> Log Meal
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEAL PLANS & EXCLUSIONS */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Ban className="text-rose-400 w-4 h-4" /> Excluded Foods & Dietary Filters
            </h3>
            <div className="flex flex-wrap gap-2">
              {excludedFoods.map((item) => (
                <span key={item} className="bg-rose-950/60 border border-rose-800/80 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2">
                  {item}
                  <button onClick={() => handleRemoveExclusion(item)} className="text-rose-400 hover:text-rose-200 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <form onSubmit={handleAddExclusion} className="flex gap-2 max-w-md pt-2">
              <input type="text" placeholder="Add allergen..." value={newExclusion} onChange={(e) => setNewExclusion(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <button type="submit" className="bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs"><Plus className="w-3.5 h-3.5 inline" /> Exclude</button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><Calendar className="text-emerald-400 w-4 h-4" /> 7-Day Meal Schedule</h3>
              <button onClick={() => setMealPlansData(generateVariedWeeklyPlan(detailedRecipes, excludedFoods))} className="bg-slate-800 border border-slate-700 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" /> Regenerate Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {mealPlansData.map((dayPlan, dayIdx) => (
                <div key={dayPlan.day} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase border-b border-slate-700 pb-2">{dayPlan.day}</h4>
                  {[
                    { key: 'b', label: 'Breakfast', name: dayPlan.b },
                    { key: 'l', label: 'Lunch', name: dayPlan.l },
                    { key: 'd', label: 'Dinner', name: dayPlan.d },
                    { key: 'snacks', label: 'Snack', name: dayPlan.snacks }
                  ].map((m) => {
                    const excluded = isMealExcluded(m.name);
                    return (
                      <div key={m.key} className={`p-2.5 rounded-xl border ${excluded ? 'bg-rose-950/30 border-rose-800/60' : 'bg-slate-900 border-slate-700/60'}`}>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{m.label}</span>
                        <button onClick={() => handleOpenRecipe(m.name)} className="text-xs font-bold text-white hover:text-emerald-400 transition text-left block w-full my-1 cursor-pointer">
                          {m.name}
                        </button>
                        <div className="flex justify-between text-[10px] pt-1 border-t border-slate-800">
                          <button onClick={() => handleAddRecipeIngredientsToGrocery(m.name)} className="text-emerald-400 hover:text-emerald-300 cursor-pointer">+ Grocery</button>
                          <button onClick={() => setSwapModalState({ dayIndex: dayIdx, mealKey: m.key, mealType: m.label, currentName: m.name, targetCategory: m.key === 'b' ? 'breakfast' : m.key === 'l' ? 'lunch' : m.key === 'd' ? 'dinner' : 'snack' })} className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer">
                            <ArrowRightLeft className="w-3 h-3" /> Swap
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RECIPE LIBRARY */}
      {activeTab === 'customRecipes' && (
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><BookOpen className="text-emerald-400 w-4 h-4" /> Full Recipe Library</h3>
              <p className="text-xs text-slate-400 mt-0.5">{Object.keys(detailedRecipes).length} healthy recipes available</p>
            </div>
            <button onClick={() => setShowCustomRecipeModal(true)} className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"><Plus className="w-4 h-4" /> Create Custom Recipe</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(detailedRecipes).map(([name, data]) => (
              <div key={name} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-slate-900 text-emerald-400 border border-slate-700 px-2 py-0.5 rounded font-bold uppercase">{data.category}</span>
                    <span className="text-[10px] text-slate-400">{data.prep}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white my-2">{name}</h4>
                  <p className="text-[10px] text-slate-400">{data.cals} • P: {data.protein} • C: {data.carbs} • F: {data.fat}</p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-700/80">
                  <button onClick={() => handleOpenRecipe(name)} className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">View Recipe →</button>
                  <button onClick={() => handleAddRecipeIngredientsToGrocery(name)} className="bg-slate-900 text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] flex items-center gap-1 border border-slate-700 cursor-pointer">+ Grocery</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GROCERY LIST */}
      {activeTab === 'grocery' && (
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShoppingCart className="text-emerald-400 w-4 h-4" /> Smart Grocery List</h3>
          <form onSubmit={handleAddCustomGrocery} className="flex gap-2 max-w-md">
            <input type="text" placeholder="Add grocery item..." value={customGrocery} onChange={(e) => setCustomGrocery(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
            <button type="submit" className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"><Plus className="w-4 h-4" /></button>
          </form>
          <div className="space-y-2">
            {groceryItems.map((g) => (
              <div key={g.id} className="bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={g.checked} onChange={() => toggleGroceryItem(g.id)} className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 cursor-pointer" />
                  <span className={`text-xs ${g.checked ? 'line-through text-slate-500' : 'text-white'}`}>{g.item}</span>
                </div>
                <button onClick={() => removeGroceryItem(g.id)} className="text-slate-500 hover:text-red-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: BARCODE SCANNER & QUANTITY SELECTION */}
      <BarcodeScannerModal
        isOpen={showScannerModal}
        onClose={() => setShowScannerModal(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* MODAL: RECIPE DETAILS */}
      {selectedRecipeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-lg font-bold uppercase">{selectedRecipeModal.category}</span>
              <button onClick={() => setSelectedRecipeModal(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <h3 className="text-base font-bold text-white">{selectedRecipeModal.title}</h3>
            <p className="text-xs text-emerald-400 font-semibold">{selectedRecipeModal.cals} • P: {selectedRecipeModal.protein} • C: {selectedRecipeModal.carbs} • F: {selectedRecipeModal.fat}</p>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Ingredients</h4>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 bg-slate-800 p-3 rounded-xl">
                {selectedRecipeModal.ingredients?.map((ing, idx) => <li key={idx}>{ing}</li>)}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Instructions</h4>
              <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 bg-slate-800 p-3 rounded-xl">
                {selectedRecipeModal.instructions?.map((step, idx) => <li key={idx}>{step}</li>)}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CUSTOM RECIPE CREATOR */}
      {showCustomRecipeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><ChefHat className="text-emerald-400 w-4 h-4" /> Create Custom Recipe</h3>
              <button onClick={() => setShowCustomRecipeModal(false)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveCustomRecipe} className="space-y-3">
              <input type="text" required placeholder="Recipe Title" value={newCustomRecipe.title} onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, title: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <div className="grid grid-cols-2 gap-2">
                <select value={newCustomRecipe.category} onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, category: e.target.value })} className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
                <input type="text" placeholder="Prep Time (e.g. 15 mins)" value={newCustomRecipe.prep} onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, prep: e.target.value })} className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
              <textarea rows="3" placeholder="Ingredients (one per line)" value={newCustomRecipe.ingredientsInput} onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, ingredientsInput: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <textarea rows="3" placeholder="Instructions (one per line)" value={newCustomRecipe.instructionsInput} onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, instructionsInput: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs cursor-pointer">Save Recipe</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MANUAL SWAP SELECTION */}
      {swapModalState && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Swap {swapModalState.mealType}</h3>
              <button onClick={() => setSwapModalState(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {getSwapSuggestions(swapModalState.targetCategory).map((cand) => (
                <div key={cand.name} className="bg-slate-800 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{cand.name}</h4>
                    <p className="text-[10px] text-slate-400">{cand.cals}</p>
                  </div>
                  <button onClick={() => handleExecuteManualSwap(cand.name)} className="bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[10px] cursor-pointer">Select</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}