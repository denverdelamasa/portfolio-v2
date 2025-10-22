import ProjectCard from "./cards/ProjectCard";
import mern from "../../../assets/projects/mern.webp";
import capstone from "../../../assets/projects/capstone.webp";
import webportfolio from "../../../assets/projects/webportfolio.webp";
import gitcardz from "../../../assets/projects/gitcardz.png";
import blackhole from "../../../assets/projects/blackhole.png";
import blog from "../../../assets/projects/blog.png";

export default function Projects() {
  return (
    <section id="projects" className="hero flex flex-col text-3xl w-full h-fit items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <div className="divider mb-2 mt-12">
          <p className="text-xl font-bold items-center align-middle flex flex-row gap-x-2">
            <i className="bi bi-journal-code"></i>
            Projects I&apos;ve worked on
          </p>
        </div>
        <div className="grid grid-cols-1 w-full mt-8 gap-y-18">
          <ProjectCard
            title="Blog Site - where I can post my learnings in Detail"
            description="For the past month I have dramatically improved my web design skills, and so i wanted it to apply it in a project. I am currently working on building a blog site where I can share my knowledge and experiences with others. This will also help me to improve my writing skills and to document my learning journey."
            imageUrl={blog}
            badges={[ "Blog", "3D", "Next", "Design", "Spline" ]}
            buttonText="View Site"
            buttonLink="https://blog-denverdelamasa.vercel.app"
          />
          <ProjectCard
            title="BlackHole 3D - made using Spline and React"
            description="A 3D website made using Spline and React. It features a blackhole you can interact with. This was my first time using Spline and it gave me a new perspective on how to make 3D websites."
            imageUrl={blackhole}
            badges={[ "Spline", "3D", "React", "Vite" ]}
            buttonText="View Site"
            buttonLink="https://blackhole-wyane.vercel.app"
          />
          <ProjectCard
            title="GitCardz - custom Tailwind card collaborative wall"
            description="A fun, community-driven project where anyone can add their own profile card styled with Tailwind CSS. Think of it as a giant deck of cards — each one contributed by people from around the world."
            imageUrl={gitcardz}
            badges={["HTML", "Javascript", "TailwindCSS", "JSON", "GitHub"]}
            buttonText="View Repository"
            buttonLink="hhttps://github.com/denverdelamasa/GitCardz"
          />
          <ProjectCard
            title="Web Portfolio | (Previous Version)"
            description="My previous web portfolio which I made using React and TailwindCSS. This really enhanced my skills in terms of building, and designing a website as a whole."
            imageUrl={webportfolio}
            badges={["React", "TailwindCSS", "Vite", "Vite", "GitHub"]}
            buttonText="View Site"
            buttonLink="https://v1-denverdelamasa.vercel.app/"
          />
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
        </div>
      </div>
    </section>
  );
}