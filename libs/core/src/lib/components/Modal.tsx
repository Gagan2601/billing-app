import { forwardRef, useImperativeHandle, useState } from "react";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export interface ModalRef {
    openModal: () => void;
    closeModal: () => void;
}

export const Modal = forwardRef<ModalRef, ModalProps>(({ title, children, footer }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    // Expose openModal and closeModal functions to parent
    useImperativeHandle(ref, () => ({
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
    }));

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <div className="mb-4">{children}</div>
                {footer && <div className="mt-4 border-t pt-4">{footer}</div>}
            </div>
        </div>
    );
})
