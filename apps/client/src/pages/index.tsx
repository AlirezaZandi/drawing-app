import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

export default function Home() {
  const [canSend, setCanSend] = useState(false);

  const [mousePos, setMousePos] = useState<any>({});
  const [cursorPos, setCursorPos] = useState<any>({});

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    socket.on('mouse-move', (p) => setCursorPos(p));
  }, []);

  useEffect(() => {
    if (!canSend) {
      const int = window.setTimeout(() => {
        setCanSend(true);
      }, 10);
      return () => window.clearTimeout(int);
    }
  }, [canSend]);

  const lastPos = useRef<any>();

  useEffect(() => {
    if (canSend && lastPos.current?.x !== mousePos.x) {
      socket.emit('mouse-move', mousePos);
      setCanSend(false);
      lastPos.current = mousePos;
    }
  }, [canSend, mousePos]);

  return (
    <div className="board">
      <div
        className="cursor"
        style={{
          left: cursorPos?.x,
          top: cursorPos?.y,
          transition: 'all 0.2s',
        }}
      ></div>
    </div>
  );
}
