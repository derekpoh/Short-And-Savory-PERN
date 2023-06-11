import { EmbeddedIngredients } from "../../utilities/type-declaration";


export const sortIngredients = (ingredients: EmbeddedIngredients[]) => {

const cupArray = <EmbeddedIngredients[]>[];
const metricArray = <EmbeddedIngredients[]>[];

const names = new Set();
const repeatedNames = new Set();
ingredients.forEach((ingredient, index) => {
  if (!names.has(ingredient.name)) {
    names.add(ingredient.name);
  } else {
    repeatedNames.add(ingredient.name);
  }
});

ingredients.forEach((ingredient, index) => {
  if (!repeatedNames.has(ingredient.name)) {
    cupArray.push(ingredient);
    metricArray.push(ingredient);
  } else if (ingredient.measurement === 'cup' || ingredient.measurement === 'cups' || ingredient.measurement === 'tsp' || ingredient.measurement === 'tsps' || ingredient.measurement === 'tbsp' || ingredient.measurement === 'tbsps'  ) {
    cupArray.push(ingredient);
  } else {
    metricArray.push(ingredient);
  }
});
return [cupArray, metricArray];
}