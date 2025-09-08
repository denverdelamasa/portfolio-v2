import AdvancementCard from "./cards/AdvancementCard";
import freecodecamp from "../../../assets/advancements/freecodecamp.webp";
import kodekloud from "../../../assets/advancements/kodekloud.webp";
import threejs from "../../../assets/advancements/threejs.webp";

export default function Contributing() {
  return (
    <section id="advancements" className="hero flex flex-col text-3xl w-full min-h-[100vh] items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
          <div className="divider mb-2 mt-12">
            <p className="text-xl font-bold items-center align-middle flex flex-row gap-x-2">
              <i className="bi bi-ui-radios"></i>
              Progress & Growth
            </p>
          </div>
          <AdvancementCard
            title="freecodecamp.org - Responsive Web Design Certification"
            description="Currently working on how to further improve my CSS knowledge by revisiting the fundamentals of creating classic HTML5 website"
            imageUrl={freecodecamp}
            dateStarted="Started at July 2025"
          />
          <AdvancementCard
            title="KodeKloud - Docker Training Course for the Absolute Beginners"
            description="Trying to learn more about DevOps and to understand it's principles out of curiosity starting with Docker. But I realized how it is important in modern software development and operations teams."
            imageUrl={kodekloud}
            dateStarted="Started at July 2025"
          />
          <AdvancementCard
            title="Three.js - 3D Programming with JavaScript"
            description="Learning the basics of 3D programming with JavaScript and Three.js library. I am fascinated by 3D graphics and want to explore how to create interactive 3D experiences on the web. Could be useful in the future."
            imageUrl={threejs}
            dateStarted="Started at Sept 2025"
          />
      </div>
    </section>
  );
}