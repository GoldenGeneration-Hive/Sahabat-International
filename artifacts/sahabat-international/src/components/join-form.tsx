import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Heart, CalendarDays, MapPin } from 'lucide-react';
import { useGetNextEvent, useRegisterEventInterest } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { FadeIn } from '@/components/fade-in';

const interests = [
  { value: 'skills', label: 'Share skills' },
  { value: 'teaching', label: 'Teach' },
  { value: 'mentoring', label: 'Mentor' },
  { value: 'resources', label: 'Contribute resources' },
  { value: 'partnership', label: 'Enquire about partnership' },
] as const;

const formSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(120),
  email: z.string().email('Please enter a valid email address.').max(254),
  volunteerTiming: z.enum(['before', 'after', 'both']).optional(),
  contributionInterests: z.array(z.enum(['skills', 'teaching', 'mentoring', 'resources', 'partnership'])).optional(),
});
type FormValues = z.infer<typeof formSchema>;

export function JoinForm() {
  const { data: nextEvent, isLoading, isError } = useGetNextEvent();
  const registerMutation = useRegisterEventInterest();
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', volunteerTiming: undefined, contributionInterests: [] },
  });
  const errors = form.formState.errors;

  const onSubmit = (values: FormValues) => {
    const data = {
      name: values.name,
      email: values.email,
      ...(values.volunteerTiming ? { volunteerTiming: values.volunteerTiming } : {}),
      ...(values.contributionInterests?.length ? { contributionInterests: values.contributionInterests } : {}),
    };
    registerMutation.mutate({ data }, {
      onSuccess: () => {
        form.reset({ name: '', email: '', volunteerTiming: undefined, contributionInterests: [] });
        setSubmitted(true);
      },
      onError: () => toast.error('Something went wrong. Please try again.'),
    });
  };

  const box = 'flex items-center gap-3 bg-secondary/30 p-4 rounded-xl border border-transparent hover:border-border transition-colors';

  return (
    <section id="join" tabIndex={-1} aria-labelledby="join-h" className="py-20 lg:py-28 bg-background scroll-mt-4 outline-none">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="bg-white rounded-[2.5rem] shadow-xl p-6 sm:p-10 md:p-14 border border-border/40">
            <div className="text-center mb-10">
              <h2 id="join-h" className="text-3xl md:text-4xl font-serif mb-3">Join the next event</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Register your interest. Everyone is welcome, whatever your faith, culture or background.</p>
            </div>

            <div className="mb-10 p-6 rounded-2xl bg-secondary/30 border border-border/50" aria-live="polite">
              {isLoading ? (
                <div className="flex items-center justify-center gap-3 text-muted-foreground p-4">
                  <Loader2 className="w-5 h-5 animate-spin motion-reduce:animate-none" />
                  <span>Loading event details...</span>
                </div>
              ) : nextEvent ? (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl">{nextEvent.title}</h3>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-sm">
                    <div className="flex items-center gap-2.5"><CalendarDays className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span><span className="text-muted-foreground">Date: </span><span className="font-medium">{nextEvent.date || 'To be announced'}</span></span></div>
                    <div className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span><span className="text-muted-foreground">Venue: </span><span className="font-medium">{nextEvent.venue || 'To be announced'}</span></span></div>
                  </div>
                  {nextEvent.details && <p className="text-sm pt-4 border-t border-border/60 text-muted-foreground leading-relaxed">{nextEvent.details}</p>}
                </div>
              ) : (
                <p className="text-muted-foreground p-2 text-sm text-center" role="status">
                  {isError ? 'Event information is temporarily unavailable. You can still register your interest below.' : 'Date: To be announced. Venue: To be announced.'}
                </p>
              )}
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 px-6 bg-secondary/20 rounded-2xl border border-primary/10" role="status">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-5"><Heart className="w-7 h-7" aria-hidden="true" /></div>
                <h3 className="text-2xl font-serif mb-3">Thank you, we have your interest</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your details and any volunteering or contribution interests you chose have been recorded for event and contribution follow-up.
                </p>
                <Button variant="outline" className="mt-7 rounded-full" onClick={() => setSubmitted(false)}>Submit another response</Button>
              </motion.div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only">(required)</span></Label>
                    <Input id="name" autoComplete="name" maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} {...form.register('name')} />
                    {errors.name && <p id="name-err" role="alert" className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only">(required)</span></Label>
                    <Input id="email" type="email" autoComplete="email" maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} {...form.register('email')} />
                    {errors.email && <p id="email-err" role="alert" className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                </div>

                <fieldset className="pt-6 border-t border-border/40">
                  <legend className="text-base font-serif">Volunteering (optional)</legend>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">Our gatherings run on community effort. Would you be able to help?</p>
                  <Controller control={form.control} name="volunteerTiming" render={({ field }) => (
                    <>
                      <RadioGroup onValueChange={field.onChange} value={field.value ?? ''} className="grid sm:grid-cols-3 gap-3" aria-label="Volunteering timing">
                        {([['before', 'Help with setup before'], ['after', 'Help with cleanup after'], ['both', 'I can help with both']] as const).map(([v, l]) => (
                          <div key={v} className={box}>
                            <RadioGroupItem value={v} id={'v-' + v} />
                            <Label htmlFor={'v-' + v} className="font-normal cursor-pointer flex-1">{l}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {field.value && (
                        <Button type="button" variant="ghost" size="sm" className="mt-2 rounded-full" onClick={() => field.onChange(undefined)}>Clear volunteering choice</Button>
                      )}
                    </>
                  )} />
                </fieldset>

                <fieldset className="pt-6 border-t border-border/40">
                  <legend className="text-base font-serif">Ways you might contribute (optional)</legend>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">Choose any that apply, or none.</p>
                  <Controller control={form.control} name="contributionInterests" render={({ field }) => (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {interests.map((i) => {
                        const list = field.value ?? [];
                        const checked = list.includes(i.value);
                        return (
                          <div key={i.value} className={box}>
                            <Checkbox id={'c-' + i.value} checked={checked}
                              onCheckedChange={(c) => field.onChange(c ? [...list, i.value] : list.filter((x) => x !== i.value))} />
                            <Label htmlFor={'c-' + i.value} className="font-normal cursor-pointer flex-1">{i.label}</Label>
                          </div>
                        );
                      })}
                    </div>
                  )} />
                </fieldset>

                <div className="pt-4 flex flex-col items-center sm:items-start">
                  <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full px-12 h-14 text-base" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin motion-reduce:animate-none" />Submitting...</>) : 'Register interest'}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-5 text-center sm:text-left max-w-xl">
                    We use your name and email only to follow up about events and any volunteering or contribution interests you select. We do not collect details about children.
                  </p>
                   {registerMutation.isError && <p role="alert" className="mt-4 text-sm text-destructive">Your interest could not be saved. Please try again.</p>}
                </div>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
