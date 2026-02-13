import { MousePointer, Hand, ArrowDown, Keyboard } from 'lucide-react';
import '../App.css'

export function EventTable({ events }) {
  const getEventIcon = (type) => {
    switch (type) {
      case 'mousemove':
        return <MousePointer className="w-4 h-4 text-blue-600" />;
      case 'click':
        return <Hand className="w-4 h-4 text-green-600" />;
      case 'scroll':
        return <ArrowDown className="w-4 h-4 text-purple-600" />;
      case 'keypress':
        return <Keyboard className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    });
  };

  const formatProcessingTime = (event) => {
    if (!event.processedAt) return '-';
    const delay = event.processedAt - event.queuedAt;
    return `${delay}ms`;
  };

  const formatEventData = (type, data) => {
    switch (type) {
      case 'mousemove':
        return `X: ${data.x}, Y: ${data.y}`;
      case 'click':
        return `X: ${data.x}, Y: ${data.y}, Button: ${data.button}`;
      case 'scroll':
        return `Y: ${data.scrollY}px`;
      case 'keypress':
        return `Key: ${data.key}`;
      default:
        return JSON.stringify(data);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium">Captured Events Database</h2>
        <p className="text-sm text-gray-600 mt-1">
          Showing {events.length} events processed and stored
        </p>
      </div>

      {events.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          <p>No events captured yet. Interact with the page to generate events.</p>
        </div>
      ) : (
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Captured At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Processing Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                  {event.id.substring(0, 16)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    <span className="text-sm font-medium text-gray-900">{event.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatEventData(event.type, event.data)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                  {formatTimestamp(event.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatProcessingTime(event)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'stored' ? 'bg-green-100 text-green-800' :
                    event.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
