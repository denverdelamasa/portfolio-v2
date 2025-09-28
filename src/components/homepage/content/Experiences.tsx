import ExperienceCard from "./cards/ExperienceCard";

export default function Experiences() {
  return (
    <section id="experiences" className="hero flex flex-col text-3xl w-full h-fit items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <div className="divider mb-2 mt-12">
          <p className="text-xl font-bold items-center align-middle flex flex-row gap-x-2">
            <i className="bi bi-person-workspace"></i>
            My relevant experiences
          </p>
        </div>
        <div className="grid grid-cols-1 w-full mt-8 gap-y-18">
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