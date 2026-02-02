import { useParams } from "react-router";
import Text from "../components/text";

export default function PagePhotoDetails() {
  const { id } = useParams();

  return (
    <>
      <Text>Página Details</Text>
      <hr />
      <Text>Id da foto: {id}</Text>;
    </>
  );
}
