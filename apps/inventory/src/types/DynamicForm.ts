export interface InputField<T> {
  label: string;
  name: keyof T;
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
