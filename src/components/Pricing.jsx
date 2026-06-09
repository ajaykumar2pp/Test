import { Button } from '@/components/ui/button';

export default function Pricing() {
  const plans = [
    { name: 'Free', price: '$0', features: ['3 Analyses / Month'] },
    { name: 'Pro', price: '$9', features: ['Unlimited Analyses'] },
    { name: 'Team', price: '$29', features: ['Multi-user Workspace'] },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-5xl">Simple Pricing</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-3xl border p-8 shadow-sm">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-4 text-4xl font-extrabold">{plan.price}</p>
              <ul className="mt-6 space-y-2 text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button className="mt-6 w-full bg-violet-600 hover:bg-violet-700">
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}