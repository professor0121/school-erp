"use client";
import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchSession } from "@/src/redux/slice/authSlice";
import { AppDispatch } from "@/src/redux/store";

export default function HydrationProvider({children}: {children: React.ReactNode}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsHydrated(true);
    dispatch(fetchSession());
  }, [dispatch]);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}
