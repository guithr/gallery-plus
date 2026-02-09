import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import UseAlbums from "../contexts/albums/hooks/use-albums";
import PhotosList from "../contexts/photos/components/photos.list";

export default function PageHome() {
  const { albums, isLoadingAlbums } = UseAlbums();

  return (
    <Container>
      <AlbumsFilter
        albums={albums}
        loading={isLoadingAlbums}
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
