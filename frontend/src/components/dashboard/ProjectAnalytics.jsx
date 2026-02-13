import './ProjectAnalytics.css';

export function ProjectAnalytics({ eventStats }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const values = [
    eventStats.scroll || 0,
    eventStats.mousemove || 0,
    eventStats.click || 0,
    eventStats.keypress || 0,
    eventStats.mousemove || 0,
    eventStats.scroll || 0,
    eventStats.click || 0
  ];

  const maxValue = Math.max(...values, 1);

  return (
    <div className="project-analytics-card">
      <h3 className="analytics-title">Event Analytics</h3>
      
      <div className="analytics-chart">
        {days.map((day, index) => {
          const height = (values[index] / maxValue) * 100;
          const isEven = index % 2 === 0;
          
          return (
            <div key={index} className="chart-column">
              <div className="chart-bar-container">
                <div 
                  className={`chart-bar ${isEven ? 'striped' : 'solid'}`}
                  style={{ height: `${height}%` }}
                >
                  {values[index] > 0 && (
                    <div className="bar-value">{values[index]}</div>
                  )}
                </div>
              </div>
              <div className="chart-label">{day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
