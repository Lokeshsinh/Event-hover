import { MetricsCards } from '../dashboard/MetricsCards';
import { ProjectAnalytics } from '../dashboard/ProjectAnalytics';
import { TeamCollaboration } from '../dashboard/TeamCollaboration';
import { Reminders } from '../dashboard/Reminders';
import { ProjectProgress } from '../dashboard/ProjectProgress';
import { ProjectList } from '../dashboard/ProjectList';
import './DashboardLayout.css';
import { ProjectsEvent } from '../dashboard/ProjectsEvent';

export function DashboardLayout({ 
  queueSize, 
  processedCount, 
  processedEvents,
  eventStats 
}) {
  return (
    <div className="dashboard-layout">

      <MetricsCards 
        queueSize={queueSize}
        processedCount={processedCount}
        eventStats={eventStats}
        totalEvents={processedCount}
      />

      <div className="dashboard-main-grid">
 
        <div className="dashboard-column-left">
           <ProjectAnalytics eventStats={eventStats} />
          <TeamCollaboration /> 
        </div>

        
        <div className="dashboard-column-middle">
         <Reminders queueSize={queueSize} />
          <ProjectProgress 
            processedCount={processedCount} 
            totalEvents={processedEvents.length} 
          /> 
        </div>

        {/* Right Column */}
        <div className="dashboard-column-right">
          <ProjectList events={processedEvents} />
        </div>
      </div>
      <ProjectsEvent events={processedEvents} />
    </div>
  );
}
