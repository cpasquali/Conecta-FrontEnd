import { Switch, Route, useLocation } from "wouter";
import { ExploreContainter } from "../ExploreContainter/ExploreContainter";
import { PostList } from "../PostList/PostList";
import { Sidebar } from "../Sidebar/Sidebar";
import { ProfileContainer } from "../ProfileContainer/ProfileContainer";
import { PostInfoContainer } from "../PostInfoContainer/PostInfoContainer";
import { WelcomePage } from "../WelcomePage/WelcomePage";
import { useAuth } from "../../context/AuthUserContext";
import { useEffect } from "react";
import { MobileNavbar } from "../MobileNavbar/MobileNavbar";

export const MainContent = () => {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    user ? setLocation("/") : setLocation("welcome");
  }, [user]);

  return (
    <>
      {user || location === "/login" || location === "/register" ? (
        <div>
          <MobileNavbar />
          <Sidebar />
          <main className="sm:w-[44%] sm:justify-self-center">
            <Switch>
              <Route path="/" component={PostList} />
              <Route path="/explore" component={ExploreContainter} />
              <Route path="/post/:id" component={PostInfoContainer} />
              <Route path="/user/:username" component={ProfileContainer} />
            </Switch>
          </main>
          <Sidebar position="right" />
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
};
