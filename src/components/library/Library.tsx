import { topics } from "../../data/topics";
import { LibraryIntro } from "./LibraryIntro";
import { FeaturedTopic } from "./FeaturedTopic";
import { TopicCollection, type LibraryProps } from "./TopicCollection";

// This page only composes its three sections; each section owns its styles.
export function Library(props: LibraryProps) {
  return (
    <>
      <LibraryIntro />
      {topics[0] && <FeaturedTopic topic={topics[0]} />}
      <TopicCollection {...props} />
    </>
  );
}
