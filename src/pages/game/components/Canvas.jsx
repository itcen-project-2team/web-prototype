import React, { useRef, useEffect, useState } from 'react';
import './Canvas.css';

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [history, setHistory] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctxRef.current = ctx;
    
    // 배경 그리기
    drawBackground();
  }, []);

  const drawBackground = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const { width, height } = canvas;

    ctx.save();
    ctx.fillStyle = '#f0f8ff';
    ctx.fillRect(0, 0, width, height);

    // 미세한 격자 패턴
    ctx.strokeStyle = 'rgba(200, 215, 255, 0.2)';
    ctx.lineWidth = 0.5;

    // 가로 격자
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 세로 격자
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    ctx.restore();
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = lineWidth;
    setIsDrawing(true);
    setCurrentStroke([{ x: offsetX, y: offsetY, color, lineWidth }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
    setCurrentStroke(prev => [...prev, { x: offsetX, y: offsetY, color, lineWidth }]);
  };

  const stopDrawing = () => {
    if (currentStroke.length > 1) {
      setHistory(prev => [...prev, currentStroke]);
    }
    ctxRef.current.closePath();
    setIsDrawing(false);
    setCurrentStroke([]);
  };

  const redrawCanvas = (strokes) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    
    // 캔버스 초기화 및 배경 다시 그리기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    
    // 모든 스트로크 다시 그리기
    strokes.forEach(stroke => {
      if (stroke.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      ctx.strokeStyle = stroke[0].color;
      ctx.lineWidth = stroke[0].lineWidth;
      
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      
      ctx.stroke();
      ctx.closePath();
    });
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    redrawCanvas(newHistory);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    setHistory([]);
  };

  return (
    <div className="canvas-container">
      <div className="canvas-tools">
        <div className="tool-group">
          <label className="color-picker">
            🎨
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <label className="line-width">
            ✏️
            <input
              type="range"
              min="1"
              max="10"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="tool-group">
          <button className="undo-btn" onClick={handleUndo} disabled={history.length === 0}>
            ↩️ 되돌리기
          </button>
          <button className="clear-btn" onClick={handleClear}>
            🗑️ 지우기
          </button>
        </div>
      </div>
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};

export default Canvas; 