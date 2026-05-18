import { useNavigate } from 'react-router-dom';
import HeroSection from '@components/sections/HeroSection';
import ServiceCard from '@components/sections/ServiceCard';
import TestimonialCard from '@components/sections/TestimonialCard';
import Button from '@components/ui/Button';

function HomePage(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection
        badge="Digital Agency"
        title="Elevate Your Creator Brand with Nameck Studio"
        subtitle="We craft premium digital experiences for world-class creators. From content strategy to brand management, we deliver results."
        ctaLabel="Contact Our Agency"
        onCtaClick={() => navigate('/contact')}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-text-primary mb-12 text-center text-3xl font-bold">Our Services</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            icon="videocam"
            title="Custom Content Creation"
            description="4K video production, motion graphics, and VFX that captivate your audience and elevate your brand."
            tags={['4K', 'Motion Graphics', 'VFX']}
          />
          <ServiceCard
            icon="trending_up"
            title="Social Media Strategy"
            description="Data-driven roadmaps that maximize reach, engagement, and conversion across all platforms."
            tags={['Analytics', 'Growth', 'ROI']}
          />
          <ServiceCard
            icon="workspace_premium"
            title="Brand Management"
            description="Sponsorship negotiations, brand identity, and strategic partnerships that grow your influence."
            tags={['Sponsorships', 'Identity', 'PR']}
          />
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-text-primary mb-4 text-3xl font-bold">Nameck Studio PRO</h2>
          <p className="text-text-secondary mx-auto mb-8 max-w-2xl">
            Our all-in-one creator dashboard. Manage your media, plan content, track analytics, and
            publish across platforms — from a single interface.
          </p>
          <Button onClick={() => navigate('/pro/login')}>Try PRO Free</Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-text-primary mb-12 text-center text-3xl font-bold">
          What Creators Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <TestimonialCard
            name="Sarah Chen"
            quote="Nameck Studio transformed our content pipeline. Engagement went up 340% in 3 months."
            rating={5}
          />
          <TestimonialCard
            name="Marcus Johnson"
            quote="The PRO dashboard is a game-changer. I manage all my platforms from one place now."
            rating={5}
          />
          <TestimonialCard
            name="Lena Virtanen"
            quote="Their strategy team is incredible. They genuinely understand the creator economy."
            rating={5}
          />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
