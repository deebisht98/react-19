import "./styles.css";
import FormHook from "./FormHook";
import FormReact from "./FormReact";
import Combined from "./Combined";
import Theme from "./Theme";
import FetchJoke from "./FetchJoke";
import Message from "./Message";

export default function App() {
  return (
    <div className="App">
      <FormHook />
      <FormReact />
      <Combined />
      <Theme />
      <FetchJoke />
      <Message />
    </div>
  );
}
