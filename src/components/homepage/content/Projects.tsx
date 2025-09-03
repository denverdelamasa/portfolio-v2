import ProjectCard from "./cards/ProjectCard";
import sampleImage from "../../../../public/image.png";

export default function Projects() {
  return (
    <section id="projects" className="hero flex flex-col text-3xl w-full h-auto items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Projects
        </h1>
        <p className="text-xs lg:text-lg max-w-prose">
          Here’s a showcase of the projects I did so far:
        </p>
        <div className="w-full mt-8">
          {/* 
            Last time I had a plan were I wanna use a .json file to contain all the data 
            but then I forgot about props... I'm kinda dummass
          */}
          <ProjectCard
            title="Project Title | Project subtitle"
            description="Description here: Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. "
            imageUrl={sampleImage}
            badges={["Next.js", "TailwindCSS", "DaisyUI", "blablabla"]}
            buttonText="View Project"
          />
        </div>
      </div>
    </section>
  );
}