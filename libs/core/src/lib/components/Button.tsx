import { ComponentProps, PropsWithChildren } from "react";

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({
    variant = 'primary',
    className,
    children,
    ...rest
}: PropsWithChildren<ButtonProps & ComponentProps<"button">>) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors';
    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};