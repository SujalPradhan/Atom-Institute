import { cn } from "@/lib/utils"

export function AtomMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 168 168"
      aria-hidden="true"
      className={cn("shrink-0 text-[#0B3A66] dark:text-[#C9D8F0]", className)}
    >
      <g fill="none" stroke="currentColor" strokeWidth="3.5">
        <ellipse cx="84" cy="84" rx="28" ry="76" />
        <ellipse cx="84" cy="84" rx="28" ry="76" transform="rotate(60 84 84)" />
        <ellipse cx="84" cy="84" rx="28" ry="76" transform="rotate(-60 84 84)" />
      </g>
      <g fill="#E95534">
        <circle cx="84.3" cy="84.8" r="14.8" />
        <circle cx="128" cy="38.7" r="6" />
        <circle cx="21.5" cy="64.7" r="6" />
        <circle cx="99.5" cy="149.2" r="6.5" />
      </g>
    </svg>
  )
}
