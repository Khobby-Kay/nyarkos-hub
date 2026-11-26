"use client";

import { products, sizes, stockFor, formatPrice } from "@/lib/data";
import { useShop } from "@/lib/store";

export default function AdminPage() {
  const { ready, orders } = useShop();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Hub desk
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold">Orders on this device</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        This desk shows orders placed in the current browser. A shared database
        is the next step so every customer order appears here.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Orders" value={ready ? String(orders.length) : "–"} />
        <Stat label="Revenue" value={ready ? formatPrice(revenue) : "–"} />
        <Stat label="Styles" value={String(products.length)} />
      </div>
      <h2 className="mt-10 font-display text-2xl font-bold">Stock</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="py-2">Polo</th>
              {sizes.map((size) => (
                <th key={size} className="py-2">
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="py-3 pr-4">{product.name}</td>
                {sizes.map((size) => {
                  const count = stockFor(product.id, size);
                  return (
                    <td key={size} className={count === 0 ? "text-accent" : ""}>
                      {count}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="mt-10 font-display text-2xl font-bold">Recent orders</h2>
      {ready && orders.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No orders in this browser yet.</p>
      ) : null}
      <ul className="mt-4 divide-y divide-border">
        {orders.map((order) => (
          <li key={order.reference} className="py-4 text-sm">
            <div className="flex justify-between font-semibold">
              <span>{order.reference}</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <p className="text-muted">
              {order.customer.name} · {order.customer.phone} · {order.customer.city}
            </p>
            <p>{order.items.map((item) => `${item.name} (${item.size})`).join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}