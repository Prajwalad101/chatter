import { useSocket } from '../../context/socket.context';

function TypingUser() {
  const { typingUser, setTypingUser } = useSocket();

  // useEffect(() => {
  //   // TODO: if there is a typing user, reset the user every 3 seconds
  //   if (typingUser) {
  //     setInterval(() => {
  //       console.log('Set interval function called');
  //       setTypingUser('');
  //     }, 3000);
  //   }
  // }, [typingUser, setTypingUser]);

  return <div>{typingUser && <p>{typingUser} is typing</p>}</div>;
}

export default TypingUser;
