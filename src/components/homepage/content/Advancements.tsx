import AdvancementCard from "./cards/AdvancementCard";
import sampleImage from "../../../../public/image.png";

export default function Contributing() {
  return (
    <section id="advancements" className="hero flex flex-col text-3xl w-full min-h-[100vh] items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <h1 className="text-5xl lg:text-6xl font-bold">
          Learning & Contributing
        </h1>
        <p className="text-xs lg:text-lg max-w-prose">
          A peek at the projects and what I am tackling as I keep learning and growing, and what I am up to recently
        </p>
          <AdvancementCard
            title="Learning Title | Learning subtitle"
            description="Description here: Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. "
            imageUrl={sampleImage}
            badges={["Next.js", "TailwindCSS", "Vercel"]}
          />
      </div>
    </section>
  );
}