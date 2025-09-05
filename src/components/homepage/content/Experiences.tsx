import ExperienceCard from "./cards/ExperienceCard";
import sampleImage from "../../../../public/image.png";

export default function Experiences() {
  return (
    <section id="experiences" className="hero flex flex-col text-3xl w-full min-h-[100vh] items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <h1 className="text-5xl lg:text-6xl font-bold">
          Experiences
        </h1>
        <p className="text-xs lg:text-lg max-w-prose">
          Here’s a showcase of the experiences that shaped my journey
        </p>
        <div className="w-full mt-8">
          <ExperienceCard
            title="Internship | DENR PENRO - IT department"
            description="During my On-the-Job Training (OJT), I was assigned as an IT intern at the Department of Environment and Natural Resources – Provincial Environment and Natural Resources Office (DENR-PENRO) Bulacan. My role was fairly dynamic, assisting with both technical and administrative IT tasks."
            date="Sept 2024 - Jan 2025"
            badges={["PC Repair", "Tech Support", "PMS", "Server", "Maintenance", "Documentation"]}
          />
          <ExperienceCard
            title="Technical Team | Bethany United Methodist Church"
            description="Currently working as a volunteer in the technical team of Bethany United Methodist Church, where I help with the technical aspects of the church's services, including sound and video production."
            date="Aug 2024 - Present"
            badges={["IT Service", "AV Operation", "Teamwork", "Volunteering"]}
          />
        </div>
      </div>
    </section>
  );
}