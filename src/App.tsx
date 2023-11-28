import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
