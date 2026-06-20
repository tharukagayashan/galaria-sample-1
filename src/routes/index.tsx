import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, Mail, Globe, MessageCircle, ArrowRight, Palette, Send, ChevronRight } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galeria Art & More — Handcrafted Sri Lankan Art Studio" },
      { name: "description", content: "Authentic handcrafted canvas paintings, sketches and local artistic creations from a home-studio in Hambantota, Sri Lanka. Worldwide shipping." },
      { property: "og:title", content: "Galeria Art & More — Handcrafted Sri Lankan Art" },
      { property: "og:description", content: "Handcrafted Sri Lankan Art, Straight from the Heart. Custom orders for collectors worldwide." },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Category = "all" | "canvas" | "sketch" | "local";

const artworks: { src: string; title: string; medium: string; dims: string; category: Exclude<Category, "all"> }[] = [
  { src: art1, title: "Guardian of the Grove", medium: "Acrylic on Canvas", dims: '24" × 30"', category: "canvas" },
  { src: art2, title: "Kandyan Reverie", medium: "Graphite on Paper", dims: '12" × 16"', category: "sketch" },
  { src: art3, title: "Stilt Fishermen at Dusk", medium: "Oil on Canvas", dims: '28" × 36"', category: "canvas" },
  { src: art4, title: "Lotus Sanctuary", medium: "Watercolor & Ink", dims: '14" × 18"', category: "sketch" },
  { src: art5, title: "Coastal Wanderer", medium: "Acrylic on Canvas", dims: '20" × 20"', category: "canvas" },
  { src: art6, title: "Raksha Mask — Crimson", medium: "Hand-carved Wood", dims: '18" × 24"', category: "local" },
  { src: art7, title: "Yala's Silent Hunter", medium: "Oil on Canvas", dims: '24" × 28"', category: "canvas" },
  { src: art8, title: "The Tea Picker", medium: "Charcoal on Paper", dims: '12" × 16"', category: "sketch" },
];

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "gallery", label: "Gallery" },
  { id: "orders", label: "Custom Orders" },
  { id: "contact", label: "Contact" },
];

const WHATSAPP = "94703673130";

function Index() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const filtered = filter === "all" ? artworks : artworks.filter((a) => a.category === filter);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 group">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-display text-xl font-semibold shadow-sm transition group-hover:scale-105">
              G
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-charcoal">
              Galeria <span className="text-primary">Art & More</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    active === l.id ? "text-primary" : "text-charcoal/70 hover:text-charcoal"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                      active === l.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md"
          >
            Inquire <ArrowRight className="h-4 w-4" />
          </a>

          <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden p-2 text-charcoal" aria-label="Menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <ul className="flex flex-col px-6 py-4">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className={`flex w-full items-center justify-between py-3 text-base font-medium ${
                      active === l.id ? "text-primary" : "text-charcoal/80"
                    }`}
                  >
                    {l.label}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen w-full overflow-hidden">
        <img src={heroImg} alt="Sri Lankan art studio with handcrafted canvas paintings" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/30 to-charcoal/70" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cream backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-ochre" />
              Hambantota · Sri Lanka
            </div>
            <h1 className="font-display text-5xl font-medium leading-[0.95] tracking-tight text-cream sm:text-7xl lg:text-8xl text-balance">
              Galeria <em className="not-italic text-ochre">Art</em> & More
            </h1>
            <p className="mt-8 max-w-xl font-display text-2xl italic text-cream/90 lg:text-3xl">
              Handcrafted Sri Lankan Art, Straight from the Heart.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 lg:text-lg">
              An independent home-studio nestled in the warm coastal town of Hambantota — crafting canvas paintings,
              sketches and bespoke local art for collectors across the world. Worldwide shipping available.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("gallery")}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
              >
                Explore the Gallery
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-cream/5 px-7 py-3.5 text-sm font-medium tracking-wide text-cream backdrop-blur-md transition hover:bg-cream/15"
              >
                Commission a Piece
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-ochre/20 to-primary/10 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-frame)" }}>
              <img src={aboutImg} alt="Sri Lankan artist at her home studio easel" className="h-full w-full object-cover" loading="lazy" width={1200} height={1400} />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-border bg-card px-6 py-5 shadow-xl sm:block">
              <p className="font-display text-3xl font-semibold text-primary">15+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Years of craft</p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">— Our Story</p>
            <h2 className="font-display text-4xl font-medium leading-tight text-charcoal sm:text-5xl lg:text-6xl text-balance">
              A small home-studio with an island-sized heart.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/75">
              Tucked into a quiet lane in Hambantota, Galeria Art & More is the private studio of an independent
              Sri Lankan artist whose hands have shaped pigment, paper and timber for over fifteen years. Every
              canvas, sketch and carved piece is born from the colours, traditions and warmth of our island.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/75">
              We don't run a factory — we welcome guests, take time with each commission, and ship our work
              with care to homes around the world.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { k: "Bespoke", v: "Commissioned for you" },
                { k: "Authentic", v: "Made in Sri Lanka" },
                { k: "Worldwide", v: "Global shipping" },
                { k: "Personal", v: "Direct from the artist" },
              ].map((b) => (
                <div key={b.k} className="border-l-2 border-primary/40 pl-4">
                  <p className="font-display text-xl font-semibold text-charcoal">{b.k}</p>
                  <p className="text-sm text-muted-foreground">{b.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative px-6 py-24 lg:px-10 lg:py-32" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">— The Gallery</p>
            <h2 className="font-display text-4xl font-medium leading-tight text-charcoal sm:text-5xl lg:text-6xl text-balance">
              A curated collection of island stories.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              Browse a selection of recent works. Each piece is original, one-of-a-kind and available for
              commission in custom sizes.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Masterpieces" },
              { id: "canvas", label: "Canvas Paintings" },
              { id: "sketch", label: "Sketches" },
              { id: "local", label: "Local Art & More" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as Category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium tracking-wide transition ${
                  filter === t.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-charcoal/70 hover:border-primary/40 hover:text-charcoal"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Masonry */}
          <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {filtered.map((a) => {
              const idx = artworks.indexOf(a);
              return (
                <button
                  key={a.title}
                  onClick={() => setLightbox(idx)}
                  className="group relative mb-6 block w-full overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition hover:shadow-xl break-inside-avoid"
                >
                  <img src={a.src} alt={a.title} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-cream opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-xl font-semibold leading-tight">{a.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-cream/70">
                      {a.medium} · {a.dims}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ORDERS */}
      <section id="orders" className="relative overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">— Custom Orders</p>
            <h2 className="font-display text-4xl font-medium leading-tight text-charcoal sm:text-5xl lg:text-6xl text-balance">
              From the studio to your home, anywhere in the world.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              Three simple, personal steps — no middlemen, just a quiet conversation between you and the artist.
            </p>
          </div>

          <div className="relative mt-20 grid gap-10 lg:grid-cols-3 lg:gap-8">
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
            {[
              { n: "01", t: "Browse the Gallery", d: "Explore the collection and find a style — canvas, sketch, or carved local art — that speaks to you." },
              { n: "02", t: "Share Your Reference", d: "Message us on WhatsApp with your inspiration, preferred size, medium and any personal touches you'd love." },
              { n: "03", t: "Shipping or Pickup", d: "Once your piece is complete, we ship worldwide with secure packaging — or welcome you for local pickup in Hambantota." },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="relative z-10 mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full border border-primary/30 bg-background shadow-sm">
                  <span className="font-display text-3xl font-semibold text-primary">{s.n}</span>
                </div>
                <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                  <h3 className="font-display text-2xl font-semibold text-charcoal">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 flex max-w-xl flex-col items-center gap-4 text-center">
            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%20Galeria%2C%20I%27d%20love%20to%20commission%20a%20custom%20piece.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90"
            >
              <MessageCircle className="h-4 w-4" /> Start Your Commission on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-6 py-24 lg:px-10 lg:py-32" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">— Visit & Inquire</p>
            <h2 className="font-display text-4xl font-medium leading-tight text-charcoal sm:text-5xl lg:text-6xl text-balance">
              Come say hello, or send us a note.
            </h2>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h3 className="font-display text-2xl font-semibold text-charcoal">The Home-Studio</h3>
                <ul className="mt-6 space-y-5 text-sm">
                  {[
                    { icon: <Phone className="h-4 w-4" />, label: "Phone / WhatsApp", v: "+94 (70) 367 3130", href: `https://wa.me/${WHATSAPP}` },
                    { icon: <Mail className="h-4 w-4" />, label: "Email", v: "info@galeria.lk", href: "mailto:info@galeria.lk" },
                    { icon: <Globe className="h-4 w-4" />, label: "Website", v: "www.galeria.lk", href: "https://www.galeria.lk" },
                    { icon: <MapPin className="h-4 w-4" />, label: "Address", v: "72/1, Nahimi Road, Sisilasagama, 82000 Hambantota, Sri Lanka" },
                  ].map((i) => (
                    <li key={i.label} className="flex gap-4">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">{i.icon}</span>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">{i.label}</p>
                        {i.href ? (
                          <a href={i.href} target="_blank" rel="noreferrer" className="font-medium text-charcoal hover:text-primary">
                            {i.v}
                          </a>
                        ) : (
                          <p className="font-medium text-charcoal">{i.v}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=72%2F1+Nahimi+Road+Sisilasagama+Hambantota+Sri+Lanka"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-charcoal/85"
                >
                  <MapPin className="h-4 w-4" /> Find Our Home-Studio on Google Maps
                </a>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const msg = `Hi Galeria, I'm ${fd.get("name")} from ${fd.get("country")}.%0A%0AArtwork: ${fd.get("artwork")}%0A%0A${fd.get("message")}`;
                window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
              }}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm lg:col-span-3"
            >
              <h3 className="font-display text-2xl font-semibold text-charcoal">Send an Inquiry</h3>
              <p className="mt-1 text-sm text-muted-foreground">We typically reply within a day, often the same hour.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field name="name" label="Your Name" placeholder="Jane Doe" required />
                <Field name="email" label="Email" type="email" placeholder="jane@example.com" required />
                <Field name="country" label="Country of Origin" placeholder="United Kingdom" />
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Artwork of Interest
                  </label>
                  <select
                    name="artwork"
                    defaultValue=""
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-charcoal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="" disabled>Select a category…</option>
                    <option>Canvas Paintings</option>
                    <option>Sketches</option>
                    <option>Local Art & More</option>
                    <option>Custom / Commission</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about the piece you have in mind, preferred size, and any references…"
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-charcoal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:w-auto"
              >
                <Send className="h-4 w-4" /> Send Inquiry via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-charcoal px-6 py-12 text-cream/80 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg font-semibold">G</span>
            <span className="font-display text-lg text-cream">Galeria Art & More</span>
          </div>
          <p className="text-center text-sm text-cream/60 sm:text-right">
            © 2026 Galeria Art & More. Beautifully Handcrafted in Hambantota, Sri Lanka.
            <br className="hidden sm:inline" /> Worldwide Shipping Enquiries Welcome.
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white shadow-2xl transition hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(37,211,102,0.5)]"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Chat via WhatsApp</span>
      </a>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="grid max-h-[90vh] w-full max-w-5xl gap-6 overflow-hidden rounded-2xl bg-card md:grid-cols-[1.4fr_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-charcoal">
              <img src={artworks[lightbox].src} alt={artworks[lightbox].title} className="h-full max-h-[90vh] w-full object-contain" />
            </div>
            <div className="flex flex-col justify-between p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Original Artwork</p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-charcoal">{artworks[lightbox].title}</h3>
                <dl className="mt-8 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Medium</dt>
                    <dd className="font-medium text-charcoal">{artworks[lightbox].medium}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Dimensions</dt>
                    <dd className="font-medium text-charcoal">{artworks[lightbox].dims}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Origin</dt>
                    <dd className="font-medium text-charcoal">Hambantota, Sri Lanka</dd>
                  </div>
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  One-of-a-kind original. Custom sizes and commissioned variations available — message the artist
                  directly for pricing and worldwide shipping.
                </p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP}?text=Hi%20Galeria%2C%20I%27m%20interested%20in%20%22${encodeURIComponent(artworks[lightbox].title)}%22.`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" /> Inquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* decorative palette icon used to ensure import not tree-shaken if reused later */}
      <Palette className="hidden" />
    </div>
  );
}

function Field({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-charcoal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
