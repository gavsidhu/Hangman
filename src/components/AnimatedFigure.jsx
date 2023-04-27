import { useEffect, useState } from "react";

export default function AnimatedFigure({}) {
  const [step, setStep] = useState(0);

  const parts = [
    { id: "head", display: step > 0 },
    { id: "body", display: step > 1 },
    { id: "leftArm", display: step > 2 },
    { id: "rightArm", display: step > 3 },
    { id: "leftLeg", display: step > 4 },
    { id: "rightLeg", display: step > 5 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep === 6 ? 0 : prevStep + 1));
    }, 1000); // Change this value to control the animation speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hangman-figure">
      <svg height="325" width="325" className="mx-auto">
        {/* Rod and base */}
        <line x1="78" y1="26" x2="182" y2="26" stroke="black" strokeWidth="3" />
        <line
          x1="182"
          y1="26"
          x2="182"
          y2="65"
          stroke="black"
          strokeWidth="3"
        />
        <line x1="78" y1="26" x2="78" y2="299" stroke="black" strokeWidth="3" />
        <line
          x1="26"
          y1="299"
          x2="130"
          y2="299"
          stroke="black"
          strokeWidth="3"
        />

        {/* Head */}
        {parts[0].display && (
          <circle
            cx="182"
            cy="91"
            r="26"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        )}

        {/* Body */}
        {parts[1].display && (
          <line
            x1="182"
            y1="117"
            x2="182"
            y2="195"
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Left arm */}
        {parts[2].display && (
          <line
            x1="182"
            y1="130"
            x2="143"
            y2="169"
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Right arm */}
        {parts[3].display && (
          <line
            x1="182"
            y1="130"
            x2="221"
            y2="169"
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Left leg */}
        {parts[4].display && (
          <line
            x1="182"
            y1="195"
            x2="143"
            y2="247"
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Right leg */}
        {parts[5].display && (
          <line
            x1="182"
            y1="195"
            x2="221"
            y2="247"
            stroke="black"
            strokeWidth="2"
          />
        )}
      </svg>
    </div>
  );
}