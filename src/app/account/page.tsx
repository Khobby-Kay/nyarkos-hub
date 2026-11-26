import Link from "next/link";

export const metadata = {
  title: "Account | Nyarko's Hub",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <h1 className="font-display text-3xl font-bold">Your account</h1>
      <p className="mt-3 text-muted">
        Sign-in and order history will connect here when you add authentication.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white"
      >
        Start shopping
      </Link>
    </div>
  );
}