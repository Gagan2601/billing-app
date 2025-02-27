import { InputField, Product } from '../types';

export const PRODUCT_INPUTS: Array<InputField<Product>> = [
  {
    label: 'Item Code',
    name: 'itemCode',
    type: 'text',
    placeholder: 'Enter item code',
    required: true,
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
    placeholder: 'Enter description',
    required: true,
  },
  {
    label: 'Unit Price',
    name: 'unitPrice',
    type: 'number',
    placeholder: 'Enter price',
    required: true,
  },
];
