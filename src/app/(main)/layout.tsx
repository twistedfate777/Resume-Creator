import PremiumDialog from "@/components/folder/PremiumDialog";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      {children}
    </div>
  );
}
