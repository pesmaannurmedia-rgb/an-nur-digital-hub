export function IslamicPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Islamic 8-pointed star pattern */}
        <pattern
          id="islamic-pattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Central 8-pointed star */}
          <polygon
            points="30,5 35,20 50,20 38,30 43,45 30,35 17,45 22,30 10,20 25,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.15"
          />
          {/* Connecting lines */}
          <line x1="0" y1="0" x2="30" y2="30" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          <line x1="60" y1="0" x2="30" y2="30" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          <line x1="0" y1="60" x2="30" y2="30" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          <line x1="60" y1="60" x2="30" y2="30" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          {/* Corner stars (quarter visible) */}
          <polygon
            points="0,-25 5,-10 20,-10 8,0 13,15 0,5 -13,15 -8,0 -20,-10 -5,-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.1"
          />
          <polygon
            points="60,-25 65,-10 80,-10 68,0 73,15 60,5 47,15 52,0 40,-10 55,-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.1"
          />
          <polygon
            points="0,85 5,70 20,70 8,60 13,45 0,55 -13,45 -8,60 -20,70 -5,70"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.1"
          />
          <polygon
            points="60,85 65,70 80,70 68,60 73,45 60,55 47,45 52,60 40,70 55,70"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.1"
          />
          {/* Inner geometric shapes */}
          <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
          <rect x="26" y="26" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" transform="rotate(45 30 30)" />
        </pattern>
        
        {/* Gradient fade for edges */}
        <radialGradient id="pattern-fade" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        
        <mask id="pattern-mask">
          <rect width="100%" height="100%" fill="url(#pattern-fade)" />
        </mask>
      </defs>
      
      <rect
        width="100%"
        height="100%"
        fill="url(#islamic-pattern)"
        mask="url(#pattern-mask)"
      />
    </svg>
  );
}
