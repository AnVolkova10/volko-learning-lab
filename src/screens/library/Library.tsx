import { topics } from "../../data/topics";
import { LibraryIntro } from "../../components/library/LibraryIntro";
import { FeaturedCarousel } from "../../components/library/FeaturedCarousel";
import { TopicCollection, type LibraryProps } from "../../components/library/TopicCollection";

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
