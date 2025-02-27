import React, { useState } from 'react'
import { Input } from './Input'
import { InputField } from '../../../../../apps/inventory/src/types';

interface Prop<T> {
    defaultValue: T;
    formId: string;
    onSubmit: (p: T, e?: React.FormEvent) => void;
    inputs: Array<InputField<T>>;
}

export const DynamicForm = <T extends Record<string, any>>({ defaultValue, formId, onSubmit, inputs }: Prop<T>) => {
    const [formData, setFormData] = useState<T>(defaultValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.type == 'number' ? e.target.valueAsNumber : e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData, e);
    };
    return (
        <form className="space-y-4" onSubmit={handleSubmit} id={formId}>
            {
                inputs.map((inputItem) => (
                    <Input
                        label={inputItem.label}
                        name={inputItem.name as string}
                        type={inputItem.type || 'text'}
                        value={formData[inputItem.name]}
                        onChange={handleChange}
                        placeholder={inputItem.placeholder}
                        required={inputItem.required}
                    />
                ))
            }
        </form>
    )
}

export default DynamicForm
