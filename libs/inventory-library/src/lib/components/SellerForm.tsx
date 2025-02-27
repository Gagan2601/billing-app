import React from 'react'
import { Seller } from '../../../../../apps/inventory/src/types';
import { DynamicForm } from '@billing-app/core'
import { SELLER_INPUTS } from '../../../../../apps/inventory/src/constant';

interface Props {
    isEdit: boolean;
    defaultValue?: Seller;
    formId: "addSellerForm" | "editSellerForm";
    afterSubmit: () => void;
}

export const SellerForm = ({ isEdit, defaultValue, formId, afterSubmit }: Props) => {
    const onSubmit = (formData: Seller) => {
        if (isEdit) {
            alert("Please hook edit product api");

        } else {
            const newSeller: Seller = {
                id: Date.now().toString(),
                name: formData.name,
                gstin: formData.gstin,
                address: formData.address,
                city: formData.city,
                state: formData.state
            };
            alert("Please hook add product api " + JSON.stringify(newSeller));
        }
        afterSubmit();
    }
    return (

        <DynamicForm<Seller> inputs={SELLER_INPUTS} defaultValue={defaultValue || { name: '', gstin: '', address: '', city: '', state: '' }} onSubmit={onSubmit} formId={formId} />

    )
}

export default SellerForm
