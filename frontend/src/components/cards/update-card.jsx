import React, { useState } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import ToggleCheckbox from "../toggle-checkbox";

const UpdateCard = ({ selectedCard, setToggle }) => {
  const [formData, setFormData] = useState({ propertyName: "", value: false });
  const queryClient = useQueryClient();

  const handleClose = () => {
    setToggle(false);
  };

  const handleInputChange = (propertyName, value) => {
    setFormData({ propertyName, value });
  };

  const updateData = async () => {
    try {
      await axios.put(
        `http://localhost:8080/updateData/${selectedCard.id}`,
        formData
      );
      handleClose();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-data"] });
    },
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {selectedCard?.type || ""} Update Form
        </h2>
        <form>
          {selectedCard?.properties.map((property, index) => (
            <div key={index} className="mb-4">
              <span className="font-semibold">{property.name}</span>
              <div className="flex flex-row gap-6">
                {property.pumps &&
                  Object.entries(property.pumps).map(([key, value], index) => (
                    <ToggleCheckbox
                      key={key}
                      label={`Pump ${index + 1}`}
                      defaultChecked={value || false}
                      onChange={(checked) =>
                        handleInputChange(`pumps.${key}`, checked)
                      }
                    />
                  ))}
                {property.enabled !== undefined && (
                  <ToggleCheckbox
                    label="Sensor"
                    defaultChecked={property.enabled}
                    onChange={(checked) =>
                      handleInputChange(`enabled`, checked)
                    }
                  />
                )}
                {property.mvps &&
                  Object.entries(property.mvps).map(([key, value], index) => (
                    <ToggleCheckbox
                      key={key}
                      label={`MVPS ${index + 1}`}
                      defaultChecked={value || false}
                      onChange={(checked) =>
                        handleInputChange(`mvps.${key}`, checked)
                      }
                    />
                  ))}
              </div>
            </div>
          ))}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                mutation.mutate(formData);
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCard;
