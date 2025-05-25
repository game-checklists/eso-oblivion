import * as React from "react";
import { Button, Tooltip } from "@fluentui/react-components";
import { ArrowUp24Filled } from "@fluentui/react-icons";

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sidebarRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      const rect = sidebarRef.current.getBoundingClientRect();
      const isBelowView = rect.bottom < 0;
      setIsVisible(isBelowView);
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    // Get the sidebar element once it's mounted
    const sidebar = document.querySelector(
      "[data-sidebar]"
    ) as HTMLElement | null;
    if (sidebar) {
      sidebarRef.current = sidebar;
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <Tooltip content="Back to Top" relationship="label">
      <Button
        icon={<ArrowUp24Filled />}
        onClick={scrollToTop}
        appearance="primary"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
          borderRadius: "50%",
        }}
        aria-label="Back to Top"
      />
    </Tooltip>
  );
};
