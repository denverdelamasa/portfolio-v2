import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <div id="contact" className="hero h-full w-full">
      <div className="hero-content m-4 text-center flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 text-left items-left justify-left align-middle">
          <h1 className="text-5xl lg:text-8xl font-bold mb-2">
            Looking for a Commission?
          </h1>
          <p className="text-sm lg:text-xl lg:max-w-lg font-semibold mb-2">
            Whether it’s custom artwork, a one-page website, or tech support -- I’ve got you covered. Check out my services or reach out directly!          </p>
        </div>
        <div className="w-1/2 items-center justify-center align-middle">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}