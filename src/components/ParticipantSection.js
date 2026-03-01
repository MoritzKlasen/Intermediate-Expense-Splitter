import React, { useState } from 'react';

function ParticipantSection({ participants, onAddParticipant, onRemoveParticipant }) {
  const [participantName, setParticipantName] = useState('');

  const handleAddParticipant = () => {
    onAddParticipant(participantName);
    setParticipantName('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddParticipant();
    }
  };

  return (
    <section className="card">
      <h2>Participants</h2>
      <div className="form-group">
        <label htmlFor="participantNameInput">Add a participant</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            id="participantNameInput"
            type="text"
            placeholder="Enter name"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ flex: 1 }}
          />
          <button onClick={handleAddParticipant} className="btn btn-primary">
            Add
          </button>
        </div>
      </div>
      <div className="participants-list">
        {participants.length === 0 ? (
          <p className="empty-message">No participants yet. Add someone to get started.</p>
        ) : (
          participants.map((name) => (
            <div key={name} className="participant-tag">
              {name}
              <button
                className="remove-btn"
                onClick={() => onRemoveParticipant(name)}
                title="Remove participant"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ParticipantSection;
