import React from 'react';

function BalanceSection({ balances }) {
  return (
    <section className="card">
      <h2>Individual Balances</h2>
      <div className="balances-list">
        {Object.keys(balances).length === 0 ? (
          <p className="empty-message">Balances will appear here once you add expenses</p>
        ) : (
          Object.entries(balances).map(([person, balance]) => {
            const absBalance = Math.abs(balance);
            let className = 'neutral';
            let prefix = '';
            let description = 'settled up';

            if (balance > 0.01) {
              className = 'positive';
              prefix = '+';
              description = 'is owed';
            } else if (balance < -0.01) {
              className = 'negative';
              description = 'owes';
            }

            return (
              <div key={person} className="balance-item">
                <div className="balance-name">{person}</div>
                <div className={`balance-amount ${className}`}>
                  {prefix}${absBalance.toFixed(2)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default BalanceSection;
