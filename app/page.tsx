'use client';

import { useAppDispatch,useAppSelector } from "@/src/redux/hooks";
import { toggleTheme } from "@/src/redux/slice/theme";

export default function Home(){
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  return (
    <main>
      <h1>Welcome to Next.js 13!</h1>
      <p>This is the home page.</p>
      <p>Current theme: {theme.mode}</p>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
    </main>
  );
}