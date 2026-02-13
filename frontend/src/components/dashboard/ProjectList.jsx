import { Plus, Zap, Users, Layout, Gauge, TestTube } from 'lucide-react';
import './ProjectList.css';

export function ProjectList({ events }) {
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
    <div className="project-list-card">
      <div className="project-list-header">
        <h3 className="project-list-title">Recent Events</h3>
        <button className="new-project-btn">
          <Plus className="w-4 h-4" />
          <span>New</span>
        </button>
      </div>

      <div className="projects-container">
        {recentEvents.length === 0 ? (
          <div className="empty-state">
            <p>No events yet. Start interacting!</p>
          </div>
        ) : (
          recentEvents.map((event) => {
            const { icon, color } = getProjectIcon(event.type);
            return (
              <div key={event.id} className="project-item">
                <div className={`project-icon ${color}`}>
                  {icon}
                </div>
                <div className="project-details">
                  <h4 className="project-name">{getEventTitle(event.type)}</h4>
                  <p className="project-date">{formatDate(event.timestamp)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
