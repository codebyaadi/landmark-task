import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Container from "./components/cards/card-container";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container />
    </QueryClientProvider>
  );
}

export default App;
