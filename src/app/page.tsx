import ProfileCard from "@/components/homepage/ProfileCard";
import Content from "@/components/homepage/Content";
import Contact from "@/components/homepage/Contact";
import Hero from "@/components/homepage/Hero";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full">
      <section className="flex h-[90vh] w-full text-center justify-center items-center">
        <Hero />
      </section>
      <section className="flex flex-col lg:flex-row gap-x-2 pt-12">
        <aside className="w-full lg:w-2/5 lg:sticky lg:top-0 h-auto lg:h-[100vh]">
          <ProfileCard />
        </aside>
        <section className="w-full lg:w-3/5">
          <Content />
        </section>
      </section>
      <section className="flex h-[100vh] text-7xl w-full text-center justify-center items-center">
        <Contact />
      </section>
    </main>
  );
}

// Using vh to the pages allows me to make the pages "take 
// the space" of the screen no matter what size...

// tho I'm gonna polish it for phone screens maybe 
// tommorrow... 