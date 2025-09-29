import ProfileCard from "@/components/homepage/ProfileCard";
import Content from "@/components/homepage/Content";
import Contact from "@/components/homepage/Contact";
import Hero from "@/components/homepage/Hero";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full overflow-x-hidden md:overflow-x-visible">
      <section className="flex h-[100vh] w-full text-center justify-center items-center z-1">
        <Hero />
      </section>
      <section className="pattern-styled">
        <div className="flex flex-col lg:flex-row gap-x-2 pt-12 2xl:px-48">
          <aside className="w-full lg:w-6/15 lg:sticky lg:top-0 h-fit lg:h-[100vh]">
            <ProfileCard />
          </aside>
          <section className="w-full lg:w-9/15">
            <Content />
          </section>
        </div>

        <div className="flex h-fit w-full text-center justify-center items-center">
          <Contact />
        </div>
      </section>
    </main>
  );
}

// Using vh to the pages allows me to make the pages "take 
// the space" of the screen no matter what size...

// tho I'm gonna polish it for phone screens maybe 
// tommorrow... 