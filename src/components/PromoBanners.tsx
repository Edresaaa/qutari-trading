import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const promoBanners = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    title: "شيلان كشميري باشمينا VIP",
    subtitle: "خصم يصل إلى 30%",
    link: "/products?category=pashmina-vip",
    gradient: "from-chocolate/80 to-transparent",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    title: "شيلان كشميري ترمه",
    subtitle: "تشكيلة حصرية",
    link: "/products?category=termeh-shawls",
    gradient: "from-chocolate/80 to-transparent",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    title: "شيلان صوف شتوية",
    subtitle: "دفء وأناقة",
    link: "/products?category=wool-half-termeh",
    gradient: "from-chocolate/80 to-transparent",
  },
];

const PromoBanners = () => {
  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoBanners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${banner.gradient}`} />
              <div className="absolute bottom-0 right-0 left-0 p-6 z-10">
                <span className="inline-block bg-gold text-chocolate text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {banner.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                  {banner.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all">
                  تسوق الآن
                  <ArrowLeft className="w-4 h-4" />
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
