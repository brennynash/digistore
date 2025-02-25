export interface CustomizationOption {
  id: string;
  name: string;
  type: 'select' | 'text' | 'color' | 'checkbox';
  required: boolean;
  price: number;
  values?: string[];
}

export interface ProductCustomization {
  productId: string;
  options: CustomizationOption[];
}

export interface CustomizationFormData {
  name: string;
  type: 'select' | 'text' | 'color' | 'checkbox';
  required: boolean;
  price: number;
  values?: string[];
}