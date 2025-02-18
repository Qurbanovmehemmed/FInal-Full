import React from "react";
import Hero from "../components/hero/Hero";
import Mens from "../components/mens/Mens";
import Romance from "../components/romancebook/Romance";
import Fantasy from "../components/fantasy/Fantasy";
import Horror from "../components/Horror/Horror";
import Mystery from "../components/Mystery/Mystery";
import Releated from "../components/Releated/Releated";
import NewReleases from "../components/newReleases/NewReleases";

const Home = () => {
  return (
    <div>
      <Hero />
    <Releated/>
    <Fantasy/>
    <Horror/>
    <Romance/>
    <Mystery/>
    <NewReleases/>
    </div>
  );
};

export default Home;
