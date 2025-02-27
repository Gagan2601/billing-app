'use client'
import { useState } from 'react';
import { Card } from '../../../../../libs/core/src/lib/components/Card';
import { Button } from '../../../../../libs/core/src/lib/components/Button';
import { Table } from '../../../../../libs/core/src/lib/components/Table';
import { Modal } from '../../../../../libs/core/src/lib/components/Modal';
import { Input } from '../../../../../libs/core/src/lib/components/Input';

interface StockEntry {
    id: string;
    date: string;
    challanNo: string;
    seller: string;
    itemCode: string;
    description: string;
    quantity: number;
    value: number;
}

export default function StockPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<StockEntry | null>(null);

    const [formData, setFormData] = useState({
        date: '',
        challanNo: '',
        seller: '',
        itemCode: '',
        description: '',
        quantity: '',
        value: '',
    });

    const [stockEntries, setStockEntries] = useState<StockEntry[]>([
        {
            id: '1',
            date: '2024-02-10',
            challanNo: '23087753-1W',
            seller: 'SIGMA ELECTRIC MFG CORP PVT LTD J2',
            itemCode: 'HHLC0203S',
            description: 'SADDLE HHL C020',
            quantity: 1550,
            value: 34968.00
        }
    ]);

    const handleEdit = (entry: StockEntry) => {
        setEditingEntry(entry);
        setFormData({
            date: entry.date,
            challanNo: entry.challanNo,
            seller: entry.seller,
            itemCode: entry.itemCode,
            description: entry.description,
            quantity: entry.quantity.toString(),
            value: entry.value.toString(),
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            setStockEntries(stockEntries.filter(entry => entry.id !== id));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingEntry) {
            setStockEntries(stockEntries.map(entry =>
                entry.id === editingEntry.id
                    ? { ...entry, ...formData, quantity: parseInt(formData.quantity), value: parseFloat(formData.value) }
                    : entry
            ));
        } else {
            const newEntry: StockEntry = {
                id: Date.now().toString(),
                date: formData.date,
                challanNo: formData.challanNo,
                seller: formData.seller,
                itemCode: formData.itemCode,
                description: formData.description,
                quantity: parseInt(formData.quantity),
                value: parseFloat(formData.value),
            };
            setStockEntries([...stockEntries, newEntry]);
        }

        setIsModalOpen(false);
        setEditingEntry(null);
        setFormData({ date: '', challanNo: '', seller: '', itemCode: '', description: '', quantity: '', value: '' });
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Stock Management</h1>
                <Button onClick={() => {
                    setEditingEntry(null);
                    setFormData({ date: '', challanNo: '', seller: '', itemCode: '', description: '', quantity: '', value: '' });
                    setIsModalOpen(true);
                }}>
                    + Add Stock Entry
                </Button>
            </div>

            <Card>
                <Table headers={['Date', 'Challan No', 'Seller', 'Item Code', 'Description', 'Quantity', 'Value']}>
                    {stockEntries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{entry.challanNo}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{entry.seller}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{entry.itemCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{entry.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{entry.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">₹{entry.value.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <Button variant="secondary" onClick={() => handleEdit(entry)} className="mr-2">
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(entry.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </Table>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingEntry ? 'Edit Stock Entry' : 'Add New Stock Entry'}
            >
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                    <Input label="Challan No" name="challanNo" value={formData.challanNo} onChange={handleChange} required />
                    <Input label="Seller" name="seller" value={formData.seller} onChange={handleChange} required />
                    <Input label="Item Code" name="itemCode" value={formData.itemCode} onChange={handleChange} required />
                    <Input label="Description" name="description" value={formData.description} onChange={handleChange} required />
                    <Input label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
                    <Input label="Value" name="value" type="number" value={formData.value} onChange={handleChange} required />
                    <div className="flex justify-end space-x-4 mt-6">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">{editingEntry ? 'Update' : 'Save'} Entry</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
