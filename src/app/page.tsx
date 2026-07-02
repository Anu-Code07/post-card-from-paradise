import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/landing/HeroSection";
import { BRAND_BYLINE, BRAND_NAME } from "@/lib/brand";
import { HERO_IMAGES, STEP_IMAGES, STYLE_IMAGES } from "@/lib/landing-images";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ctaHref = user ? "/create" : "/signup";

  const FEATURED = [
    {
      name: "Copenhagen Minimal",
      desc: "Clean lines & architectural focus",
      image: STYLE_IMAGES.copenhagen.url,
      imageAlt: STYLE_IMAGES.copenhagen.alt,
    },
    {
      name: "Retro Summer",
      desc: "Warm grain & psychedelic swirls",
      image: STYLE_IMAGES.retro.url,
      imageAlt: STYLE_IMAGES.retro.alt,
    },
    {
      name: "L'Ancienne",
      desc: "French editorial & botanical details",
      image: STYLE_IMAGES.vintage.url,
      imageAlt: STYLE_IMAGES.vintage.alt,
    },
  ];

  const HOW_IT_WORKS_STEPS = [
    {
      step: "01",
      title: "Design your layout",
      mobileTitle: "Capture & Upload",
      desc: "Choose from editorial templates or start blank. Add photos, filters, and stamps.",
      mobileDesc: "Upload moments from your camera roll.",
      image: STEP_IMAGES.design.url,
      mobileImage: STEP_IMAGES.capture.url,
      imageAlt: STEP_IMAGES.design.alt,
      mobileImageAlt: STEP_IMAGES.capture.alt,
      tone: "paper-bento--cream",
      washi: "left" as const,
    },
    {
      step: "02",
      title: "Pen a message",
      mobileTitle: "Design Editorially",
      desc: "Real handwriting fonts that feel personal.",
      mobileDesc: "Boutique templates and serif typography.",
      image: STEP_IMAGES.write.url,
      imageAlt: STEP_IMAGES.write.alt,
      tone: "paper-bento--stone",
    },
    {
      step: "03",
      title: "Share globally",
      mobileTitle: "Share the Link",
      desc: "Publish and get a unique link to send anywhere.",
      mobileDesc: "Publish and send a unique URL worldwide.",
      image: STEP_IMAGES.share.url,
      imageAlt: STEP_IMAGES.share.alt,
      tone: "paper-bento--peach",
    },
    {
      step: "04",
      title: BRAND_NAME,
      mobileTitle: BRAND_NAME,
      desc: "Handcrafted digital postcards — memories worth keeping.",
      mobileDesc: "Handcrafted digital postcards — memories worth keeping.",
      image: STEP_IMAGES.brand.url,
      imageAlt: STEP_IMAGES.brand.alt,
      tone: "paper-bento--linen",
      washi: "right" as const,
      brand: true,
    },
  ];

  return (
    <>
      <HeroSection ctaHref={ctaHref} heroImages={HERO_IMAGES} />

      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="container-app">
          <div className="hidden md:flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-label-sm text-secondary tracking-widest mb-3 block">
                The Process
              </span>
              <h2 className="text-headline-lg font-serif">
                From digital canvas to their physical mailbox.
              </h2>
            </div>
            <p className="text-on-surface-variant max-w-xs text-sm">
              Upload a photo, write a message, pick a style, and share with a
              unique link anyone can open.
            </p>
          </div>

          <div className="md:hidden text-center mb-12">
            <h2 className="text-headline-lg font-serif text-primary mb-3">
              How It Works
            </h2>
            <p className="text-on-surface-variant">
              A seamless three-step journey from screen to shared memory.
            </p>
          </div>

          {/* Desktop bento */}
          <div className="hidden md:grid grid-cols-12 gap-5 lg:gap-6">
            <div className="col-span-8 paper-bento paper-bento--cream min-h-[400px] p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-5 left-8 w-16 h-5 layout-washi -rotate-6 opacity-90 z-[2]" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] gap-6 lg:gap-8 h-full items-center">
                <div className="min-w-0">
                  <span className="font-serif text-5xl opacity-20 block mb-4">01</span>
                  <h3 className="font-serif text-xl mb-2">{HOW_IT_WORKS_STEPS[0].title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed max-w-[16rem] lg:max-w-[14rem]">
                    {HOW_IT_WORKS_STEPS[0].desc}
                  </p>
                </div>
                <div className="relative h-[220px] sm:h-[260px] lg:h-[280px] w-full paper-photo-mat rounded-2xl shrink-0 overflow-hidden">
                  <Image
                    src={HOW_IT_WORKS_STEPS[0].image}
                    alt={HOW_IT_WORKS_STEPS[0].imageAlt}
                    fill
                    className="object-cover rounded-[0.65rem]"
                    sizes="(max-width: 1024px) 50vw, 560px"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-4 paper-bento paper-bento--stone h-[400px] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="font-serif text-5xl opacity-20 block mb-4">02</span>
                <h3 className="font-serif text-xl mb-2">{HOW_IT_WORKS_STEPS[1].title}</h3>
                <p className="text-on-surface-variant text-sm">{HOW_IT_WORKS_STEPS[1].desc}</p>
              </div>
              <div className="relative h-36 lg:h-40 w-full paper-photo-mat rounded-xl shrink-0 overflow-hidden z-10">
                <Image
                  src={HOW_IT_WORKS_STEPS[1].image}
                  alt={HOW_IT_WORKS_STEPS[1].imageAlt}
                  fill
                  className="object-cover rounded-[0.65rem]"
                  sizes="320px"
                />
              </div>
            </div>

            <div className="col-span-4 paper-bento paper-bento--peach h-[400px] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="font-serif text-5xl opacity-20 block mb-4">03</span>
                <h3 className="font-serif text-xl mb-2">{HOW_IT_WORKS_STEPS[2].title}</h3>
                <p className="text-on-surface-variant text-sm">{HOW_IT_WORKS_STEPS[2].desc}</p>
              </div>
              <div className="relative h-36 lg:h-40 w-full paper-photo-mat rounded-xl shrink-0 overflow-hidden z-10">
                <Image
                  src={HOW_IT_WORKS_STEPS[2].image}
                  alt={HOW_IT_WORKS_STEPS[2].imageAlt}
                  fill
                  className="object-cover rounded-[0.65rem]"
                  sizes="320px"
                />
              </div>
            </div>

            <div className="col-span-8 paper-bento paper-bento--linen h-[400px] p-8 lg:p-10 flex items-center gap-8 lg:gap-10 relative overflow-hidden">
              <div className="absolute top-5 right-12 w-14 h-5 layout-washi rotate-[10deg] opacity-85 z-[2]" />
              <div className="w-1/2 relative z-10 min-w-0">
                <span className="font-serif text-5xl opacity-20 block mb-4">04</span>
                <h3 className="font-serif text-xl mb-1">{BRAND_NAME}</h3>
                <p className="text-label-sm text-secondary tracking-wide mb-2">{BRAND_BYLINE}</p>
                <p className="text-on-surface-variant text-sm">{HOW_IT_WORKS_STEPS[3].desc}</p>
              </div>
              <div className="w-1/2 h-[88%] relative paper-photo-mat rotate-[1.5deg] z-10 overflow-hidden shrink-0">
                <Image
                  src={HOW_IT_WORKS_STEPS[3].image}
                  alt={HOW_IT_WORKS_STEPS[3].imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 40vw, 480px"
                />
              </div>
            </div>
          </div>

          {/* Mobile steps */}
          <div className="md:hidden space-y-5">
            {HOW_IT_WORKS_STEPS.map(
              ({ step, mobileTitle, mobileDesc, mobileImage, image, imageAlt, mobileImageAlt, tone, brand }) => (
                <div key={step} className={`paper-bento ${tone} p-5 sm:p-6 overflow-hidden`}>
                  <span className="font-serif text-4xl opacity-20 block mb-3">{step}</span>
                  <div className="relative h-44 sm:h-48 w-full paper-photo-mat rounded-xl mb-5 overflow-hidden">
                    <Image
                      src={mobileImage ?? image}
                      alt={mobileImageAlt ?? imageAlt}
                      fill
                      className="object-cover rounded-[0.65rem]"
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                  </div>
                  <h3 className="font-serif text-xl mb-2">{mobileTitle}</h3>
                  {brand && (
                    <p className="text-label-sm text-secondary tracking-wide mb-2">{BRAND_BYLINE}</p>
                  )}
                  <p className="text-on-surface-variant text-sm leading-relaxed">{mobileDesc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="container-app py-16 md:py-24">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-headline-lg font-serif mb-3">Curated Styles</h2>
          <p className="text-on-surface-variant text-sm md:text-base">
            Styles designed by world-class typographers and photographers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {FEATURED.map((item) => (
            <div key={item.name} className="flex flex-col gap-3 group">
              <div className="paper-bento paper-bento--linen aspect-[4/5] p-2 sm:p-2.5">
                <div className="relative w-full h-full paper-photo-mat rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-serif text-lg">{item.name}</h4>
                <p className="text-label-sm text-on-surface-variant">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 md:py-24 text-center">
        <div className="container-app">
          <h2 className="text-display-lg font-serif text-on-primary mb-6 md:mb-8 max-w-2xl mx-auto">
            Ready to send something meaningful?
          </h2>
          <Link
            href={ctaHref}
            className="bg-on-primary text-primary px-8 md:px-12 py-4 md:py-5 rounded font-serif text-lg md:text-xl hover:bg-surface transition-colors inline-block active:scale-[0.98]"
          >
            {user ? "Create a Postcard" : "Start Your First Postcard"}
          </Link>
          <p className="text-on-primary/60 mt-6 text-label-sm">
            Free to create. Share with anyone.
          </p>
        </div>
      </section>

      <footer className="container-app py-12 border-t border-primary/8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="font-serif font-bold text-primary block">{BRAND_NAME}</span>
            <span className="text-label-sm text-on-surface-variant">{BRAND_BYLINE}</span>
          </div>
          <p className="text-label-sm text-on-surface-variant">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
        </div>
      </footer>
    </>
  );
}
