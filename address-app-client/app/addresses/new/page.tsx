import AddressForm from "@/app/components/AddressForm";
import { createAddress } from "@/lib/actions";

export default function NewAddressPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Address</h1>
      <AddressForm onSubmit={createAddress} />
    </main>
  );
}