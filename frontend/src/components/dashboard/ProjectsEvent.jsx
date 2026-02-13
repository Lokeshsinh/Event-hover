import { Plus, Zap, Users, Layout, Gauge, TestTube } from 'lucide-react';
import './ProjectsEvent.css';

export function ProjectsEvent({ events }) {
  const recentEvents = events.slice(0, 5);

  const getProjectIcon = (type) => {
    switch (type) {
      case 'mousemove':
        return { icon: <Zap className="w-5 h-5" />, color: 'blue' };
      case 'click':
        return { icon: <Users className="w-5 h-5" />, color: 'teal' };
      case 'scroll':
        return { icon: <Layout className="w-5 h-5" />, color: 'green' };
      case 'keypress':
        return { icon: <Gauge className="w-5 h-5" />, color: 'yellow' };
      default:
        return { icon: <TestTube className="w-5 h-5" />, color: 'purple' };
    }
  };

  const getEventTitle = (type) => {
    switch (type) {
      case 'mousemove':
        return 'Mouse Movement Event';
      case 'click':
        return 'Click Event Captured';
      case 'scroll':
        return 'Scroll Event Tracked';
      case 'keypress':
        return 'Keypress Event Logged';
      default:
        return 'Event Captured';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `Due date: ${date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })}`;
  };

  return (
     <div className="events-wrapper">
    <div className="events-header">
      <h2>PROCESSED EVENTS</h2>
      <span className="events-count">
        {events.length} events • live updates
      </span>
    </div>

    <div className="events-table-container">
      <table className="events-table">
        <thead>
          <tr>
            <th>TYPE</th>
            <th>DATA</th>
            <th>QUEUED</th>
            <th>PROCESSED</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>
                <span className={`event-badge ${event.type}`}>
                  {event.type}
                </span>
              </td>
              <td className="data-cell">
                {JSON.stringify(event.data)}
              </td>
              <td className="time-cell">
                {new Date(event.queuedAt).toLocaleTimeString()}
              </td>
              <td className="processed-cell">
                {new Date(event.processedAt).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
