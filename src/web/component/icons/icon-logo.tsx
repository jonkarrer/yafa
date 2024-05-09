export default function ArrowDiagUp({
  color,
  size,
}: {
  color: string;
  size: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 123 123"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="58"
        y1="122.52"
        x2="58"
        y2="0.480469"
        stroke={color}
        stroke-width="6"
      />
      <line
        x1="59.6553"
        y1="64.8518"
        x2="122.04"
        y2="64.8518"
        stroke={color}
        stroke-width="6"
      />
      <line
        x1="58.175"
        y1="3.93375"
        x2="115.175"
        y2="63.9338"
        stroke={color}
        stroke-width="6"
      />
      <line
        x1="19.3202"
        y1="19.0982"
        x2="59.7049"
        y2="68.3665"
        stroke={color}
        stroke-width="6"
      />
      <circle cx="61.5" cy="61.5" r="58.5" stroke={color} stroke-width="6" />
    </svg>
  );
}
