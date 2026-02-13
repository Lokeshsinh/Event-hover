import './ProjectProgress.css';

export function ProjectProgress({ processedCount, totalEvents }) {
  const percentage = totalEvents > 0 ? Math.min((processedCount / totalEvents) * 100, 100) : 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="project-progress-card">
      <h3 className="progress-title">Event Processing</h3>
      
      <div className="progress-chart-container">
        <svg className="progress-chart" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="12"
          />
          
          {/* Progress circle - gradient */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 80 80)"
            className="progress-circle"
          />
          
          {/* Striped pattern section */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d6f5c" />
              <stop offset="100%" stopColor="#2d5f4d" />
            </linearGradient>
            
            <pattern id="stripePattern" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <rect width="4" height="8" fill="#d1d5db" />
              <rect x="4" width="4" height="8" fill="#e5e7eb" />
            </pattern>
          </defs>
          
          {/* Striped segment */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="url(#stripePattern)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.3} ${circumference * 0.7}`}
            transform="rotate(90 80 80)"
          />

          {/* Center text */}
          <text
            x="80"
            y="75"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#1f2937"
          >
            {Math.round(percentage)}%
          </text>
          <text
            x="80"
            y="95"
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            Processed
          </text>
        </svg>
      </div>
    </div>
  );
}
