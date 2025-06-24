import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Hexagon from "./hexagon";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Tiger-themed background image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://pixabay.com/get/g693cfc27414bfb2b4c9026b3e6bf48479fb8a3e57cbdbcd6727e285835292adf57d1c904ce211fd1f22a097b19b357eff52a3b91019e3245c3561d82d95f547e_1280.jpg" 
          alt="Tiger background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--tiger-orange))]/30 to-[hsl(var(--tiger-yellow))]/30"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6 tiger-text-gradient"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            RBC COMMUNITY
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join the most epic gaming community where tigers rule and legends are born. 
            Experience the thrill of giveaways, epic gaming sessions, and an amazing community vibe.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-[hsl(var(--tiger-orange))] hover:bg-[hsl(var(--light-orange))] px-10 py-6 text-xl font-bold transition-all duration-300 transform hover:scale-110 animate-glow"
            >
              <a href="https://discord.gg/letsgo" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-discord mr-3"></i>Join Our Discord
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[hsl(var(--tiger-yellow))] text-[hsl(var(--tiger-yellow))] hover:bg-[hsl(var(--tiger-yellow))] hover:text-[hsl(var(--deep-navy))] px-10 py-6 text-xl font-bold transition-all duration-300 transform hover:scale-110"
              onClick={() => {
                const aboutSection = document.getElementById("about");
                aboutSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10">
        <Hexagon size="xl" color="orange" animate className="opacity-30" />
      </div>
      <div className="absolute bottom-20 right-10">
        <Hexagon size="lg" color="yellow" animate className="opacity-30" />
      </div>
    </section>
  );
}
