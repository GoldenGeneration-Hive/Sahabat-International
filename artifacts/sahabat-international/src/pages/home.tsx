import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';
import { JoinForm } from '@/components/join-form';
import { StorySection, ProgrammesSection, ImpactSection, InternationalSection } from '@/components/sections';

export default function Home() {
  const scrollToJoin = () => {
    const el = document.getElementById('join');
    el?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    el?.focus({ preventScroll: true });
  };

  return (
    <div className="min-h-[100dvh] bg-background overflow-hidden relative">
      {/* Navigation */}
      <nav className="absolute top-0 w-full p-6 lg:px-12 flex justify-between items-center z-20">
        <div className="font-serif font-medium text-xl tracking-wide text-foreground">
          Sahabat <span className="text-primary italic">International</span>
        </div>
        <Button variant="ghost" className="hidden sm:inline-flex rounded-full px-6" onClick={scrollToJoin}>
          Join a Gathering
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
               <div className="inline-flex max-w-full items-center gap-2 px-4 py-1.5 rounded-2xl sm:rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm font-medium mb-8 border border-border/50 shadow-sm">
                <Heart className="w-4 h-4 text-primary" aria-hidden="true" />
                 <span>People • Knowledge • Compassion • Action</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] text-foreground mb-6">
                A home for people, purpose and <span className="text-primary italic">positive change.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                Sahabat International is an independent nonprofit community learning and social-impact organisation in Coventry and Warwick, rooted in an Islamic moral and spiritual foundation and welcoming people of different faiths, cultures and backgrounds.
              </p>
              <Button size="lg" onClick={scrollToJoin} className="rounded-full px-8 text-base shadow-sm group h-14">
                Join the next event
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative lg:ml-auto w-full max-w-md mx-auto lg:max-w-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="aspect-[4/5] lg:aspect-square rounded-[2rem] overflow-hidden relative bg-secondary shadow-2xl shadow-primary/5">
              <img 
                src="/attached_assets/generated_images/sahabat_hero.png" 
                alt="Warm abstract illustration of community connection" 
                className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-multiply" />
            </div>
            {/* Decorative blurs */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary rounded-full -z-10 blur-3xl opacity-80" />
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-primary/20 rounded-full -z-10 blur-3xl opacity-60" />
          </motion.div>
        </div>
      </section>

      <StorySection />
      <ProgrammesSection />
      <ImpactSection />
      <InternationalSection />
      <JoinForm />

      {/* Footer */}
      <footer className="bg-white border-t border-border pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p className="font-serif text-xl text-foreground">Sahabat International</p>
          <p>People • Knowledge • Compassion • Action. Coventry and Warwick.</p>
           <p className="max-w-3xl">An independent nonprofit company limited by guarantee. G-Hive is an independent collaborating social enterprise, not part of Sahabat.</p>
          <p>Interested in an event or helping out? <button onClick={scrollToJoin} className="text-primary underline underline-offset-2 font-medium">Register your interest</button>.</p>
        </div>
      </footer>
    </div>
  );
}
