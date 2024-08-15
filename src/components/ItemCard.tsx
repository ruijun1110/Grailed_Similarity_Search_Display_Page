import Image from "next/image";
import { MongoDBItem } from "../types/MongoDBItem";

interface ItemCardProps {
  item: MongoDBItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const itemUrl = `https://www.grailed.com/listings/${item.id}`;

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDesigners = (designers: string[], maxLength: number) => {
    const formattedDesigners = designers
      .map((designer) => designer.toUpperCase())
      .join(" x ");
    if (formattedDesigners.length <= maxLength) return formattedDesigners;
    return formattedDesigners.slice(0, maxLength - 3) + "...";
  };

  return (
    <div className="flex flex-col">
      <a
        href={itemUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full aspect-square"
      >
        <Image
          src={item.image.url}
          alt={item.title}
          layout="fill"
          objectFit="cover"
        />
      </a>
      <br />
      <hr />
      <div className="p-3 space-y-1">
        <div>
          <p className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis flex justify-between">
            <span>{formatDesigners(item.designers, 35)}</span>
            <span>{item.size.toUpperCase()}</span>
          </p>
        </div>
        <div className="space-y-2">
          <div>
            <a
              href={itemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <p className="text-sm font-extralight whitespace-nowrap overflow-hidden text-ellipsis">
                {capitalizeWords(item.title)}
              </p>
            </a>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-base font-semibold">${item.price.current}</p>
            <p className="text-xs text-gray-500">
              Similarity{" "}
              {item.similarity_score
                ? (item.similarity_score * 100).toFixed(2)
                : "N/A"}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
