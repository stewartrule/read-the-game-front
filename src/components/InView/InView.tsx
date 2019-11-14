import * as React from "react";
import { useState, useEffect, useRef } from "react";

type Props = {
  rootMargin?: number;
  threshold?: number | number[];
  children: (cfg: {
    seen: boolean;
    isIntersecting: boolean;
  }) => React.ReactNode;
};

const InView: React.FC<Props> = ({
  children,
  rootMargin = 0,
  threshold = 0
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const intersects = entries.some(
          (entry: IntersectionObserverEntry) => entry.isIntersecting
        );
        setIsIntersecting(intersects);
        intersects && setSeen(true);
      },
      {
        rootMargin: `${rootMargin}px`,
        threshold
      }
    );

    ref.current && observer.observe(ref.current);

    return () => {
      ref.current && observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [ref.current]);

  return <div ref={ref}>{children({ isIntersecting, seen })}</div>;
};

export default InView;
