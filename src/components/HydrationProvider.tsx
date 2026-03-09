"use client";
import React, {useState, useEffect} from "react";

export default function HydrationProvider({children}: {children: React.ReactNode}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return children;
}
