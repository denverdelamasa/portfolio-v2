import Image from "next/image";
import profile from "../../assets/profile.webp";

export default function ProfileCard() {

  return (
    <section id="profile" className="flex flex-col text-3xl h-full items-center justify-start gap-y-2">
      <div className="m-auto card w-76 lg:w-92 shadow-xl bg-base-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <figure className="pt-4 px-4">
            <div className="w-full h-32 bg-gradient-to-r from-primary to-warning rounded-t-xl"></div>
        </figure>
        
        <div className="relative -mt-15 mx-auto">
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
            <div className="flex flex-wrap justify-center gap-2">
              <div className="badge badge-sm mb-4 badge-neutral">Web Dev</div>
              <div className="badge badge-sm mb-4 badge-neutral">Illustrator</div>
              <div className="badge badge-sm mb-4 badge-neutral">Tech Support</div>
            </div>
            
            <p className="mb-4">
                Passionate about designing and building websites, creating illustrations, and providing tech support.
            </p>

            <div className="card-actions justify-center mb-4 w-full">
                <button className="btn btn-primary btn-sm w-full rounded-lg px-6">
                  Resume
                </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="btn btn-xs btn-outline">
                Instagram</div>
              <div className="btn btn-xs btn-outline">LinkedIn</div>
              <div className="btn btn-xs btn-outline">Email</div>
              <div className="btn btn-xs btn-outline">uiverse</div>
              <div className="btn btn-xs btn-outline">Github</div>
            </div>
        </div>
      </div>
    </section>
  );
}