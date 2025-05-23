import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './GameRoom.css';
import PlayerList from './components/PlayerList';
import Canvas from './components/Canvas';
import ChatBox from './components/ChatBox';
import userImage from '../../assets/a.png';

const GameRoom = () => {
  const { roomId } = useParams();
  
  // 임시 플레이어 데이터
  const [players] = useState([
    { id: 1, nickname: '플레이어1', score: 100, image: userImage },
    { id: 2, nickname: '플레이어2', score: 200, image: userImage },
    { id: 3, nickname: '플레이어3', score: 150, image: userImage },
  ]);

  const [chatMessages] = useState([
    { id: 1, userId: 1, nickname: '플레이어1', message: '안녕하세요!' },
    { id: 2, userId: 2, nickname: '플레이어2', message: '반갑습니다~' },
  ]);

  return (
    <div className="game-room">
      <div className="left-section">
        <div className="room-info">
          방 코드: {roomId}
        </div>
        <PlayerList players={players} />
      </div>
      <div className="right-section">
        <div className="canvas-section">
          <Canvas />
        </div>
        <div className="chat-section">
          <ChatBox messages={chatMessages} />
        </div>
      </div>
    </div>
  );
};

export default GameRoom; 