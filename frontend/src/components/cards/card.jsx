import React, { useState } from "react";
import { TickCircle, CloseCircle } from "iconsax-react";

import UpdateCard from "./update-card";

const Card = ({ data }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    setToggle(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start m-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-green-100 rounded-md border border-green-400"
            onClick={() => handleCardClick(item)}
          >
            <div className="w-full px-3 py-2 border-b border-green-400">
              <h2 className="text-lg text-center font-medium">{item.type}</h2>
            </div>
            <ul className="mx-6 my-2">
              {item.properties.map((property, index) => (
                <li
                  key={index}
                  className="flex justify-start items-center py-1"
                >
                  {property.pumps ? (
                    <span className="mr-2 w-10 text-start text-4xl font-medium text-green-600">
                      {
                        Object.values(property.pumps).filter((val) => val)
                          .length
                      }
                    </span>
                  ) : property.enabled !== undefined ? (
                    <span className="mr-2 w-10">
                      {property.enabled ? (
                        <TickCircle size="24" color="green" />
                      ) : (
                        <CloseCircle size="24" color="red" />
                      )}
                    </span>
                  ) : (
                    <span className="mr-2 w-10 text-start text-4xl font-medium text-green-600">
                      {Object.values(property.mvps).filter((val) => val).length}
                    </span>
                  )}
                  <span>{property.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {toggle && (
        <UpdateCard selectedCard={selectedCard} setToggle={setToggle} />
      )}
    </>
  );
};

export default Card;
