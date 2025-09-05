import React from "react";
import Image, { StaticImageData } from "next/image";

type ExperienceCardProps = {
  title: string;
  description: string;
  date: string;
  badges?: string[];
  buttonText?: string;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  description,
  date,
  badges = [],
}) => {
  return (
    <div className="card md:card-side hover:backdrop-blur-[2px] hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-1 border-accent rounded-xl">
      <aside className="p-8 justify-center overflow-hidden align-top hidden md:flex">
        <p className="align-top text-sm mt-1 top-0">{date}</p>
      </aside>
      <div className="card-body">
        <h2 className="card-title text-3xl">
            {title}
        </h2>
        <p className="align-top text-sm mt-1 top-0 block md:hidden">{date}</p>  
        <p className="text-sm text-base-content/80 max-w-prose">{description}</p>
        <div className="flex flex-wrap gap-2 mt-2 max-w-prose">
          {badges.map((badge, i) => (
            <div key={i} className="badge badge-neutral">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;