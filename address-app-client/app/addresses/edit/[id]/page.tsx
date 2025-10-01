import { getAddressById } from "@/lib/data";
import { updateAddress } from "@/lib/actions";
import AddressForm from "@/app/components/AddressForm";

export default async function EditAddressPage({ params }: { params: Promise<{ id: string }> }) {
  const pageParams = await params;
  const id = Number(pageParams.id);
  const address = await getAddressById(id);
  const updateAddressWithId = updateAddress.bind(null, id);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Address</h1>
      {address ? (
        <AddressForm initialData={address} onSubmit={updateAddressWithId} />
      ) : (
        <p>Address not found.</p>
      )}
    </main>
  );
}