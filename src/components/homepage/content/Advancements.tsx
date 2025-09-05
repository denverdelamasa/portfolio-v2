import AdvancementCard from "./cards/AdvancementCard";
import sampleImage from "../../../../public/image.png";

export default function Contributing() {
  return (
    <section id="advancements" className="hero flex flex-col text-3xl w-full min-h-[100vh] items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <h1 className="text-5xl lg:text-6xl font-bold">
          Learning & Contributing
        </h1>
        <p className="text-xs lg:text-lg max-w-prose">
          A peek at the projects and what I am tackling as I keep learning and growing, and what I am up to recently
        </p>
          <AdvancementCard
            title="freecodecamp.org - Responsive Web Design Certification"
            description="Currently working on how to further improve my CSS knowledge by revisiting the fundamentals of creating classic HTML5 website"
            imageUrl={sampleImage}
            dateStarted="Started at July 2025"
          />
          <AdvancementCard
            title="KodeKloud - Docker Training Course for the Absolute Beginners"
            description="Trying to learn more about DevOps and to understand it's principles out of curiosity starting with Docker. But I realized how it is important in modern software development and operations teams."
            imageUrl={sampleImage}
            dateStarted="Started at July 2025"
          />
          <AdvancementCard
            title="Three.js - 3D Programming with JavaScript"
            description="Learning the basics of 3D programming with JavaScript and Three.js library. I am fascinated by 3D graphics and want to explore how to create interactive 3D experiences on the web. Could be useful in the future."
            imageUrl={sampleImage}
            dateStarted="Started at Sept 2025"
          />
      </div>
    </section>
  );
}