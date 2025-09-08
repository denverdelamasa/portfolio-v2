export default function ContactForm() {
  return (
    <div className="contact-form w-full md:max-w-xl m-auto">
      <div className="card backdrop-blur-xs shadow-lg rounded-2xl overflow-hidden p-8 hover:scale-102 hover:bg-base-100 transition-all duration-200 ease-in-out">
          <form className="flex flex-col gap-y-5 m-auto w-full items-center align-middle justify-center">

            <div className="form-control flex flex-col w-full">
              <label className="label pb-2" htmlFor="name">
                <span className="label-text text-xs">Full Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Alex Johnson"
                className="input input-bordered transition duration-200 py-3 px-4 rounded-xl w-full"
                required
              />
            </div>

            <div className="form-control flex flex-col w-full">
              <label className="label pb-2" htmlFor="email">
                <span className="label-text text-sm">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. alex@example.com"
                className="input input-bordered transition duration-200 py-3 px-4 rounded-xl w-full"
                required
              />
            </div>

            <div className="form-control flex flex-col w-full">
              <label className="label pb-2" htmlFor="message">
                <span className="label-text text-sm">Message</span>
              </label>
              <textarea
                id="message"
                className="textarea textarea-bordered transition duration-200 py-3 px-4 w-full min-h-40"
                placeholder="Write your message here..."
                required
              />
            </div>

            <div className="form-control w-full mt-4">
              <button 
                type="submit" 
                className="btn btn-primary btn-wide py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}