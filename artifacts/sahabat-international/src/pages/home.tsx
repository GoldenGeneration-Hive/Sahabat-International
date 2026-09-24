import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetNextEvent, useRegisterEventInterest } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Loader2, ArrowRight, Heart, Users, BookOpen, CalendarDays, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  volunteerTiming: z.enum(['before', 'after', 'both']).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const { data: nextEvent, isLoading: isEventLoading, isError: isEventError } = useGetNextEvent();
  const registerMutation = useRegisterEventInterest();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', volunteerTiming: undefined }
  });

  const onSubmit = (values: FormValues) => {
    registerMutation.mutate({ data: values }, {
      onSuccess: (res) => {
        toast.success(res.message || 'Thank you for your interest.');
         form.reset();
        setSubmitted(true);
      },
      onError: () => {
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  const scrollToJoin = () => {
    const el = document.getElementById('join');
    el?.scrollIntoView({ behavior: 'smooth' });
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-border/50 shadow-sm">
                <Heart className="w-4 h-4 text-primary" />
                <span>Small Steps, Big Possibilities</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] text-foreground mb-6">
                A kinder, more <br className="hidden lg:block"/>
                <span className="text-primary italic">connected</span> community.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                Sahabat International welcomes families and individuals from all backgrounds to connect, learn, share and volunteer. Like arriving at a community table.
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
                alt="Abstract illustration representing warm community connection" 
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

      {/* What We Do */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-serif mb-6 text-foreground">Gather around the table</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that community is built through shared experiences. Our gatherings are spaces where everyone has a seat, a voice, and a role to play.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <FadeIn delay={0.1}>
              <div className="bg-background rounded-3xl p-8 lg:p-12 border border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-500">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-8">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Bi-weekly Gatherings</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Approximately every two weeks on Saturdays, we come together for shared cooking, dinner, and discussion. It's a chance to meet neighbours, share stories, and spend time together.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-background rounded-3xl p-8 lg:p-12 border border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-500">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-8">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Family Learning</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our pilot learning sessions on Saturdays or Sundays are designed for all ages, fostering continuous growth together.
                </p>
                <ul className="space-y-4 text-sm text-foreground mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="leading-relaxed"><strong>For Children:</strong> Sirah and Qur'anic Arabic, creativity, and enterprising skills.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="leading-relaxed"><strong>For Adults:</strong> Entrepreneurship and bilingual stories.</span>
                  </li>
                </ul>
                <div className="p-4 bg-secondary/50 rounded-xl text-sm text-muted-foreground leading-relaxed">
                  Programmes are supported by Sahabat community contributors. We are grateful to G-Hive for supporting some of our sessions.
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Join the Next Event */}
      <section id="join" className="py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
          <FadeIn>
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-14 border border-border/40 relative overflow-hidden">
              
              {/* Subtle accent in corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/50 rounded-bl-[4rem] -z-10" />

              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">Join the next event</h2>
                 <p className="text-muted-foreground max-w-lg mx-auto">Register your interest to attend. The next date and venue will be announced when confirmed.</p>
              </div>

              {/* Event Details */}
              <div className="mb-12 p-6 md:p-8 rounded-2xl bg-secondary/30 border border-border/50">
                {isEventLoading ? (
                  <div className="flex items-center justify-center gap-3 text-muted-foreground p-6">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Preparing gathering details...</span>
                  </div>
                ) : nextEvent ? (
                  <div className="space-y-5">
                    <h4 className="font-serif text-2xl text-foreground">{nextEvent.title}</h4>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2.5">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{nextEvent.date || 'Date: To be announced'}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{nextEvent.venue || 'Venue: To be announced'}</span>
                      </div>
                    </div>
                    {nextEvent.details && (
                      <p className="text-sm mt-4 pt-5 border-t border-border/60 text-muted-foreground leading-relaxed">
                        {nextEvent.details}
                      </p>
                    )}
                  </div>
                 ) : isEventError ? (
                   <div className="text-muted-foreground p-6 text-sm text-center" role="status">
                     Event information is temporarily unavailable. You can still register your interest below.
                   </div>
                 ) : (
                  <div className="text-muted-foreground p-6 text-sm text-center">
                    Next event details are being finalized. You can still register your interest below!
                  </div>
                )}
              </div>

              {/* Form */}
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                   className="text-center py-12 px-6 bg-secondary/20 rounded-2xl border border-primary/10"
                   role="status"
                >
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif mb-3 text-foreground">We've received your interest!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                     Thank you for wanting to join the Sahabat community. Your details have been recorded for event follow-up.
                  </p>
                  <Button variant="outline" className="mt-8 rounded-full" onClick={() => setSubmitted(false)}>
                    Submit another response
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                      <Input 
                        id="name" 
                         autoComplete="name"
                         maxLength={120}
                         aria-invalid={!!form.formState.errors.name}
                        placeholder="e.g. Sarah Jenkins"
                        {...form.register('name')} 
                        className={form.formState.errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
                      />
                      {form.formState.errors.name && (
                        <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                      <Input 
                        id="email" 
                        type="email"
                         autoComplete="email"
                         maxLength={254}
                         aria-invalid={!!form.formState.errors.email}
                        placeholder="you@example.com"
                        {...form.register('email')} 
                        className={form.formState.errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                      />
                      {form.formState.errors.email && (
                        <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-border/40">
                    <div>
                      <Label className="text-base font-serif text-foreground">Volunteering (Optional)</Label>
                      <p className="text-xs text-muted-foreground mt-1 mb-4">
                        Our gatherings run on community effort. Would you be able to help?
                      </p>
                    </div>
                    
                    <Controller
                      control={form.control}
                      name="volunteerTiming"
                      render={({ field }) => (
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          value={field.value}
                          className="grid sm:grid-cols-3 gap-3"
                        >
                          <div className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl border border-transparent hover:border-border transition-colors">
                            <RadioGroupItem value="before" id="v-before" />
                            <Label htmlFor="v-before" className="font-normal cursor-pointer flex-1">Help with setup before</Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl border border-transparent hover:border-border transition-colors">
                            <RadioGroupItem value="after" id="v-after" />
                            <Label htmlFor="v-after" className="font-normal cursor-pointer flex-1">Help with cleanup after</Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl border border-transparent hover:border-border transition-colors">
                            <RadioGroupItem value="both" id="v-both" />
                            <Label htmlFor="v-both" className="font-normal cursor-pointer flex-1">I can help with both</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  <div className="pt-8 flex flex-col items-center sm:items-start">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full sm:w-auto rounded-full px-12 h-14 text-base"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Register Interest'
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-5 text-center sm:text-left max-w-xl">
                      By submitting this form, you agree to share these details with Sahabat International for the purpose of organizing community events. We value your privacy and do not collect details about children.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-md">
             <h5 className="font-serif text-xl mb-3 text-foreground">About & contact</h5>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A Coventry nonprofit community organisation dedicated to creating inclusive, connected spaces for families and individuals from all backgrounds.
            </p>
            <p className="text-sm font-medium text-foreground">
               Interested in an event or helping out? <button onClick={scrollToJoin} className="text-primary hover:underline font-medium transition-colors">Register your interest</button> above.
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground md:text-right">
             Sahabat International · Coventry
          </div>
        </div>
      </footer>
    </div>
  );
}
