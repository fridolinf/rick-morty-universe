import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-4 items-center relative">
        <Image
          src="/404.png"
          alt="Page not found illustration"
          width={500}
          height={300}
          className="w-full h-auto rounded-md"
          priority
          sizes="(min-width: 768px) 400px, 80vw"
        />

        <Link
          href="/"
          className="text-2xl flex gap-2 items-center justify-center shadow-lg shadow-blue-100 border border-blue-50 p-2 rounded-lg"
        >
          <MoveLeft /> Back to Homepage
        </Link>
      </div>
    </div>
  );
}
