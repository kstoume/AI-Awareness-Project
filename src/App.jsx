import { useEffect, useMemo, useRef, useState } from "react";
import posts from "../posts.json";

const categories = [
  ["AI 101", "🧠", "The basics, made understandable"],
  ["AI in the News", "📰", "Important stories and developments"],
  ["AI in Education", "🎓", "AI and the future of learning"],
  ["Real Risks", "🛡️", "Safety, privacy, bias and scams"],
  ["FAQs", "💬", "Answers to your questions"],
];

const categoryIcons = Object.fromEntries(
  categories.map(([category, icon]) => [category, icon]),
);

function publicAsset(path) {
  return `/${path.replace(/^\/+/, "")}`;
}

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostMedia({ post }) {
  const media = post.media?.[0];

  if (!media) {
    return <div className="thumb">{categoryIcons[post.category] || "🤖"}</div>;
  }

  if (media.endsWith(".mp4")) {
    return <div className="thumb">🎬</div>;
  }

  return (
    <div className="thumb">
      <img
        src={publicAsset(media)}
        alt="Illustration from original Facebook post"
        loading="lazy"
      />
    </div>
  );
}

function ArticleDialog({ post, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close();
        }
      }}
    >
      <div className="modalinner">
        <button
          aria-label="Close article"
          className="close"
          onClick={() => dialogRef.current?.close()}
        >
          ✕
        </button>
        <span className="pill">{post.category}</span>
        <h2>{post.title}</h2>
        <p className="muted">Originally posted {post.date}</p>
        {(post.media || []).map((media) =>
          media.endsWith(".mp4") ? (
            <video
              className="modalmedia"
              key={media}
              src={publicAsset(media)}
              controls
              preload="metadata"
            />
          ) : (
            <img
              className="modalmedia"
              key={media}
              src={publicAsset(media)}
              alt="Original post media"
            />
          ),
        )}
        <p className="articlebody">{post.body}</p>
        {post.links.length > 0 && (
          <div className="links">
            <strong>Links included in original post</strong>
            {post.links.map((link) => (
              <a
                href={link}
                key={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ))}
          </div>
        )}
        <p className="notice">
          This is an archived Facebook post. Claims and links have not been
          independently reverified for current accuracy.
        </p>
      </div>
    </dialog>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  const [shownCount, setShownCount] = useState(3);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase().trim();

    return posts
      .filter(
        (post) =>
          (selectedCategory === "All" ||
            post.category === selectedCategory) &&
          (!query ||
            `${post.title} ${post.body}`.toLowerCase().includes(query)),
      )
      .slice()
      .sort((first, second) =>
        sortOrder === "old"
          ? first.date.localeCompare(second.date)
          : second.date.localeCompare(first.date),
      );
  }, [search, selectedCategory, sortOrder]);

  function chooseCategory(category) {
    setSelectedCategory(category);
    setArchiveOpen(true);
    setShownCount(12);
    document.getElementById("articles")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function browseMore() {
    if (!archiveOpen) {
      setArchiveOpen(true);
      setShownCount(12);
      return;
    }

    setShownCount((count) => count + 12);
  }

  return (
    <>
      <header>
        <div className="wrap nav">
          <a className="brand" href="#home">
            <img
              src="/assets/ai-awareness-logo.png"
              alt="AI Awareness Project logo"
            />
            AI Awareness Project
          </a>
          <nav className="navlinks" aria-label="Main navigation">
            <a href="#topics">Explore Topics</a>
            <a href="#articles">Articles</a>
            <a href="#about">About</a>
            <a
              href="https://www.facebook.com/profile.php?id=61575316926172"
              rel="noopener noreferrer"
              target="_blank"
            >
              Facebook ↗
            </a>
          </nav>
        </div>
      </header>

      <main>
        <div className="hero" id="home">
          <div className="wrap hero-layout">
            <div className="hero-message">
              <span className="hero-kicker">AI AWARENESS PROJECT</span>
              <p>Understanding AI. Protecting Truth. Empowering People.</p>
            </div>
          </div>
        </div>

        <section id="topics">
          <div className="wrap">
            <div className="sectionhead">
              <div>
                <h2>Explore by topic</h2>
              </div>
            </div>
            <div className="categories">
              {categories.map(([category, icon, description]) => (
                <button
                  className={`category${
                    selectedCategory === category ? " active" : ""
                  }`}
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => chooseCategory(category)}
                >
                  <span className="emoji">{icon}</span>
                  <strong>{category}</strong>
                  <small>{description}</small>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="articles">
          <div className="wrap">
            <div className="sectionhead">
              <div>
                <h2>Latest Articles</h2>
              </div>
              <span className="muted" id="count" aria-live="polite">
                {archiveOpen
                  ? `${filteredPosts.length} articles`
                  : "3 featured articles"}
              </span>
            </div>
            {archiveOpen && (
              <div className="archive-controls">
                <div className="toolbar">
                  <input
                    aria-label="Search posts"
                    id="search"
                    placeholder="Search posts, questions, and topics…"
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setShownCount(12);
                    }}
                  />
                  <select
                    aria-label="Filter category"
                    id="filter"
                    value={selectedCategory}
                    onChange={(event) => {
                      setSelectedCategory(event.target.value);
                      setShownCount(12);
                    }}
                  >
                    <option value="All">All categories</option>
                    {categories.map(([category]) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    aria-label="Sort posts"
                    id="sort"
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                  >
                    <option value="new">Newest first</option>
                    <option value="old">Oldest first</option>
                  </select>
                </div>
              </div>
            )}
            <div className="cards">
              {filteredPosts.slice(0, shownCount).map((post) => (
                <article
                  className="post"
                  key={post.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`Read ${post.title}`}
                  onClick={() => setActivePost(post)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActivePost(post);
                    }
                  }}
                >
                  <PostMedia post={post} />
                  <div className="postcontent">
                    <span className="pill">{post.category}</span>
                    <h3>{post.title}</h3>
                    <div className="excerpt">
                      {post.body.replace(/[#*]/g, "").slice(0, 145)}…
                    </div>
                    <div className="date">{formatDate(post.date)}</div>
                  </div>
                </article>
              ))}
              {filteredPosts.length === 0 && (
                <p>No posts match your search. Try another keyword or category.</p>
              )}
            </div>
            {(!archiveOpen || shownCount < filteredPosts.length) && (
              <button className="btn more" type="button" onClick={browseMore}>
                {archiveOpen ? "Show More Articles" : "Browse All Articles"}
              </button>
            )}
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap aboutgrid">
            <div>
              <div className="eyebrow">Our mission</div>
              <h2>AI is everywhere. Understanding it should be for everyone.</h2>
              <p>
                The AI Awareness Project makes artificial intelligence easier
                to understand, with accessible explanations, timely stories,
                and thoughtful conversations about its benefits and risks.
              </p>
              <p>
                Our goal is to help people ask better questions, recognize
                misleading information, and make informed decisions in an
                AI-driven world.
              </p>
              <a
                className="btn"
                href="https://www.facebook.com/profile.php?id=61575316926172"
                rel="noopener noreferrer"
                target="_blank"
              >
                Follow on Facebook ↗
              </a>
            </div>
            <div className="aboutbox">
              “AI literacy isn&apos;t about fear. It&apos;s about curiosity,
              critical thinking, and making informed choices.”
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <strong>AI Awareness Project</strong>
          <p>Understanding AI. Protecting Truth. Empowering People.</p>
          <p>
            Educational content originally shared by AI Awareness Project on
            Facebook. Archived posts retain their original wording; news and
            technology details may have changed since publication.
          </p>
          <p>
            © 2026 AI Awareness Project ·{" "}
            <a href="https://www.facebook.com/profile.php?id=61575316926172">
              Facebook
            </a>
          </p>
        </div>
      </footer>

      {activePost && (
        <ArticleDialog
          key={activePost.id}
          post={activePost}
          onClose={() => setActivePost(null)}
        />
      )}
    </>
  );
}

export default App;
