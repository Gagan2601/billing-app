interface InputProps {
    label: string;
    name?: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export const Input = ({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false
}: InputProps) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={required}
        />
    </div>
);