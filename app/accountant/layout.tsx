export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="accountant-gradient min-h-screen">
      {children}
    </div>
  );
}

