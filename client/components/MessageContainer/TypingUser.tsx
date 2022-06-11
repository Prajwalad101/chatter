import { useSocket } from '../../context/socket.context';

function TypingUser() {
  const { typingUser } = useSocket();

  return <div>{typingUser && <p>{typingUser} is typing</p>}</div>;
}

export default TypingUser;
