
const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="177"
      height="177"
      className="block bg-transparent"
    >
      <g>
        <circle
          strokeLinecap="round"
          fill="none"
          strokeDasharray="36.12831551628262 36.12831551628262"
          stroke="#7bf1a8"
          strokeWidth="2"
          r="23"
          cy="50"
          cx="50"
        >
          <animateTransform
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.2222222222222223s"
            repeatCount="indefinite"
            type="rotate"
            attributeName="transform"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  );
};

export default Loader;
