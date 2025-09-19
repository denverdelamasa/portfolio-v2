import Projects from "./content/Projects";
import Experiences from "./content/Experiences";
import Advancements from "./content/Advancements";
import GithubContributions from "./content/GitHubContributions";

export default function Content() {
  return (
    <section className="flex flex-col max-w-3xl mx-auto w-full">
          <div className="divider md:hidden px-8 pt-12 my-8"></div>
        <Projects />
        <Experiences />
        <Advancements />
        <GithubContributions />
    </section>
  );
}