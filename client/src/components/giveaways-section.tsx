import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import GiveawayCard from "./giveaway-card";
import { useToast } from "@/hooks/use-toast";
import type { Giveaway } from "@shared/schema";

export default function GiveawaysSection() {
  const { toast } = useToast();
  
  const { data: giveaways, isLoading } = useQuery<Giveaway[]>({
    queryKey: ["/api/giveaways/active"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const handleEnterGiveaway = (id: number) => {
    toast({
      title: "Entry Submitted!",
      description: "You've been entered into the giveaway. Good luck!",
    });
  };

  if (isLoading) {
    return (
      <section id="giveaways" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded-lg mx-auto max-w-md mb-4"></div>
              <div className="h-6 bg-gray-700 rounded-lg mx-auto max-w-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="giveaways" className="py-20 relative">
      {/* Gaming setup background */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Gaming setup background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 tiger-text-gradient">Active Giveaways</h2>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Badge className="bg-[hsl(var(--alert-red))]/20 border border-[hsl(var(--alert-red))] text-[hsl(var(--alert-red))] px-6 py-2 text-lg">
              🔥 LIVE GIVEAWAYS HAPPENING NOW!
            </Badge>
          </motion.div>
        </motion.div>
        
        {giveaways && giveaways.length > 0 ? (
          <>
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {giveaways.map((giveaway, index) => (
                <motion.div
                  key={giveaway.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <GiveawayCard 
                    giveaway={giveaway} 
                    onEnter={handleEnterGiveaway}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Giveaway Stats */}
            {stats && (
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="glass-effect p-6 rounded-xl text-center hover-lift">
                  <div className="text-3xl font-bold text-[hsl(var(--tiger-orange))] mb-2">
                    {stats.totalGiveaways}
                  </div>
                  <div className="text-gray-300">Total Giveaways</div>
                </div>
                <div className="glass-effect p-6 rounded-xl text-center hover-lift">
                  <div className="text-3xl font-bold text-[hsl(var(--tiger-yellow))] mb-2">
                    ${stats.totalPrizesGiven / 1000}K+
                  </div>
                  <div className="text-gray-300">Prizes Given</div>
                </div>
                <div className="glass-effect p-6 rounded-xl text-center hover-lift">
                  <div className="text-3xl font-bold text-[hsl(var(--light-orange))] mb-2">
                    {stats.totalWinners.toLocaleString()}
                  </div>
                  <div className="text-gray-300">Winners</div>
                </div>
                <div className="glass-effect p-6 rounded-xl text-center hover-lift">
                  <div className="text-3xl font-bold text-[hsl(var(--warm-yellow))] mb-2">98%</div>
                  <div className="text-gray-300">Happy Members</div>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-xl text-gray-300">No active giveaways at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
