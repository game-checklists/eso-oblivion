import { makeStyles, tokens, Text } from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "60px",
    backgroundColor: tokens.colorNeutralBackground1,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
});

export const Footer = () => {
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <Text>Made with FluentUI, Vite, and TypeScript</Text>
      </div>
    </header>
  );
};
