import React from "react";
import { useParallax } from "react-scroll-parallax";

const Home = () => {

  const parallax1 = useParallax<HTMLDivElement>({
    // translateY: [0, -10],
    translateX: [-20, 20],
  });
  const parallax2 = useParallax<HTMLDivElement>({
    // translateY: [0, -10],
    translateX: [0, 0],
  });
  const parallax3 = useParallax<HTMLDivElement>({
    // translateY: [0, -10],
    translateX: [5, -20],
  });
  return (
    <div className="center title-cont" >
      <div className="title tag1 oswald-title" ref={parallax1.ref}>
        Noteworthy Alerts&nbsp;&nbsp;<i className="fa-solid fa-circle-right fa-sm"></i>
      </div>
      <div className="title tag2 oswald-title" ref={parallax2.ref}>
        Noteworthy Planner&nbsp;
      </div>
      <div className="title tag3 oswald-title" ref={parallax3.ref}>
        <i className="fa-solid fa-circle-left fa-sm"></i> &nbsp;&nbsp;Noteworthy Tracker
      </div>
    </div>
  );
};

export default Home;
