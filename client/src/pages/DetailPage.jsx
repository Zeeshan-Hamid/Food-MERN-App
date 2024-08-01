import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";
import Navbar from "../components/Navbar/Navbar";
const DetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/food/${id}`
        );
        setItem(data[0]);
      } catch (error) {
        setError("Error fetching item details");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
    
      <div>
        <h1>{item.name}</h1>
        <img src={item.image} alt={item.name} />
      </div>
    </>
  );
};

export default DetailPage;
