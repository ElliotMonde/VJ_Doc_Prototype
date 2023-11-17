import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scroll() {
  const main = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const boxes = self.selector(".box");
      boxes.forEach((box) => {
        gsap.to(box, {
          opacity: 1,
          duration: 0.01,
          scrollTrigger: {
            pin: true,
            markers: true,
            trigger: box,
            start: "center center",
            end: "center -20",
            scrub: true,

            onLeave: () => gsap.to(box, { opacity: 0, duration: 0}),
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
      <div className="section flex-center column" ref={main}>
        <div id="box1" className="box">
          box
        </div>
        <div id="box2" className="box">
          box
        </div>
        <div id="box3" className="box">
          box
        </div>
      </div>
      <section className="section"></section>
    </div>
  );
}
