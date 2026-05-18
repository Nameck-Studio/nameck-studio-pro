import HeroSection from '@components/sections/HeroSection';
import { BentoGrid, BentoItem } from '@components/sections/BentoGrid';
import Card from '@components/ui/Card';
import TeamMember from '@components/sections/TeamMember';
import Icon from '@components/ui/Icon';

const values = [
  { icon: 'bolt', title: 'Unmatched Speed', description: 'Rapid iteration from concept to delivery.' },
  { icon: 'center_focus_strong', title: 'Focused Power', description: 'Every resource directed at your success.' },
  { icon: 'handshake', title: 'Synergistic Execution', description: 'Collaborative workflows that amplify results.' },
];

function AboutPage(): React.JSX.Element {
  return (
    <div>
      <HeroSection
        title="Empowering World-Class Creators to Redefine the Digital Frontier"
        subtitle="We are Nameck Studio — a boutique digital agency for elite creators who refuse to blend in."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <BentoGrid>
          {values.map((v) => (
            <BentoItem key={v.title} span={4}>
              <Card variant="glass" className="h-full p-6">
                <div className="bg-accent-lime/10 text-accent-lime mb-4 inline-flex rounded-lg p-3">
                  <Icon name={v.icon} size={28} />
                </div>
                <h3 className="text-text-primary mb-2 text-lg font-semibold">{v.title}</h3>
                <p className="text-text-secondary text-sm">{v.description}</p>
              </Card>
            </BentoItem>
          ))}
        </BentoGrid>
      </section>

      <section className="bg-bg-secondary px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-text-primary mb-12 text-center text-3xl font-bold">The Team</h2>
          <div className="flex flex-wrap justify-center gap-16">
            <TeamMember name="Olivier Demolliens" role="Technical Director" />
            <TeamMember name="Imran Mentese" role="Creative Director" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
