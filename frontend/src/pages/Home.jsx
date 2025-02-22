import React from "react";
import Hero from "../components/hero/Hero";
import Romance from "../components/romancebook/Romance";
import Fantasy from "../components/fantasy/Fantasy";
import Horror from "../components/Horror/Horror";
import Mystery from "../components/Mystery/Mystery";
import Releated from "../components/Releated/Releated";
import NewReleases from "../components/newReleases/NewReleases";
import Drama from "../components/Drama/Drama";
import { useSelector } from "react-redux";

const Home = () => {
  const {user} = useSelector((state) => state.user);
  return (
    <div>
      <Hero />
   {user?.existUser && <Releated />}
    <Horror/>
    <Fantasy/>
    <Romance/>
    <Mystery/>
    <NewReleases/>
    <Drama/>
    </div>
  );
};

export default Home;
