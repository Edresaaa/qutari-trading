import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const promoBanners = [
  {
    id: "1",
    image: "https://cdn.salla.sa/vygWG/a664a3a9-6907-48cf-925f-5de7e4fb802b-500x500-OvOjbabZREkBiRRRnQdUaqIyHGwcsl4iuqrQmcjy.jpg",
    title: "شيلان باشمينا ملكي",
    subtitle: "خصم يصل إلى 50%",
    link: "/products?category=pashmina-royal",
    gradient: "from-chocolate/80 to-transparent",
  },
  {
    id: "2",
    image: "https://cdn.salla.sa/vygWG/feb756f8-612a-4cf0-ac82-2bc3eec6dc90-500x500-ieLUnl6TxXs3UcJ2Az2uOtaxLYhNAskIbNGJmGzg.jpg",
    title: "غتر كشميري VIP",
    subtitle: "تشكيلة حصرية",
    link: "/products?category=kashmiri-vip",
    gradient: "from-chocolate/80 to-transparent",
  },
  {
    id: "3",
    image: "https://cdn.salla.sa/vygWG/484411d8-5c69-4dad-8be5-788a7344bc07-500x500-z1wRzrFzUeGbxT3HATxZWolfXHsvWaVRCSttso3g.jpg",
    title: "أشمغة شتوية",
    subtitle: "دفء وأناقة",
    link: "/products?category=winter-shemagh",
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
              className="group relative overflow-hidden rounded-2xl aspect-square block bg-muted"
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
