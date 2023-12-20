import React from 'react';

const ApprovedCard = ({ item, index }) => {
  const { price, name } = item;

  return (
    <div className="border p-4 mb-4 max-h-96 overflow-y-auto flex flex-col">
      <div className="flex-grow h-auto">
        <h4 className="text-lg font-semibold mb-2">{name}</h4>
        <p className="text-gray-600 mb-2"> ${price}</p>
      </div>
    </div>
  );
};

export default ApprovedCard;
