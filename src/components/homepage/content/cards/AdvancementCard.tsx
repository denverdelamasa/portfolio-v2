import React from "react";
import Image, { StaticImageData } from "next/image";

type AdvancementCardProps = {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  dateStarted: string;
};

const AdvancementCard: React.FC<AdvancementCardProps> = ({
  title,
  description,
  imageUrl,
  dateStarted,
}) => {
  return (
    <div className="card md:card-side hover:backdrop-blur-[2px] hover:backdrop-brightness-130 hover:backdrop-saturate-150 transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-xl rounded-xl">
      <figure className="m-8 md:w-3/10 md:h-32 justify-start overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="rounded-lg object-fill"
        />
      </figure>
      <div className="card-body md:w-7/10">
        <h2 className="card-title text-xl">{title}</h2>
        <p className="text-xs text-base-content/40 max-w-prose">{dateStarted}</p>
        <p className="text-sm text-base-content/80 max-w-prose">{description}</p>
      </div>
    </div>
  );
};

export default AdvancementCard;