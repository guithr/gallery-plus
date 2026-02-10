import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photo";
import { fetcher } from "../../../helpers/api";

export default function UsePhotos() {
  const { data, isLoading } = useQuery<Photo[]>({
    queryKey: ["photos"],
    queryFn: () => fetcher("/photos"),
  });
  return {
    photos: data || [],
    isLoadingPhotos: isLoading,
  };
}
