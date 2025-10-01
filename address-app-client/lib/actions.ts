"use server";
import { Address } from "@/types/address";
import { revalidatePath } from "next/cache";

type CreateAddressDto = Omit<Address, 'id'>;

export async function deleteAddress(id: number) {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("API_URL environment variable is not set.");
  }
  const res = await fetch(`${apiUrl}/api/addresses/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete address');
  }
  return { success: true };
}
export async function createAddress(addressData: CreateAddressDto) {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("API_URL environment variable is not set.");
  }
  const res = await fetch(`${apiUrl}/api/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addressData),
  });

  if (!res.ok) {
    throw new Error('Failed to create address');
  }
  revalidatePath('/'); 

  return await res.json();
}
export async function updateAddress(id: number, addressData: Omit<Address, 'id'>) {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) throw new Error("API_URL is not set.");

  const res = await fetch(`${apiUrl}/api/addresses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(addressData),
  });

  if (!res.ok) throw new Error('Failed to update address');
  
  revalidatePath('/');
  revalidatePath(`/addresses/edit/${id}`);
}
export async function bulkImportAddresses(addressLines: string[]) {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) throw new Error("API_URL is not set.");

  const res = await fetch(`${apiUrl}/api/addresses/bulk-import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(addressLines),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || 'Failed to import addresses');
  }
  
  revalidatePath('/');
  return await res.json();
}