import AppHeader from "@/components/AppHeader";

export default function ThemesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      {children}
    </div>
  );
}
