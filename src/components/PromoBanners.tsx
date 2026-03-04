import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const promoBanners = [
  {
    id: "1",
    image: "https://cdn.salla.sa/vygWG/6bcf7bb9-a121-4d4b-aa1b-5a40129e95e9-500x500-wevXPhBBwn1GjUvkKljbTU3HZP8tTkV2aIw3IqBf.jpg",
    title: "شيلان باشمينا",
    subtitle: "خصم 50%",
    link: "/products?category=shawls",
  },
  {
    id: "2",
    image: "https://cdn.salla.sa/vygWG/ff147e25-005e-4e68-850e-70bf00312bf7-500x500-ihrbMCAvUpz6beJyTQVfU53ixW0XNHdZVF4w5Alh.jpg",
    title: "غتر كشميري",
    subtitle: "تشكيلة حصرية",
    link: "/products?category=ghutras",
  },
  {
    id: "3",
    image: "https://cdn.salla.sa/vygWG/df611ca4-111b-4717-87ac-77d349b7f72d-500x500-GTwfF30yVRDRarWwgVis4CvunAhbpvMXIPiAL0T2.jpg",
    title: "خواتم عقيق",
    subtitle: "فضة 925",
    link: "/products?category=rings",
  },
];

const PromoBanners = () => {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:gap-4">
          {promoBanners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className="group shrink-0 w-[260px] sm:w-auto relative overflow-hidden rounded-2xl aspect-[4/3] block"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-4">
                <span className="inline-block bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">
                  {banner.subtitle}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                  {banner.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-accent text-xs font-medium group-hover:gap-2 transition-all">
                  تسوق الآن
                  <ArrowLeft className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
