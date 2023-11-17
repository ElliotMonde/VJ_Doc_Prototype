import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Scroll() {
  const main = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const boxes = self.selector(".box");
      gsap.to("#corkboard_section", {
        scrollTrigger: {
          pin: true,
          markers: true,
          trigger: "#corkboard_section",
          start: "center center",
          end: "bottom -200vh",
        }
      });
      boxes.forEach((box) => {
        gsap.from(box, {
          ease: "out ",
          scrollTrigger: {
            
            pin: true,
            markers: true,
            trigger: box,
            start: "center center",
            end: "bottom -20",
            onEnter: () => gsap.to(box, { opacity: 1 }),
            onLeave: () => gsap.to(box, { opacity: 0, ease: "0.01" }),
            scrub: true,
          },
        });
      });
    }, main); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);

  return (
    <div>
      <section className="section flex-center column">
        <h1>Basic ScrollTrigger with React</h1>
        <h2>Scroll down to see the magic happen!!</h2>
      </section>
      <div id="corkboard_section" className="section flex-center column" ref={main}>
        <div id="box1" className="box">
          <img
            alt="note paper with text"
            src={require("../assets/torn_3.png")}
          ></img>
          <p>lorem ipsum</p>
        </div>
        <div id="box2" className="box">
          <img
            alt="note paper with text"
            src={require("../assets/torn_3.png")}
          ></img>
          <p>Hello World!</p>
        </div>
        <div id="box3" className="box">
          <img
            alt="note paper with text"
            src={require("../assets/torn_3.png")}
          ></img>
          <p>Ipsum Dolor Sit Amet</p>
        </div>
      </div>


      <section className="section"></section>
    </div>
  );
}
