import { Video } from 'lucide-react';
import './Reminders.css';

export function Reminders({ queueSize }) {
  return (
    <div className="reminders-card">
      <h3 className="reminders-title">Queue Status</h3>
      
      <div className="reminder-content">
        <h4 className="reminder-meeting-title">Processing Events</h4>
        <p className="reminder-time">
          Queue: {queueSize} events • Processing in batches
        </p>
        
        <button className="start-meeting-btn">
          <Video className="w-5 h-5" />
          <span>View Queue Details</span>
        </button>
      </div>
    </div>
  );
}
