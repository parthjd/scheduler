import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setHistory(prev => [...prev, mode]);
      setMode(newMode);
    }
  }
  function back() {
    setMode(history.slice(-1)[0]);
    setHistory(prev => prev.slice(0, -1));
  }
  return { mode, transition, back };
}
