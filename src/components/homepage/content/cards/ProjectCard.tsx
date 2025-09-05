import React from "react";
import Image, { StaticImageData } from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  badges?: string[];
  buttonText?: string;
  buttonLink?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  badges = [],
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="card md:card-side hover:backdrop-blur-xs hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl rounded-xl">
      <figure className="p-4 md:w-48 md:h-48 flex items-center justify-center overflow-hidden align-middle m-auto">
        <Image
          src={imageUrl}
          alt={title}
          className="rounded-lg object-cover m-auto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl">{title}</h2>
        <p className="text-sm text-base-content/80 max-w-prose">{description}</p>
        <div className="flex flex-wrap gap-2 mt-2 max-w-prose">
          {badges.map((badge, i) => (
            <div key={i} className="badge badge-primary">
              {badge}
            </div>
          ))}
        </div>
        <div className="card-actions justify-start mt-4">
          <a className="btn btn-primary w-full rounded-md" href={buttonLink} target="_blank">{buttonText}</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;