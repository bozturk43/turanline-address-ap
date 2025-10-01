'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Address } from '@/types/address';

// Formun prop'larını tanımlıyoruz: bir başlangıç verisi (edit için) ve bir submit fonksiyonu alacak.
type AddressFormData = Omit<Address, 'id'>;
type AddressFormProps = {
  initialData?: Address | null;
  onSubmit: (data: AddressFormData) => Promise<Address | void>;
};

export default function AddressForm({ initialData, onSubmit }: AddressFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<AddressFormData>({
    region: initialData?.region || '',
    city: initialData?.city || '',
    branchNumber: initialData?.branchNumber || '',
    streetAddress: initialData?.streetAddress || '',
    phone: initialData?.phone || '',
    workingHours: initialData?.workingHours || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      router.push('/'); // Başarılı olunca ana sayfaya dön
    } catch (error) {
      console.error("Failed to save address:", error);
      alert("Error saving address.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input name="region" value={formData.region} onChange={handleChange} placeholder="Region" required className="w-full p-2 border rounded-md"/>
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="w-full p-2 border rounded-md"/>
        <input name="branchNumber" value={formData.branchNumber} onChange={handleChange} placeholder="Branch Number" className="w-full p-2 border rounded-md"/>
        <input name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="Street Address" required className="w-full p-2 border rounded-md"/>
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded-md"/>
        <input name="workingHours" value={formData.workingHours} onChange={handleChange} placeholder="Working Hours" className="w-full p-2 border rounded-md"/>
        
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
          Save Address
        </button>
    </form>
  );
}