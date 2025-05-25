import { makeStyles, tokens } from "@fluentui/react-components";
import { ReactNode } from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalXL,
    maxWidth: "1200px",
    width: "100%",
    //  padding: tokens.spacingHorizontalL,
    boxSizing: "border-box",
    margin: "0 auto",
  },
  main: {
    flex: 3,
    //padding: tokens.spacingHorizontalL,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  rail: {
    flex: 1,
    // padding: tokens.spacingHorizontalL,
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
});

interface LayoutProps {
  main: ReactNode;
  rail: ReactNode;
}

export const Layout = ({ main, rail }: LayoutProps) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.main}>{main}</div>
      <div className={styles.rail}>{rail}</div>
    </div>
  );
};
