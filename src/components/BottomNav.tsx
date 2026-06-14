type BottomNavItem = {
  label: string
  icon: string
  active: boolean
}

type BottomNavProps = {
  items: ReadonlyArray<BottomNavItem>
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-3 left-3 right-3 z-10 grid grid-cols-3 gap-2 rounded-[1.5rem] border border-outline-variant bg-surface-container/95 p-2 shadow-elevated backdrop-blur-xl"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          aria-current={item.active ? 'page' : undefined}
          className={[
            'flex flex-col items-center justify-center gap-1 rounded-[1.1rem] px-2 py-2 text-[0.72rem] font-medium transition-colors',
            item.active ? 'bg-brand-50 text-brand-900' : 'text-text-variant',
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
