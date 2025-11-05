import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
    const mql = window.matchMedia(query);

    const handleChange = () => {
      setIsMobile(mql.matches);
    };

    // Set initial value
    setIsMobile(mql.matches);

    // Add listener
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      mql.addListener(handleChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, []);

  return isMobile;
}
