import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Giveaway } from "@shared/schema";

interface GiveawayCardProps {
  giveaway: Giveaway;
  onEnter?: (id: number) => void;
}

export default function GiveawayCard({ giveaway, onEnter }: GiveawayCardProps) {
  const daysLeft = giveaway.durationDays;
  const isEnding = daysLeft <= 2;

  return (
    <motion.div
      className="glass-effect p-8 rounded-2xl border-2 border-[hsl(var(--tiger-orange))]/50 hover-lift"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <Badge 
          variant={isEnding ? "destructive" : "default"}
          className={isEnding ? "bg-[hsl(var(--alert-red))]" : "bg-[hsl(var(--tiger-orange))]"}
        >
          ENDS IN {daysLeft} DAY{daysLeft !== 1 ? 'S' : ''}
        </Badge>
        <span className="text-[hsl(var(--tiger-yellow))] font-bold text-xl">
          ${giveaway.prizeValue} VALUE
        </span>
      </div>
      
      {giveaway.imageUrl && (
        <img 
          src={giveaway.imageUrl} 
          alt={giveaway.title}
          className="w-full h-48 object-cover rounded-xl mb-6"
        />
      )}
      
      <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--tiger-yellow))]">
        {giveaway.title}
      </h3>
      <p className="text-gray-300 mb-6">{giveaway.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {giveaway.entries.toLocaleString()} entries
        </span>
        <Button
          onClick={() => onEnter?.(giveaway.id)}
          className="bg-[hsl(var(--tiger-orange))] hover:bg-[hsl(var(--light-orange))] transition-all duration-300 transform hover:scale-105"
        >
          Enter Now
        </Button>
      </div>
    </motion.div>
  );
}
