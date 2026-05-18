const sections = [
  {
    title: 'Information We Collect',
    body: 'We may collect information you provide directly, such as your name, email address, project details, account information, and content submitted through Nameck Studio workflows.',
  },
  {
    title: 'How We Use Information',
    body: 'We use information to provide services, manage accounts, communicate with you, improve product quality, support publishing workflows, and protect the security of the platform.',
  },
  {
    title: 'Service Providers',
    body: 'We may work with trusted providers for hosting, analytics, communications, payment processing, publishing, and operational support. These providers are allowed to use information only as needed to support our services.',
  },
  {
    title: 'Data Retention',
    body: 'We keep information for as long as needed to provide services, meet legal obligations, resolve disputes, and maintain business records. Retention periods may vary by project or account type.',
  },
  {
    title: 'Your Choices',
    body: 'You may request access, correction, or deletion of certain personal information by contacting us. Some information may need to be retained where required by law or legitimate business needs.',
  },
  {
    title: 'Security',
    body: 'We use reasonable technical and organizational measures to protect information. No online service can guarantee absolute security, so we encourage careful account and credential management.',
  },
];

function PrivacyPolicyPage(): React.JSX.Element {
  return (
    <div className="bg-bg-primary">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-accent-lime mb-3 text-xs font-black uppercase tracking-widest">
          Legal
        </p>
        <h1 className="text-text-primary mb-4 text-4xl font-black tracking-tight">
          Privacy Policy
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
            Questions about this policy can be sent through the contact page or to the Nameck
            Studio team directly.
          </p>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
