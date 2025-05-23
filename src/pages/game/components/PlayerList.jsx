import React from 'react';
import './PlayerList.css';
import avatarImage from '../../../assets/a.png';

const PlayerList = ({ players: propPlayers }) => {
  // propPlayers가 없으면 기존 더미 데이터 사용
  const players = propPlayers || [
    { id: 1, nickname: "우주인1호", score: 1200, avatar: avatarImage },
    { id: 2, nickname: "은하수탐험가", score: 980, avatar: avatarImage },
    { id: 3, nickname: "별똥별", score: 850, avatar: avatarImage },
  ];

  // 6개가 되도록 빈 아이템 추가
  const placeholders = Array.from({ length: 6 - players.length }, (_, i) => ({
    id: `placeholder-${i}`,
    placeholder: true
  }));

  const fullList = [...players, ...placeholders];

  return (
    <div className="player-list">
      <div className="player-list-title">플레이어 목록</div>
      <div className="players">
        {fullList.map((player, idx) => (
          player.placeholder ? (
            <div key={player.id} className="player-item player-placeholder" />
          ) : (
            <div key={player.id} className="player-item">
              <img src={player.avatar || player.image} alt="avatar" className="player-avatar" />
              <div className="player-info">
                <div className="player-nickname">{player.nickname}</div>
                <div className="player-score">{player.score} 점</div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default PlayerList; 