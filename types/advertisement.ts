export interface Advertisement {
  id: string;
  imageUrl: string | null;
  title: string;
  isFavorited: boolean;
  description: string;
  priceAmount: number;
  priceCurrency: string;
  priceUnit: string | null;
  location: string;
  postedDateTime: string;
}
