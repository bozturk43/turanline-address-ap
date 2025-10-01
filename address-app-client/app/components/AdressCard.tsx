'use client';
import { Address } from "@/types/address";
import { deleteAddress } from "@/lib/actions";
import { useRouter } from "next/navigation"; // useRouter'
import Link from "next/link";
type AddressCardProps = {
    address: Address;
};

export default function AddressCard({ address }: AddressCardProps) {
    const router = useRouter();
    const handleDelete = async () => {
        try {
            await deleteAddress(address.id);
            router.refresh();
        } catch (error) {
            console.error("Failed to delete address:", error);
            alert("Error deleting address.");
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
                <h2 className="font-bold text-lg">{address.city}, {address.region}</h2>
                <p className="text-gray-600">{address.branchNumber}: {address.streetAddress}</p>
                <p className="text-gray-500 text-sm mt-2">{address.phone}</p>
                <p className="text-gray-500 text-sm">{address.workingHours}</p>
            </div>
            <div className="flex space-x-2 self-end md:self-center">
                <Link href={`/addresses/edit/${address.id}`}>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
                        Edit
                    </button>
                </Link>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    onClick={handleDelete}>
                    Sil
                </button>
            </div>
        </div>
    );
}