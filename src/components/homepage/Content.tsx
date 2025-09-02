import Projects from "./content/Projects";
import Experiences from "./content/Experiences";
import Advancements from "./content/Advancements";

export default function Content() {
  return (
    <section className="flex flex-col">
        <Projects />
        <Experiences />
        <Advancements />
    </section>
  );
}