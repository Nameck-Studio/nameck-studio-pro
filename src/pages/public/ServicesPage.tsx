import HeroSection from '@components/sections/HeroSection';
import ServiceCard from '@components/sections/ServiceCard';
import ProcessTimeline from '@components/sections/ProcessTimeline';

const steps = [
  { number: '01', title: 'Consultation', description: 'Deep-dive into your brand, audience, and goals.' },
  { number: '02', title: 'Execution', description: 'Our team builds, shoots, edits, and designs at speed.' },
  { number: '03', title: 'Deployment', description: 'Coordinated launch across all platforms for maximum impact.' },
  { number: '04', title: 'Scaling', description: 'Continuous optimization based on real-time analytics.' },
];

function ServicesPage(): React.JSX.Element {
  return (
    <div>
      <HeroSection
        badge="Our Services"
        title="The Blueprint for Digital Dominance"
        subtitle="End-to-end solutions engineered for creators who want more than visibility — they want authority."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <ServiceCard
            icon="videocam"
            title="Custom Content Creation"
            description="4K video, motion graphics, VFX compositing, and sound design. Every frame crafted for impact."
            tags={['4K Video', 'Motion Graphics', 'VFX']}
            span="wide"
          />
          <ServiceCard
            icon="trending_up"
            title="Social Media Strategy"
            description="Data-driven roadmaps with viral projection modeling and audience segmentation."
            tags={['Analytics', 'Growth Hacking']}
          />
          <ServiceCard
            icon="workspace_premium"
            title="Brand Management"
            description="Sponsorship deals, brand identity systems, and reputation management for top creators."
            tags={['Sponsorships', 'Identity', 'PR']}
          />
          <ServiceCard
            icon="sync"
            title="Integrated Workflow"
            description="Seamless pipeline from ideation to publication with real-time collaboration tools."
            tags={['Automation', 'Pipeline']}
            span="wide"
          />
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-text-primary mb-12 text-center text-3xl font-bold">Our Process</h2>
          <ProcessTimeline steps={steps} />
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
