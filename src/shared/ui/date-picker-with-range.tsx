"use client";

import { cn } from "@/lib/utils";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

export type DateRangeValue = { from?: Date; to?: Date };

interface DatePickerWithRangeProps {
  value: DateRangeValue | undefined;
  onChange: (value: DateRangeValue | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({ value, onChange, className }: DatePickerWithRangeProps) {
  const pickerValue: [Dayjs, Dayjs] | null =
    value?.from && value?.to ? [dayjs(value.from), dayjs(value.to)] : null;

  return (
    <DatePicker.RangePicker
      value={pickerValue}
      onChange={(dates) => {
        if (!dates || !dates[0] || !dates[1]) {
          onChange(undefined);
          return;
        }
        onChange({ from: dates[0].toDate(), to: dates[1].toDate() });
      }}
      format="DD/MM/YYYY"
      size="small"
      placeholder={["Data inicial", "Data final"]}
      className={cn("!h-7 !w-full sm:!w-auto", className)}
      allowClear
    />
  );
}
