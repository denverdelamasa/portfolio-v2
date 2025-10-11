export default function CurrentWork() {
  return (
    <section id="experiences" className="hero flex flex-col text-3xl w-full h-fit items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start">
        <div className="divider mb-2 mt-12">
          <p className="text-xl font-bold items-center align-middle flex flex-row gap-x-2">
            <i className="bi bi-person-workspace"></i>
            Where I work at!
          </p>
        </div>
        <div className="grid grid-cols-1 w-full mt-8 gap-y-18">
            <div className="flex flex-col md:flex-row backdrop-blur-[2px] hover:backdrop-brightness-130 hover:backdrop-saturate-150 active:backdrop-brightness-130 active:backdrop-saturate-150 transform hover:-translate-y-1 active:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-xl rounded-xl">
            <div className="p-8 justify-center overflow-hidden align-top hidden md:block md:w-3/10">
                <p className="align-top text-xs mt-1 top-0">Oct 13, 2025 - Present</p>
            </div>
            <div className="card-body md:w-7/10">
                <h2 className="card-title text-xl">
                    JRS Computer House
                </h2>
                <p className="align-top text-xs mt-1 top-0 block md:hidden w-6/8">Oct 13, 2025 - Present</p>  
                <p className="text-sm text-base-content/80 max-w-prose">
                    Currently working as a trainee at JRS Computer House, I handle a 
                    variety of tasks while working toward my Computer Systems Servicing NC II 
                    certification under TESDA.
                </p>
                <div className="flex flex-wrap gap-2 mt-2 max-w-prose">
                    <div className="badge badge-success badge-sm">Technical Staff</div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}