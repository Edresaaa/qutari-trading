interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizes = {
    sm: { container: "w-10 h-10", text: "text-lg", title: "text-lg", subtitle: "text-[10px]" },
    md: { container: "w-14 h-14", text: "text-2xl", title: "text-xl", subtitle: "text-xs" },
    lg: { container: "w-20 h-20", text: "text-4xl", title: "text-2xl", subtitle: "text-sm" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Mark */}
      <div className={`${s.container} relative`}>
        {/* Outer ring with gradient */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold via-gold-light to-gold rotate-3 shadow-gold" />
        
        {/* Inner container */}
        <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-primary to-royal-green-light flex items-center justify-center">
          {/* Arabic letter with elegant styling */}
          <span className={`${s.text} font-bold text-gold drop-shadow-lg`} style={{ fontFamily: 'Tajawal, sans-serif' }}>
            ق
          </span>
          
          {/* Decorative corner accents */}
          <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-gold/50 rounded-tr" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-gold/50 rounded-bl" />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${s.title} font-bold text-foreground leading-tight`}>
            <span className="text-gold">القوطاري</span>
            <span className="text-primary"> للتجارة</span>
          </h1>
          <p className={`${s.subtitle} text-muted-foreground font-medium tracking-wide`}>
            أناقة الرجل اليمني
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
