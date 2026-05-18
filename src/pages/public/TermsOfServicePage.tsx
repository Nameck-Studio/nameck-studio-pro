const sections = [
  {
    title: 'Use of the Services',
    body: 'Nameck Studio provides creative, strategy, automation, and publishing tools for professional content workflows. You agree to use the services only for lawful purposes and in a way that does not interfere with the platform or other users.',
  },
  {
    title: 'Accounts and Access',
    body: 'You are responsible for keeping your login details secure and for activity that happens through your account. Contact us promptly if you believe your account has been accessed without permission.',
  },
  {
    title: 'Content and Ownership',
    body: 'You keep ownership of content you provide to Nameck Studio. You grant us the limited rights needed to host, process, review, schedule, publish, and support that content as part of the services you request.',
  },
  {
    title: 'Payments and Projects',
    body: 'Project scope, pricing, deadlines, and deliverables may be defined in separate proposals, statements of work, or written agreements. Those project terms apply in addition to these terms.',
  },
  {
    title: 'Limitation of Liability',
    body: 'The services are provided on a commercially reasonable basis. To the fullest extent permitted by law, Nameck Studio is not responsible for indirect, incidental, or consequential damages.',
  },
  {
    title: 'Changes',
    body: 'We may update these terms as the services evolve. When changes are material, we will take reasonable steps to make the updated terms available.',
  },
];

function TermsOfServicePage(): React.JSX.Element {
  return (
    <div className="bg-bg-primary">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-accent-lime mb-3 text-xs font-black uppercase tracking-widest">
          Legal
        </p>
        <h1 className="text-text-primary mb-4 text-4xl font-black tracking-tight">
          Terms of Service
        </h1>
        <p className="text-text-muted mb-12 text-sm">Last updated: May 8, 2026</p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-text-primary mb-3 text-xl font-bold">{section.title}</h2>
              <p className="text-text-secondary leading-7">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="border-border-default mt-12 border-t pt-8">
          <h2 className="text-text-primary mb-3 text-xl font-bold">Contact</h2>
          <p className="text-text-secondary leading-7">
            Questions about these terms can be sent through the contact page or to the Nameck
            Studio team directly.
          </p>
        </div>
      </section>
    </div>
  );
}

export default TermsOfServicePage;
