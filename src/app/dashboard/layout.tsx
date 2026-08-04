import AppHeader from "@/components/AppHeader";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      {children}
    </div>
  );
}
