import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import drawcenLogo from '../../assets/drawcen.png';
import kakaoLoginBtn from '../../assets/카카오로그인.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/enter');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <img src={drawcenLogo} alt="Drawcen Logo" className="drawcen-logo" />
        
        <div className="game-description">
          <p className="main-desc">친구들과 함께 그림을 그리고 맞추는 실시간 스케치 퀴즈 게임</p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span className="feature-text">자유롭게 그리기</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💫</span>
              <span className="feature-text">실시간 채팅</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <span className="feature-text">최대 6명 참여</span>
            </div>
          </div>
        </div>

        <div className="how-to-play">
          <h2>게임 방법</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-text">로그인 후 방 생성 / 방코드 입력</div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-text">출제자는 제시어를 보고 그림을 그리기</div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-text">다른 플레이어들은 채팅으로 정답 맞추기</div>
            </div>
          </div>
        </div>

        <button className="kakao-login-btn" onClick={handleStart}>
          <img src={kakaoLoginBtn} alt="카카오 로그인" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage; 