"use client";

import { ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({
  children,
}: Readonly<PageTransitionProps>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.in",
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    {
      scope: containerRef,
      dependencies: [pathname],
    }
  );

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  );
}
