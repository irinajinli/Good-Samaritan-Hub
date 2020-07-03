 // Some Toronto postal codes prefixes mapped to their lat, lon location
const postalCodes = {
  // Central Toronto
  M4V: {lat: 43.686989, lon: -79.402572},
  M4P: {lat: 43.697225, lon: -79.412968},

  // Downtown Toronto
  M5S: {lat: 43.663334, lon: -79.399336},
  M4X: {lat: 43.669856, lon: -79.365100},

  // Downsview East / North York
  M3K: {lat: 43.738192, lon: -79.470333},

  // Etibocoke
  M8V: {lat: 43.607141, lon: -79.503639},

  // West Toronto
  M6H: {lat: 43.664417, lon: -79.437448}
}

// Initial list of users
const users = [
  {
    username: 'user',
    password: 'user',
    firstName: 'John',
    lastName: 'Smith',
    location: 'M4V',
    bio: 'Hello world, I am John Smith!',
    posts: [],
    messagesSent: [0, 2, 4, 6],
    messagesRecieved: [1, 3, 5, 7],
    isReported: false,
    isBanned: false,
    reportedMessages: [],
    reportedPosts: [],
    banReason: ''
  },
  {
    username: 'user2',
    password: 'user2',
    firstName: 'Bobsy',
    lastName: 'Bob',
    location: 'M4P',
    bio: 'Hello world, I am Bobsy Bob!',
    posts: [0],
    messagesSent: [1, 3],
    messagesRecieved: [0, 2],
    isReported: false,
    isBanned: false,
    reportedMessages: [],
    reportedPosts: [],
    banReason: ''
  },
  {
    username: 'user3',
    password: 'user3',
    firstName: 'Diane',
    lastName: 'Doe',
    location: 'M6H',
    bio: 'Hello world, I am Diane Doe!',
    posts: [1],
    messagesSent: [5],
    messagesRecieved: [4],
    isReported: false,
    isBanned: false,
    reportedMessages: [],
    reportedPosts: [],
    banReason: ''
  },
  {
    username: 'user4',
    password: 'user4',
    firstName: 'Jack',
    lastName: 'Scott',
    location: 'M5S',
    bio: 'I am!',
    posts: [2],
    messagesSent: [7],
    messagesRecieved: [6],
    isReported: true,
    isBanned: false,
    reportedMessages: [7],
    reportedPosts: [2],
    banReason: ''
  },
  {
    username: 'user5',
    password: 'user5',
    firstName: 'Sally',
    lastName: 'Sue',
    location: 'M4X',
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
      commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
    posts: [],
    messagesSent: [],
    messagesRecieved: [],
    isReported: false,
    isBanned: true,
    reportedMessages: [],
    reportedPosts: [],
    banReason: 'User stole money'
  },
  {
    username: 'user6',
    password: 'user6',
    firstName: 'Pat',
    lastName: 'Rick',
    location: 'M3K',
    bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
      commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
    posts: [],
    messagesSent: [8],
    messagesRecieved: [],
    isReported: true,
    isBanned: true,
    reportedMessages: [8],
    reportedPosts: [],
    banReason: 'User said mean words'
  },
  {
    username: 'user7',
    password: 'user7',
    firstName: 'Blake',
    lastName: 'Bradley',
    location: 'M8V',
    bio: `I am John`,
    posts: [3, 4],
    messagesSent: [],
    messagesRecieved: [8],
    isReported: true,
    isBanned: false,
    reportedMessages: [],
    reportedPosts: [3, 4],
    banReason: ''
  }
];

// Initial list of posts
const posts = [
  {
    id: 0,
    title: 'Grocery Pickup',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
      commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor. Thanks!`,
    posterId: 'user2',
    type: 'Request',
    date: new Date(2020, 5, 12),
    status: 'active',
    location: 'M4P'
  },
  {
    id: 1,
    title: 'Any pickup in Etobicoke Area',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
      commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
    posterId: 'user3',
    type: 'Offer',
    date: new Date(2020, 5, 5),
    status: 'active',
    location: 'M6H'
  },
  {
    id: 2,
    title: 'Dog Walking Assistance',
    body: `Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
    posterId: 'user4',
    type: 'Request',
    date: new Date(2020, 5, 15, 8, 6, 2),
    status: 'active',
    location: 'M5S'
  },
  {
    id: 3,
    title: 'Want personal chef',
    body: 'I am hungry',
    posterId: 'user7',
    type: 'Request',
    date: new Date(2020, 5, 6, 20, 1, 43),
    status: 'active',
    location: 'M8V'
  },
  {
    id: 4,
    title: 'Candy',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
      commodo sed egestas.`,
    posterId: 'user7',
    type: 'Offer',
    date: new Date(2020, 5, 10, 2, 34, 23),
    status: 'active',
    location: 'M8V'
  },
];

const conversations = [
  { username: 'user2', name: 'Bobsy Bob', image: 'https://picsum.photos/70', lastMessageTime: 1593648000 },
  { username: 'user3', name: 'Diane Doh', image: 'https://picsum.photos/70', lastMessageTime: 1593646000 },
  { username: 'user4', name: 'Jack Scott', image: 'https://picsum.photos/70', lastMessageTime: 1593644000 },
];

const messages = [
  { messageId: 0, messageSender: 'user', messageReceiver: 'user2', date: '1593648000', messageContent: 'Hi Bobsy' },
  { messageId: 1, messageSender: 'user2', messageReceiver: 'user', date: '1593648000', messageContent: 'Hi John' },
  { messageId: 2, messageSender: 'user', messageReceiver: 'user2', date: '1593648000', messageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { messageId: 3, messageSender: 'user2', messageReceiver: 'user', date: '1593648000', messageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { messageId: 4, messageSender: 'user', messageReceiver: 'user3', date: '1593648000', messageContent: 'Hello Diane' },
  { messageId: 5, messageSender: 'user3', messageReceiver: 'user', date: '1593648000', messageContent: 'Hello John' },
  { messageId: 6, messageSender: 'user', messageReceiver: 'user4', date: '1593648000', messageContent: 'Greetings Jack' },
  { messageId: 7, messageSender: 'user4', messageReceiver: 'user', date: '1593648000', messageContent: 'Greetings John' },
  { messageId: 8, messageSender: 'user6', messageReceiver: 'user7', date: '1593648000', messageContent: 'Hello' },
];

export const getPostalCodePrefixes = () => Object.keys(postalCodes);

export const getPostalCodes = () => postalCodes;

export const getInitialUsers = () => users;

export const getInitialPosts = () => posts;

export const getMessages = () => messages;

export const getConversations = () => conversations;
