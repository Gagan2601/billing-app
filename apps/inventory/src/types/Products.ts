export interface Product {
  id?: string;
  itemCode: string;
  description: string;
  unitPrice: number;
}
export interface ProductInput {
  label: string;
  name: keyof Product;
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'date'
    | 'checkbox'
    | 'radio';
  placeholder: string;
  required: boolean;
}
