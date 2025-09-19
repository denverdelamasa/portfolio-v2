"use client";
import ContributionGraph from "./cards/ContributionGraph";

export default function GitHubContributions() {
  return (
    <section id="github-contributions" className="hero flex flex-col text-3xl w-full h-auto items-start px-4">
      <div className="hero-content flex flex-col mb-4 items-start text-start w-full h-full">
        <div className="divider mb-2 mt-12">
            <p className="text-xl font-bold items-center align-middle flex flex-row gap-x-2">
                <i className="bi bi-body-text"></i>
                GitHub Activity
            </p>
        </div>
        <div className="w-full h-full">
            <ContributionGraph />
        </div>
      </div>
    </section>
  );
}