import Navigation from "@/components/navigation";
import AdminDashboard from "@/components/admin-dashboard";
import AnimatedBackground from "@/components/animated-background";

export default function Admin() {
  return (
    <div className="min-h-screen bg-[hsl(var(--deep-navy))] text-white overflow-x-hidden relative">
      <AnimatedBackground />
      <Navigation />
      <main className="pt-20">
        <AdminDashboard />
      </main>
    </div>
  );
}
