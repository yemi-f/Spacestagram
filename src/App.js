import "./App.css";
import ImagesGrid from "./components/ImagesGrid";
import { Container, Navbar } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar bg="white border-bottom" fixed="top">
        <Container className="px-md-0" style={{ maxWidth: "30rem" }}>
          <Navbar.Brand href="/" className="fw-bold">
            Spacestagram
          </Navbar.Brand>
        </Container>
      </Navbar>
      <ImagesGrid />
    </QueryClientProvider>
  );
}

export default App;
