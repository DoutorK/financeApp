type BottomNavItem = {
  label: string
  icon: string
}

type BottomNavProps = {
  items: ReadonlyArray<BottomNavItem>
  activeLabel: string
  onChange: (label: string) => void
}

export function BottomNav({ items, activeLabel, onChange }: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-3 left-3 right-3 z-10 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-outline-variant bg-surface-container/95 p-2 shadow-elevated backdrop-blur-xl"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          aria-current={activeLabel === item.label ? 'page' : undefined}
          onClick={() => onChange(item.label)}
          className={[
            'flex flex-col items-center justify-center gap-1 rounded-[1.1rem] px-2 py-2 text-[0.72rem] font-medium transition-colors',
            activeLabel === item.label ? 'bg-brand-50 text-brand-900' : 'text-text-variant',
          ].join(' ')}
        >
          <span aria-hidden="true" className="text-base leading-none">
            {item.icon}
          </span>
          {item.label}
        </button>
      ))}
    </nav>
  )
}
