"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function NavigationTabs() {
  const pathname = usePathname();
  return (
    <Tabs defaultValue={pathname} className="w-full flex mt-5 items-center">
      <TabsList className="min-w-xs">
        <TabsTrigger value="/" asChild>
          <Link href="/">Characters</Link>
        </TabsTrigger>
        <TabsTrigger value="/episodes" asChild>
          <Link href="/episodes">Episodes</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
