import {
  FluentProvider,
  webDarkTheme,
  makeStyles,
  Text,
  Title1,
  Subtitle1,
  MenuList,
} from "@fluentui/react-components";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Layout } from "./components/layout";
import { BackToTopButton } from "./components/back-to-top";
import { DataList } from "./components/data-list";
import "./App.css";

import mainQuests from "./data/main-quests.json";
import guildQuests from "./data/guild-quests.json";
import daedricQuests from "./data/daedric-shrine-quests.json";
import nonJournalQuests from "./data/non-journal-quests.json";
import mainCityQuests from "./data/main-city-quests.json";
import masterTrainingQuests from "./data/master-training.json";
import arenaQuests from "./data/arena.json";
import locations from "./data/caves-and-entrances.json";
import ayleidRuins from "./data/ayleid-ruins.json";
import forts from "./data/forts.json";
import campsites from "./data/campsites.json";
import settlements from "./data/settlements.json";
import landmarks from "./data/landmarks.json";
import oblivion from "./data/oblivion-gates.json";
import skillbooks from "./data/skill-books.json";
import artifacts from "./data/artifacts.json";
import horses from "./data/horses.json";
import houses from "./data/houses.json";

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "1rem",
    display: "block",
  },
  scrollSection: {
    padding: "1rem",
  },
});

const Section: React.FC<{ title: string; data: any[] }> = ({ title, data }) => (
  <section aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}>
    <Subtitle1
      className={useStyles().title}
      id={title.replace(/\s+/g, "-").toLowerCase()}
    >
      {title}
    </Subtitle1>
    <DataList data={data} heading={title} />
  </section>
);
export default function App() {
  const styles = useStyles();
  const makeId = (title: string) => title.replace(/\s+/g, "-").toLowerCase();

  // Quest groups
  const questSections = [
    { title: "Main Story", data: mainQuests.mainQuestline },
    { title: "Fighters Guild", data: guildQuests.fightersGuild },
    { title: "Mages Guild", data: guildQuests.magesGuild },
    { title: "Dark Brotherhood", data: guildQuests.darkBrotherhood },
    { title: "Thieves Guild", data: guildQuests.thievesGuild },
    { title: "Main City", data: mainCityQuests.mainCityQuests },
    { title: "Non-journal Quests", data: nonJournalQuests.nonJournalQuests },
    { title: "Master Training", data: masterTrainingQuests.masterTraining },
    { title: "Arena", data: arenaQuests.arena },
  ];

  // Location groups
  const locationSections = [
    { title: "Ayleid Ruins", data: ayleidRuins.ayleidRuins },
    { title: "Campsites", data: campsites.campsites },
    { title: "Daedric Shrines", data: daedricQuests.daedricShrines },
    { title: "Caves & Entrances", data: locations.locations },
    { title: "Forts", data: forts.forts },
    { title: "Landmarks", data: landmarks.landmarks },
    { title: "Settlements", data: settlements.settlements },
  ];

  // Misc groups
  const miscSections = [
    { title: "Oblivion Gates", data: oblivion.oblivionGates },
    { title: "Skill Books", data: skillbooks.skillBooksRead },
    { title: "Artifacts", data: artifacts.artifacts },
    { title: "Horses", data: horses.horsesCollected },
    { title: "Houses", data: houses.housesCollected },
  ];

  // Nav groups
  const allSections = [
    { groupTitle: "Quests", sections: questSections },
    { groupTitle: "Locations Found", sections: locationSections },
    { groupTitle: "Miscellaneous", sections: miscSections },
  ];

  return (
    <FluentProvider theme={webDarkTheme} className={styles.page}>
      <Header />
      <Layout
        main={
          <main className={styles.scrollSection}>
            <Title1 className={styles.title}>Quests</Title1>
            {questSections.map(({ title, data }) => (
              <Section key={title} title={title} data={data} />
            ))}

            <Title1 className={styles.title}>Locations Found</Title1>
            {locationSections.map(({ title, data }) => (
              <Section key={title} title={title} data={data} />
            ))}

            <Title1 className={styles.title}>Miscellaneous</Title1>
            {miscSections.map(({ title, data }) => (
              <Section key={title} title={title} data={data} />
            ))}
          </main>
        }
        rail={
          <nav
            data-sidebar
            aria-label="Section navigation"
            style={{ padding: "1rem" }}
          >
            {allSections.map(({ groupTitle, sections }) => (
              <div key={groupTitle} style={{ marginBottom: "1.5rem" }}>
                <Text
                  weight="semibold"
                  block
                  style={{ marginBottom: "0.5rem" }}
                >
                  {groupTitle}
                </Text>
                <MenuList
                  style={{
                    padding: 0,
                    margin: 0,
                    listStyleType: "none",
                  }}
                >
                  {sections.map(({ title }) => (
                    <a
                      href={`#${makeId(title)}`}
                      style={{
                        width: "100%",
                        display: "block",
                      }}
                    >
                      - {title}
                    </a>
                  ))}
                </MenuList>
              </div>
            ))}
          </nav>
        }
      />
      <Footer />
      <BackToTopButton />
    </FluentProvider>
  );
}
