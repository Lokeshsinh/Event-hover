import { TrendingUp, ArrowUpRight } from 'lucide-react';
import './MetricsCards.css';

export function MetricsCards({ queueSize, processedCount, eventStats, totalEvents }) {
  // const runningEvents = Object.values(eventStats).reduce((a, b) => a + b, 0);



  return (
    <div className="metrics-cards-container">
      {/* Total Projects - Primary Card */}
      <div className="metric-card primary">
        <div className="metric-card-header">
          <span className="metric-card-title">Total Events</span>
          <button className="metric-card-icon-btn">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
        <div className="metric-card-value">{totalEvents}</div>
        <div className="metric-card-footer">
          <TrendingUp className="w-4 h-4" />
          <span>Increased from last session</span>
        </div>
      </div>

      {/* Stored Events */}
      <div className="metric-card">
        <div className="metric-card-header">
          <span className="metric-card-title">Click Event</span>
          <button className="metric-card-icon-btn secondary">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
        <div className="metric-card-value">{eventStats.click || 0}</div>
        <div className="metric-card-footer">
          <TrendingUp className="w-4 h-4" />
          <span>Increased from last session</span>
        </div>
      </div>

      {/* Active Events */}
      <div className="metric-card">
        <div className="metric-card-header">
          <span className="metric-card-title">Scroll Events</span>
          <button className="metric-card-icon-btn secondary">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
        <div className="metric-card-value">{eventStats.scroll || 0}</div>
        <div className="metric-card-footer">
          <TrendingUp className="w-4 h-4" />
          <span>Increased from last session</span>
        </div>
      </div>

      {/* Queue Size */}
      <div className="metric-card">
        <div className="metric-card-header">
          <span className="metric-card-title">Mouse Hover</span>
          <button className="metric-card-icon-btn secondary">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
        <div className="metric-card-value">{eventStats.mousemove || 0}</div>
        <div className="metric-card-footer pending">
          <span>Processing</span>
        </div>
      </div>
    </div>
  );
}
