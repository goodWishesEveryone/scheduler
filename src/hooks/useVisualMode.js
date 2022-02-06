
// Custom Hook that allows us to manage the visual mode of any component; define the modes as constants in our component and then use the Hook to transition forward and back.

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  const [history, setHistory] = useState([initial]); 

  //////// --- transition --- ////////
  function transition(mode, replace = false) {
    if(replace) {
      let currHistory = history;
      currHistory[currHistory.length -1] = mode
      setHistory(currHistory) 
      setMode(mode); 
    }
   else {
    setHistory([...history, mode])
    setMode(mode);
   }
  }

  ////////// --- back --- //////////
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
