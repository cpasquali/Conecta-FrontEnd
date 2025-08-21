import { ToastContainer } from "react-toastify";
import "./App.css";
import { MainContent } from "./components/MainContent/MainContent";
import { MobileNavbar } from "./components/MobileNavbar/MobileNavbar";
import { AuthUserProvider } from "./context/AuthUserContext";
import { PostContextProvider } from "./context/PostsContext";

function App() {
  return (
    <div className="app">
      <AuthUserProvider>
        <PostContextProvider>
          <MobileNavbar />
          <MainContent />
        </PostContextProvider>
      </AuthUserProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
