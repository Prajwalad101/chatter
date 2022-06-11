import Messages from './messages';
import SendMessage from './send-message';
import TypingUser from './TypingUser';

type MessageContainerProps = {
  nickname: string;
};

function MessageContainer({ nickname }: MessageContainerProps) {
  return (
    <div className="h-[100vh] px-10">
      <Messages />
      <TypingUser />
      <SendMessage nickname={nickname} />
    </div>
  );
}

export default MessageContainer;
