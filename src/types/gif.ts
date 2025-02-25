export interface GifItem {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
}

export interface GifFormData {
  title: string;
  description: string;
  image: string;
}