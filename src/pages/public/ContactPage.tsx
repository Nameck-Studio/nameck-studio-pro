import { useState, useCallback } from 'react';
import HeroSection from '@components/sections/HeroSection';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';

function ContactPage(): React.JSX.Element {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  return (
    <div>
      <HeroSection
        title="Let's Build Something Extraordinary"
        subtitle="Tell us about your project and we'll get back within 24 hours."
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        {submitted ? (
          <Card variant="glass" className="p-8 text-center">
            <h2 className="text-accent-lime mb-2 text-2xl font-bold">Message Sent!</h2>
            <p className="text-text-secondary">We&apos;ll be in touch within 24 hours.</p>
          </Card>
        ) : (
          <Card variant="glass" className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Input label="First Name" required />
                <Input label="Last Name" required />
              </div>
              <Input label="Email" type="email" required />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-text-secondary text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="bg-bg-card border-border-default text-text-primary focus:border-accent-lime w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
                  required
                />
              </div>
              <Button type="submit" size="lg">
                Send Message
              </Button>
            </form>
          </Card>
        )}
      </section>
    </div>
  );
}

export default ContactPage;
