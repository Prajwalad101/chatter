import type { NextPage } from 'next';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../config/default';

const url = SERVER_URL;
io(url);

const Home: NextPage = () => {
  return <div>Hello world</div>;
};

export default Home;
