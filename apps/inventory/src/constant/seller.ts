import { InputField, Seller } from '../types';

export const SELLER_INPUTS: Array<InputField<Seller>> = [
  {
    label: 'Seller Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter seller name',
    required: true,
  },
  {
    label: 'GSTIN',
    name: 'gstin',
    type: 'text',
    placeholder: 'Enter GSTIN',
    required: true,
  },
  {
    label: 'Address',
    name: 'address',
    type: 'text',
    placeholder: 'Enter address',
    required: true,
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    placeholder: 'Enter city',
    required: true,
  },
  {
    label: 'State',
    name: 'state',
    type: 'text',
    placeholder: 'Enter state',
    required: true,
  },
];
