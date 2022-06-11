import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import MessageContainer from '../components/MessageContainer/MessageContainer';
import UserNickname from '../components/user-nickname';

const Home: NextPage = () => {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const value = window.localStorage.getItem('nickname');
    if (value) {
      setNickname(value);
    }
  }, []);

  return (
    <>
      {nickname ? (
        <MessageContainer nickname={nickname} />
      ) : (
        <UserNickname setNickname={setNickname} />
      )}
    </>
  );
};

export default Home;
