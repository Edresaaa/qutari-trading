import { Star } from "lucide-react";

const testimonials = [
  {
    id: "1",
    name: "محمد الأحمد",
    location: "الرياض",
    rating: 5,
    text: "جودة ممتازة وتوصيل سريع. الشال أفضل مما توقعت والخامة فاخرة جداً.",
    avatar: "م",
  },
  {
    id: "2",
    name: "خالد العتيبي",
    location: "جدة",
    rating: 5,
    text: "أفضل متجر للشيلان الكشميرية. التعامل راقي والمنتجات أصلية 100%.",
    avatar: "خ",
  },
  {
    id: "3",
    name: "عبدالله المالكي",
    location: "الدمام",
    rating: 5,
    text: "البشت الملكي رائع جداً وجودته عالية. أنصح بالتعامل معهم.",
    avatar: "ع",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">آراء عملائنا</h2>
          <p className="text-muted-foreground mt-2">
            نفتخر بثقة عملائنا الكرام
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-accent flex items-center justify-center text-chocolate font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
