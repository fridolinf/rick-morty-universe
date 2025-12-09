import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import Link from "next/link";

type CharactersEpisodeProps = {
  charactersEpisode: string[];
};

export default function CharactersEpisode({
  charactersEpisode,
}: Readonly<CharactersEpisodeProps>) {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="backdrop-blur-2xl bg-emerald-500 shadow-purple-200 dark:shadow-purple-300 dark:bg-emerald-300 px-4 rounded-md shadow-xl"
      >
        <AccordionItem value="episodes">
          <AccordionTrigger className="text-xl text-gray-900 text-shadow-xs text-shadow-emerald-300 font-semibold">
            Episodes
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-40 overflow-auto">
            {charactersEpisode?.map((episode, idx) => (
              <Link
                key={episode}
                href={episode ?? ""}
                title={episode}
                target="_blank"
                className="text-gray-950 font-medium"
              >
                Episode - {idx + 1}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
