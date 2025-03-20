import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// index.html의 div 아이디를 찾아서 랜더링
createRoot(document.getElementById("root")).render(<App />);
