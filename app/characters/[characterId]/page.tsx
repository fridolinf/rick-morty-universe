import CharactersDetailLayout from "@/features/characters/components/layouts/detail";

export default async function CharactersDetailPage({
  params,
}: {
  params: Promise<{ characterId: string }>;
}) {
  const { characterId } = await params;
  return (
    <div className="flex flex-col gap-4">
      <CharactersDetailLayout characterId={characterId} />
    </div>
  );
}
