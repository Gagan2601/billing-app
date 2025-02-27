import React, { useCallback, useRef } from 'react'
import { Button, Modal, ModalRef } from '@billing-app/core'
import { SellerForm } from '@billing-app/inventory-library';

const addSellerFormId = "addSellerForm";
const CreateSellerModal = () => {
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
                + Add Seller
            </Button>
            <Modal
                ref={modalRef}
                title={'Add New Seller'}
                footer={<>
                    <Button form={addSellerFormId} variant="primary" type="submit" className="mr-2">
                        Create
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </>}
            >
                <SellerForm isEdit={false} formId={addSellerFormId} afterSubmit={onClose} />
            </Modal>
        </>

    )
}

export default CreateSellerModal