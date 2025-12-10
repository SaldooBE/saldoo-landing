export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="client-gradient min-h-screen">
      {children}
    </div>
  );
}

