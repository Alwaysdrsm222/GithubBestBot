import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Hexagon from "./hexagon";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 glass-effect transition-all duration-300 ${
        isScrolled ? "bg-[hsl(var(--deep-navy))]/90" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Hexagon size="md" color="orange" animate className="animate-glow" />
            <Link href="/">
              <h1 className="text-2xl font-bold tiger-text-gradient cursor-pointer">
                RBC Community
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className={`hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300 font-medium ${
                location === "/" ? "text-[hsl(var(--tiger-orange))]" : ""
              }`}>
                Home
              </a>
            </Link>
            <button 
              onClick={() => scrollToSection("about")}
              className="hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("giveaways")}
              className="hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300 font-medium"
            >
              Giveaways
            </button>
            <Link href="/admin">
              <a className={`hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300 font-medium ${
                location === "/admin" ? "text-[hsl(var(--tiger-orange))]" : ""
              }`}>
                Admin
              </a>
            </Link>
            <Button asChild>
              <a 
                href="https://discord.gg/letsgo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[hsl(var(--tiger-orange))] hover:bg-[hsl(var(--light-orange))] transition-all duration-300 transform hover:scale-105"
              >
                <i className="fab fa-discord mr-2"></i>Join Discord
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[hsl(var(--tiger-orange))] text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 glass-effect rounded-lg p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/">
                <a 
                  className="hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
              </Link>
              <button 
                onClick={() => scrollToSection("about")}
                className="hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300 font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("giveaways")}
                className="hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300 font-medium text-left"
              >
                Giveaways
              </button>
              <Link href="/admin">
                <a 
                  className="hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </a>
              </Link>
              <Button asChild className="w-full">
                <a 
                  href="https://discord.gg/letsgo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[hsl(var(--tiger-orange))] hover:bg-[hsl(var(--light-orange))]"
                >
                  <i className="fab fa-discord mr-2"></i>Join Discord
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
