import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  useEffect(() => {
    const socket = io('http://localhost:8000');
  }, []);
  return (
    <>
      <h1>hello</h1>
    </>
  );
}
