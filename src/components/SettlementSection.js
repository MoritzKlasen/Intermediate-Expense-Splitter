import React from 'react';

function SettlementSection({ settlements }) {
  return (
    <section className="card settlements-card">
      <h2>Settlement Summary</h2>
      <div className="settlements-list">
        {settlements.length === 0 ? (
          <p className="empty-message">All settled up! No transfers needed.</p>
        ) : (
          settlements.map((settlement, index) => (
            <div key={index} className="settlement-item">
              <div className="settlement-text">
                <strong>{settlement.from}</strong> → <strong>{settlement.to}</strong>
              </div>
              <div className="settlement-amount">${settlement.amount.toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default SettlementSection;
