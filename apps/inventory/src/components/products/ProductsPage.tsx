'use client'
import { useCallback, useRef, useState } from 'react';
import CreateProductModal from './CreateProductModal';
import { Product } from '../../types';
import { ProductForm } from '@billing-app/inventory-library';
import { Button, Modal, ModalRef, Table, Card } from '@billing-app/core'


const editProductId = "editProductForm";

export default function ProductsPage() {

    const modalRef = useRef<ModalRef>(null);
    const [editModalData, setEditModalData] = useState<Product>();

    const [products, setProducts] = useState<Product[]>([
        { id: '1', itemCode: 'HHLC0203S', description: 'SADDLE HHL C020', unitPrice: 22.56 },
        { id: '2', itemCode: 'HHLC020B', description: 'BODY HOT LINE CLAMP BC20', unitPrice: 73.09 },
    ]);

    const onClose = useCallback(() => {
        modalRef.current?.closeModal();
    }, [modalRef]);

    const handleEdit = (product: Product) => {
        //Please hook edit functionality to open modal with pre populated data
        setEditModalData(product);
        modalRef.current?.openModal();

    };

    const handleDelete = ({ id }: Product) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };



    return (
        <>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <CreateProductModal />
                </div>

                <Card>
                    <Table headers={['Item Code', 'Description', 'Unit Price']}>
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{product.itemCode}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹{product.unitPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button variant="secondary" onClick={() => handleEdit(product)} className="mr-2">
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(product)}>
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
                title={'Edit Product'}
                footer={<>
                    <Button form={editProductId} variant="primary" type="submit" className="mr-2">
                        Edit
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </>}
            >
                <ProductForm isEdit={true} defaultValue={editModalData} formId={editProductId} afterSubmit={onClose} />
            </Modal>
        </>
    );
}
