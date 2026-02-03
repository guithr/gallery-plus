import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos.list";

export default function PageHome() {
  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: "123", title: "Japão" },
          { id: "345", title: "Argentina" },
          { id: "678", title: "Brasil" },
        ]}
        className="mb-10"
      />
      <PhotosList
        photos={[
          {
            id: "123",
            title: "Olá mundo!",
            imageId: "portrait-tower.png",
            albums: [{ id: "123", title: "Japão" }],
          },
        ]}
      />
    </Container>
  );
}
