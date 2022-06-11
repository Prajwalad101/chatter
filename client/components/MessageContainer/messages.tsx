import { useRef } from 'react';
import { useSocket } from '../../context/socket.context';

function Messages() {
  const { messages } = useSocket();

  const messageEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-[80vh] overflow-y-auto">
      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
}

export default Messages;
