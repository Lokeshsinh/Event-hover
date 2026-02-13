import { useState } from 'react';
import { Plus } from 'lucide-react';
import './TeamCollaboration.css';

export function TeamCollaboration() {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: 'Event Processor',
      avatar: '👤',
      working: 'Processing Event Queue',
      status: 'Complete',
      statusColor: 'green'
    },
    {
      name: 'Database Handler',
      avatar: '💾',
      working: 'Storing Event Data',
      status: 'In Progress',
      statusColor: 'yellow'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    avatar: '',
    working: '',
    status: 'In Progress',
    statusColor: 'yellow'
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };

  // Add new member
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.working || !newMember.avatar) return;
    setTeamMembers(prev => [...prev, newMember]);
    setNewMember({
      name: '',
      avatar: '',
      working: '',
      status: 'In Progress',
      statusColor: 'yellow'
    });
    setShowForm(false);
  };

  return (
    <div className="team-collaboration-card">
      <div className="team-header">
        <h3 className="team-title">System Components</h3>
        <button 
          className="add-member-btn" 
          onClick={() => setShowForm(prev => !prev)}
        >
          <Plus className="w-4 h-4" />
          <span>Add Component</span>
        </button>
      </div>

      {/* Form for Adding Component */}
      {showForm && (
        <form className="add-member-form" onSubmit={handleAddMember}>
          <input
            type="text"
            name="name"
            placeholder="Component Name"
            value={newMember.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar (Emoji)"
            value={newMember.avatar}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="working"
            placeholder="Working On"
            value={newMember.working}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={newMember.status}
            onChange={handleChange}
          >
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
          <select
            name="statusColor"
            value={newMember.statusColor}
            onChange={handleChange}
          >
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
          </select>
          <button type="submit" className="submit-btn">Add</button>
        </form>
      )}

      <div className="team-members-list">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-item">
            <div className="member-avatar">{member.avatar}</div>
            <div className="member-info">
              <h4 className="member-name">{member.name}</h4>
              <p className="member-working">
                <span className="working-label">Working on :</span>
                <span className="working-project">{member.working}</span>
              </p>
            </div>
            <div className={`member-status ${member.statusColor}`}>
              {member.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
