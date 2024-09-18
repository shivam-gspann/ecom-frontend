import { PRODUCTS } from "./data";

const extractCategoriesAndSubCategories = (products) => {
    const categoriesMap = {};

    products.forEach(product => {
        const { category, subCategory } = product;

        if (!categoriesMap[category]) {
            categoriesMap[category] = new Set();
        }

        categoriesMap[category].add(subCategory);
    });

    const result = {};
    for (const [category, subCategoriesSet] of Object.entries(categoriesMap)) {
        result[category] = Array.from(subCategoriesSet);
    }

    return result;
}

export const categoriesAndSubcategories = extractCategoriesAndSubCategories(PRODUCTS);
