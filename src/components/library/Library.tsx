import { topics } from "../../data/topics";
import { LibraryIntro } from "./LibraryIntro";
import { FeaturedCarousel } from "./FeaturedCarousel";
import { TopicCollection, type LibraryProps } from "./TopicCollection";

// This page only composes its three sections; each section owns its styles.
export function Library(props: LibraryProps) {
  return (
    <>
      <LibraryIntro />
      <FeaturedCarousel topics={topics} />
      <TopicCollection {...props} />
    </>
  );
}
