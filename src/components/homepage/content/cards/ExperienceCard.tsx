import React from "react";

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
    <div className="flex flex-col md:flex-row backdrop-blur-[2px] hover:backdrop-brightness-130 hover:backdrop-saturate-150 transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-xl rounded-xl">
      <div className="p-8 justify-center overflow-hidden align-top hidden md:block md:w-3/10">
        <p className="align-top text-xs mt-1 top-0">{date}</p>
      </div>
      <div className="card-body md:w-7/10">
        <h2 className="card-title text-xl">
            {title}
        </h2>
        <p className="align-top text-xs mt-1 top-0 block md:hidden w-6/8">{date}</p>  
        <p className="text-sm text-base-content/80 max-w-prose">{description}</p>
        <div className="flex flex-wrap gap-2 mt-2 max-w-prose">
          {badges.map((badge, i) => (
            <div key={i} className="badge badge-success badge-sm">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;