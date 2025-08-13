// Sample Data
export const SAMPLE_POSTS = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      username: '@johndoe',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'Just shipped a new feature! Feeling accomplished 🚀',
    timestamp: '2h ago',
    likes: 42,
    comments: 5,
    retweets: 3,
    liked: false,
  },
  {
    id: '2',
    user: {
      name: 'Sarah Wilson',
      username: '@sarahw',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content:
      'Amazing sunset today! Nature never fails to inspire 🌅\n\n#photography #nature',
    timestamp: '4h ago',
    likes: 128,
    comments: 12,
    retweets: 8,
    liked: true,
  },
  {
    id: '3',
    user: {
      name: 'Tech News',
      username: '@technews',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    content:
      'Breaking: New AI breakthrough announced at major tech conference. This could change everything!',
    timestamp: '6h ago',
    likes: 523,
    comments: 89,
    retweets: 145,
    liked: false,
  },
];

export const SAMPLE_CHATS = [
  {
    id: '1',
    name: 'Team Project',
    lastMessage: 'Great work on the presentation!',
    timestamp: '10:30 AM',
    unread: 2,
    avatar: 'https://i.pravatar.cc/150?img=4',
    isGroup: true,
  },
  {
    id: '2',
    name: 'Alice Johnson',
    lastMessage: 'See you tomorrow!',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?img=5',
    isGroup: false,
  },
  {
    id: '3',
    name: 'Bob Smith',
    lastMessage: 'Thanks for the help',
    timestamp: 'Monday',
    unread: 1,
    avatar: 'https://i.pravatar.cc/150?img=6',
    isGroup: false,
  },
];

export const SAMPLE_MESSAGES = [
  {
    id: '1',
    text: 'Hey! How are you?',
    sender: 'other',
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    text: "I'm doing great! Just working on the new project",
    sender: 'me',
    timestamp: '10:02 AM',
  },
  {
    id: '3',
    text: 'That sounds exciting! Need any help?',
    sender: 'other',
    timestamp: '10:05 AM',
  },
  {
    id: '4',
    text: 'Actually yes, could you review my code later?',
    sender: 'me',
    timestamp: '10:06 AM',
  },
];
