interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: Step[];
}

function ProcessTimeline({ steps }: ProcessTimelineProps): React.JSX.Element {
  return (
    <div className="relative">
      <div className="bg-border-default absolute left-6 top-0 h-full w-px md:left-1/2" />
      <div className="flex flex-col gap-12">
        {steps.map((step) => (
          <div key={step.number} className="relative flex items-start gap-6 md:gap-12">
            <div className="bg-accent-lime text-bg-primary z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold">
              {step.number}
            </div>
            <div className="pt-2">
              <h3 className="text-text-primary mb-1 text-lg font-semibold">{step.title}</h3>
              <p className="text-text-secondary text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProcessTimeline;
