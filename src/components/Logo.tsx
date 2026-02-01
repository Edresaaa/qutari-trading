interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const Logo = ({ size = "md", variant = "full" }: LogoProps) => {
  const sizes = {
    sm: { height: "h-10", text: "text-sm", subtext: "text-[9px]", iconSize: 40 },
    md: { height: "h-14", text: "text-base", subtext: "text-[10px]", iconSize: 56 },
    lg: { height: "h-20", text: "text-xl", subtext: "text-xs", iconSize: 80 },
  };

  const s = sizes[size];

  return (
    <div className={`${s.height} flex items-center gap-3`}>
      {/* Geometric Logo Mark */}
      <div className="relative">
        <svg viewBox="0 0 56 64" className={`${s.height} w-auto`}>
          <defs>
            {/* Muted gold gradient */}
            <linearGradient id="mutedGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(38, 45%, 50%)" />
              <stop offset="50%" stopColor="hsl(40, 40%, 58%)" />
              <stop offset="100%" stopColor="hsl(35, 50%, 40%)" />
            </linearGradient>
            {/* Dark background gradient */}
            <linearGradient id="darkBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(180, 12%, 12%)" />
              <stop offset="100%" stopColor="hsl(180, 10%, 8%)" />
            </linearGradient>
            {/* Subtle texture pattern */}
            <pattern id="subtleTexture" patternUnits="userSpaceOnUse" width="6" height="6">
              <rect width="6" height="6" fill="hsl(180, 10%, 10%)" />
              <circle cx="3" cy="3" r="2" fill="hsl(180, 8%, 14%)" opacity="0.4" />
            </pattern>
          </defs>
          
          {/* Outer hexagon frame with gold border */}
          <polygon 
            points="28,2 52,16 52,48 28,62 4,48 4,16" 
            fill="none"
            stroke="url(#mutedGoldGradient)"
            strokeWidth="1.5"
          />
          
          {/* Inner hexagon with dark fill */}
          <polygon 
            points="28,6 48,18 48,46 28,58 8,46 8,18" 
            fill="url(#darkBgGradient)"
          />
          
          {/* Subtle texture overlay */}
          <polygon 
            points="28,6 48,18 48,46 28,58 8,46 8,18" 
            fill="url(#subtleTexture)"
            opacity="0.3"
          />
          
          {/* Inner decorative hexagon */}
          <polygon 
            points="28,14 40,22 40,42 28,50 16,42 16,22" 
            fill="none"
            stroke="url(#mutedGoldGradient)"
            strokeWidth="0.5"
            opacity="0.4"
          />
          
          {/* Arabic letter ق */}
          <text
            x="28"
            y="38"
            textAnchor="middle"
            fill="url(#mutedGoldGradient)"
            style={{ 
              fontSize: '20px',
              fontFamily: 'Tajawal, sans-serif',
              fontWeight: 700
            }}
          >
            ق
          </text>
        </svg>
      </div>

      {/* Text part */}
      {variant === "full" && (
        <div className="flex flex-col leading-tight">
          <div className={`${s.text} font-bold`}>
            <span className="gold-text">القوطاري</span>
            <span className="text-foreground mr-1">للتجارة</span>
          </div>
          <span className={`${s.subtext} text-muted-foreground tracking-wider font-medium`}>
            أناقة الرجل اليمني
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
