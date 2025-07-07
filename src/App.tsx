import "./styles/theme.css";
import "./styles/global.css";

import { TaskContextProvider } from "./templates/contexts/TaskContext";
import Home from "./pages/Home";

function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}

export default App;
