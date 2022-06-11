import { useEffect, useState } from 'react';
import { useSocket } from '../../context/socket.context';

function TypingUser() {
  const { typingUser, messageLength } = useSocket();
  const [isIdling, setIsIdling] = useState(false);

  console.log('Typing User rendered');

  useEffect(() => {
    const length1 = messageLength;
    let timer: ReturnType<typeof setTimeout>;

    setIsIdling(false);
    if (typingUser) {
      timer = setTimeout(() => {
        const length2 = messageLength;
        if (length1 === length2) {
          setIsIdling(true);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [messageLength, typingUser]);

  return <div>{!isIdling && typingUser && <p>{typingUser} is typing</p>}</div>;
}

export default TypingUser;
