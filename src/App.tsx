import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster";
import AppProvider from "./contexts/AppContext";
import { APIProvider } from "@vis.gl/react-google-maps";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey={""}>
        <AppProvider>
          <BrowserRouter>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </BrowserRouter>
        </AppProvider>
        <Toaster />
      </APIProvider>
    </QueryClientProvider>
  );
}

export default App;
