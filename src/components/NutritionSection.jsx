import React, { useState, useMemo } from 'react';
import { 
  Utensils, 
  Plus, 
  Flame, 
  CheckCircle2, 
  Trash2, 
  Apple, 
  ShoppingCart, 
  Calendar,
  ChefHat,
  Sparkles,
  Check,
  X,
  Clock,
  Ban,
  RefreshCw,
  ScanLine,
  Camera,
  Search,
  ArrowRightLeft,
  BookOpen
} from 'lucide-react';

// Comprehensive detailed recipe dictionary with expanded variety across categories
const initialDetailedRecipes = {
  // Breakfasts
  'Overnight Oats with Chia Seeds & Berries': { category: 'breakfast', prep: '5 mins', cals: '380 kcal', protein: '24g', carbs: '52g', fat: '8g', ingredients: ['Rolled Oats', 'Chia Seeds', 'Almond Milk', 'Berries', 'Honey'], instructions: ['Combine oats, chia seeds, and almond milk in a jar.', 'Stir well, cover, and refrigerate overnight.', 'Top with berries and honey.'] },
  'Greek Yogurt Parfait with Granola': { category: 'breakfast', prep: '5 mins', cals: '350 kcal', protein: '28g', carbs: '45g', fat: '6g', ingredients: ['Greek Yogurt', 'Granola', 'Berries', 'Honey'], instructions: ['Layer yogurt, granola, and berries in a glass.', 'Drizzle with honey before serving.'] },
  'Scrambled Eggs on Whole Grain Toast': { category: 'breakfast', prep: '10 mins', cals: '400 kcal', protein: '24g', carbs: '30g', fat: '20g', ingredients: ['Eggs', 'Whole Grain Bread', 'Avocado'], instructions: ['Whisk and scramble eggs over medium-low heat.', 'Toast bread and top with smashed avocado and eggs.'] },
  'Protein Smoothie with Spinach & Banana': { category: 'breakfast', prep: '5 mins', cals: '340 kcal', protein: '30g', carbs: '42g', fat: '5g', ingredients: ['Protein Powder', 'Banana', 'Spinach', 'Almond Milk'], instructions: ['Add all ingredients to blender and blend until smooth.'] },
  'Avocado & Poached Egg Toast': { category: 'breakfast', prep: '10 mins', cals: '370 kcal', protein: '18g', carbs: '28g', fat: '21g', ingredients: ['Eggs', 'Sourdough', 'Avocado', 'Everything Bagel Seasoning'], instructions: ['Poach eggs, mash avocado on toasted sourdough, and garnish with seasoning.'] },
  'Cottage Cheese & Pineapple Bowl': { category: 'breakfast', prep: '3 mins', cals: '260 kcal', protein: '28g', carbs: '24g', fat: '4g', ingredients: ['Cottage Cheese', 'Pineapple Chunks', 'Walnuts'], instructions: ['Combine cottage cheese and pineapple chunks, top with crushed walnuts.'] },
  'Smoked Salmon & Cream Cheese Bagel': { category: 'breakfast', prep: '5 mins', cals: '410 kcal', protein: '26g', carbs: '42g', fat: '14g', ingredients: ['Whole Wheat Bagel', 'Light Cream Cheese', 'Smoked Salmon', 'Capers'], instructions: ['Spread cream cheese on toasted bagel, layer with smoked salmon and capers.'] },
  'Shakshuka with Feta & Crusty Bread': { category: 'breakfast', prep: '25 mins', cals: '390 kcal', protein: '20g', carbs: '36g', fat: '18g', ingredients: ['Eggs', 'Tomatoes', 'Bell Peppers', 'Onion', 'Feta', 'Olive Oil'], instructions: ['Simmer spiced tomato and pepper sauce, poach eggs directly in the sauce.', 'Garnish with crumbled feta and serve with bread.'] },
  'Almond Flour Banana Pancakes': { category: 'breakfast', prep: '15 mins', cals: '420 kcal', protein: '16g', carbs: '38g', fat: '22g', ingredients: ['Almond Flour', 'Banana', 'Eggs', 'Vanilla Extract', 'Maple Syrup'], instructions: ['Mash banana and whisk with eggs and almond flour.', 'Cook small portions on a greased skillet until golden brown.'] },
  'Spinach, Feta & Tomato Egg White Frittata': { category: 'breakfast', prep: '10 mins', cals: '220 kcal', protein: '22g', carbs: '8g', fat: '10g', ingredients: ['Liquid Egg Whites', 'Baby Spinach', 'Cherry Tomatoes', 'Feta Cheese', 'Olive Oil'], instructions: ['Sauté spinach and tomatoes in an oven-safe skillet.', 'Pour over whisked egg whites and top with feta.', 'Bake at 375°F until set.'] },
  'Almond Butter & Banana Chia Toast': { category: 'breakfast', prep: '5 mins', cals: '310 kcal', protein: '9g', carbs: '34g', fat: '15g', ingredients: ['Sprouted Whole-Grain Bread', 'Almond Butter', 'Banana', 'Chia Seeds', 'Honey'], instructions: ['Toast bread and spread with almond butter.', 'Top with sliced banana, chia seeds, and a drizzle of honey.'] },
  'Greek Yogurt Power Parfait': { category: 'breakfast', prep: '5 mins', cals: '290 kcal', protein: '24g', carbs: '32g', fat: '6g', ingredients: ['Greek Yogurt', 'High-Protein Granola', 'Peaches', 'Pumpkin Seeds', 'Honey'], instructions: ['Layer yogurt, diced fruit, and granola in a bowl.', 'Top with pumpkin seeds and honey.'] },
  'Zucchini & Turkey Sausage Egg Muffins': { category: 'breakfast', prep: '10 mins', cals: '210 kcal', protein: '18g', carbs: '5g', fat: '12g', ingredients: ['Eggs', 'Egg Whites', 'Turkey Sausage', 'Zucchini', 'Bell Peppers', 'Cheddar Cheese'], instructions: ['Distribute cooked turkey sausage, grated zucchini, and peppers into a greased muffin tin.', 'Pour whisked eggs over fillings, top with cheese, and bake at 350°F.'] },


  // Lunches
  'Grilled Chicken Quinoa Bowl': { category: 'lunch', prep: '20 mins', cals: '550 kcal', protein: '45g', carbs: '40g', fat: '22g', ingredients: ['Chicken Breast', 'Quinoa', 'Avocado', 'Greens'], instructions: ['Grill chicken and serve over a bed of quinoa and greens with sliced avocado.'] },
  'Turkey Wrap with Avocado & Greens': { category: 'lunch', prep: '10 mins', cals: '450 kcal', protein: '35g', carbs: '42g', fat: '16g', ingredients: ['Tortilla', 'Deli Turkey', 'Avocado', 'Spinach'], instructions: ['Spread avocado on tortilla, add sliced turkey and spinach, then roll up.'] },
  'Tuna Salad Stuffed Bell Peppers': { category: 'lunch', prep: '10 mins', cals: '360 kcal', protein: '38g', carbs: '18g', fat: '14g', ingredients: ['Tuna', 'Greek Yogurt', 'Celery', 'Bell Peppers'], instructions: ['Mix tuna with Greek yogurt and diced celery, spoon into bell pepper halves.'] },
  'Mediterranean Chickpea Salad': { category: 'lunch', prep: '15 mins', cals: '410 kcal', protein: '15g', carbs: '55g', fat: '16g', ingredients: ['Chickpeas', 'Cucumbers', 'Tomatoes', 'Feta', 'Olive Oil'], instructions: ['Toss chickpeas, cucumbers, and tomatoes together with olive oil and lemon juice.'] },
  'Zucchini Noodles with Turkey Meatballs': { category: 'lunch', prep: '20 mins', cals: '430 kcal', protein: '40g', carbs: '22g', fat: '20g', ingredients: ['Zucchini Noodles', 'Turkey Meatballs', 'Marinara Sauce'], instructions: ['Lightly sauté zoodles, top with warm baked turkey meatballs and marinara.'] },
  'Black Bean & Corn Burrito Bowl': { category: 'lunch', prep: '15 mins', cals: '460 kcal', protein: '18g', carbs: '70g', fat: '12g', ingredients: ['Brown Rice', 'Black Beans', 'Corn', 'Salsa', 'Lime'], instructions: ['Combine warm brown rice, black beans, and corn. Garnish with salsa and lime juice.'] },
  'Quinoa & Roasted Veggie Salad': { category: 'lunch', prep: '25 mins', cals: '390 kcal', protein: '14g', carbs: '58g', fat: '12g', ingredients: ['Quinoa', 'Bell Peppers', 'Zucchini', 'Red Onion', 'Balsamic Vinaigrette'], instructions: ['Roast diced vegetables and toss with cooked quinoa and balsamic dressing.'] },
  'Chicken & White Bean Soup': { category: 'lunch', prep: '30 mins', cals: '380 kcal', protein: '42g', carbs: '38g', fat: '8g', ingredients: ['Chicken Breast', 'Cannellini Beans', 'Carrots', 'Celery', 'Chicken Broth'], instructions: ['Simmer diced vegetables, beans, and shredded chicken in broth until tender.'] },
  'Lentil & Walnut Veggie Burger': { category: 'lunch', prep: '25 mins', cals: '440 kcal', protein: '18g', carbs: '52g', fat: '18g', ingredients: ['Lentils', 'Walnuts', 'Whole Wheat Bun', 'Lettuce', 'Tomato'], instructions: ['Form patties from mashed lentils and walnuts, pan-sear, and serve on buns.'] },
  'Smashed Chickpea Salad Wrap': { category: 'lunch', prep: '15 mins', cals: '380 kcal', protein: '14g', carbs: '54g', fat: '12g', ingredients: ['Chickpeas', 'Greek Yogurt', 'Lemon Juice', 'Celery', 'Red Onion', 'Whole-Wheat Wraps'], instructions: ['Coarsely mash chickpeas and mix with Greek yogurt, lemon juice, celery, and red onion.', 'Spoon mixture into whole-wheat wraps.'] },
  'Lemon Herb Grilled Chicken & Quinoa Salad': { category: 'lunch', prep: '20 mins', cals: '410 kcal', protein: '38g', carbs: '36g', fat: '13g', ingredients: ['Chicken Breast', 'Quinoa', 'Cucumber', 'Cherry Tomatoes', 'Feta Cheese', 'Olive Oil'], instructions: ['Grill and dice chicken breast, then toss with cooked quinoa, cucumber, tomatoes, and feta.', 'Dress with olive oil and lemon juice.'] },
  'Spicy Beef & Edamame Lettuce Wraps': { category: 'lunch', prep: '15 mins', cals: '340 kcal', protein: '36g', carbs: '14g', fat: '15g', ingredients: ['Ground Beef', 'Shelled Edamame', 'Green Onions', 'Coconut Aminos', 'Sriracha', 'Butter Lettuce'], instructions: ['Brown ground beef, then stir in edamame, coconut aminos, and sriracha.', 'Spoon warm mixture into crisp butter lettuce leaves.'] },
  'Chicken & Avocado Lettuce Boats': { category: 'lunch', prep: '10 mins', cals: '360 kcal', protein: '38g', carbs: '10g', fat: '18g', ingredients: ['Shredded Chicken Breast', 'Avocado', 'Greek Yogurt', 'Cilantro', 'Romaine Lettuce Leaves'], instructions: ['Mix shredded chicken with diced avocado, Greek yogurt, and cilantro.', 'Spoon mixture into crisp romaine lettuce leaves.'] },
  'Turkey, Pesto & Provolone Panini': { category: 'lunch', prep: '10 mins', cals: '440 kcal', protein: '35g', carbs: '38g', fat: '16g', ingredients: ['Whole-Grain Bread', 'Sliced Deli Turkey', 'Basil Pesto', 'Provolone Cheese', 'Sliced Tomato'], instructions: ['Spread basil pesto onto whole-grain bread slices, layer with turkey, provolone cheese, and tomato.', 'Press and toast in a panini press or skillet until golden and cheese is melted.'] },
  'Smoked Turkey & Cranberry Club Sandwich': { category: 'lunch', prep: '10 mins', cals: '410 kcal', protein: '32g', carbs: '45g', fat: '10g', ingredients: ['Sourdough Bread', 'Smoked Turkey', 'Cranberry Sauce', 'Spinach', 'Light Mayo'], instructions: ['Toast sourdough bread lightly and spread a thin layer of cranberry sauce and light mayo.', 'Stack with smoked turkey and fresh spinach leaves.'] },
  'Roast Beef & Horseradish Cheddar Sandwich': { category: 'lunch', prep: '10 mins', cals: '450 kcal', protein: '38g', carbs: '40g', fat: '14g', ingredients: ['Rye Bread', 'Lean Roast Beef', 'Horseradish Sauce', 'Cheddar Cheese', 'Arugula'], instructions: ['Layer lean roast beef, sharp cheddar cheese, and peppery arugula on hearty rye bread.', 'Spread horseradish sauce on the bread for a sharp kick.'] },
  'Grilled Chicken & Avocado Club Sandwich': { category: 'lunch', prep: '15 mins', cals: '470 kcal', protein: '42g', carbs: '36g', fat: '18g', ingredients: ['Whole-Wheat Bread', 'Grilled Chicken Breast', 'Avocado Slices', 'Crispy Turkey Bacon', 'Tomato'], instructions: ['Toast whole-wheat bread and layer with sliced grilled chicken, smashed avocado, turkey bacon, and tomato slices.'] },
  'Mediterranean Grilled Veggie & Hummus Sandwich': { category: 'lunch', prep: '15 mins', cals: '380 kcal', protein: '14g', carbs: '52g', fat: '14g', ingredients: ['Ciabatta Bread', 'Hummus', 'Roasted Red Peppers', 'Cucumber', 'Feta Cheese', 'Spinach'], instructions: ['Generously spread hummus on toasted ciabatta bread.', 'Layer with roasted red peppers, sliced cucumber, crumbled feta cheese, and fresh spinach.'] },

  // Dinners
  'Baked Salmon with Asparagus & Sweet Potato': { category: 'dinner', prep: '25 mins', cals: '520 kcal', protein: '42g', carbs: '35g', fat: '20g', ingredients: ['Salmon', 'Asparagus', 'Sweet Potato'], instructions: ['Bake salmon, sweet potato wedges, and asparagus at 400°F until cooked through.'] },
  'Lean Beef Stir-Fry with Broccoli & Brown Rice': { category: 'dinner', prep: '20 mins', cals: '510 kcal', protein: '40g', carbs: '48g', fat: '15g', ingredients: ['Lean Beef', 'Broccoli', 'Brown Rice', 'Soy Sauce'], instructions: ['Stir-fry beef strips and broccoli with soy sauce, serve over brown rice.'] },
  'Grilled Shrimp Tacos with Cabbage Slaw': { category: 'dinner', prep: '15 mins', cals: '420 kcal', protein: '32g', carbs: '45g', fat: '12g', ingredients: ['Shrimp', 'Tortillas', 'Cabbage Slaw'], instructions: ['Cook seasoned shrimp and assemble in warm corn tortillas with fresh cabbage slaw.'] },
  'Lemon Herb Chicken with Roasted Zucchini': { category: 'dinner', prep: '25 mins', cals: '440 kcal', protein: '46g', carbs: '15g', fat: '20g', ingredients: ['Chicken Breast', 'Zucchini', 'Lemon', 'Herbs'], instructions: ['Bake chicken breast and sliced zucchini coated with lemon juice and mixed herbs.'] },
  'Lean Turkey Chili with Kidney Beans': { category: 'dinner', prep: '30 mins', cals: '490 kcal', protein: '44g', carbs: '50g', fat: '12g', ingredients: ['Ground Turkey', 'Kidney Beans', 'Diced Tomatoes', 'Chili Spices'], instructions: ['Brown turkey, add beans, tomatoes, and spices. Simmer for 25 minutes.'] },
  'Baked Cod with Quinoa & Steamed Broccoli': { category: 'dinner', prep: '20 mins', cals: '390 kcal', protein: '38g', carbs: '35g', fat: '8g', ingredients: ['Cod Fillet', 'Quinoa', 'Broccoli'], instructions: ['Bake cod fillet with lemon and spices, serve alongside quinoa and steamed broccoli.'] },
  'Pork Tenderloin with Roasted Brussels Sprouts': { category: 'dinner', prep: '30 mins', cals: '480 kcal', protein: '45g', carbs: '20g', fat: '24g', ingredients: ['Pork Tenderloin', 'Brussels Sprouts', 'Olive Oil'], instructions: ['Roast pork tenderloin and halved Brussels sprouts until tender and caramelized.'] },
  'Beef & Mushroom Stuffed Bell Peppers': { category: 'dinner', prep: '40 mins', cals: '460 kcal', protein: '36g', carbs: '30g', fat: '22g', ingredients: ['Ground Beef', 'Mushrooms', 'Bell Peppers', 'Brown Rice', 'Mozzarella'], instructions: ['Mix cooked beef, mushrooms, and rice, stuff into peppers, top with cheese and bake.'] },
  'Herbed Turkey Meatballs with Polenta': { category: 'dinner', prep: '35 mins', cals: '470 kcal', protein: '42g', carbs: '44g', fat: '14g', ingredients: ['Ground Turkey', 'Polenta', 'Parmesan', 'Herb Marinara'], instructions: ['Bake turkey meatballs and serve over creamy warm polenta with marinara.'] },
  'Honey Garlic Chicken & Broccoli Bowls': { category: 'dinner', prep: '15 mins', cals: '450 kcal', protein: '40g', carbs: '48g', fat: '10g', ingredients: ['Chicken Breasts', 'Broccoli', 'Quinoa', 'Honey', 'Sriracha', 'Soy Sauce', 'Garlic'], instructions: ['Cook breaded diced chicken in a skillet, then coat with honey-garlic sauce.', 'Stir-fry broccoli and serve with quinoa and chicken.'] },
  'Hearty Tuscan White Bean & Kale Soup': { category: 'dinner', prep: '15 mins', cals: '280 kcal', protein: '14g', carbs: '42g', fat: '5g', ingredients: ['Cannellini Beans', 'Lacinato Kale', 'Onion', 'Carrots', 'Celery', 'Garlic', 'Vegetable Broth'], instructions: ['Sauté aromatic vegetables, add broth and cannellini beans (partially mashed for thickness).', 'Simmer and stir in chopped kale until tender.'] },
  'Baked Herb-Crusted Chicken Tenders': { category: 'dinner', prep: '15 mins', cals: '330 kcal', protein: '42g', carbs: '20g', fat: '8g', ingredients: ['Chicken Tenderloins', 'Whole Wheat Breadcrumbs', 'Greek Yogurt', 'Paprika', 'Garlic Powder'], instructions: ['Coat chicken tenders in Greek yogurt, then dredge in seasoned breadcrumbs.', 'Bake on a wire rack at 400°F until crispy.'] },
  'Balsamic Glazed Chicken with Roasted Root Veggies': { category: 'dinner', prep: '30 mins', cals: '460 kcal', protein: '44g', carbs: '38g', fat: '12g', ingredients: ['Chicken Breast', 'Carrots', 'Parsnips', 'Balsamic Vinegar', 'Olive Oil'], instructions: ['Toss chopped carrots and parsnips in olive oil and roast at 400°F.', 'Sear chicken breasts and glaze with balsamic reduction near the end of cooking.'] },
  'Ground Turkey & Green Bean Stir-Fry': { category: 'dinner', prep: '15 mins', cals: '390 kcal', protein: '38g', carbs: '22g', fat: '16g', ingredients: ['Ground Turkey', 'Fresh Green Beans', 'Garlic', 'Ginger', 'Coconut Aminos'], instructions: ['Brown ground turkey in a skillet, then add fresh green beans, minced garlic, and ginger.', 'Stir-fry with coconut aminos until tender-crisp.'] },
  'Lentil & Sweet Potato Shepherd’s Pie': { category: 'dinner', prep: '40 mins', cals: '440 kcal', protein: '16g', carbs: '68g', fat: '10g', ingredients: ['Green Lentils', 'Mixed Veggies', 'Vegetable Broth', 'Mashed Sweet Potatoes'], instructions: ['Simmer lentils and mixed vegetables in broth to create a thick base layer.', 'Top with a layer of fluffy mashed sweet potatoes and bake until golden.'] },
  'Pork Chop with Apples & Cabbage': { category: 'dinner', prep: '25 mins', cals: '480 kcal', protein: '42g', carbs: '30g', fat: '20g', ingredients: ['Pork Chops', 'Sliced Apples', 'Shredded Cabbage', 'Apple Cider Vinegar'], instructions: ['Sear pork chops until golden brown and cooked through, then set aside.', 'Sauté shredded cabbage and apples with a splash of apple cider vinegar until tender.'] },
  'Black Bean & Quinoa Stuffed Poblano Peppers': { category: 'dinner', prep: '35 mins', cals: '380 kcal', protein: '15g', carbs: '60g', fat: '10g', ingredients: ['Poblano Peppers', 'Black Beans', 'Cooked Quinoa', 'Salsa', 'Cumin', 'Monterey Jack Cheese'], instructions: ['Mix black beans, quinoa, salsa, and cumin together.', 'Stuff into halved poblano peppers, top with a light layer of cheese, and bake at 375°F.'] },
  'Authentic Chicken Tacos': { category: 'dinner', prep: '20 mins', cals: '420 kcal', protein: '38g', carbs: '40g', fat: '12g', ingredients: ['Chicken Breast', 'Corn Tortillas', 'Diced Onions', 'Cilantro', 'Lime', 'Taco Seasoning'], instructions: ['Season and grill chicken breast, then dice into bite-sized pieces.', 'Serve warm in corn tortillas and garnish generously with diced onions, fresh cilantro, and a squeeze of lime juice.'] },
  'Juicy Beef Tacos': { category: 'dinner', prep: '20 mins', cals: '480 kcal', protein: '36g', carbs: '38g', fat: '20g', ingredients: ['Lean Ground Beef', 'Taco Seasoning', 'Hard or Soft Tortillas', 'Shredded Lettuce', 'Diced Tomatoes', 'Cheddar Cheese'], instructions: ['Brown ground beef in a skillet, drain excess fat, and stir in taco seasoning with a splash of water.', 'Spoon into tortillas and top with shredded lettuce, diced tomatoes, and cheddar cheese.'] },
  'Classic Chicken Enchiladas': { category: 'dinner', prep: '35 mins', cals: '490 kcal', protein: '40g', carbs: '44g', fat: '18g', ingredients: ['Shredded Chicken Breast', 'Tortillas', 'Enchilada Sauce', 'Black Beans', 'Mexican Blend Cheese', 'Cilantro'], instructions: ['Mix shredded chicken with black beans and a portion of enchilada sauce.', 'Roll mixture into tortillas, place snugly in a baking dish, pour remaining sauce on top, cover with cheese, and bake at 375°F until bubbly.'] },
  'Mongolian Beef and Noodles': { category: 'dinner', prep: '25 mins', cals: '520 kcal', protein: '42g', carbs: '54g', fat: '16g', ingredients: ['Flank Steak', 'Lo Mein Noodles or Ramen', 'Soy Sauce', 'Brown Sugar', 'Garlic', 'Ginger', 'Green Onions'], instructions: ['Slice flank steak thin, sear in a hot skillet, and set aside.', 'Whisk soy sauce, brown sugar, garlic, and ginger into a sauce and simmer with cooked noodles and beef until glossy, garnishing with green onions.'] },
  'Crispy Chicken Caesar Wraps (Dinner)': { category: 'dinner', prep: '15 mins', cals: '460 kcal', protein: '44g', carbs: '38g', fat: '15g', ingredients: ['Chicken Breast or Tenders', 'Romaine Lettuce', 'Parmesan Cheese', 'Light Caesar Dressing', 'Large Tortillas'], instructions: ['Cook chicken until crispy or grilled, then slice into strips.', 'Toss chopped romaine lettuce with light Caesar dressing and parmesan cheese, add chicken, and wrap tightly in a large tortilla.'] },
  'Savory Chicken Salad Wraps (Dinner)': { category: 'dinner', prep: '15 mins', cals: '410 kcal', protein: '40g', carbs: '34g', fat: '12g', ingredients: ['Shredded Chicken Breast', 'Greek Yogurt', 'Dijon Mustard', 'Celery', 'Grapes or Pecans', 'Whole-Wheat Wraps'], instructions: ['Combine shredded chicken, Greek yogurt, Dijon mustard, diced celery, and sliced grapes or pecans in a bowl.', 'Spoon mixture into whole-wheat wraps for a hearty dinner meal.'] },

  // Snacks
  'Apple & Almond Butter': { category: 'snack', prep: '2 mins', cals: '220 kcal', protein: '4g', carbs: '28g', fat: '10g', ingredients: ['Apple', 'Almond Butter'], instructions: ['Slice apple and serve with a side of almond butter for dipping.'] },
  'Protein Shake & Walnuts': { category: 'snack', prep: '3 mins', cals: '290 kcal', protein: '26g', carbs: '10g', fat: '16g', ingredients: ['Protein Powder', 'Walnuts'], instructions: ['Mix protein powder with water or milk, pair with a handful of walnuts.'] },
  'Carrot Sticks & Hummus': { category: 'snack', prep: '2 mins', cals: '180 kcal', protein: '5g', carbs: '20g', fat: '9g', ingredients: ['Carrots', 'Hummus'], instructions: ['Serve fresh carrot sticks with seasoned hummus.'] },
  'Rice Cakes with Peanut Butter': { category: 'snack', prep: '2 mins', cals: '210 kcal', protein: '6g', carbs: '24g', fat: '10g', ingredients: ['Rice Cakes', 'Peanut Butter'], instructions: ['Spread peanut butter evenly across crispy rice cakes.'] },
  'Edamame with Sea Salt': { category: 'snack', prep: '5 mins', cals: '160 kcal', protein: '17g', carbs: '15g', fat: '6g', ingredients: ['Edamame Pods', 'Sea Salt'], instructions: ['Steam edamame pods until tender and sprinkle with sea salt.'] },
  'Greek Yogurt with Chia & Honey': { category: 'snack', prep: '3 mins', cals: '200 kcal', protein: '18g', carbs: '22g', fat: '3g', ingredients: ['Greek Yogurt', 'Chia Seeds', 'Honey'], instructions: ['Mix chia seeds and honey into Greek yogurt.'] },
  'Mixed Berries & Pumpkin Seeds': { category: 'snack', prep: '2 mins', cals: '170 kcal', protein: '6g', carbs: '20g', fat: '8g', ingredients: ['Mixed Berries', 'Pumpkin Seeds'], instructions: ['Combine fresh berries with raw pumpkin seeds for a crunchy antioxidant snack.'] },
  'Healthy Buffalo Chicken Dip': { category: 'snack', prep: '15 mins', cals: '240 kcal', protein: '22g', carbs: '6g', fat: '14g', ingredients: ['Shredded Chicken Breast', 'Light Cream Cheese', 'Greek Yogurt', 'Buffalo Hot Sauce', 'Cheddar Cheese', 'Celery Sticks'], instructions: ['Mix shredded chicken, softened light cream cheese, Greek yogurt, and buffalo hot sauce in a baking dish.', 'Top with a sprinkle of cheddar cheese, bake at 375°F until warm and melted, and serve with celery sticks.'] },
};

// Helper to generate a varied weekly plan without duplicate meals in the same week
const generateVariedWeeklyPlan = (recipes, exclusions) => {
  const isMatchExcluded = (name, data) => {
    const lowerName = name.toLowerCase();
    return exclusions.some(ex => {
      const lowerEx = ex.toLowerCase();
      // Expanded keyword check for seafood
      if (lowerEx === 'seafood' || lowerEx === 'fish') {
        const seafoodKeywords = ['salmon', 'tuna', 'cod', 'shrimp', 'fish', 'seafood', 'prawn', 'tilapia', 'halibut'];
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
    b: breakfasts[idx % breakfasts.length] || breakfasts[0],
    l: lunches[idx % lunches.length] || lunches[0],
    d: dinners[idx % dinners.length] || dinners[0],
    snacks: snacks[idx % snacks.length] || snacks[0]
  }));
};

export default function NutritionSection({ profile = {} }) {
  const [activeTab, setActiveTab] = useState('tracker'); // tracker, plans, grocery, customRecipes
  const [selectedRecipeModal, setSelectedRecipeModal] = useState(null);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Master Detailed Recipes State (includes default + custom user recipes)
  const [detailedRecipes, setDetailedRecipes] = useState(initialDetailedRecipes);

  // Custom Recipe Creator Modal & Form State
  const [showCustomRecipeModal, setShowCustomRecipeModal] = useState(false);
  const [newCustomRecipe, setNewCustomRecipe] = useState({
    title: '',
    category: 'breakfast',
    prep: '15 mins',
    cals: '400 kcal',
    protein: '25g',
    carbs: '35g',
    fat: '12g',
    ingredientsInput: '',
    instructionsInput: ''
  });

  // Manual Swap Modal State
  const [swapModalState, setSwapModalState] = useState(null); // { dayIndex, mealKey, mealType, currentName }

  // Excluded foods filter state (defaulting Seafood so users immediately test seafood filtering)
  const [excludedFoods, setExcludedFoods] = useState(['Seafood', 'Peanuts']);
  const [newExclusion, setNewExclusion] = useState('');

  // Macro & Calorie Tracking state (updated: removed the two default meals 'm1' and 'm2')
  const [meals, setMeals] = useState([]);

  const [newMeal, setNewMeal] = useState({
    type: 'Dinner',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  // Grocery list state
  const [groceryItems, setGroceryItems] = useState([
    { id: 'g1', item: 'Chicken Breast (3 lbs)', category: 'Proteins', checked: false },
    { id: 'g2', item: 'Brown Rice (2 bags)', category: 'Grains & Carbs', checked: false },
    { id: 'g3', item: 'Fresh Broccoli & Spinach', category: 'Produce', checked: true },
    { id: 'g4', item: 'Greek Yogurt (Large Tub)', category: 'Dairy', checked: false },
    { id: 'g5', item: 'Almonds & Peanut Butter', category: 'Pantry', checked: false },
  ]);
  const [customGrocery, setCustomGrocery] = useState('');

  // 7-day meal plans state initialized with varied recipes
  const [mealPlansData, setMealPlansData] = useState(() => 
    generateVariedWeeklyPlan(initialDetailedRecipes, ['Seafood', 'Peanuts'])
  );

  // Calculate recommended daily macro and calorie targets based on profile goals
  const targets = useMemo(() => {
    const current = profile?.currentWeight || 180;
    const goal = profile?.goal || 'weight_loss';

    let baseCalories = current * 12; // Maintenance estimation
    if (goal === 'weight_loss') baseCalories -= 500;
    if (goal === 'muscle_gain') baseCalories += 300;

    const targetProtein = Math.round(current * 1.0); // ~1g per lb
    const targetCarbs = Math.round((baseCalories * 0.4) / 4); // 40% of cals
    const targetFat = Math.round((baseCalories * 0.25) / 9); // 25% of cals

    return {
      calories: Math.round(baseCalories),
      protein: targetProtein,
      carbs: targetCarbs,
      fat: targetFat
    };
  }, [profile]);

  // Totals consumed so far
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

    setNewMeal({
      type: 'Snack',
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
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

  // New feature: Add ingredients from suggested recipes to the grocery list
  const handleAddRecipeIngredientsToGrocery = (recipeName) => {
    const details = detailedRecipes[recipeName];
    if (!details || !details.ingredients || details.ingredients.length === 0) return;

    const newItems = details.ingredients.map((ing, idx) => ({
      id: `${Date.now()}-${idx}`,
      item: `${ing} (for ${recipeName})`,
      category: 'Recipe Ingredients',
      checked: false
    }));

    setGroceryItems(prev => [...prev, ...newItems]);
  };

  // Excluded food handlers with comprehensive seafood catching (Salmon, Tuna, Cod, Shrimp, etc.)
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
      prep: '15 mins', cals: '450 kcal', protein: '30g', carbs: '40g', fat: '15g',
      ingredients: ['Fresh healthy ingredients tailored to this meal'],
      instructions: ['Prepare and measure all ingredients.', 'Cook over medium heat until ready.']
    };

    let formattedInstructions = details.instructions;
    if (typeof formattedInstructions === 'string') {
      formattedInstructions = [formattedInstructions];
    } else if (!Array.isArray(formattedInstructions)) {
      formattedInstructions = ['Prepare and cook according to preference.'];
    }

    setSelectedRecipeModal({ 
      title: mealName, 
      ...details, 
      instructions: formattedInstructions 
    });
  };

  // Comprehensive seafood & allergen check helper
  const isMealExcluded = (mealName) => {
    if (!mealName) return false;
    const lowerName = mealName.toLowerCase();
    const recipe = detailedRecipes[mealName];

    return excludedFoods.some((ex) => {
      const lowerEx = ex.toLowerCase();
      
      // If user excludes Seafood or Fish, catch all seafood variants automatically
      if (lowerEx === 'seafood' || lowerEx === 'fish') {
        const seafoodKeywords = ['salmon', 'tuna', 'cod', 'shrimp', 'fish', 'seafood', 'prawn', 'tilapia', 'halibut'];
        if (seafoodKeywords.some((kw) => lowerName.includes(kw))) return true;
        if (recipe && recipe.ingredients?.some((ing) => seafoodKeywords.some((kw) => ing.toLowerCase().includes(kw)))) {
          return true;
        }
      }

      if (lowerName.includes(lowerEx)) return true;
      if (recipe && recipe.ingredients?.some((ing) => ing.toLowerCase().includes(lowerEx))) {
        return true;
      }
      return false;
    });
  };

  // Automatically find a safe replacement recipe matching category
  const getSafeReplacement = (currentMealName, targetCategory) => {
    const allEntries = Object.entries(detailedRecipes);
    
    const safeCandidates = allEntries.filter(([name, data]) => {
      if (data.category !== targetCategory) return false;
      return !isMealExcluded(name);
    });

    if (safeCandidates.length > 0) {
      return safeCandidates[0][0];
    }

    const anySafe = allEntries.filter(([name]) => !isMealExcluded(name));
    return anySafe.length > 0 ? anySafe[0][0] : currentMealName;
  };

  // Get list of safe suggestion options for manual swapping modal
  const getSwapSuggestions = (targetCategory) => {
    const allEntries = Object.entries(detailedRecipes);
    return allEntries
      .filter(([name, data]) => {
        if (data.category !== targetCategory) return false;
        return !isMealExcluded(name);
      })
      .map(([name, data]) => ({ name, ...data }));
  };

  const handleExecuteManualSwap = (newRecipeName) => {
    if (!swapModalState) return;
    const { dayIndex, mealKey } = swapModalState;

    setMealPlansData((prev) => {
      const updated = [...prev];
      updated[dayIndex] = {
        ...updated[dayIndex],
        [mealKey]: newRecipeName
      };
      return updated;
    });
    setSwapModalState(null);
  };

  // Custom Recipe Creator Submission
  const handleSaveCustomRecipe = (e) => {
    e.preventDefault();
    if (!newCustomRecipe.title.trim()) return;

    const formattedIngredients = newCustomRecipe.ingredientsInput
      .split('\n')
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    const formattedInstructions = newCustomRecipe.instructionsInput
      .split('\n')
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

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

    const updatedRecipes = {
      ...detailedRecipes,
      [newCustomRecipe.title.trim()]: recipeObj
    };

    setDetailedRecipes(updatedRecipes);
    // Refresh schedule pool
    setMealPlansData(generateVariedWeeklyPlan(updatedRecipes, excludedFoods));

    // Reset and close modal
    setNewCustomRecipe({
      title: '',
      category: 'breakfast',
      prep: '15 mins',
      cals: '400 kcal',
      protein: '25g',
      carbs: '35g',
      fat: '12g',
      ingredientsInput: '',
      instructionsInput: ''
    });
    setShowCustomRecipeModal(false);
  };

  // Simulate scanning a barcode
  const handleSimulateScan = () => {
    const mockScannedItems = [
      { name: 'Organic Almond Milk (1 cup)', calories: 60, protein: 1, carbs: 3, fat: 5, type: 'Snack' },
      { name: 'Greek Honey Yogurt Cup', calories: 180, protein: 15, carbs: 22, fat: 3, type: 'Breakfast' },
      { name: 'Whole Wheat Protein Wrap', calories: 240, protein: 14, carbs: 30, fat: 6, type: 'Lunch' },
      { name: 'Grilled Chicken Breast Strips (4oz)', calories: 180, protein: 35, carbs: 0, fat: 4, type: 'Dinner' }
    ];
    const randomItem = mockScannedItems[Math.floor(Math.random() * mockScannedItems.length)];
    setScanResult(randomItem);
  };

  const handleAddScannedItem = () => {
    if (!scanResult) return;
    setMeals((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: scanResult.type,
        name: scanResult.name,
        calories: scanResult.calories,
        protein: scanResult.protein,
        carbs: scanResult.carbs,
        fat: scanResult.fat,
      }
    ]);
    setShowScannerModal(false);
    setScanResult(null);
  };

  return (
    <section className="space-y-6">
      {/* Header & Section Navigation Tabs */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Utensils className="text-emerald-400 w-5 h-5" /> Nutrition & Meal Planner Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track macros, scan barcodes, customize weekly plans with intelligent seafood and allergen filters, and create/save your own custom recipes.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tracker' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Macro Tracker
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'plans' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Meal Plans & Exclusions
          </button>
          <button
            onClick={() => setActiveTab('customRecipes')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'customRecipes' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Recipe Library
          </button>
          <button
            onClick={() => setActiveTab('grocery')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'grocery' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
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
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(Math.round((consumed.calories / targets.calories) * 100), 100)}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Protein</span>
                <span className="text-white font-bold">{consumed.protein}g / {targets.protein}g</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(Math.round((consumed.protein / targets.protein) * 100), 100)}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Carbs</span>
                <span className="text-white font-bold">{consumed.carbs}g / {targets.carbs}g</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(Math.round((consumed.carbs / targets.carbs) * 100), 100)}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Fats</span>
              <span className="text-white font-bold">{consumed.fat}g / {targets.fat}g</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/60">
              <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(Math.round((consumed.fat / targets.fat) * 100), 100)}%` }}></div>
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
              <div className="text-center py-8 text-slate-500 text-xs">No meals logged yet today. Add one using the form or scanner!</div>
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
                    <button
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="text-slate-500 hover:text-red-400 transition cursor-pointer p-1.5"
                    >
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
                <select
                  value={newMeal.type}
                  onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Meal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Grilled Salmon Salad"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    placeholder="450"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="30"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="40"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fat (g)</label>
                  <input
                    type="number"
                    placeholder="12"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md mt-2"
              >
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
      {/* Excluded Foods & Allergen Filtering Box */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Ban className="text-rose-400 w-4 h-4" /> Excluded Foods & Dietary Filters
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Add foods or allergens (e.g. Seafood, Peanuts, Dairy, Gluten) to automatically filter out matching recipes across your 7-day meal plans.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {excludedFoods.map((item) => (
            <span key={item} className="bg-rose-950/60 border border-rose-800/80 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Ban className="w-3 h-3 text-rose-400" />
              {item}
              <button
                onClick={() => handleRemoveExclusion(item)}
                className="text-rose-400 hover:text-rose-200 transition cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <form onSubmit={handleAddExclusion} className="flex gap-2 max-w-md pt-2">
          <input
            type="text"
            placeholder="Add food or allergen to exclude..."
            value={newExclusion}
            onChange={(e) => setNewExclusion(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Exclude
          </button>
        </form>
      </div>

      {/* 7-Day Meal Plan Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="text-emerald-400 w-4 h-4" /> 7-Day Intelligent Meal Schedule
          </h3>
          <button
            onClick={() => setMealPlansData(generateVariedWeeklyPlan(detailedRecipes, excludedFoods))}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Regenerate Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {mealPlansData.map((dayPlan, dayIdx) => {
            const mealsList = [
              { key: 'b', label: 'Breakfast', name: dayPlan.b },
              { key: 'l', label: 'Lunch', name: dayPlan.l },
              { key: 'd', label: 'Dinner', name: dayPlan.d },
              { key: 'snacks', label: 'Snack', name: dayPlan.snacks }
            ];

            return (
              <div key={dayPlan.day} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                <div className="border-b border-slate-700/80 pb-2.5">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{dayPlan.day}</h4>
                </div>

                <div className="space-y-3 flex-1">
                  {mealsList.map((m) => {
                    const excluded = isMealExcluded(m.name);
                    return (
                      <div key={m.key} className={`p-2.5 rounded-xl border ${excluded ? 'bg-rose-950/30 border-rose-800/60' : 'bg-slate-900 border-slate-700/60'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{m.label}</span>
                          {excluded && (
                            <span className="text-[9px] bg-rose-900 text-rose-200 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                              <Ban className="w-2.5 h-2.5" /> Allergen Match
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleOpenRecipe(m.name)}
                          className="text-xs font-bold text-white hover:text-emerald-400 transition text-left line-clamp-2 block cursor-pointer w-full mb-1.5"
                        >
                          {m.name}
                        </button>

                        {/* Action buttons for each recipe in schedule */}
                        <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-800">
                          <button
                            onClick={() => handleAddRecipeIngredientsToGrocery(m.name)}
                            className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                            title="Add ingredients to grocery list"
                          >
                            <ShoppingCart className="w-3 h-3" /> + Grocery
                          </button>

                          <button
                            onClick={() => {
                              const targetCat = m.key === 'b' ? 'breakfast' : m.key === 'l' ? 'lunch' : m.key === 'd' ? 'dinner' : 'snack';
                              setSwapModalState({ dayIndex: dayIdx, mealKey: m.key, mealType: m.label, currentName: m.name, targetCategory: targetCat });
                            }}
                            className="text-[10px] text-slate-400 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                        >
                            <ArrowRightLeft className="w-3 h-3" /> Swap
                        </button>
                      </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  )}

  {/* TAB 3: RECIPE LIBRARY */}
  {activeTab === 'customRecipes' && (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="text-emerald-400 w-4 h-4" /> Recipe Library & Custom Creator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Browse all available healthy recipes or create and save your own custom meals into the system.
          </p>
        </div>
        <button
          onClick={() => setShowCustomRecipeModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Create Custom Recipe
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(detailedRecipes).map(([name, data]) => (
          <div key={name} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-slate-900 text-emerald-400 border border-slate-700 px-2 py-0.5 rounded font-bold uppercase">{data.category}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {data.prep}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{name}</h4>
              <div className="flex flex-wrap gap-2 text-[10px] text-slate-300">
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">🔥 {data.cals}</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">P: {data.protein}</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">C: {data.carbs}</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">F: {data.fat}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
              <button
                onClick={() => handleOpenRecipe(name)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
              >
                View Recipe →
              </button>
              <button
                onClick={() => handleAddRecipeIngredientsToGrocery(name)}
                className="bg-slate-900 hover:bg-slate-700 border border-slate-700 text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <ShoppingCart className="w-3 h-3" /> + Grocery List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* TAB 4: GROCERY LIST */}
  {activeTab === 'grocery' && (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShoppingCart className="text-emerald-400 w-4 h-4" /> Smart Grocery List
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Check off items while shopping or add recipe ingredients directly from your meal plans and library.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddCustomGrocery} className="flex gap-2 max-w-md">
          <input
            type="text"
            placeholder="Add custom grocery item..."
            value={customGrocery}
            onChange={(e) => setCustomGrocery(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </form>

        <div className="space-y-2 pt-2">
          {groceryItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">Your grocery list is empty. Add ingredients from any recipe or add items manually!</div>
          ) : (
            groceryItems.map((g) => (
              <div key={g.id} className="bg-slate-900 border border-slate-700/80 p-3.5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={g.checked}
                    onChange={() => toggleGroceryItem(g.id)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div>
                    <span className={`text-xs font-medium ${g.checked ? 'line-through text-slate-500' : 'text-white'}`}>
                      {g.item}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 ml-2">
                      {g.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeGroceryItem(g.id)}
                  className="text-slate-500 hover:text-red-400 transition cursor-pointer p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )}

  {/* MODAL: RECIPE DETAILS */}
  {selectedRecipeModal && (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-lg font-bold uppercase">
            {selectedRecipeModal.category}
          </span>
          <button
            onClick={() => setSelectedRecipeModal(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2">{selectedRecipeModal.title}</h3>
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">⏱️ {selectedRecipeModal.prep}</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">🔥 {selectedRecipeModal.cals}</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">Protein: {selectedRecipeModal.protein}</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">Carbs: {selectedRecipeModal.carbs}</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">Fat: {selectedRecipeModal.fat}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ingredients</h4>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 bg-slate-800/60 p-3 rounded-xl border border-slate-800">
            {selectedRecipeModal.ingredients?.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Instructions</h4>
          <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1.5 bg-slate-800/60 p-3 rounded-xl border border-slate-800">
            {selectedRecipeModal.instructions?.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              handleAddRecipeIngredientsToGrocery(selectedRecipeModal.title);
              setSelectedRecipeModal(null);
            }}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingCart className="w-4 h-4" /> Add Ingredients to Grocery List
          </button>
        </div>
      </div>
    </div>
  )}

  {/* MODAL: BARCODE SCANNER */}
  {showScannerModal && (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 space-y-4 text-center">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <ScanLine className="text-emerald-400 w-4 h-4" /> Barcode & Food Scanner
          </h3>
          <button onClick={() => { setShowScannerModal(false); setScanResult(null); }} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {!scanResult ? (
          <div className="space-y-4 py-4">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 animate-pulse">
              <Camera className="w-10 h-10" />
            </div>
            <p className="text-xs text-slate-400">Position barcode or food item in front of camera simulation.</p>
            <button
              onClick={handleSimulateScan}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md"
            >
              Simulate Scan
            </button>
          </div>
        ) : (
          <div className="space-y-3 py-2 text-left">
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase">{scanResult.type} Detected</span>
              <h4 className="text-xs font-bold text-white">{scanResult.name}</h4>
              <p className="text-[10px] text-slate-400">
                {scanResult.calories} kcal • P: {scanResult.protein}g • C: {scanResult.carbs}g • F: {scanResult.fat}g
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddScannedItem}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md"
              >
                Add to Meal Log
              </button>
              <button
                onClick={() => setScanResult(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                Scan Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )}

  {/* MODAL: CUSTOM RECIPE CREATOR */}
  {showCustomRecipeModal && (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <ChefHat className="text-emerald-400 w-4 h-4" /> Create Custom Recipe
          </h3>
          <button onClick={() => setShowCustomRecipeModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSaveCustomRecipe} className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Recipe Title</label>
            <input
              type="text"
              required
              placeholder="e.g. High-Protein Power Bowl"
              value={newCustomRecipe.title}
              onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, title: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category</label>
              <select
                value={newCustomRecipe.category}
                onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, category: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Prep Time</label>
              <input
                type="text"
                placeholder="15 mins"
                value={newCustomRecipe.prep}
                onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, prep: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Cals</label>
              <input
                type="text"
                placeholder="400"
                value={newCustomRecipe.cals}
                onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, cals: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Protein</label>
              <input
                type="text"
                placeholder="30g"
                value={newCustomRecipe.protein}
                onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, protein: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Carbs</label>
              <input
                type="text"
                placeholder="35g"
                value={newCustomRecipe.carbs}
                onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, carbs: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fat</label>
              <input
                type="text"
                placeholder="12g"
                value={newCustomRecipe.fat}
                onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, fat: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Ingredients (one per line)</label>
            <textarea
              rows="3"
              placeholder="1 cup Quinoa&#10;1 Grilled Chicken Breast&#10;Avocado slices"
              value={newCustomRecipe.ingredientsInput}
              onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, ingredientsInput: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Instructions (one step per line)</label>
            <textarea
              rows="3"
              placeholder="Cook quinoa according to package instructions.&#10;Slice grilled chicken and place on top.&#10;Garnish with fresh avocado."
              value={newCustomRecipe.instructionsInput}
              onChange={(e) => setNewCustomRecipe({ ...newCustomRecipe, instructionsInput: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md mt-2"
          >
            Save Recipe to Library
          </button>
        </form>
      </div>
    </div>
  )}

  {/* MODAL: MANUAL SWAP SELECTION */}
  {swapModalState && (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <ArrowRightLeft className="text-emerald-400 w-4 h-4" /> Swap {swapModalState.mealType}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Select a replacement recipe that fits your dietary filters.</p>
          </div>
          <button onClick={() => setSwapModalState(null)} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {getSwapSuggestions(swapModalState.targetCategory).map((cand) => (
            <div key={cand.name} className="bg-slate-800 border border-slate-700 p-3 rounded-xl flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-white">{cand.name}</h4>
                <p className="text-[10px] text-slate-400">{cand.cals} • P: {cand.protein} • {cand.prep}</p>
              </div>
              <button
                onClick={() => handleExecuteManualSwap(cand.name)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[10px] transition cursor-pointer whitespace-nowrap shadow-md"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
    </section>
  );
}

