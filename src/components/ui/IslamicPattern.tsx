export function IslamicPattern({ className = "", size = 80 }: { className?: string; size?: number }) {
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
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          {/* Central 8-pointed star */}
          <polygon
            points={`${size/2},${size*0.08} ${size*0.58},${size*0.33} ${size*0.83},${size*0.33} ${size*0.63},${size*0.5} ${size*0.72},${size*0.75} ${size/2},${size*0.58} ${size*0.28},${size*0.75} ${size*0.37},${size*0.5} ${size*0.17},${size*0.33} ${size*0.42},${size*0.33}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.4"
          />
          {/* Connecting diagonal lines */}
          <line x1="0" y1="0" x2={size/2} y2={size/2} stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
          <line x1={size} y1="0" x2={size/2} y2={size/2} stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
          <line x1="0" y1={size} x2={size/2} y2={size/2} stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
          <line x1={size} y1={size} x2={size/2} y2={size/2} stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
          {/* Inner circle */}
          <circle cx={size/2} cy={size/2} r={size*0.15} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          {/* Inner diamond */}
          <rect 
            x={size*0.4} 
            y={size*0.4} 
            width={size*0.2} 
            height={size*0.2} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.8" 
            opacity="0.25" 
            transform={`rotate(45 ${size/2} ${size/2})`} 
          />
          {/* Outer border frame */}
          <rect 
            x={size*0.05} 
            y={size*0.05} 
            width={size*0.9} 
            height={size*0.9} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            opacity="0.15" 
          />
        </pattern>
      </defs>
      
      <rect
        width="100%"
        height="100%"
        fill="url(#islamic-pattern)"
      />
    </svg>
  );
}
