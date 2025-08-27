import "./App.css";
import { MainContent } from "./components/MainContent/MainContent";
import { AuthUserProvider } from "./context/AuthUserContext";
import { PostContextProvider } from "./context/PostsContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="app">
      <AuthUserProvider>
        <PostContextProvider>
          <MainContent />
        </PostContextProvider>
      </AuthUserProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
