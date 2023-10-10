export type Ingredient = {
  "Name": string;
  "Strength": number;
  [key: string]: any;
}

type Count = {
  count: number;
  strength: number
}

export type IngredientTotals = {
  "Large Leek": Count;
  "Tasty Mushroom": Count;
  "Fancy Egg": Count;
  "Soft Potato": Count;
  "Fancy Apple": Count;
  "Fiery Herb": Count;
  "Bean Sausage": Count;
  "Moomoo Milk": Count;
  "Honey": Count;
  "Pure Oil": Count;
  "Warming Ginger": Count;
  "Snoozy Tomato": Count;
  "Soothing Cacao": Count;
  "Slowpoke Tail": Count;
  "Greengrass Soybeans": Count;
  [key: string]: Count;
}

export type Recipe = {
  "Dish": string;
  "Image": string;
  "Base": number;
  "Large Leek": number;
  "Tasty Mushroom": number;
  "Fancy Egg": number;
  "Soft Potato": number;
  "Fancy Apple": number;
  "Fiery Herb": number;
  "Bean Sausage": number;
  "Moomoo Milk": number;
  "Honey": number;
  "Pure Oil": number;
  "Warming Ginger": number;
  "Snoozy Tomato": number;
  "Soothing Cacao": number;
  "Slowpoke Tail": number;
  "Greengrass Soybeans": number;
  "total base": number;
  [key: string]: any;
}
