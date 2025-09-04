import Projects from "./content/Projects";
import Experiences from "./content/Experiences";
import Advancements from "./content/Advancements";

export default function Content() {
  return (
    <section className="flex flex-col">
          <div className="divider md:hidden px-8 pt-12 my-8"></div>
        <Projects />
          <div className="divider px-8 my-8"></div>
        <Experiences />
          <div className="divider px-8 my-8"></div>
        <Advancements />
    </section>
  );
}