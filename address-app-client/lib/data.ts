import { Address } from "@/types/address"; // Yeni tip dosyamızı import ediyoruz.

export async function getAddresses(): Promise<Address[]> {
  try {
    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
      throw new Error("API_URL environment variable is not set.");
    }
    
    const res = await fetch(`${apiUrl}/api/addresses`, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data from API');
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return []; // Hata durumunda boş liste dön.
  }
}
export async function getAddressById(id: number): Promise<Address | null> {
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw new Error("API_URL is not set.");

    const res = await fetch(`${apiUrl}/api/addresses/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching address by id:", error);
    return null;
  }
}