import ExperienceCard from "./cards/ExperienceCard";
import sampleImage from "../../../../public/image.png";

export default function Experiences() {
  return (
    <section id="experiences" className="hero flex flex-col text-3xl w-full h-auto items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Experiences
        </h1>
        <p className="text-xs lg:text-lg max-w-prose">
          Here’s a showcase of the experiences that shaped my journey
        </p>
        <div className="w-full mt-8">
          <ExperienceCard
            title="Experience Title"
            description="Description here: Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. "
            date="2022 - Present"
            badges={["Next.js", "TailwindCSS", "DaisyUI", "blablabla"]}
          />
        </div>
      </div>
    </section>
  );
}