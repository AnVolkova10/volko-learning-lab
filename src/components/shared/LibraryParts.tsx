export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

type BackToLibraryProps = {
  className?: string;
  arrow?: "left" | "up-right";
};

export function BackToLibrary({
  className,
  arrow = "up-right",
}: BackToLibraryProps) {
  return (
    <a className={className} href="#/">
      {arrow === "left" && (
        <>
          <span aria-hidden="true">←</span>{" "}
        </>
      )}
      Back to the library
      {arrow === "up-right" && (
        <>
          {" "}
          <span aria-hidden="true">↗</span>
        </>
      )}
    </a>
  );
}
