import productPinkBunny from "@/assets/product-pink-bunny.jpg";
import productGreyBear from "@/assets/product-grey-bear.jpg";
import productWolf from "@/assets/product-wolf.jpg";
import productMusicBox from "@/assets/product-music-box.jpg";
import productDeer from "@/assets/product-deer.jpg";
import productBunny from "@/assets/product-bunny.jpg";
import productElephant from "@/assets/product-elephant.jpg";
import productBear from "@/assets/product-bear.jpg";
import productPuppy from "@/assets/product-puppy.jpg";

export interface Product {
  id: number;
  nameKey: string; // Translation key for name
  descriptionKey: string; // Translation key for description
  price: number;
  originalPrice?: number; // Original price before discount
  image: string;
  badge?: "bestseller" | "new" | "sale";
  stock: "in-stock" | "limited" | "out-of-stock";
  collection: string; // Collection category
  ageRange: string;
  color: string;
  reviews?: number;
  rating?: number;
}

export const products: Product[] = [
  {
    id: 1,
    nameKey: "product.pinkBunny",
    descriptionKey: "product.pinkBunny.desc",
    price: 24.90,
    image: productPinkBunny,
    badge: "bestseller",
    stock: "in-stock",
    collection: "bears",
    ageRange: "0-6",
    color: "roz",
    reviews: 18,
    rating: 4.8,
  },
  {
    id: 2,
    nameKey: "product.greyBear",
    descriptionKey: "product.greyBear.desc",
    price: 34.90,
    image: productGreyBear,
    badge: "new",
    stock: "in-stock",
    collection: "bears",
    ageRange: "6-12",
    color: "gri",
    reviews: 24,
    rating: 4.9,
  },
  {
    id: 3,
    nameKey: "product.wolfPuppet",
    descriptionKey: "product.wolfPuppet.desc",
    price: 14.90,
    originalPrice: 19.90,
    image: productWolf,
    badge: "sale",
    stock: "limited",
    collection: "puppies",
    ageRange: "1-3",
    color: "gri",
    reviews: 12,
    rating: 4.7,
  },
  {
    id: 4,
    nameKey: "product.musicBox",
    descriptionKey: "product.musicBox.desc",
    price: 29.90,
    image: productMusicBox,
    badge: "new",
    stock: "in-stock",
    collection: "newborn",
    ageRange: "0-6",
    color: "bej",
    reviews: 31,
    rating: 5.0,
  },
  {
    id: 5,
    nameKey: "product.deer",
    descriptionKey: "product.deer.desc",
    price: 22.90,
    originalPrice: 27.90,
    image: productDeer,
    badge: "sale",
    stock: "in-stock",
    collection: "kittens",
    ageRange: "0-6",
    color: "bej",
    reviews: 15,
    rating: 4.6,
  },
  {
    id: 6,
    nameKey: "product.bunny",
    descriptionKey: "product.bunny.desc",
    price: 22.90,
    image: productBunny,
    badge: "bestseller",
    stock: "in-stock",
    collection: "dolls",
    ageRange: "0-6",
    color: "roz",
    reviews: 27,
    rating: 4.9,
  },
  {
    id: 7,
    nameKey: "product.elephant",
    descriptionKey: "product.elephant.desc",
    price: 45.90,
    image: productElephant,
    badge: "new",
    stock: "in-stock",
    collection: "elephants",
    ageRange: "6-12",
    color: "albastru",
    reviews: 9,
    rating: 4.8,
  },
  {
    id: 8,
    nameKey: "product.bear",
    descriptionKey: "product.bear.desc",
    price: 65.90,
    image: productBear,
    badge: "bestseller",
    stock: "limited",
    collection: "bears",
    ageRange: "3+",
    color: "bej",
    reviews: 42,
    rating: 5.0,
  },
  {
    id: 9,
    nameKey: "product.puppy",
    descriptionKey: "product.puppy.desc",
    price: 12.90,
    originalPrice: 15.90,
    image: productPuppy,
    badge: "sale",
    stock: "in-stock",
    collection: "puppies",
    ageRange: "1-3",
    color: "bej",
    reviews: 8,
    rating: 4.5,
  },
];

export const collections = [
  { id: "crocodiles", labelKey: "collection.crocodiles" },
  { id: "bears", labelKey: "collection.bears" },
  { id: "hippos", labelKey: "collection.hippos" },
  { id: "elephants", labelKey: "collection.elephants" },
  { id: "puppies", labelKey: "collection.puppies" },
  { id: "kittens", labelKey: "collection.kittens" },
  { id: "dolls", labelKey: "collection.dolls" },
  { id: "newborn", labelKey: "collection.newborn" },
  { id: "blankets", labelKey: "collection.blankets" },
];

export const budgetRanges = [
  { id: "under-20", labelKey: "budget.under20", min: 0, max: 20 },
  { id: "20-40", labelKey: "budget.20-40", min: 20, max: 40 },
  { id: "40-60", labelKey: "budget.40-60", min: 40, max: 60 },
  { id: "over-60", labelKey: "budget.over60", min: 60, max: Infinity },
];

export const ageRanges = [
  { id: "0-6", labelKey: "age.0-6" },
  { id: "6-12", labelKey: "age.6-12" },
  { id: "1-3", labelKey: "age.1-3" },
  { id: "3+", labelKey: "age.3+" },
];

export const colorOptions = [
  { id: "roz", labelKey: "color.roz", hex: "#F8B4C0" },
  { id: "albastru", labelKey: "color.albastru", hex: "#87CEEB" },
  { id: "bej", labelKey: "color.bej", hex: "#D4C4A8" },
  { id: "gri", labelKey: "color.gri", hex: "#9CA3AF" },
];
