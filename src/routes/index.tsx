import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, Mail, Globe, MessageCircle, ArrowRight, Send, ChevronRight, Plus } from "lucide-react";

import heroImg from "@/assets/client/client-05.jpeg";
import aboutImg from "@/assets/art/design-01.jpeg";
import logoUrl from "@/assets/logo/galeria_logo.png";

// Real photos auto-imported from the asset folders — drop a new file into
// src/assets/art (designs for sale) or src/assets/client (collector photos)
// and it wires itself up here, sorted by filename.
const designImages = Object.entries(
  import.meta.glob("../assets/art/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string);

const clientImages = Object.entries(
  import.meta.glob("../assets/client/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string)
  .filter((src) => src !== heroImg);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galeria Art & More — Handcrafted Sri Lankan Art Studio" },
      { name: "description", content: "Authentic handcrafted canvas paintings, sketches and local art at our walk-in gallery in Hambantota, Sri Lanka. Visit us to browse and buy in person." },
      { property: "og:title", content: "Galeria Art & More — Handcrafted Sri Lankan Art" },
      { property: "og:description", content: "Handcrafted Sri Lankan Art, Straight from the Heart. Visit our gallery in Hambantota, Sri Lanka." },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "gallery", label: "Gallery" },
  { id: "clients", label: "Collectors" },
  { id: "orders", label: "Visit Us" },
  { id: "contact", label: "Contact" },
];

const WHATSAPP = "94703673130";

function Index() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm" : "bg-gradient-to-b from-charcoal/55 to-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button onClick={() => scrollTo("home")} className="group flex items-center" aria-label="Galeria Art & More — home">
            <Logo className="h-14 w-auto transition group-hover:scale-105 sm:h-16" />
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    active === l.id
                      ? scrolled
                        ? "text-primary"
                        : "text-cream"
                      : scrolled
                        ? "text-charcoal/70 hover:text-charcoal"
                        : "text-cream/80 hover:text-cream"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full transition-all duration-300 ${scrolled ? "bg-primary" : "bg-cream"} ${
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

          <button onClick={() => setMobileOpen((v) => !v)} className={`lg:hidden p-2 transition-colors ${scrolled ? "text-charcoal" : "text-cream"}`} aria-label="Menu">
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
        <img src={heroImg} alt="Visitors browsing handcrafted paintings at the Galeria Art & More open-air gallery in Hambantota, Sri Lanka" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1280} />
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
              An independent home-studio and open-air gallery in the warm coastal town of Hambantota — crafting
              canvas paintings, sketches and local art. Come visit us to browse and take a piece home.
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
                Plan Your Visit
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
              <img src={aboutImg} alt="A handcrafted original painting by Galeria Art & More" className="h-full w-full object-cover" loading="lazy" width={1200} height={1400} />
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
              We don't run a factory — we welcome guests to the studio, take time with every visitor, and love
              sharing the story behind each piece in person.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { k: "Original", v: "One-of-a-kind pieces" },
                { k: "Authentic", v: "Made in Sri Lanka" },
                { k: "Walk-in", v: "Visit our gallery" },
                { k: "Personal", v: "Meet the artist" },
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
              Browse a selection of original works — canvas paintings, watercolours and sketches. Each piece is
              one-of-a-kind and waiting to be seen in person at our gallery in Hambantota.
            </p>
          </div>

          {/* Masonry */}
          <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {designImages.map((src, idx) => (
              <button
                key={src}
                onClick={() => setLightbox(idx)}
                className="group relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition hover:shadow-xl"
              >
                <img src={src} alt={`Original artwork ${idx + 1} by Galeria Art & More`} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center gap-2 p-5 text-cream opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium tracking-wide">View piece</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTORS */}
      <section id="clients" className="relative px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">— Happy Collectors</p>
            <h2 className="font-display text-4xl font-medium leading-tight text-charcoal sm:text-5xl lg:text-6xl text-balance">
              Loved by visitors from around the world.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              A few of the wonderful people who've welcomed our art into their homes — from right here in
              Hambantota to homes across the globe.
            </p>
          </div>

          <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {clientImages.map((src, idx) => (
              <div
                key={src}
                className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <img src={src} alt={`A happy Galeria Art & More collector ${idx + 1}`} loading="lazy" className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US */}
      <section id="orders" className="relative overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">— Visit Us</p>
            <h2 className="font-display text-4xl font-medium leading-tight text-charcoal sm:text-5xl lg:text-6xl text-balance">
              Come and find us in Hambantota.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              We're a walk-in studio gallery — drop by to browse the full collection and take your favourite
              piece home the same day. No shipping, no online orders, just art you can see and hold.
            </p>
          </div>

          <div className="relative mt-20 grid gap-10 lg:grid-cols-3 lg:gap-8">
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
            {[
              { n: "01", t: "Find Us in Hambantota", d: "We're tucked into a quiet lane — message us on WhatsApp anytime and we'll happily share directions and our opening hours." },
              { n: "02", t: "Browse in Person", d: "Take your time with the full collection and see the textures, colours and detail of every original up close." },
              { n: "03", t: "Take It Home", d: "Found the one? Purchase it on the spot and carry home a piece of Sri Lanka — no shipping, no waiting." },
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
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Galeria, I'd love to visit your gallery — could you share directions and your opening hours?")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90"
            >
              <MessageCircle className="h-4 w-4" /> Message Us for Directions
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
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
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
                  href="https://maps.app.goo.gl/rJ2qazp77nh3rxSQ8"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-charcoal/85"
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
                const msg = `Hi Galeria, I'm ${fd.get("name")}.%0A%0AInterested in: ${fd.get("artwork")}%0A%0A${fd.get("message")}`;
                window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
              }}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm lg:col-span-3"
            >
              <h3 className="font-display text-2xl font-semibold text-charcoal">Send an Inquiry</h3>
              <p className="mt-1 text-sm text-muted-foreground">We typically reply within a day, often the same hour.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field name="name" label="Your Name" placeholder="Jane Doe" required />
                <Field name="email" label="Email" type="email" placeholder="jane@example.com" required />
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    I'd like to ask about
                  </label>
                  <select
                    name="artwork"
                    defaultValue=""
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-charcoal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="" disabled>Select a topic…</option>
                    <option>Canvas Paintings</option>
                    <option>Sketches</option>
                    <option>Local Art & More</option>
                    <option>Planning a visit</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Ask us about a piece, our opening hours, or how to find the gallery…"
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
          <div className="flex items-center">
            <span className="inline-flex rounded-xl bg-cream px-4 py-2.5 shadow-sm">
              <Logo className="h-9 w-auto" />
            </span>
          </div>
          <p className="text-center text-sm text-cream/60 sm:text-right">
            © 2026 Galeria Art & More. Beautifully Handcrafted in Hambantota, Sri Lanka.
            <br className="hidden sm:inline" /> Visit our gallery — we'd love to welcome you.
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
              <img src={designImages[lightbox]} alt={`Original artwork ${lightbox + 1} by Galeria Art & More`} className="h-full max-h-[90vh] w-full object-contain" />
            </div>
            <div className="flex flex-col justify-between p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Original Artwork</p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-charcoal">A Handcrafted Original</h3>
                <dl className="mt-8 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Origin</dt>
                    <dd className="font-medium text-charcoal">Hambantota, Sri Lanka</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Availability</dt>
                    <dd className="font-medium text-charcoal">View &amp; buy in person</dd>
                  </div>
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  A one-of-a-kind original. Visit our gallery in Hambantota to see it in person and take it
                  home — message us on WhatsApp for pricing and opening hours.
                </p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi Galeria, I'm interested in a piece from your gallery (piece #${lightbox + 1}).`)}`}
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
    </div>
  );
}

function Logo({ className }: { className?: string }) {
  return <img src={logoUrl} alt="Galeria Art & More" className={className} />;
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
