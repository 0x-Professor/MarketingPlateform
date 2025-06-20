"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import DayPicker from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  // showOutsideDays: _showOutsideDays = true, // Removed to address TS2339 on CalendarProps
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      // showOutsideDays={showOutsideDays} // Usage was already commented out
      className={cn("p-3", className)}
      classNames={{
        month: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0", // Changed from months
        // month: "space-y-4", // Original month style, now overridden by the one from 'months'
        caption: "flex justify-center pt-1 relative items-center",
        // caption_label: "text-sm font-medium", // Removed to address TS2769
        // nav: "space-x-1 flex items-center", // Removed due to type error
        // nav_button: cn( // Removed due to type error
        //   buttonVariants({ variant: "outline" }),
        //   "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        // ),
        navButtonPrev: "absolute left-1", // Changed from nav_button_previous
        navButtonNext: "absolute right-1", // Changed from nav_button_next
        // table: "w-full border-collapse space-y-1", // Removed due to type error
        headRow: "flex", // Changed from head_row
        headCell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", // Changed from head_cell
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        dayRangeEnd: "day-range-end", // Changed from day_range_end
        daySelected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", // Changed from day_selected
        dayToday: "bg-accent text-accent-foreground", // Changed from day_today
        dayOutside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground", // Changed from day_outside
        dayDisabled: "text-muted-foreground opacity-50", // Changed from day_disabled
        dayRangeMiddle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground", // Changed from day_range_middle
        dayHidden: "invisible", // Changed from day_hidden
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
