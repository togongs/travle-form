import "./App.css";
import ThemeProvider from "./components/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import { FormScreen } from "./pages/form/FormScreen";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<FormScreen />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
