import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "components/Header";
import { AuthContextProvider } from "context/AuthContext";
import { Outlet } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
