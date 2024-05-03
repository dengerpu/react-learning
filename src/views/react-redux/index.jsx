import store from "./store";
import Vote from "./Vote";
import { Provider }  from "react-redux";

export default function Context() {
  return (
    <Provider store={store}>
        <Vote />
    </Provider>
  );
}