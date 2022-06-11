import { useRef } from 'react';

type UserNicknameProps = {
  setNickname: (_value: string) => void;
};

function UserNickname({ setNickname }: UserNicknameProps) {
  const userNameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const value = userNameRef.current?.value;

    // check for undefined value
    if (!value) {
      return;
    }
    setNickname(value);
    localStorage.setItem('nickname', value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your nickname"
          ref={userNameRef}
        />
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}

export default UserNickname;
