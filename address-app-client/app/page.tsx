import { getAddresses } from "@/lib/data";
import Link from "next/link";
import AddressList from "./components/AddressList";

export default async function HomePage() {
  const addresses = await getAddresses();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Address List</h1>
      <Link href="/addresses/new">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
          + Add New Address
        </button>
      </Link>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <AddressList initialAddresses={addresses} />
      )}
    </main>
  );
}