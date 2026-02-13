import { useState, useEffect } from 'react';
import { EventTracker } from './components/event-tracking/EventTracker';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { useEventQueue } from './hooks/useEventQueue';
import './App.css';

export default function App() {
  const {
    events,
    queueSize,
    processedCount,
    addToQueue,
    processedEvents,
    eventStats
  } = useEventQueue();

  return (
    <div className="app">
      {/* Hidden Event Tracker - Captures events silently */}
      <EventTracker onEventCapture={addToQueue} />

      {/* Dashboard Layout */}
      <DashboardLayout 
        queueSize={queueSize}
        processedCount={processedCount}
        processedEvents={processedEvents}
        eventStats={eventStats}
      />
    </div>
  );
}
