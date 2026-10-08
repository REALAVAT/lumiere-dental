import { SectionHeading } from "./section-heading";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="grain-bg relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div className="container-page">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}
