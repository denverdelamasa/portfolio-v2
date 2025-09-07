import ProjectCard from "./cards/ProjectCard";
import mern from "../../../assets/projects/mern.webp";
import capstone from "../../../assets/projects/capstone.webp";
import webportfolio from "../../../assets/projects/webportfolio.webp";

export default function Projects() {
  return (
    <section id="projects" className="hero flex flex-col text-3xl w-full min-h-[100vh] items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <div className="divider mb-2 mt-12">
          <p className="text-xl font-bold items-center align-middle flex flex-row gap-x-2">
            <i className="bi bi-journal-code"></i>
            Projects I&apos;ve worked on
          </p>
        </div>
        <div className="grid grid-cols-1 w-full mt-8 gap-y-18">
          <ProjectCard
            title="MERN stack project | Open source template"
            description="A simple MERN (MongoDB, Express, React, Node.js) starter project with authentication. It provides essential building blocks for a login/signup system so that people can quickly build it to a full blown app."
            imageUrl={mern}
            badges={["MongoDB", "Express", "React", "Node.js", "Bootstrap"]}
            buttonText="View Repository"
            buttonLink="https://github.com/denverdelamasa/mern-stack"
          />
          <ProjectCard
            title="Capstone Project - Paws'N Claws | (Archived)"
            description="My College thesis whom I've worked with four other people. My role mostly revolved around Front-End design and development, and technical writing."
            imageUrl={capstone}
            badges={["Laravel", "php", "Vue", "Blade", "TailwindCSS", "XAMPP", "MySQL", "Git", "DaisyUI"]}
            buttonText="View Repository"
            buttonLink="https://github.com/denverdelamasa/PawsNClaws-archive"
          />
          <ProjectCard
            title="Web Portfolio | (Previous Version)"
            description="My previous web portfolio which I made using React and TailwindCSS. This really enhanced my skills in terms of building, and designing a website as a whole."
            imageUrl={webportfolio}
            badges={["React", "TailwindCSS", "Vite", "Vite", "GitHub"]}
            buttonText="View Site"
            buttonLink="https://v1-denverdelamasa.vercel.app/"
          />
        </div>
      </div>
    </section>
  );
}