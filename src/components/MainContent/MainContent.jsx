import { Switch, Route, useLocation } from "wouter";
import { ExploreContainter } from "../ExploreContainter/ExploreContainter";
import { PostList } from "../PostList/PostList";
import { Sidebar } from "../Sidebar/Sidebar";
import { ProfileContainer } from "../ProfileContainer/ProfileContainer";
import { PostInfoContainer } from "../PostInfoContainer/PostInfoContainer";
import { LandingPage } from "../LandingPage/LandingPage";
import { useAuth } from "../../context/AuthUserContext";

export const MainContent = () => {
  const [location, _] = useLocation();
  const { user } = useAuth();

  return (
    <>
      {user || location === "/login" || location === "/register" ? (
        <div>
          <Sidebar />
          <main className="flex-1 sm:pl-[20rem] pb-[4rem] ">
            <Switch>
              <Route path="/profile/:id" component={ProfileContainer} />
              <Route path="/" component={PostList} />
              <Route path="/explore" component={ExploreContainter} />
              <Route path="/post/:id" component={PostInfoContainer} />
            </Switch>
            {location === "/" && <Sidebar position="right" />}
          </main>
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  );
};
