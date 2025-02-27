import React from 'react'
import { Product } from '../../../../../apps/inventory/src/types';
import { DynamicForm } from '@billing-app/core'
import { PRODUCT_INPUTS } from '../../../../../apps/inventory/src/constant';

interface Props {
    isEdit: boolean;
    defaultValue?: Product;
    formId: "addProductForm" | "editProductForm";
    afterSubmit: () => void;
}

export const ProductForm = ({ isEdit, defaultValue, formId, afterSubmit }: Props) => {
    const onSubmit = (formData: Product) => {
        if (isEdit) {
            alert("Please hook edit product api");

        } else {
            const newProduct: Product = {
                id: Date.now().toString(),
                itemCode: formData.itemCode,
                description: formData.description,
                unitPrice: formData.unitPrice,
            };
            alert("Please hook add product api " + JSON.stringify(newProduct));
        }
        afterSubmit();
    }
    return (

        <DynamicForm<Product> inputs={PRODUCT_INPUTS} defaultValue={defaultValue || { itemCode: '', description: '', unitPrice: 0 }} onSubmit={onSubmit} formId={formId} />

    )
}

export default ProductForm