// import { useState, useEffect, useRef, useCallback } from 'react';

// const PROCESSING_DELAY = 500;
// const BATCH_SIZE = 5; 
// const THROTTLE_MS = 100; 

// export function useEventQueue() {
//   const [queue, setQueue] = useState([]);
//   const [processedEvents, setProcessedEvents] = useState([]);
//   const [processedCount, setProcessedCount] = useState(0);
//   const [eventStats, setEventStats] = useState({
//     mousemove: 0,
//     click: 0,
//     scroll: 0,
//     keypress: 0
//   });
//   const processingRef = useRef(false);
//   const lastMouseEventRef = useRef(0);


//   const addToQueue = useCallback((eventType, eventData) => {

//     if (eventType === 'mousemove') {
//       const now = Date.now();
//       if (now - lastMouseEventRef.current < THROTTLE_MS) {
//         return;
//       }
//       lastMouseEventRef.current = now;
//     }

//     const event = {
//       id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       type: eventType,
//       timestamp: Date.now(),
//       data: eventData,
//       queuedAt: Date.now(),
//       status: 'queued'
//     };

//     setQueue(prev => [...prev, event]);

    
//     setEventStats(prev => ({
//       ...prev,
//       [eventType]: (prev[eventType] || 0) + 1
//     }));
//   }, []);

  
//   const processQueue = useCallback(async () => {
//     if (processingRef.current || queue.length === 0) {
//       return;
//     }

//     processingRef.current = true;

//     const batch = queue.slice(0, BATCH_SIZE);
    
//     setQueue(prev => prev.slice(BATCH_SIZE));

//     const processingBatch = batch.map(event => ({
//       ...event,
//       status: 'processing'
//     }));

    
//     await new Promise(resolve => setTimeout(resolve, PROCESSING_DELAY));

   
//     const storedBatch = processingBatch.map(event => ({
//       ...event,
//       status: 'stored',
//       processedAt: Date.now()
//     }));

//     setProcessedEvents(prev => [...storedBatch, ...prev]);
//     setProcessedCount(prev => prev + storedBatch.length);

//     processingRef.current = false;
//   }, [queue]);


//   useEffect(() => {
//     const interval = setInterval(() => {
//       processQueue();
//     }, 200);

//     return () => clearInterval(interval);
//   }, [processQueue]);

//   return {
//     events: queue,
//     queueSize: queue.length,
//     processedCount,
//     addToQueue,
//     processedEvents,
//     eventStats
//   };
// }


// import { useState, useEffect, useRef, useCallback } from 'react';

// const PROCESSING_DELAY = 500;
// const BATCH_SIZE = 5; 
// const THROTTLE_MS = 100; 

// export function useEventQueue() {
//   const [queue, setQueue] = useState([]);
//   const [processedEvents, setProcessedEvents] = useState([]);
//   const [processedCount, setProcessedCount] = useState(0);
//   const [eventStats, setEventStats] = useState({
//     mousemove: 0,
//     click: 0,
//     scroll: 0,
//     keypress: 0
//   });

//   const processingRef = useRef(false);
//   const lastMouseEventRef = useRef(0);


//   // ✅ 1️⃣ FETCH STATS FROM BACKEND
//   useEffect(() => {
//     fetch("http://localhost:5000/api/stats")
//       .then(res => res.json())
//       .then(data => {
//         setEventStats({
//           mousemove: data.hoverCount || 0,
//           click: data.clickCount || 0,
//           scroll: data.scrollCount || 0,
//           keypress: 0
//         });
//       })
//       .catch(err => console.error("Stats fetch error:", err));
//   }, []);



//   const addToQueue = useCallback((eventType, eventData) => {

//     if (eventType === 'mousemove') {
//       const now = Date.now();
//       if (now - lastMouseEventRef.current < THROTTLE_MS) {
//         return;
//       }
//       lastMouseEventRef.current = now;
//     }

//     const event = {
//       id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       type: eventType,
//       timestamp: Date.now(),
//       data: eventData,
//       queuedAt: Date.now(),
//       status: 'queued'
//     };

//     setQueue(prev => [...prev, event]);

//     setEventStats(prev => ({
//       ...prev,
//       [eventType]: (prev[eventType] || 0) + 1
//     }));

//   }, []);



//   const processQueue = useCallback(async () => {
//     if (processingRef.current || queue.length === 0) {
//       return;
//     }

//     processingRef.current = true;

//     const batch = queue.slice(0, BATCH_SIZE);
//     setQueue(prev => prev.slice(BATCH_SIZE));

//     const processingBatch = batch.map(event => ({
//       ...event,
//       status: 'processing'
//     }));

//     await new Promise(resolve => setTimeout(resolve, PROCESSING_DELAY));

//     const storedBatch = processingBatch.map(event => ({
//       ...event,
//       status: 'stored',
//       processedAt: Date.now()
//     }));


//     // ✅ 2️⃣ SEND STORED EVENTS TO BACKEND
//     try {
//       await Promise.all(
//         storedBatch.map(event =>
//           fetch("http://localhost:5000/api/events", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               type: event.type,
//               timestamp: event.timestamp,
//               data: event.data
//             })
//           })
//         )
//       );
//     } catch (error) {
//       console.error("Error saving events:", error);
//     }


//     setProcessedEvents(prev => [...storedBatch, ...prev]);
//     setProcessedCount(prev => prev + storedBatch.length);

//     processingRef.current = false;

//   }, [queue]);



//   useEffect(() => {
//     const interval = setInterval(() => {
//       processQueue();
//     }, 200);

//     return () => clearInterval(interval);
//   }, [processQueue]);



//   return {
//     events: queue,
//     queueSize: queue.length,
//     processedCount,
//     addToQueue,
//     processedEvents,
//     eventStats
//   };
// }


import { useState, useEffect, useRef, useCallback } from 'react';
const API = import.meta.env.VITE_API_URL;

const PROCESSING_DELAY = 500;
const BATCH_SIZE = 5; 
const THROTTLE_MS = 100; 

export function useEventQueue() {
  const [queue, setQueue] = useState([]);
  const [processedEvents, setProcessedEvents] = useState([]);
  const [processedCount, setProcessedCount] = useState(0);
  const [eventStats, setEventStats] = useState({
    mousemove: 0,
    click: 0,
    scroll: 0,
    keypress: 0
  });

  const processingRef = useRef(false);
  const lastMouseEventRef = useRef(0);

  // 🔥 FETCH EVENTS + STATS ON LOAD
  useEffect(() => {
    fetchStats();
    fetchEvents();
  }, []);

  const fetchStats = async () => {
    const res = await fetch(`${API}/api/stats`);
    const data = await res.json();

    setEventStats({
      mousemove: data.hoverCount || 0,
      click: data.clickCount || 0,
      scroll: data.scrollCount || 0,
      keypress: 0
    });

    setProcessedCount(data.total || 0);
  };

  const fetchEvents = async () => {
    const res = await fetch(`${API}/api/events`);
    const data = await res.json();
    setProcessedEvents(data);
  };


  const addToQueue = useCallback((eventType, eventData) => {

    if (eventType === 'mousemove') {
      const now = Date.now();
      if (now - lastMouseEventRef.current < THROTTLE_MS) {
        return;
      }
      lastMouseEventRef.current = now;
    }

    const event = {
      type: eventType,
      timestamp: Date.now(),
      data: eventData
    };

    setQueue(prev => [...prev, event]);

  }, []);



  const processQueue = useCallback(async () => {
    if (processingRef.current || queue.length === 0) return;

    processingRef.current = true;

    const batch = queue.slice(0, BATCH_SIZE);
    setQueue(prev => prev.slice(BATCH_SIZE));

    await new Promise(resolve => setTimeout(resolve, PROCESSING_DELAY));

    // 🔥 SAVE TO MONGODB
    await Promise.all(
      batch.map(event =>
        fetch(`${API}/api/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event)
        })
      )
    );

    await fetchStats();
    await fetchEvents();

    processingRef.current = false;

  }, [queue]);



  useEffect(() => {
    const interval = setInterval(processQueue, 200);
    return () => clearInterval(interval);
  }, [processQueue]);


  return {
    events: queue,
    queueSize: queue.length,
    processedCount,
    addToQueue,
    processedEvents,
    eventStats
  };
}
