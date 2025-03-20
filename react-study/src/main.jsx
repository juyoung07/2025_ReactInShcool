import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PropsStudy from "./PropsStudy.jsx";
import UserInfo from "./UserInfo.jsx";

// index.html의 div 아이디를 찾아서 랜더링
const root = createRoot(document.getElementById("root"));

// root.render(<App />);
// root.render(<PropsStudy hello="world" mynum={100} obj={[1, 2, 3]} />);
root.render(<UserInfo name="John" age={20} />);
