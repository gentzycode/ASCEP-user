import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster";
import AppProvider from "./contexts/AppContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </AppProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
