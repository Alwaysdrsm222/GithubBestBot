import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import AdminDashboard from "@/components/admin-dashboard";
import AnimatedBackground from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Rbcadminpass2025") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Access denied.");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[hsl(var(--deep-navy))] text-white overflow-x-hidden relative flex items-center justify-center">
        <AnimatedBackground />
        <Navigation />
        <motion.div
          className="max-w-md w-full mx-4 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass-effect border-[hsl(var(--tiger-orange))]/50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 hexagon bg-[hsl(var(--tiger-orange))] flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl tiger-text-gradient">Admin Access</CardTitle>
              <p className="text-gray-300">Enter the admin password to continue</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[hsl(var(--dark-purple))]/50 border-[hsl(var(--tiger-orange))]/50"
                  />
                </div>
                {error && (
                  <motion.p 
                    className="text-[hsl(var(--alert-red))] text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.p>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-[hsl(var(--tiger-orange))] hover:bg-[hsl(var(--light-orange))] transition-all duration-300"
                >
                  Access Admin Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
