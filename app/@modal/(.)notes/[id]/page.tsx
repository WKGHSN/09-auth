// app/@modal/(.)notes/[id]/page.tsx

// import Modal from "@/components/Modal/Modal";
import { fetchNotebyIdServer } from "@/lib/api/serverApi";
import NotePreview from "@/components/NotePreview/NotePreview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreviewModal = async ({ params }: Props) => {
  const { id } = await params;
  // const note = await fetchNoteById(id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNotebyIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
};

export default NotePreviewModal;
