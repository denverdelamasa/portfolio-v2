import Image from "next/image";
import profile from "../../assets/profile.webp";

export default function ProfileCard() {

  return (
    <section id="profile" className="flex flex-col text-3xl h-full items-center justify-center align-middle gap-y-2 w-full p-4">
      <div className="rounded-lg m-auto card w-full md:max-w-128 xl:max-w-108 shadow-xl backdrop-blur-[2px] hover:backdrop-brightness-130 hover:backdrop-saturate-150 active:backdrop-brightness-130 active:backdrop-saturate-150 transform hover:-translate-y-1 active:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-in-out">
        <div className="relative mx-auto mt-8">
            <div className="avatar online">
                <div className="w-36 rounded-full">
                    <Image src={profile} alt="Profile Avatar" />
                </div>
            </div>
        </div>

        <div className="card-body items-center text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
                <h2 className="card-title font-bold text-2xl">Denver Dela Masa</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-1">
              <div className="badge badge-sm mb-4 badge-success">
                <i className="bi bi-code-slash"></i>
                Web Dev
                </div>
              <div className="badge badge-sm mb-4 badge-success">
                <i className="bi bi-easel2"></i>
                Illustrator
              </div>
              <div className="badge badge-sm mb-4 badge-success">
                <i className="bi bi-motherboard"></i>
                Tech Support
              </div>
            </div>
            
            <p className="mb-4">
                Passionate about designing and building websites, creating illustrations, and providing tech support.
            </p>
            <div className="card-actions justify-center mb-4 w-full">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-sm w-full rounded-lg px-6 hover:scale-105 ease-in-out transition-all duration-200"
              >
                <i className="bi bi-file-earmark-richtext"></i>
                My Resume
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a className="btn btn-xs btn-outline" href="https://www.instagram.com/wanedanvers/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
                Instagram
              </a>
              <a className="btn btn-xs btn-outline" href="https://www.linkedin.com/in/denverdelamasa/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
                LinkedIn
              </a>
              <a className="btn btn-xs btn-outline tooltip" href="mailto:denver.delamasa@gmail.com" target="_blank" rel="noopener noreferrer">
                  <div className="tooltip-content">
                    <div className="animate-bounce text-green-400 text-xs font-black">denver.delamasa@gmail.com!</div>
                  </div>
                <i className="bi bi-envelope-at"></i>
                Email
              </a>
              <a className="btn btn-xs btn-outline" href="https://uiverse.io/profile/denverdelamasa" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-link-45deg"></i>
                uiverse
              </a>
              <a className="btn btn-xs btn-outline" href="https://github.com/denverdelamasa" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
                Github
              </a>
              <a className="btn btn-xs btn-outline" href="https://codepen.io/denverdelamasa" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-code-square"></i>
                Codepen
              </a>
              <a className="btn btn-xs btn-outline" href="https://www.cosmos.so/wyane" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-file-earmark-easel"></i>
                Cosmos
              </a>
              <a className="btn btn-xs btn-outline" href="https://stackoverflow.com/users/31616268/wyane" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-stack-overflow"></i>
                Stack overflow
              </a>
            </div>
        </div>
      </div>
    </section>
  );
}