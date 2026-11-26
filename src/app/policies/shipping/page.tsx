export const metadata = { title: "Shipping | Nyarko's Hub" };

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-sm leading-7 text-muted">
      <h1 className="font-display text-3xl font-bold text-foreground">Shipping</h1>
      <p className="mt-4">
        Accra delivery is GH₵35 and free from GH₵500. Nationwide delivery is
        GH₵55 and free from GH₵800. Pickup in Accra is free and ready the same
        day when the size is in stock.
      </p>
      <p className="mt-3">
        Delivery times are estimates. You see the charge before you place the
        order.
      </p>
    </div>
  );
}