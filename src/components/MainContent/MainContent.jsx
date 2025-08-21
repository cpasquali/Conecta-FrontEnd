import { Switch, Route, useLocation } from "wouter";
import { ExploreContainter } from "../ExploreContainter/ExploreContainter";
import { PostList } from "../PostList/PostList";
import { Sidebar } from "../Sidebar/Sidebar";
import { ProfileContainer } from "../ProfileContainer/ProfileContainer";
import { PostInfoContainer } from "../PostInfoContainer/PostInfoContainer";
import { WelcomePage } from "../WelcomePage/WelcomePage";
import { useAuth } from "../../context/AuthUserContext";
import { useEffect } from "react";

export const MainContent = () => {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    user ? setLocation("/home") : setLocation("welcome");
  }, []);

  return (
    <>
      {user || location === "/login" || location === "/register" ? (
        <div>
          <Sidebar />
          <main className="flex-1 sm:pl-[20rem] pb-[4rem] ">
            <Switch>
              <Route path="/profile/:id" component={ProfileContainer} />
              <Route path="/home" component={PostList} />
              <Route path="/explore" component={ExploreContainter} />
              <Route path="/post/:id" component={PostInfoContainer} />
            </Switch>
            {location === "/home" && <Sidebar position="right" />}
          </main>
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
};
