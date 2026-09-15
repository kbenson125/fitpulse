/**
 * Fetches product nutrition by barcode from Open Food Facts API
 */
export async function fetchNutritionByBarcode(barcode) {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
    const data = await response.json();

    if (data.status !== 1 || !data.product) {
      return { success: false, error: 'Product barcode not found in database.' };
    }

    const product = data.product;
    const nutriments = product.nutriments || {};

    // Base values per serving (falls back to per 100g if serving data unavailable)
    const servingCalories = nutriments['energy-kcal_serving'] || nutriments['energy-kcal_100g'] || 0;
    const servingProtein = nutriments['proteins_serving'] || nutriments['proteins_100g'] || 0;
    const servingCarbs = nutriments['carbohydrates_serving'] || nutriments['carbohydrates_100g'] || 0;
    const servingFat = nutriments['fat_serving'] || nutriments['fat_100g'] || 0;

    return {
      success: true,
      product: {
        barcode,
        name: product.product_name || 'Scanned Product',
        brand: product.brands || '',
        servingSizeText: product.serving_size || '1 serving',
        servingCalories: Math.round(servingCalories),
        servingProtein: Math.round(servingProtein),
        servingCarbs: Math.round(servingCarbs),
        servingFat: Math.round(servingFat)
      }
    };
  } catch (err) {
    return { success: false, error: 'Network error reading barcode.' };
  }
}
