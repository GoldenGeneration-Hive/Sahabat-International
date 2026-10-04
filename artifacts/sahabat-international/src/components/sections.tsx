import { FadeIn } from '@/components/fade-in';

const Eyebrow = ({ children }: { children: string }) => (
  <p className="text-sm font-medium tracking-wide text-primary mb-3">{children}</p>
);

export function StorySection() {
  const values = ['Nurture the self', 'Strengthen the family', 'Seek knowledge and wisdom', 'Serve the community', 'Build a better society'];
  const steps = ['Belong', 'Learn', 'Contribute', 'Steward', 'Lead', 'Develop others'];
  return (
    <section aria-labelledby="story-h" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <FadeIn>
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story-h" className="text-3xl lg:text-4xl font-serif mb-5">From a small fortnightly table to a community</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our grassroots journey began in January 2024 with small fortnightly gatherings. They grew into a community of families, residents, students, educators, professionals and volunteers sharing food, learning, friendship and service.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our vision is stronger people, families and communities, able to learn, serve, create opportunities and build a better tomorrow together.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed p-4 rounded-xl bg-secondary/50">
            Sahabat International was incorporated as a company limited by guarantee on 3 September 2026, according to our September 2026 working profile.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h3 className="text-xl font-serif mb-4">Five values we hold</h3>
          <ol className="space-y-2 mb-10">
            {values.map((v, i) => (
              <li key={v} className="flex items-center gap-4 rounded-xl bg-background border border-border/60 px-4 py-3">
                <span aria-hidden="true" className="font-serif italic text-primary w-5">{i + 1}</span>
                <span>{v}</span>
              </li>
            ))}
          </ol>
          <h3 className="text-xl font-serif mb-2">Take part at your own pace</h3>
          <p className="text-sm text-muted-foreground mb-4">There is no obligation to become a leader. Many people simply come to the table.</p>
          <ol className="flex flex-wrap gap-2" aria-label="Participation journey">
            {steps.map((s, i) => (
              <li key={s} className="rounded-full border border-primary/30 bg-secondary/60 px-4 py-1.5 text-sm">
                <span className="text-primary mr-1.5">{i + 1}.</span>{s}
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </section>
  );
}

type Item = { title: string; body: string };
const current: Item[] = [
  { title: 'Community gatherings and shared meals', body: 'Approximately fortnightly on Saturdays: food, conversation and neighbours meeting neighbours.' },
  { title: 'Community cooking', body: 'Cooking together is part of the day, and an easy way to join in.' },
  { title: 'Wellbeing and mutual support', body: 'Friendship and support found simply by gathering.' },
  { title: 'Volunteering with gatherings', body: 'Help before or after an event, in whatever way suits you.' },
];
const developing: (Item & { tag: string })[] = [
  { tag: 'Pilot', title: 'Qur\u2019an, Arabic and lifelong learning', body: 'Sirah and Qur\u2019anic Arabic pilot weekends.' },
  { tag: 'Pilot', title: 'Children, family learning and creativity', body: 'Creativity and enterprising skills pilot weekends.' },
  { tag: 'Pilot', title: 'Enterprise and social innovation', body: 'Adult entrepreneurship and bilingual stories pilots.' },
  { tag: 'Emerging', title: 'Digital literacy and technology for good', body: 'An emerging area we are exploring.' },
  { tag: 'Developing', title: 'Mentorship', body: 'Being developed; not yet a regular offer.' },
];

export function ProgrammesSection() {
  return (
    <section id="programmes" aria-labelledby="prog-h" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="max-w-2xl mb-12">
            <Eyebrow>What we do</Eyebrow>
            <h2 id="prog-h" className="text-3xl lg:text-5xl font-serif mb-4">Gather around the table</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some things happen now; others are pilots or still taking shape. Not every programme is available at every time, so check the next event details below.
            </p>
          </div>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-8">
          <FadeIn>
            <div className="rounded-3xl bg-white border border-border/60 p-7 lg:p-10 h-full">
              <h3 className="text-2xl font-serif mb-1">Running now</h3>
              <p className="text-sm text-muted-foreground mb-6">Part of our regular community life.</p>
              <ul className="space-y-5">
                {current.map((c) => (
                  <li key={c.title} className="flex gap-3">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    <div><p className="font-medium">{c.title}</p><p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-3xl bg-secondary/50 border border-dashed border-primary/40 p-7 lg:p-10 h-full">
              <h3 className="text-2xl font-serif mb-1">Pilots and developing</h3>
              <p className="text-sm text-muted-foreground mb-6">Early-stage, and not offered on a fixed schedule.</p>
              <ul className="space-y-5">
                {developing.map((c) => (
                  <li key={c.title} className="flex gap-3">
                    <span className="text-xs font-medium rounded-full bg-background border border-primary/30 text-primary px-2.5 py-0.5 h-fit mt-0.5 shrink-0">{c.tag}</span>
                    <div><p className="font-medium">{c.title}</p><p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
        <FadeIn>
          <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-3xl">
            G-Hive is an independent collaborating social enterprise and is not part of Sahabat. Community programmes are supported by Sahabat contributors, and G-Hive supports some sessions.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export function ImpactSection() {
  const stats = [
    { n: '70+', l: 'regular gathering days' },
    { n: 'Nearly 2,000', l: 'meals shared' },
    { n: 'Around 30\u201350', l: 'adults and children at many gatherings' },
  ];
  return (
    <section aria-labelledby="impact-h" className="py-20 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 id="impact-h" className="text-3xl lg:text-4xl font-serif mb-2">The table so far</h2>
          <p className="text-sm opacity-80 max-w-2xl mb-10">
            Approximate grassroots community journey records, January 2024 to September 2026. These cover the period before incorporation and are not all attributable to the company.
          </p>
          <dl className="grid sm:grid-cols-3 gap-8">
            {stats.map((s) => (
              <div key={s.l} className="border-t border-background/30 pt-4">
                <dt className="sr-only">{s.l}</dt>
                 <dd className="font-serif text-4xl lg:text-5xl text-primary-foreground" aria-label={s.n + ' ' + s.l}>
                  <span aria-hidden="true">{s.n}</span>
                  <span aria-hidden="true" className="block text-base font-sans opacity-80 mt-2">{s.l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}

export function InternationalSection() {
  const areas = ['Education and capability', 'Humanitarian and welfare development', 'Access for vulnerable and underrepresented communities', 'Women and family empowerment'];
  const partners = ['Mentoring', 'Knowledge', 'Facilities', 'Cooperation', 'Funding'];
  return (
    <section aria-labelledby="intl-h" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12">
        <FadeIn>
          <Eyebrow>Looking ahead</Eyebrow>
          <h2 id="intl-h" className="text-3xl lg:text-4xl font-serif mb-4">International plans, still developing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            These are plans in development, not operational offers. We are not offering funding, scholarships, admissions, employment or immigration outcomes.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We also plan a physical and digital Sahabat Centre. It is not yet operational.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h3 className="text-lg font-serif mb-3">Areas we are exploring</h3>
          <ul className="grid sm:grid-cols-2 gap-3 mb-8">
            {areas.map((a) => <li key={a} className="rounded-xl bg-background border border-border/60 p-4 text-sm">{a}</li>)}
          </ul>
          <h3 className="text-lg font-serif mb-3">Potential partnership in</h3>
          <ul className="flex flex-wrap gap-2">
            {partners.map((p) => <li key={p} className="rounded-full bg-secondary px-4 py-1.5 text-sm">{p}</li>)}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
