import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./reset.css"; // ts에선 에러가 남 (import는 객체 등을 가져오는 것이기 때문.)

createRoot(document.getElementById("root")).render(<App />);
