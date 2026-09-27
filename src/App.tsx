import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Heart,
  Music2,
  Pause,
  X,
} from "lucide-react";
import "./index.css";

type Copy = string;

const copy = (en: string, _km?: string): Copy => en;
const photo = (id: string) =>
  id.startsWith('/')
    ? id
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1080&h=1080&q=82`;
const gallery = [
  "/photo12.jpeg",
  "/phtoto11.jpeg",
  "/Photo13.jpeg",
  "/photo14.jpeg",
  "/phtoto16.jpeg",
  "/photo7.jpeg",
  "/photo6.jpeg",
  "/photo17.jpeg",
  "/photo19.jpeg",
  "/photo3.jpeg",
  "/photo2.jpeg",
  "/photo15.jpeg",
  "/photo10.jpeg",
  "/photo9.jpeg",
  "/sufenyoung.jpeg",
].map((id) => photo(id));
const heartGallery = gallery.slice(0, 15);
const youngPhotos = ["/Reachyoung.jpeg", "/sufenyoung.jpeg"];

const timeline: {
  number: string;
  title: Copy;
  body: Copy;
  date: string;
  image: string;
}[] = [
  {
    number: "01",
    title: copy("The Beginning", "ការចាប់ផ្តើម"),
    body: copy(
      "This is our first Photobooth Together.",
      "ផ្លូវពីរបានជួបគ្នា ហើយពាក្យសួរសុខទុក្ខដ៏សាមញ្ញ បានក្លាយជាការចាប់ផ្តើមនៃអ្វីៗទាំងអស់។",
    ),
    date: "29 · December · 2025",
    image: "/photo2.jpeg",
  },
  {
    number: "02",
    title: copy("First Memory", "អនុស្សាវរីយ៍ដំបូង"),
    body: copy(
      "Every weekend, we go to the cinema and watch movies together.",
      "ហាងកាហ្វេតូចមួយ ការសន្ទនាដ៏យូរ និងអារម្មណ៍ថាពេលវេលាបានឈប់សម្រាប់យើង។",
    ),
    date: "21 · 04 · 2023",
    image: '/photo5.jpeg',
  },
  {
    number: "03",
    title: copy("Growing Together", "ធំឡើងជាមួយគ្នា"),
    body: copy(
      "Sometimes, we have arguments, but we always find a solution to solve our problems. We learn from our mistakes and support each other so we can grow together.",
      "មានថ្ងៃខ្លះពោរពេញដោយពន្លឺ និងថ្ងៃខ្លះទន់ភ្លន់។ គ្រប់ថ្ងៃនាំយើងឲ្យកាន់តែជិតស្និទ្ធ។",
    ),
    date: "08 · 08 · 2023",
    image: '/photo6.jpeg',
  },
  {
    number: "04",
    title: copy("Today, Always", "ថ្ងៃនេះ និងជានិច្ច"),
    body: copy(
      "From today to always, together is my favorite place to be.",
      "នេះហើយជាយើង នៅតែជ្រើសរើសគ្នា និងមានជំពូកដ៏ស្រស់ស្អាតជាច្រើននៅខាងមុខ។",
    ),
    date: "12 · 04 · 2026",
    image: '/photo7.jpeg',
  },
];

const navItems = [
  ["home", "Home", "ទំព័រដើម"],
  ["story", "Our story", "រឿងរ៉ាវរបស់យើង"],
  ["timeline", "Timeline", "ពេលវេលា"],
  ["memories", "Memories", "អនុស្សាវរីយ៍"],
  ["gallery", "Gallery", "វិចិត្រសាល"],
  ["letter", "Love letter", "សំបុត្រស្នេហ៍"],
];

function t(value: Copy, _language?: string) {
  return value;
}

function Ornament({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`ornament ${small ? "ornament-small" : ""}`}
      aria-hidden="true"
    >
      <span>❧</span>
      <i />
      <span className="lotus">✦</span>
      <i />
      <span>❧</span>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: Copy;
  title: Copy;
  language?: string;
}) {
  return (
    <div className="section-title">
      <p className="eyebrow">{t(eyebrow)}</p>
      <h2>{t(title)}</h2>
      <Ornament small />
    </div>
  );
}

function App() {
  const language = "en";
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterUnlocked, setLetterUnlocked] = useState(false);
  const [letterPassword, setLetterPassword] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const relationshipStart = useMemo(() => new Date("2025-12-07T00:00:00"), []);
  const elapsed = Math.max(0, now - relationshipStart.getTime());
  const relationshipDays = Math.max(
    1,
    Math.floor((now - relationshipStart.getTime()) / 86400000) + 1,
  );
  const years = Math.floor(elapsed / 31557600000);
  const months = Math.floor((elapsed % 31557600000) / 2629800000);
  const days = Math.floor((elapsed % 2629800000) / 86400000);
  const hours = Math.floor((elapsed / 3600000) % 24);
  const minutes = Math.floor((elapsed / 60000) % 60);
  const seconds = Math.floor((elapsed / 1000) % 60);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("is-locked", !opened);
    return () => document.body.classList.remove("is-locked");
  }, [opened]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
      return;
    }
    try {
      await audio.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="intro-backdrop" />
            <motion.div
              className="envelope"
              initial={{ y: 26, opacity: 0, scale: 0.86, rotateX: -12, rotateY: -8 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpened(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpened(true)}
            >
              <div className="envelope-flap" />
              <div className="envelope-pattern" />
              <div className="envelope-content">
                <Ornament />
                <p className="eyebrow">AN ANNIVERSARY</p>
                <h1>Happy Anniversary Sufen</h1>
                <div className="seal">
                  <Heart size={16} fill="currentColor" />
                </div>
                <span className="tap">
                  Tap to open <ChevronDown size={15} />
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="site-shell">
        <div className="petals" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>
              ✦
            </span>
          ))}
        </div>
        <header className="navbar">
          <button className="wordmark" onClick={() => scrollTo("home")}>
            <b>SOTHIREACH & SUFEN</b>
          </button>
          <nav>
            {navItems.map(([id, en]) => (
              <button key={id} onClick={() => scrollTo(id)}>
                {en}
              </button>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="menu-trigger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </header>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button className="close-menu" onClick={() => setMenuOpen(false)}>
                <X />
              </button>
              <span className="eyebrow">SOTHIREACH & SUFEN</span>
              {navItems.map(([id, en], index) => (
                <motion.button
                  key={id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollTo(id)}
                >
                  {en}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          <section id="home" className="hero">
            <div className="hero-copy">
              <p className="eyebrow">07 December 2025 · OUR ANNIVERSARY</p>
              <h1>
                Sothireach
                <br />
                <em>&</em> Sufen
              </h1>
              <p className="hero-khmer">
                Celebrating our love, laughter, and all the little things
              </p>
              <p className="hero-sub">
                Every day with you is another beautiful chapter of our story.
              </p>
              <button
                className="outline-button"
                onClick={() => scrollTo("story")}
              >
                Read our story <ArrowRight size={16} />
              </button>
            </div>
            <div className="hero-visual">
              <div
                className="young-photos"
                aria-label="Photos of us when we were young"
              >
                <figure>
                  <img
                    src={youngPhotos[0]}
                    alt="Sothireach when he was young"
                  />
                  <figcaption>
                    <b>Sothireach</b>
                    <small>MEMORY 01 · THEN</small>
                  </figcaption>
                </figure>
                <figure>
                  <img src={youngPhotos[1]} alt="Sufen when she was young" />
                  <figcaption>
                    <b>Sufen</b>
                    <small>MEMORY 02 · THEN</small>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="scroll-note">
              <span /> scroll to discover
            </div>
          </section>

          <section id="story" className="story section">
            <div className="story-count">
              <span>OUR STORY BEGAN</span>
              <strong>{relationshipDays}</strong>
              <small>days since 07 · 12 · 2025</small>
            </div>
            <SectionTitle
              language={language}
              eyebrow={copy("A little history", "ប្រវត្តិតូចមួយ")}
              title={copy("The beginning of us", "ការចាប់ផ្តើមរបស់យើង")}
            />
            <div className="story-grid">
              <div className="story-image">
                <img
                  src="/photo3.jpeg"
                  alt="Photo from the beginning of our story"
                />
                <span className="image-caption">OUR FIRST CHAPTER · 2025</span>
              </div>
              <div className="story-text">
                <span className="chapter">CHAPTER I</span>
                <h3>
                  {t(
                    copy(
                      "Two people, one beautiful beginning.",
                      "មនុស្សពីរនាក់ ការចាប់ផ្តើមដ៏ស្រស់ស្អាតមួយ។",
                    ),
                    language,
                  )}
                </h3>
                <p>
                  {t(
                    copy(
                      `We first met on Discord. At first, we barely talked, but over time, our conversations grew longer as we shared stories about our lives and past relationships. Later, I invited her to watch a movie at K Mall Steung Meanchey, where we met in person for the first time.

On December 7, 2025, I confessed my feelings to her, and she accepted. Since then, we have been together, sharing love, laughter, and beautiful memories. Our story started with a simple conversation, and now we are in love.`,
                      "យើងបានជួបគ្នាតាមរបៀបដ៏សាមញ្ញបំផុត ហើយពេលវេលាដ៏សាមញ្ញនោះ បានក្លាយជារឿងដែលយើងស្រឡាញ់បំផុត។ តាំងពីថ្ងៃនោះមក យើងបានប្រមូលអព្ភូតហេតុតូចៗ ដូចជាពេលព្រឹកដ៏ស្ងប់ស្ងាត់ ដំណើរផ្សងព្រេង និងសំណើចដែលធ្វើឲ្យគ្រប់ទីកន្លែងក្លាយជាផ្ទះ។",
                    ),
                    language,
                  )}
                </p>
                <div className="signature">
                  With all my love, <strong>S</strong>
                </div>
              </div>
            </div>
          </section>

          <section id="timeline" className="timeline-section section">
            <SectionTitle
              language={language}
              eyebrow={copy("Our journey", "ដំណើររបស់យើង")}
              title={copy("The moments that made us", "ពេលវេលាដែលបង្កើតយើង")}
            />
            <div className="timeline-list">
              {timeline.map((item, index) => (
                <motion.article
                  className="timeline-item"
                  key={item.number}
                  initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="timeline-number">{item.number}</div>
                  <div className="timeline-copy">
                    <span>{item.date}</span>
                    <h3>{t(item.title, language)}</h3>
                    <p>{t(item.body, language)}</p>
                  </div>
                  <img
                    className="timeline-photo"
                    src={item.image}
                    alt={`${t(item.title, language)} memory`}
                  />
                  <div className="timeline-spark">✦</div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="memories" className="memories section">
            <div className="memories-head">
              <SectionTitle
                language={language}
                eyebrow={copy("Keepsakes", "អនុស្សាវរីយ៍")}
                title={copy(
                  "Our goal is to complete a lifetime",
                  "អនុស្សាវរីយ៍ដែលយើងរក្សាទុក",
                )}
              />
              <p>
                {t(
                  copy(
                    "The small moments are often the ones that stay forever.",
                    "ពេលវេលាតូចៗ ជាញឹកញាប់ជាពេលវេលាដែលនៅជាមួយយើងជារៀងរហូត។",
                  ),
                  language,
                )}
              </p>
            </div>
            <div className="memory-grid">
              {[
                {
                  image: '/photo8.jpeg',
                  date: "09 · May · 2026",
                  title: copy("Our first adventure", "ដំណើរផ្សងព្រេងដំបូង"),
                  text: copy(
                    "Our first trip to Kampot — a beautiful memory we’ll always cherish..",
                    "ចុងសប្តាហ៍មួយ និងហេតុផលថ្មីៗរាប់ពាន់សម្រាប់ញញឹម។",
                  ),
                },
                {
                  image: '/photo9.jpeg',
                  date: "Comming Soon",
                  title: copy("Siem Reap", "សៀមរាប"),
                  text: copy(
                    "Our next plan for another year.",
                    "ការដើរមើលថ្ងៃលិច បានក្លាយជាទម្លាប់ដែលយើងចូលចិត្ត។",
                  ),
                },
                {
                  image: '/photo10.jpeg',
                  date: "Comming Soon",
                  title: copy("Around the World ", "ជុំវិញពិភពលោក — ឆាប់ៗនេះ"),
                  text: copy(
                    "Exploring the world together.",
                    "កន្លែងណាក៏ដោយដែលមានយើងពីរនាក់ នោះគឺជាផ្ទះ។",
                  ),
                },
              ].map((item, i) => (
                <motion.article
                  className="memory-card"
                  key={`${item.title}-${i}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <img src={item.image} alt="A treasured memory" />
                  <div>
                    <span>{item.date}</span>
                    <h3>{t(item.title, language)}</h3>
                    <p>{t(item.text, language)}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="countdown section">
            <div className="countdown-copy">
              <p className="eyebrow">We have been together</p>
              <h2>Counting down to another year of us</h2>
              <p>Every second is one more little moment to look forward to.</p>
            </div>
            <div className="timer">
              {[
                [years, "Years"],
                [months, "Months"],
                [days, "Days"],
                [hours, "Hours"],
                [minutes, "Minutes"],
                [seconds, "Seconds"],
              ].map(([value, label]) => (
                <div className="timer-unit" key={label}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="gallery" className="gallery section">
            <div className="heart-shower" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -35, rotate: -20 }}
                  whileInView={{ opacity: [0, 1, 1, 0], y: 280, rotate: 35 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 2.2,
                    delay: index * 0.12,
                    ease: "easeInOut",
                  }}
                >
                  ♥
                </motion.span>
              ))}
            </div>
            <SectionTitle
              language={language}
              eyebrow={copy("In frames", "ក្នុងរូបភាព")}
              title={copy("A gallery of us", "វិចិត្រសាលរបស់យើង")}
            />
            <div
              className={`gallery-book ${galleryOpen ? "is-open" : ""}`}
              onClick={() => setGalleryOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setGalleryOpen((open) => !open);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={galleryOpen ? "Close photo book" : "Open photo book"}
            >
              <div className="gallery-pages">
                <div className="gallery-page-mark" aria-hidden="true">✦</div>
                <div className="gallery-grid">
                  {heartGallery.slice(0, 12).map((src, index) => (
                    <button
                      className="gallery-photo"
                      key={`${src}-${index}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setLightbox(index);
                      }}
                      aria-label={`Open memory ${index + 1}`}
                    >
                      <img
                        src={src}
                        alt={`Memory ${index + 1}`}
                        width={1080}
                        height={1080}
                      />
                      <span><Heart size={14} fill="currentColor" /></span>
                    </button>
                  ))}
                </div>
              </div>
              {galleryOpen && (
                <div className="gallery-hearts" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, index) => (
                    <span
                      key={index}
                      style={{
                        left: `${8 + (index / 13) * 84}%`,
                        animationDelay: `${index * 0.08}s`,
                        animationDuration: `${1.5 + (index % 4) * 0.18}s`,
                      }}
                    >
                      ♥
                    </span>
                  ))}
                </div>
              )}
              <div className="gallery-cover">
                <img className="gallery-cover-photo" src="/photo2.jpeg" alt="" />
                <div className="gallery-cover-shade" />
                <div className="gallery-cover-border" />
                <div className="gallery-cover-content">
                  <Heart size={34} fill="currentColor" />
                  <p className="eyebrow">OUR MEMORIES</p>
                  <h3>A gallery of us</h3>
                  <small>{galleryOpen ? "Tap to close" : "Tap to open"}</small>
                </div>
              </div>
            </div>
          </section>

          <section id="letter" className="letter section">
            <motion.div
              className={`letter-card ${letterOpen ? "is-open" : ""} ${letterUnlocked ? "is-unlocked" : ""}`}
              initial={{ opacity: 0, y: 28, rotateX: 22 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={() => {
                if (!letterUnlocked) return;
                setLetterOpen((open) => !open);
              }}
              onKeyDown={(event) => {
                if (!letterUnlocked) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setLetterOpen((open) => !open);
                }
              }}
              role="button"
              tabIndex={letterUnlocked ? 0 : -1}
              aria-label={
                letterUnlocked
                  ? letterOpen
                    ? "Close love letter"
                    : "Open love letter"
                  : "Locked love letter"
              }
            >
              {letterUnlocked && letterOpen && (
                <div className="letter-hearts" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, index) => ({
                    left: `${(index / 13) * 100}%`,
                    delay: `${index * 0.08}s`,
                    duration: `${1.5 + (index % 5) * 0.2}s`,
                    drift: `${(index % 2 === 0 ? 1 : -1) * (18 + index * 6)}px`,
                  })).map((heart, index) => (
                    <span
                      key={index}
                      className="letter-heart"
                      style={{
                        left: heart.left,
                        animationDelay: heart.delay,
                        animationDuration: heart.duration,
                        ["--drift" as any]: heart.drift,
                      }}
                    >
                      ♥
                    </span>
                  ))}
                </div>
              )}

              {!letterUnlocked && (
                <div className="letter-lock" aria-label="Enter password to unlock">
                  <div className="letter-lock-box">
                    <div className="lock-heart">
                      <Heart size={22} fill="currentColor" />
                    </div>
                    <p className="eyebrow">SURPRISE LETTER</p>
                    <h3>Enter our special day</h3>
                    <form
                      className="letter-lock-form"
                      onSubmit={(event) => {
                        event.preventDefault();
                        if (letterPassword === "071225") {
                          setLetterUnlocked(true);
                          setLetterOpen(true);
                          setLetterPassword("");
                        } else {
                          setLetterPassword("");
                        }
                      }}
                    >
                      <input
                        type="password"
                        value={letterPassword}
                        onChange={(event) => setLetterPassword(event.target.value)}
                        placeholder="Password"
                        aria-label="Our special day"
                        maxLength={6}
                      />
                      <button type="submit">Unlock</button>
                    </form>
                  </div>
                </div>
              )}

              <div className="letter-paper">
                <div className="letter-paper-inner">
                  <div className="letter-seal">
                    <Heart size={17} fill="currentColor" />
                  </div>
                  <p className="eyebrow">A LETTER FROM MY HEART</p>
                  <h2>
                    {t(
                      copy(
                        "To my favorite person,",
                        "ជូនចំពោះមនុស្សដែលខ្ញុំស្រឡាញ់បំផុត",
                      ),
                      language,
                    )}
                  </h2>
                  <p className="letter-body">
                    {t(
                      copy(
                        `Our story started on Discord, and from that simple hello, everything beautiful began. We shared stories, laughter, and little moments that slowly turned into something real and lasting.

Then came our first movie together, our first trip, and the day I confessed my feelings to you. Since then, every day with you has felt like a gift.

I am grateful for your love, your patience, and the way you make life feel lighter. I want to keep choosing you, keep growing with you, and keep making memories together.

Thank you for being my favorite person and my home.`,
                        "អរគុណសម្រាប់គ្រប់ស្នាមញញឹម គ្រប់អនុស្សាវរីយ៍ គ្រប់ការសន្ទនា និងគ្រប់ពេលវេលាដែលយើងបានចែករំលែក។ ដំណើររបស់យើងមិនល្អឥតខ្ចោះទេ ប៉ុន្តែគ្រប់ពេលវេលាជាមួយអ្នក គឺជាអ្វីដែលខ្ញុំថែរក្សា។ រីករាយខួបស្នេហា សម្លាញ់របស់ខ្ញុំ។ ខ្ញុំសង្ឃឹមថា យើងនឹងបន្តបង្កើតអនុស្សាវរីយ៍ដ៏ស្រស់ស្អាតជាមួយគ្នា។",
                      ),
                      language,
                    )}
                  </p>
                  <div className="letter-sign">
                    Forever yours,
                    <br />
                    <strong>Sothireach</strong>
                  </div>
                </div>
              </div>

              <div className={`letter-cover ${letterOpen ? "is-open" : ""}`} aria-hidden="true">
                <div className="letter-cover-inner">
                  <div className="letter-cover-flap" />
                  <div className="letter-cover-label">
                    <span className="eyebrow">A LETTER FROM MY HEART</span>
                    <div className="cover-heart">
                      <Heart size={22} fill="currentColor" />
                    </div>
                    <small>{letterOpen ? "Opened with love" : "Open with love"}</small>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer>
          <Ornament small />
          <p>Made with love in Cambodia · {new Date().getFullYear()}</p>
          <span>Love · Always</span>
        </footer>
        <audio
          ref={audioRef}
          src="/music/anniversary.mp3"
          loop
          preload="none"
        />
        <button
          className={`music-player ${musicPlaying ? "playing" : ""}`}
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? <Pause size={17} /> : <Music2 size={17} />}
          <span>{musicPlaying ? "Playing our song" : "Our song"}</span>
        </button>
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <button
                className="lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Close gallery"
              >
                <X />
              </button>
              <button
                className="lightbox-arrow left"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(
                    (lightbox - 1 + heartGallery.length) % heartGallery.length,
                  );
                }}
                aria-label="Previous image"
              >
                <ArrowLeft />
              </button>
              <motion.img
                key={lightbox}
                src={heartGallery[lightbox]}
                alt={`Memory ${lightbox + 1}`}
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="lightbox-arrow right"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((lightbox + 1) % heartGallery.length);
                }}
                aria-label="Next image"
              >
                <ArrowRight />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
