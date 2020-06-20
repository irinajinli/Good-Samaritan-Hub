 // Some Toronto postal codes prefixes mapped to their lat, lon location
const postalCodes = {
    // Central Toronto
    M4V: {lat: 43.686989, lon: -79.402572},
    M4P: {lat: 43.697225, lon: -79.412968},

    // Downtown Toronto
    M5S: {lat: 43.663334, lon: -79.399336},

    // Downsview East / North York
    M3K: {lat: 43.738192, lon: -79.470333},

    // Etibocoke
    M8V: {lat: 43.607141, lon: -79.503639}
  }

// Some users
const users = [
  {
    username: 'user',
    password: 'user',
    firstName: 'John',
    lastName: 'Smith',
    location: 'M4V',
    bio: 'Hello world, I am John Smith!',
    posts: [],
    messagesSent: [],
    messagesRecieved: [],
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
    posts: [],
    messagesSent: [],
    messagesRecieved: [],
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
    location: 'M8V',
    bio: 'Hello world, I am Diane Doe!',
    posts: [],
    messagesSent: [],
    messagesRecieved: [],
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
    posts: [],
    messagesSent: [],
    messagesRecieved: [],
    isReported: true,
    isBanned: false,
    reportedMessages: [],
    reportedPosts: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
      commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor.`],
    banReason: ''
  },
  {
    username: 'user5',
    password: 'user5',
    firstName: 'Sally',
    lastName: 'Sue',
    location: 'M3K',
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
    banReason: ''
  },
];

// Some posts
const posts = [
  {
    title: 'Grocery Pickup',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
      commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor. Thanks!`,
    poster: users[1],
    type: 'Request',
    date: new Date(2020, 5, 12),
    status: 'active'
  },
  {
    title: 'Any pickup in Etobicoke Area',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
      commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
    poster: users[2],
    type: 'Offer',
    date: new Date(2020, 5, 5),
    status: 'active'
  },
  {
    title: 'Dog Walking Assistance',
    body: `Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
      eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
      nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
      adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
    poster: users[3],
    type: 'Request',
    date: new Date(2020, 5, 15),
    status: 'active'
  }
];

// Add hard-coded posts to the hard-coded users's post lists
users[1].posts.push(posts[0]);
users[2].posts.push(posts[1]);
users[3].posts.push(posts[2]);

export const getPostalCodes = () => postalCodes;

export const getUsers = () => users;

export const getPosts = () => posts;
