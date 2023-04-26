export default function Figure({wrongAttempts}) {
    const parts = [
        { id: 'head', display: wrongAttempts > 0 },
        { id: 'body', display: wrongAttempts > 1 },
        { id: 'leftArm', display: wrongAttempts > 2 },
        { id: 'rightArm', display: wrongAttempts > 3 },
        { id: 'leftLeg', display: wrongAttempts > 4 },
        { id: 'rightLeg', display: wrongAttempts > 5 },
      ];
  return (
    <div className="hangman-figure">
      <svg height="300" width="250" className="mx-auto">
        {/* Rod and base */}
        <line x1="60" y1="20" x2="140" y2="20" stroke="black" strokeWidth="3" />
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="50"
          stroke="black"
          strokeWidth="3"
        />
        <line x1="60" y1="20" x2="60" y2="230" stroke="black" strokeWidth="3" />
        <line
          x1="20"
          y1="230"
          x2="100"
          y2="230"
          stroke="black"
          strokeWidth="3"
        />

        {/* Head */}
        {parts[0].display && (
          <circle
            cx="140"
            cy="70"
            r="20"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        )}

        {/* Body */}
        {parts[1].display && (
          <line
            x1="140"
            y1="90"
            x2="140"
            y2="150"
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Left arm */}
        {parts[2].display && (
          <line
            x1="140"
            y1="100"
            x2="110"
            y2="130"
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Right arm */}
        {parts[3].display && (
          <line
            x1="140"
            y1="100"
            x2="170"
            y2="130"
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Left leg */}
        {parts[4].display && (
          <line
            x1="140"
            y1="150"
            x2="110"
            y2="190"
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Right leg */}
        {parts[5].display && (
          <line
            x1="140"
            y1="150"
            x2="170"
            y2="190"
            stroke="black"
            strokeWidth="2"
          />
        )}
      </svg>
    </div>
  );
}
