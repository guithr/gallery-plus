import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import type { Photo } from "../contexts/photos/models/photo";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";

export default function PagePhotoDetails() {
  const { id } = useParams();

  // Apenas mock não é definitivo.
  const isLoading = false;
  const photo = {
    id: "123",
    title: "Olá mundo!",
    imageId: "portrait-tower.png",
    albums: [{ id: "123", title: "Japão" }],
  } as Photo;

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoading ? (
          <Text as="h2" variant="heading-large">
            {photo.title}
          </Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}
        <PhotosNavigator loading={isLoading} />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoading ? (
            <ImagePreview
              src={`/images/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}
          <div>
            {!isLoading ? (
              <Button variant="destructive">Excluir</Button>
            ) : (
              <Skeleton className="w-20 h-10" />
            )}
          </div>
        </div>
        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-7">
            Álbuns
          </Text>

          <AlbumsListSelectable
            photo={photo}
            albums={[
              { id: "123", title: "Japão" },
              { id: "345", title: "Argentina" },
              { id: "678", title: "Brasil" },
            ]}
            loading={isLoading}
          />
        </div>
      </div>
    </Container>
  );
}
