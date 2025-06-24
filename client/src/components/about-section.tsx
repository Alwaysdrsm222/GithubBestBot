import { motion } from "framer-motion";
import { Gift, Users, Gamepad2 } from "lucide-react";
import Hexagon from "./hexagon";

export default function AboutSection() {
  const features = [
    {
      icon: Gift,
      title: "Epic Giveaways",
      description: "Regular giveaways featuring the latest games, gaming gear, and exclusive digital content. Your chance to win big!",
      color: "orange" as const,
    },
    {
      icon: Users,
      title: "Chill Community",
      description: "A relaxed, friendly environment where gamers unite. No toxicity, just good vibes and great conversations.",
      color: "yellow" as const,
    },
    {
      icon: Gamepad2,
      title: "Gaming Sessions",
      description: "Join epic multiplayer sessions, tournaments, and game nights. Find your squad and dominate together!",
      color: "light-orange" as const,
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 tiger-text-gradient">Why Join RBC?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover what makes our community the wildest gaming hub on Discord
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-effect p-8 rounded-2xl hover-lift"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="flex justify-center mb-6">
                <Hexagon size="lg" color={feature.color} animate>
                  <feature.icon className="w-8 h-8 text-white" />
                </Hexagon>
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${
                feature.color === 'orange' ? 'text-[hsl(var(--tiger-orange))]' :
                feature.color === 'yellow' ? 'text-[hsl(var(--tiger-yellow))]' :
                'text-[hsl(var(--light-orange))]'
              }`}>
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
