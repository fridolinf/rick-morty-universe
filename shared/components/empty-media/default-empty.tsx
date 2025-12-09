import notFoundMedia from "@/public/lottie/not-found.json";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import Lottie from "lottie-react";

type DefaultEmptyProps = {
  title?: string;
};

const DefaultEmpty = ({ title = "No data found" }: DefaultEmptyProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia className="max-w-52">
          <Lottie animationData={notFoundMedia} loop={true} />
        </EmptyMedia>
        <EmptyTitle className="text-lg">{title}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
};

export default DefaultEmpty;
