import { useEffect, useState } from 'react';
import { useSocket } from '../../context/socket.context';
import EVENTS from '../../utils/events';

type SendMessageProps = {
  nickname: string;
};

function SendMessage({ nickname }: SendMessageProps) {
  const { socket } = useSocket();

  const [messageInput, setMessageInput] = useState('');

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!String(messageInput).trim() || !messageInput) {
      return;
    }

    socket.emit(EVENTS['chat message'], messageInput);
    setMessageInput('');
  };

  // emit message if the user is typing
  useEffect(() => {
    const message = String(messageInput).trim();
    if (message === null || message === undefined) {
      return;
    }

    const messageLength = message.length;
    const typeValue = { user: nickname, messageLength };

    if (messageLength > 0) {
      socket.emit('type', typeValue);
    } else {
      socket.emit('untype', typeValue);
    }
  }, [messageInput, nickname, socket]);

  return (
    <div className="w-[80%]">
      <form onSubmit={sendMessage} className="mb-10 flex justify-between">
        <input
          className="w-full rounded-sm border-2 p-2"
          type="text"
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
        />
        <button
          type="submit"
          className="ml-4 rounded-sm bg-blue-600 px-7 py-2 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
