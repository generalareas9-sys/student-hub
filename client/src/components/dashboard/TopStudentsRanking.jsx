import React from 'react';
import { Trophy } from 'lucide-react';

export default function TopStudentsRanking({ students, loading }) {
  if (loading) {
    return (
      <div className="rd-card" style={{ minHeight: '340px' }}>
        <div className="rd-card-header">
          <div className="rd-skeleton" style={{ width: '180px', height: '16px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="rd-skeleton" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                <div className="rd-skeleton" style={{ width: '120px', height: '14px' }} />
              </div>
              <div className="rd-skeleton" style={{ width: '40px', height: '14px' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const defaultStudents = [
    { rank: 1, name: 'Aisha Muhammad', score: '95.6%', badgeColor: '#f59e0b' },
    { rank: 2, name: 'Ibrahim Yakubu', score: '92.4%', badgeColor: '#94a3b8' },
    { rank: 3, name: 'Fatima Ahmed', score: '91.1%', badgeColor: '#d97706' },
    { rank: 4, name: 'Daniel Oladipo', score: '89.7%', badgeColor: '#e2e8f0', textColor: '#64748b' },
    { rank: 5, name: 'Zainab Usman', score: '88.9%', badgeColor: '#e2e8f0', textColor: '#64748b' },
  ];

  const list = students?.length ? students : defaultStudents;

  return (
    <div className="rd-card" id="topStudentsCard">
      <div className="rd-card-header">
        <h3 className="rd-card-title">
          <Trophy size={16} color="#0f172a" aria-hidden="true" />
          <span>TOP PERFORMING STUDENTS</span>
        </h3>
      </div>

      <div className="rd-ranking-list" role="list">
        {list.map((student) => {
          const isGold = student.rank === 1;
          const isSilver = student.rank === 2;
          const isBronze = student.rank === 3;

          let badgeBg = '#f1f5f9';
          let textColor = '#64748b';

          if (isGold) {
            badgeBg = '#f59e0b';
            textColor = '#ffffff';
          } else if (isSilver) {
            badgeBg = '#94a3b8';
            textColor = '#ffffff';
          } else if (isBronze) {
            badgeBg = '#d97706';
            textColor = '#ffffff';
          }

          return (
            <div key={student.rank} className="rd-ranking-item" role="listitem">
              <div className="rd-ranking-left">
                <span
                  className="rd-rank-badge"
                  style={{
                    backgroundColor: student.badgeColor || badgeBg,
                    color: student.textColor || textColor,
                  }}
                >
                  {student.rank}
                </span>
                <span className="rd-rank-name">{student.name}</span>
              </div>
              <span className="rd-rank-score">{student.score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
