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
  "photo-1519225421980-715cb0215aed",
  "photo-1511285560929-80b456fea0bc",
  "photo-1544078751-58fee2d8a03b",
  "photo-1519741497674-611481863552",
  "photo-1523438885200-e635ba2c371e",
  "/photo6.jpeg",
  "/photo7.jpeg",
  "photo-1474552226712-ac0f0961a954",
  "photo-1520854221256-17451cc331bf",
  "photo-1529634597503-139d3726fed5",
  "photo-1494774157365-9e04c6720e47",
  "photo-1518199266791-5375a83190b7",
  "photo-1535254973040-607b474cb50d",
  "photo-1501901609772-df0848060b33",
  "photo-1516589178581-6cd7833ae3b2",
  "photo-1517841905240-472988babdf9",
  "photo-1522673607200-164d1b6ce486",
  "photo-1525772764200-be829a350797",
  "photo-1504159506876-f8338247a14a",
  "photo-1529333166437-7750a6dd5a70",
  "photo-1542810634-71277d95dcbb",
  "photo-1529626455594-4ff0802cfb7e",
  "photo-1534528741775-53994a69daeb",
  "photo-1524504388940-b1c1722653e1",
  "photo-1531123897727-8f129e1688ce",
  "photo-1529139574466-a303027c1d8b",
  "photo-1515886657613-9f3515b0c78f",
  "photo-1539109136881-3be0616acf4b",
  "photo-1496747611176-843222e1e57c",
  "photo-1483985988355-763728e1935b",
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
      "Two paths crossed, and a quiet hello became the beginning of everything.",
      "ផ្លូវពីរបានជួបគ្នា ហើយពាក្យសួរសុខទុក្ខដ៏សាមញ្ញ បានក្លាយជាការចាប់ផ្តើមនៃអ្វីៗទាំងអស់។",
    ),
    date: "12 · 04 · 2023",
    image: "/photo2.jpeg",
  },
  {
    number: "02",
    title: copy("First Memory", "អនុស្សាវរីយ៍ដំបូង"),
    body: copy(
      "A small café, a long conversation, and the feeling that time had slowed down for us.",
      "ហាងកាហ្វេតូចមួយ ការសន្ទនាដ៏យូរ និងអារម្មណ៍ថាពេលវេលាបានឈប់សម្រាប់យើង។",
    ),
    date: "21 · 04 · 2023",
    image: '/photo5.jpeg',
  },
  {
    number: "03",
    title: copy("Growing Together", "ធំឡើងជាមួយគ្នា"),
    body: copy(
      "Some days were golden, some were tender. Every one of them brought us closer home.",
      "មានថ្ងៃខ្លះពោរពេញដោយពន្លឺ និងថ្ងៃខ្លះទន់ភ្លន់។ គ្រប់ថ្ងៃនាំយើងឲ្យកាន់តែជិតស្និទ្ធ។",
    ),
    date: "08 · 08 · 2023",
    image: '/photo6.jpeg',
  },
  {
    number: "04",
    title: copy("Today, Always", "ថ្ងៃនេះ និងជានិច្ច"),
    body: copy(
      "Here we are, still choosing each other, with a whole lifetime of beautiful chapters ahead.",
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
  const [now, setNow] = useState(() => Date.now());
  const relationshipStart = useMemo(() => new Date("2025-12-07T00:00:00"), []);
  const anniversary = useMemo(() => new Date("2027-04-12T19:00:00"), []);
  const remaining = Math.max(0, anniversary.getTime() - now);
  const relationshipDays = Math.max(
    1,
    Math.floor((now - relationshipStart.getTime()) / 86400000) + 1,
  );
  const years = Math.floor(remaining / 31557600000);
  const months = Math.floor((remaining % 31557600000) / 2629800000);
  const days = Math.floor((remaining % 2629800000) / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

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
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              onClick={() => setOpened(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpened(true)}
            >
              <div className="envelope-flap" />
              <div className="envelope-pattern" />
              <div className="envelope-content">
                <Ornament />
                <p className="eyebrow">AN ANNIVERSARY INVITATION</p>
                <h1>
                  Sothireach
                  <br />
                  <em>&</em> Sufen
                </h1>
                <p className="intro-khmer">
                  Celebrating another beautiful year together
                </p>
                <div className="seal">
                  <Heart size={16} fill="currentColor" />
                </div>
                <span className="tap">
                  Tap to open <ChevronDown size={15} />
                </span>
              </div>
            </motion.div>
            <button className="skip" onClick={() => setOpened(true)}>
              Skip intro <ArrowRight size={15} />
            </button>
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
              <p className="eyebrow">12 APRIL 2026 · OUR ANNIVERSARY</p>
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
                      "We met in the most ordinary way, and somehow that ordinary moment became our favorite story. Since then, we have collected little wonders: quiet mornings, unexpected adventures, and the kind of laughter that makes a home wherever we are.",
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
                  "Our goal to compete a lifetime",
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
                  date: "18 · 06 · 2023",
                  title: copy("Our first adventure", "ដំណើរផ្សងព្រេងដំបូង"),
                  text: copy(
                    "A weekend away, and a thousand new reasons to smile.",
                    "ចុងសប្តាហ៍មួយ និងហេតុផលថ្មីៗរាប់ពាន់សម្រាប់ញញឹម។",
                  ),
                },
                {
                  image: '/photo9.jpeg',
                  date: "Comming Soon",
                  title: copy("Siem Reap", "សៀមរាប"),
                  text: copy(
                    "Sunset walks became our favorite kind of ritual.",
                    "ការដើរមើលថ្ងៃលិច បានក្លាយជាទម្លាប់ដែលយើងចូលចិត្ត។",
                  ),
                },
                {
                  image: '/photo10.jpeg',
                  date: "Comming Soon",
                  title: copy("Around the World ", "ជុំវិញពិភពលោក — ឆាប់ៗនេះ"),
                  text: copy(
                    "Wherever we are together, that is home.",
                    "កន្លែងណាក៏ដោយដែលមានយើងពីរនាក់ នោះគឺជាផ្ទះ។",
                  ),
                },
              ].map((item, i) => (
                <motion.article
                  className="memory-card"
                  key={item.date}
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
              <p className="eyebrow">THE NEXT CHAPTER</p>
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
            <div className="gallery-grid">
              {heartGallery.map((src, index) => (
                <motion.button
                  className={`gallery-item gallery-${index % 5}`}
                  key={src}
                  onClick={() => setLightbox(index)}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 5) * 0.04 }}
                >
                  <img src={src} alt={`Memory ${index + 1}`} />
                  <span>
                    <Heart size={16} fill="currentColor" />
                  </span>
                </motion.button>
              ))}
            </div>
          </section>

          <section id="letter" className="letter section">
            <div className="letter-card">
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
                    "Thank you for every smile, every memory, every conversation, and every moment we have shared. Our journey is not perfect, but every moment with you is something I treasure. Happy Anniversary, my love. I hope we continue creating beautiful memories together.",
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
