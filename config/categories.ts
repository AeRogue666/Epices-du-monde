export interface CategoryGroup {
  id: number;
  label: string;
  icon?: string;
  description?: string;
  children: any[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    id: 1,
    label: "Tous les drapeaux",
    children: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 2,
    label: "Epices et Sauces",
    children: [7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
  {
    id: 3,
    label: "Assaisonnements",
    children: [16],
  },
  {
    id: 4,
    label: "Boissons alcoolisées",
    children: [17, 18],
  },
  {
    id: 5,
    label: "Boissons sucrées & Soda",
    children: [19, 20, 21],
  },
  {
    id: 6,
    label: "The, Tisane & Boissons chaudes",
    children: [22, 23, 24],
  },
  {
    id: 7,
    label: "Aperitifs & Collations",
    children: [25, 26, 27, 28],
  },
  {
    id: 8,
    label: "Sucre & Miel",
    children: [29],
  },
  {
    id: 9,
    label: "Feculents, Sauces, & Preparations",
    children: [30, 31, 32, 33, 34],
  },
  {
    id: 10,
    label: "Fruits & Legumes",
    children: [35, 36, 37, 38, 39],
  },
  {
    id: 11,
    label: "Produits de la mer",
    children: [40, 41, 42, 43],
  },
  {
    id: 12,
    label: "Insectes comestibles",
    children: [44],
  },
  {
    id: 13,
    label: "Cosmétiques",
    children: [45, 46],
  },
  {
    id: 14,
    label: "Ustensiles de cuisine",
    children: [47],
  },
  {
    id: 15,
    label: "Encens, Baguettes & Decorations",
    children: [48, 49, 50],
  },
];
