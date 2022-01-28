import { last } from "lodash";
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(mode, replace = false) {
    if(replace) {
      let currHistory = history;
      // const currMode = history[history.length - 1];
      currHistory[currHistory.length -1] = mode
      setHistory(currHistory) 
      setMode(mode); 
    }
   else {
    setHistory([...history, mode])
    setMode(mode);
   }
  }

  function back() {
    // remove last element from history array
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else {
      return;
    }
  }

  return { mode, transition, back };
}
