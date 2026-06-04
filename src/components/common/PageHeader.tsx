type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="space-y-2">
      {eyebrow ? <p className="text-sm font-bold text-civic-700">{eyebrow}</p> : null}
      <div>
        <h1 className="text-2xl font-bold tracking-normal text-navy-950">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
    </header>
  );
}
