import { useEffect, useRef } from 'react';
import { useSocket } from '@/app/context/socket/SockectContext';

const VideoPlayer = () => {
  const watchRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      console.log('Socket not initialized yet');
      return;
    }

    console.log('Using socket:', socket);

    socket.emit('watcher');

    socket.on('offer', (id, description) => {
      // WebRTC setup logic
    });

    socket.on('candidate', (id, candidate) => {
      // WebRTC candidate logic
    });

    socket.on('broadcaster', () => {
      socket.emit('watcher');
    });

    return () => {
      socket.off('offer');
      socket.off('candidate');
      socket.off('broadcaster');

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [socket]);

  return (
    <div className="video-container">
      <video ref={watchRef} playsInline controls loop autoPlay muted></video>
    </div>
  );
};
export default VideoPlayer;
