export interface Product {
  id: string;
  name: string;
  image: string;
  brand: string;
  ecoScore: number;
  badges: string[];
  carbonFootprint: number;
  recyclable: boolean;
  sustainable: boolean;
}

export interface Alternative {
  id: string;
  name: string;
  image: string;
  brand: string;
  ecoScore: number;
  badges: string[];
  price: number;
  savings: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Plastic Water Bottle",
    image: "/api/placeholder/150/150",
    brand: "AquaBrand",
    ecoScore: 25,
    badges: ["♻️"],
    carbonFootprint: 82.8,
    recyclable: true,
    sustainable: false,
  },
  {
    id: "2", 
    name: "Organic Cotton T-Shirt",
    image: "/api/placeholder/150/150",
    brand: "EcoWear",
    ecoScore: 85,
    badges: ["🌱", "♻️", "🐰"],
    carbonFootprint: 12.4,
    recyclable: true,
    sustainable: true,
  },
  {
    id: "3",
    name: "Fast Fashion Jeans",
    image: "/api/placeholder/150/150", 
    brand: "TrendyDenim",
    ecoScore: 15,
    badges: [],
    carbonFootprint: 156.2,
    recyclable: false,
    sustainable: false,
  }
];

export const mockAlternatives: Alternative[] = [
  {
    id: "alt-1",
    name: "Stainless Steel Water Bottle",
    image: "/api/placeholder/150/150",
    brand: "EcoLife",
    ecoScore: 92,
    badges: ["🌱", "♻️"],
    price: 24.99,
    savings: 85,
  },
  {
    id: "alt-2", 
    name: "Glass Water Bottle",
    image: "/api/placeholder/150/150",
    brand: "PureGlass",
    ecoScore: 88,
    badges: ["♻️", "🌱"],
    price: 19.99,
    savings: 78,
  },
  {
    id: "alt-3",
    name: "Bamboo Water Bottle",
    image: "/api/placeholder/150/150",
    brand: "GreenBottle",
    ecoScore: 90,
    badges: ["🌱", "🐰"],
    price: 22.99,
    savings: 82,
  }
];