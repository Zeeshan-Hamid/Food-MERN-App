const Card = ({ foodItems }) => {
  if (!foodItems || foodItems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-4">
      {foodItems.map((item) => (
        <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Card;
