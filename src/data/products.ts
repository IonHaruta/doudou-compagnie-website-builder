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
  name: string;
  price: number;
  image: string;
  badge?: "bestseller" | "new";
  stock: "in-stock" | "limited" | "out-of-stock";
  type: string;
  ageRange: string;
  color: string;
  description?: string;
  reviews?: number;
  rating?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Iepuraș Bonbon Roz",
    price: 24.90,
    image: productPinkBunny,
    badge: "bestseller",
    stock: "in-stock",
    type: "doudous",
    ageRange: "0-6",
    color: "roz",
    description: "Un adorabil iepuraș roz, perfect pentru cei mai mici. Fabricat din materiale moi și sigure pentru bebeluși.",
    reviews: 18,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Urs Lună Plină",
    price: 34.90,
    image: productGreyBear,
    badge: "new",
    stock: "in-stock",
    type: "plush",
    ageRange: "6-12",
    color: "gri",
    description: "Un ursuleț gri cu expresie blândă, perfect pentru îmbrățișări. Material premium, hipoalergenic.",
    reviews: 24,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Marionetă Lup",
    price: 19.90,
    image: productWolf,
    badge: "bestseller",
    stock: "limited",
    type: "puppets",
    ageRange: "1-3",
    color: "gri",
    description: "Marionetă de mână în formă de lup, perfectă pentru jocuri creative și povești.",
    reviews: 12,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Cutie Muzicală Stea",
    price: 29.90,
    image: productMusicBox,
    badge: "new",
    stock: "in-stock",
    type: "music-boxes",
    ageRange: "0-6",
    color: "bej",
    description: "Cutie muzicală delicată cu melodie liniștitoare. Perfect pentru adormit bebelușii.",
    reviews: 31,
    rating: 5.0,
  },
  {
    id: 5,
    name: "Pui de Cerb Boh'aime",
    price: 27.90,
    image: productDeer,
    badge: "new",
    stock: "in-stock",
    type: "doudous",
    ageRange: "0-6",
    color: "bej",
    description: "Un pui de cerb adorabil din colecția Boh'aime, cu material moale și detalii fine.",
    reviews: 15,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Iepuraș Floricică",
    price: 22.90,
    image: productBunny,
    badge: "bestseller",
    stock: "in-stock",
    type: "doudous",
    ageRange: "0-6",
    color: "roz",
    description: "Iepuraș cu imprimeu floral, moale și perfect pentru bebeluși.",
    reviews: 27,
    rating: 4.9,
  },
  {
    id: 7,
    name: "Elefant Boh'aime",
    price: 45.90,
    image: productElephant,
    badge: "new",
    stock: "in-stock",
    type: "plush",
    ageRange: "6-12",
    color: "albastru",
    description: "Elefant mare din colecția Boh'aime, ideal pentru decorarea camerei sau pentru joacă.",
    reviews: 9,
    rating: 4.8,
  },
  {
    id: 8,
    name: "Urs Bonbon Maro",
    price: 65.90,
    image: productBear,
    badge: "bestseller",
    stock: "limited",
    type: "doudous",
    ageRange: "3+",
    color: "bej",
    description: "Ursuleț premium din colecția Bonbon, cu materiale de cea mai înaltă calitate.",
    reviews: 42,
    rating: 5.0,
  },
  {
    id: 9,
    name: "Cățeluș Dormitor",
    price: 15.90,
    image: productPuppy,
    stock: "in-stock",
    type: "plush",
    ageRange: "1-3",
    color: "bej",
    description: "Un cățeluș adorabil în poziție de somn, perfect pentru copiii mici.",
    reviews: 8,
    rating: 4.5,
  },
];

export const productTypes = [
  { id: "doudous", label: "Doudous" },
  { id: "plush", label: "Jucării de Pluș" },
  { id: "puppets", label: "Marionete" },
  { id: "music-boxes", label: "Cutii Muzicale" },
];

export const budgetRanges = [
  { id: "under-20", label: "<20 euro", min: 0, max: 20 },
  { id: "20-40", label: "20-40 euro", min: 20, max: 40 },
  { id: "40-60", label: "40-60 euro", min: 40, max: 60 },
  { id: "over-60", label: ">60 euro", min: 60, max: Infinity },
];

export const ageRanges = [
  { id: "0-6", label: "0-6 luni" },
  { id: "6-12", label: "6-12 luni" },
  { id: "1-3", label: "1-3 ani" },
  { id: "3+", label: "3+ ani" },
];

export const colorOptions = [
  { id: "roz", label: "Roz", hex: "#F8B4C0" },
  { id: "albastru", label: "Albastru", hex: "#87CEEB" },
  { id: "bej", label: "Bej/Crem", hex: "#D4C4A8" },
  { id: "gri", label: "Gri", hex: "#9CA3AF" },
];
