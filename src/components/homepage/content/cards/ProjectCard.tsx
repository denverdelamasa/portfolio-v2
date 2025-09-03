import React from "react";
import Image, { StaticImageData } from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  badges?: string[];
  buttonText?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  badges = [],
  buttonText = "Learn More",
}) => {
  return (
    <div className="card card-side bg-base-200 shadow-xl border-1 border-primary">
      <figure className="p-4 w-48 h-48 flex items-center justify-center overflow-hidden align-middle m-auto">
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
            <div key={i} className="badge badge-outline">
              {badge}
            </div>
          ))}
        </div>
        <div className="card-actions justify-start mt-4">
          <button className="btn btn-primary w-full rounded-md">{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;