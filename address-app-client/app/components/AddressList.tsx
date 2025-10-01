'use client';

import { useState, useMemo } from 'react';
import { Address } from '@/types/address';
import AddressCard from './AdressCard';
import BulkImportModal from './BulkImportModal';

type AddressListProps = {
    initialAddresses: Address[];
};

export default function AddressList({ initialAddresses }: AddressListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal'ın durumunu tutan state


    const filteredAddresses = useMemo(() => {
        if (!searchTerm) {
            return initialAddresses;
        }
        return initialAddresses.filter(address =>
            Object.values(address).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, initialAddresses]);

    return (
        <div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search addresses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded-lg shadow-sm"
                />
                <button
                    onClick={() => setIsModalOpen(true)} // Buton modal'ı açacak
                    className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold justify-self-end"
                >
                    Bulk Import
                </button>
            </div>

            {filteredAddresses.length === 0 ? (
                <p className="text-center text-gray-500">No matching addresses found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAddresses.map((address) => (
                        <AddressCard key={address.id} address={address} />
                    ))}
                </div>
            )}
            {isModalOpen && <BulkImportModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}