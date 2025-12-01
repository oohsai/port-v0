import cn from "@/libs/utils";
import React from "react";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl bg-white p-4 md:p-10 dark:bg-black",
        className,
      )}
    >
      {children}
    </div>
  );
}
