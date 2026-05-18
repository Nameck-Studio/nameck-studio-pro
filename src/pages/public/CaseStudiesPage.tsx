import HeroSection from '@components/sections/HeroSection';
import { BentoGrid, BentoItem } from '@components/sections/BentoGrid';
import Card from '@components/ui/Card';

const projects = [
  { title: 'AI Video Synthesis', desc: 'Generative video pipeline for fashion brand campaign.', span: 8 },
  { title: 'AI Sonic Branding', desc: 'Audio identity system powered by neural networks.', span: 4 },
  { title: 'Physical Lore: AI Books', desc: 'AI-illustrated collector books for gaming IP.', span: 4 },
  { title: 'Neural Enhancement', desc: 'Real-time video upscaling for live streaming platform.', span: 8 },
];

function CaseStudiesPage(): React.JSX.Element {
  return (
    <div>
      <HeroSection
        badge="Case Studies"
        title="Neural Curation for the Bold"
        subtitle="Selected projects that demonstrate our commitment to innovation and craft."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <BentoGrid>
          {projects.map((p) => (
            <BentoItem key={p.title} span={p.span}>
              <Card variant="glass" className="group h-64 cursor-pointer overflow-hidden p-6 transition-all hover:border-accent-lime/30">
                <h3 className="text-text-primary mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-text-secondary text-sm">{p.desc}</p>
              </Card>
            </BentoItem>
          ))}
        </BentoGrid>
      </section>
    </div>
  );
}

export default CaseStudiesPage;
