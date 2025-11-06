import React, { useRef } from "react";

export function useSingleEffect(
  effect: () => void,
  deps: React.DependencyList,
) {
  const isFirst = useRef(true);

  React.useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return effect();
    }

    return () => {};
  }, deps);
}
