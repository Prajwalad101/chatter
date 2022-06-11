interface EVENT {
  connection: 'connection';
  disconnect: 'disconnect';
  'chat message': 'chat message';
  typing: 'typing';
}

const EVENTS: EVENT = {
  connection: 'connection',
  disconnect: 'disconnect',
  'chat message': 'chat message',
  typing: 'typing',
};

export default EVENTS;
