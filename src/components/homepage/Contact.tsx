import ContactForm from "./contact/ContactForm";

export default function Contact() {
  return (
    <div id="contact" className="hero h-fit w-full">
      <div className="hero-content text-center flex flex-col md:flex-row gap-10 w-full h-fit">
        <div className="w-full md:w-1/2 text-left items-left justify-left align-middle">
          <h1 className="mt-24 lg:mt-auto text-7xl md:text-8xl font-bold mb-4">
            Let&apos;s work <span className="hover:text-red-500 font-thin hover:font-extrabold transition-all duration-200 ease-in">together</span>!
          </h1>
          <p className="text-sm lg:text-lg lg:max-w-lg font-thin mb-2">
            Interested in working together? I&apos;m looking for opportunities to join a team and grow—let’s connect!
          </p>
        </div>
        <div className="w-full md:w-1/2 items-center justify-center align-middle">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
