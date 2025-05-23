import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterPage.css';
import '../../../src/styles/common.css';
import '../../../src/styles/components.css';
import drawcenLogo from '../../../src/assets/drawcen.png';

const EnterPage = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // 임시 유저 데이터 (나중에 실제 카카오 로그인 데이터로 대체)
  const user = {
    nickname: "User001",
    profileImage: "../../../src/assets/a.png"
  };

  if (inputRefs.current.length === 0) {
    inputRefs.current = Array(6).fill().map(() => React.createRef());
  }

  const handleInput = (index, value) => {
    if (value.length > 1) return;

    const newRoomCode = [...roomCode];
    newRoomCode[index] = value;
    setRoomCode(newRoomCode);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && roomCode[index] === '' && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleEnterRoom = () => {
    const code = roomCode.join('');
    if (code.length === 6) {
      navigate(`/game/${code}`);
    }
  };

  return (
    <div className="enter-container">
      <div className="user-profile">
        <img src={user.profileImage} alt="프로필" className="profile-image" />
        <span className="user-nickname">{user.nickname}님</span>
      </div>
      <div className="page-bg" />
      <div className="content-center">
        <div className="logo-frame">
          <img src={drawcenLogo} alt="Drawcen Logo" className="logo" />
        </div>
        <div className="content-frame">
          <div className="room-code-container">
            {roomCode.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs.current[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="room-code-input input-box"
              />
            ))}
          </div>
          <button 
            className="btn btn-mint"
            onClick={handleEnterRoom}
            disabled={roomCode.some(digit => digit === '')}
          >
            방 입장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterPage; 