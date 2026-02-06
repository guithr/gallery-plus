import { useForm } from "react-hook-form";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "../../../components/dialog";
import ImagePreview from "../../../components/image-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Album } from "../../albums/models/album";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const form = useForm();

  // Apenas para mock, vamos pegar da API em breve.
  const isLoadingAlbum = false;
  const albums: Album[] = [
    { id: "123", title: "Japão" },
    { id: "345", title: "Argentina" },
    { id: "678", title: "Brasil" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Adicionar Foto</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" maxLength={255} />
          <Alert>
            Tamanho máximo: 50MB
            <br />
            Você pode selecionar arquivos em PNG, JPG ou JPEG
          </Alert>

          <InputSingleFile
            form={form}
            allowedExtensions={["png", "sjpg", "jpeg"]}
            maxFileSizeInMB={50}
            replaceBy={<ImagePreview className="w-full h-56" />}
          />
          <div className="space-y-3">
            <Text variant="label-small">Selecionar álbuns</Text>

            <div className="flex flex-wrap gap-3">
              {!isLoadingAlbum &&
                albums.length > 0 &&
                albums.map((album) => (
                  <Button
                    key={album.id}
                    variant="ghost"
                    size="sm"
                    className="truncate"
                  >
                    {album.title}
                  </Button>
                ))}

              {isLoadingAlbum &&
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={`album-loading-${index}`}
                    className="w-20 h-7"
                  />
                ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
