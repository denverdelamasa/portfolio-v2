import ProfileCard from "@/components/homepage/ProfileCard";
import Content from "@/components/homepage/Content";
import Contact from "@/components/homepage/Contact";

export default function Home() {
  return (
    <main className="px-12">
      <section className="flex h-[90vh] text-7xl w-full border-5 border-accent text-center justify-center items-center">
        Hero section
      </section>
      <section className="flex flex-row gap-x-2">
        <aside className="w-2/5 sticky top-0 h-[100vh]">
          <ProfileCard />
        </aside>
        <section className="w-3/5">
          <Content />
        </section>
      </section>
      <section className="flex h-[100vh] text-7xl w-full border-5 border-accent text-center justify-center items-center">
        <Contact />
      </section>
    </main>
  );
}

// Using vh to the pages allows me to make the pages "take 
// the space" of the screen no matter what size...

// tho I'm gonna polish it for phone screens maybe 
// tommorrow... 