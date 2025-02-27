import React, { useCallback, useRef } from 'react'
import { Button, Modal, ModalRef } from '@billing-app/core'
import { ProductForm } from '@billing-app/inventory-library';

const addProductFormId = "addProductForm";
const CreateProductModal = () => {
    const modalRef = useRef<ModalRef>(null);
    const onOpen = useCallback(() => {
        modalRef.current?.openModal();
    }, [modalRef]);
    const onClose = useCallback(() => {
        modalRef.current?.closeModal();
    }, [modalRef]);
    return (
        <>
            <Button onClick={onOpen}>
                + Add Product
            </Button>
            <Modal
                ref={modalRef}
                title={'Add New Product'}
                footer={<>
                    <Button form={addProductFormId} variant="primary" type="submit" className="mr-2">
                        Create
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </>}
            >
                <ProductForm isEdit={false} formId={addProductFormId} afterSubmit={onClose} />
            </Modal>
        </>

    )
}

export default CreateProductModal