import ThemeContext from "../../ThemeContext";
import store from "./store";
import Vote from "./Vote";

export default function Context() {
  return (
    <ThemeContext.Provider value={{store}}>
        <Vote />
    </ThemeContext.Provider>
  );
}