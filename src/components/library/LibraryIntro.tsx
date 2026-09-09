export function LibraryIntro() {
  return (
    <section className="intro">
      <div>
        <p className="eyebrow">
          <span className="tiny-star" aria-hidden="true">
            ✳
          </span>{" "}
          A LITTLE LEARNING, EVERY DAY
        </p>
        <h1 tabIndex={-1}>
          For a mind that
          <br />
          keeps <em>wandering.</em>
        </h1>
        <p className="intro-copy">
          From handwritten notes to little lightbulb moments.
          <br className="desktop-break" /> A personal collection of things I'm
          learning, one topic at a time.
        </p>
        <a
          className="text-link"
          href="#/"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("browse")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            });
            document.getElementById("search")?.focus({ preventScroll: true });
          }}
        >
          Explore the library <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="curiosity-note" aria-hidden="true">
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <span className="orbit-spark">✧</span>
        <span className="note-pin" />
        <div className="paper-note">
          <span className="handwriting">a note to self</span>
          <span className="paper-rule" />
          <p>
            You don't have to
            <br />
            learn it all.
            <br />
            <em>
              Just something
              <br />
              new today.
            </em>
          </p>
          <span className="note-flower">✳</span>
        </div>
        <span className="note-caption">COLLECT IDEAS. CONNECT THE DOTS.</span>
      </div>
    </section>
  );
}
