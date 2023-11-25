import { useParams } from "react-router-dom";

const Details = () => {
  const { userId } = useParams();

  return <div>{userId}</div>;
};

export default Details;
