import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import GiveawaysSection from "@/components/giveaways-section";
import AnimatedBackground from "@/components/animated-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--deep-navy))] text-white overflow-x-hidden relative">
      <AnimatedBackground />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <GiveawaysSection />
        
        {/* Community Showcase */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 tiger-text-gradient">Community Highlights</h2>
              <p className="text-xl text-gray-300">See what our amazing members are up to</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="glass-effect p-6 rounded-2xl hover-lift">
                <img 
                  src="https://pixabay.com/get/g406d52c8a67552146198a84ca08a49fb15c0d5b34c59d0a22219f324ef2ab21e051e64ba7f7d52313e1f384bc8234b85145fcdec343eb87879ced589dd548e1a_1280.jpg" 
                  alt="Tiger in golden hour" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-[hsl(var(--tiger-orange))]">Weekly Tournaments</h3>
                <p className="text-gray-300">Join our epic weekly gaming tournaments with amazing prizes and fierce competition!</p>
              </div>
              
              <div className="glass-effect p-6 rounded-2xl hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                  alt="Gaming arena" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-[hsl(var(--tiger-yellow))]">Member Spotlights</h3>
                <p className="text-gray-300">Celebrating our community champions and their incredible gaming achievements!</p>
              </div>
              
              <div className="glass-effect p-6 rounded-2xl hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                  alt="Gaming community event" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-[hsl(var(--light-orange))]">Special Events</h3>
                <p className="text-gray-300">Exclusive community events, game launches, and special celebrations throughout the year!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-6 tiger-text-gradient">Ready to Join the Pack?</h2>
              <p className="text-xl text-gray-300 mb-12">Don't miss out on the most exciting gaming community experience. Join thousands of gamers in the RBC family!</p>
              <a 
                href="https://discord.gg/letsgo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[hsl(var(--tiger-orange))] hover:bg-[hsl(var(--light-orange))] px-12 py-6 rounded-full text-2xl font-bold transition-all duration-300 transform hover:scale-110 animate-glow"
              >
                <i className="fab fa-discord mr-4"></i>Join RBC Discord Now
              </a>
              <p className="text-sm text-gray-400 mt-6">Free to join • No spam • Awesome community</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[hsl(var(--midnight-blue))]/50 py-12 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-10 h-10 hexagon bg-[hsl(var(--tiger-orange))]"></div>
              <div>
                <div className="text-xl font-bold tiger-text-gradient">RBC Community</div>
                <div className="text-sm text-gray-400">The Ultimate Gaming Hub</div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="https://discord.gg/letsgo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl text-[hsl(var(--tiger-orange))] hover:text-[hsl(var(--light-orange))] transition-colors duration-300"
              >
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="text-2xl text-[hsl(var(--tiger-yellow))] hover:text-[hsl(var(--warm-yellow))] transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-2xl text-[hsl(var(--light-orange))] hover:text-[hsl(var(--tiger-orange))] transition-colors duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RBC Community. All rights reserved. Made with 🔥 for the gaming community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
