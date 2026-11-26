export const metadata = { title: "Privacy | Nyarko's Hub" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-sm leading-7 text-muted">
      <h1 className="font-display text-3xl font-bold text-foreground">Privacy</h1>
      <p className="mt-4">
        Checkout stores your name, email, phone, and delivery address in this
        browser so you can see the order again. The hub uses that information
        to deliver the polo and confirm payment. Card numbers are never stored
        on this site.
      </p>
    </div>
  );
}