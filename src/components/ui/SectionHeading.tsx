import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  index?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', index }: Props) {
  return (
    <div className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <p className="eyebrow mb-3 flex items-center gap-3">
          {index && <span className="text-dim">{index}</span>}
          <span className="inline-block h-px w-8 bg-accent/60" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl font-semibold leading-[1.1] text-text sm:text-4xl md:text-5xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
