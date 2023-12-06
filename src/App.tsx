import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
