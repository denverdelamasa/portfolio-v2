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
    <div className="card md:card-side hover:backdrop-blur-[2px] transition-all duration-300 ease-in-out hover:shadow-xl rounded-xl">
      <figure className="m-8 md:w-62 md:h-32 justify-start overflow-hidden md:w-1/5">
        <Image
          src={imageUrl}
          alt={title}
          className="rounded-lg object-fill"
        />
      </figure>
      <div className="card-body md:w-4/5">
        <h2 className="card-title text-3xl">{title}</h2>
        <p className="text-xs text-base-content/40 max-w-prose">{dateStarted}</p>
        <p className="text-sm text-base-content/80 max-w-prose">{description}</p>
      </div>
    </div>
  );
};

export default AdvancementCard;