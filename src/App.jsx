import { ToastContainer } from "react-toastify";
import "./App.css";
import { MainContent } from "./components/MainContent/MainContent";
import { AuthUserProvider } from "./context/AuthUserContext";
import { PostContextProvider } from "./context/PostsContext";

function App() {
  return (
    <div className="app">
      <AuthUserProvider>
        <PostContextProvider>
          <MainContent />
        </PostContextProvider>
      </AuthUserProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
