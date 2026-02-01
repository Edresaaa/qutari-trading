import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const Logo = ({ size = "md", variant = "full" }: LogoProps) => {
  const sizes = {
    sm: { height: "h-10", text: "text-sm", subtext: "text-[9px]" },
    md: { height: "h-14", text: "text-base", subtext: "text-[10px]" },
    lg: { height: "h-20", text: "text-xl", subtext: "text-xs" },
  };

  const s = sizes[size];

  return (
    <div className={`${s.height} flex items-center gap-2`}>
      {/* Geometric Logo Mark */}
      <div className="relative">
        {/* Diamond/Hexagon shape with golden border */}
        <svg viewBox="0 0 60 70" className={`${s.height} w-auto`}>
          {/* Outer golden frame - hexagon shape */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(45, 90%, 55%)" />
              <stop offset="50%" stopColor="hsl(48, 85%, 65%)" />
              <stop offset="100%" stopColor="hsl(42, 75%, 45%)" />
            </linearGradient>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(150, 35%, 15%)" />
              <stop offset="100%" stopColor="hsl(150, 30%, 25%)" />
            </linearGradient>
            <pattern id="leatherPattern" patternUnits="userSpaceOnUse" width="8" height="8">
              <rect width="8" height="8" fill="hsl(150, 35%, 18%)" />
              <circle cx="4" cy="4" r="3" fill="hsl(150, 30%, 22%)" />
              <circle cx="0" cy="0" r="1.5" fill="hsl(150, 35%, 15%)" />
              <circle cx="8" cy="0" r="1.5" fill="hsl(150, 35%, 15%)" />
              <circle cx="0" cy="8" r="1.5" fill="hsl(150, 35%, 15%)" />
              <circle cx="8" cy="8" r="1.5" fill="hsl(150, 35%, 15%)" />
            </pattern>
          </defs>
          
          {/* Outer hexagon frame */}
          <polygon 
            points="30,2 55,18 55,52 30,68 5,52 5,18" 
            fill="url(#goldGradient)"
            stroke="hsl(42, 75%, 40%)"
            strokeWidth="1"
          />
          
          {/* Inner hexagon with leather texture */}
          <polygon 
            points="30,6 51,20 51,50 30,64 9,50 9,20" 
            fill="url(#leatherPattern)"
            stroke="hsl(45, 90%, 50%)"
            strokeWidth="0.5"
          />
          
          {/* Central decorative element */}
          <polygon 
            points="30,14 43,23 43,47 30,56 17,47 17,23" 
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            opacity="0.6"
          />
          
          {/* Arabic letter ق stylized */}
          <text
            x="30"
            y="42"
            textAnchor="middle"
            className="fill-gold font-bold"
            style={{ 
              fontSize: '22px',
              fontFamily: 'Tajawal, sans-serif',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
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
            <span className="text-gold">القوطاري</span>
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
