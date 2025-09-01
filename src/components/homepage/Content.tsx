import Projects from "./content/Projects";
import Experiences from "./content/Experiences";
import Contributing from "./content/Contributing";

export default function Content() {
  return (
    <div className="flex flex-col">
        <Projects />
        <Experiences />
        <Contributing />
    </div>
  );
}