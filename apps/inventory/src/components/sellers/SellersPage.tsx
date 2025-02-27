'use client'
import { useCallback, useRef, useState } from 'react';
import CreateSellerModal from './CreateSellerModal';
import { Seller } from '../../types';
import { SellerForm } from '@billing-app/inventory-library';
import { Button, Modal, ModalRef, Table, Card } from '@billing-app/core'

const editSellerId = "editSellerForm";

export default function SellersPage() {

    const modalRef = useRef<ModalRef>(null);
    const [editModalData, setEditModalData] = useState<Seller>();

    const [sellers, setSellers] = useState<Seller[]>([
        {
            id: '1',
            name: 'SIGMA ELECTRIC MFG CORP PVT LTD J2',
            gstin: '08AAXCS4352F1ZW',
            address: 'A-134, ROAD NO.12, VISHWAKARMA INDUSTRIAL AREA',
            city: 'JAIPUR',
            state: 'RAJASTHAN'
        }
    ]);

    const onClose = useCallback(() => {
        modalRef.current?.closeModal();
    }, [modalRef]);

    const handleEdit = (seller: Seller) => {
        //Please hook edit functionality to open modal with pre populated data
        setEditModalData(seller);
        modalRef.current?.openModal();

    };

    const handleDelete = ({ id }: Seller) => {
        if (window.confirm('Are you sure you want to delete this seller?')) {
            setSellers(sellers.filter(seller => seller.id !== id));
        }
    };



    return (
        <>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Sellers</h1>
                    <CreateSellerModal />
                </div>

                <Card>
                    <Table headers={['Name', 'GSTIN', 'Address', 'City', 'State']}>
                        {sellers.map((seller) => (
                            <tr key={seller.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{seller.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seller.gstin}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seller.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seller.city}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seller.state}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button variant="secondary" onClick={() => handleEdit(seller)} className="mr-2">
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(seller)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </Card>

            </div>
            <Modal
                ref={modalRef}
                title={'Edit Seller'}
                footer={<>
                    <Button form={editSellerId} variant="primary" type="submit" className="mr-2">
                        Edit
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </>}
            >
                <SellerForm isEdit={true} defaultValue={editModalData} formId={editSellerId} afterSubmit={onClose} />
            </Modal>
        </>
    );
}

