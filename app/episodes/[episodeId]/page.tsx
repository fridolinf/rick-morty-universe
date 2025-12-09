import EpisodesDetailLayout from "@/features/episodes/components/layouts/detail";

export default async function EpisodesDetailpage({
  params,
}: {
  params: Promise<{ episodeId: string }>;
}) {
  const { episodeId } = await params;
  return (
    <div className="w-full h-full">
      <EpisodesDetailLayout episodeId={episodeId} />
    </div>
  );
}
