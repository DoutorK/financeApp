type FabButtonProps = {
  label: string
}

export function FabButton({ label }: FabButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-20 grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-3xl text-white shadow-fab-lg"
    >
      +
    </button>
  )
}
