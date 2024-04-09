import AccountHeader from "@/components/Account/account-header";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <AccountHeader/>
      {children}
    </div>
  );
}
