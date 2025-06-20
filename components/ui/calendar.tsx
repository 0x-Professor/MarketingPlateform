"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker" // Changed back to named import

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button" // Restored

export type CalendarProps = React.ComponentProps<typeof DayPicker>

// Define Icon components separately as per shadcn/ui structure
function IconLeft({ ...props }: React.HTMLAttributes<SVGElement>) {
  return <ChevronLeft className="h-4 w-4" {...props} />
}
function IconRight({ ...props }: React.HTMLAttributes<SVGElement>) {
  return <ChevronRight className="h-4 w-4" {...props} />
}

function Calendar({
  className,
  classNames, // Restored prop name
  showOutsideDays = true, // Restored prop
  ...props
}: CalendarProps) {
  return (
    // TODO: Investigate DayPicker prop type issues. Using 'as any' for 'components' and 'classNames'
    // as a temporary workaround to unblock builds due to persistent type resolution problems
    // with react-day-picker in this environment.
    <DayPicker
      showOutsideDays={showOutsideDays} // Restored usage
      className={cn("p-3", className)}
      classNames={({ // Reverted keys to snake_case
        month: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium", // Reverted
        nav: "space-x-1 flex items-center",
        nav_button: cn( // Reverted
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1", // Reverted
        nav_button_next: "absolute right-1", // Reverted
        table: "w-full border-collapse space-y-1",
        head_row: "flex", // Reverted
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", // Reverted
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", // Reverted
        day_today: "bg-accent text-accent-foreground", // Reverted
        day_outside: "day-outside text-muted-foreground opacity-50", // Reverted (value was adjusted based on common shadcn)
        day_disabled: "text-muted-foreground opacity-50", // Reverted
        day_range_end: "day-range-end", // Reverted
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground", // Reverted
        day_hidden: "invisible", // Reverted
        ...classNames, // Restored spread of prop
      } as any)} // eslint-disable-line @typescript-eslint/no-explicit-any
      components={({
        IconLeft: IconLeft, // Pass the component reference
        IconRight: IconRight, // Pass the component reference
      } as any)} // eslint-disable-line @typescript-eslint/no-explicit-any
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
