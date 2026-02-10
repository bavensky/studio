export type Lesson = {
  thai: string;
  pronunciation: string;
  english: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  questionInThai?: string;
};

export type Level = {
  level: number;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
};

export const lessonsData: Level[] = [
  {
    level: 1,
    title: "Greetings & Basic Phrases",
    description: "Learn to say hello, thank you, and other essential phrases.",
    lessons: [
      { thai: "สวัสดี", pronunciation: "Sawasdee", english: "Hello / Goodbye" },
      { thai: "ขอบคุณ", pronunciation: "Khob khun", english: "Thank you" },
      { thai: "ขอโทษ", pronunciation: "Khor thot", english: "Sorry / Excuse me" },
      { thai: "ใช่", pronunciation: "Chai", english: "Yes" },
      { thai: "ไม่ใช่", pronunciation: "Mai chai", english: "No" },
    ],
    quiz: [
      {
        question: "How do you say 'Hello' in Thai?",
        options: ["Khob khun", "Sawasdee", "Khor thot", "Chai"],
        answer: "Sawasdee",
      },
      {
        question: "What does 'ขอบคุณ' (Khob khun) mean?",
        options: ["Sorry", "Yes", "Thank you", "No"],
        answer: "Thank you",
      },
    ],
  },
  {
    level: 2,
    title: "Asking 'How are you?'",
    description: "Learn how to ask people how they are and to respond.",
    lessons: [
      { thai: "สบายดีไหม", pronunciation: "Sabai dee mai?", english: "How are you?" },
      { thai: "สบายดี", pronunciation: "Sabai dee", english: "I am fine" },
      { thai: "แล้วคุณล่ะ", pronunciation: "Laew khun la?", english: "And you?" },
      { thai: "ก็ดี", pronunciation: "Kor dee", english: "I'm okay / So-so" },
    ],
    quiz: [
      {
        question: "How do you ask 'How are you?'",
        questionInThai: "สบายดีไหม",
        options: ["Sabai dee", "Laew khun la?", "Sawasdee", "Sabai dee mai?"],
        answer: "Sabai dee mai?",
      },
      {
        question: "A common response to 'Sabai dee mai?' is...",
        questionInThai: "สบายดี",
        options: ["Sabai dee", "Mai chai", "Khor thot", "Khob khun"],
        answer: "Sabai dee",
      },
    ],
  },
  {
    level: 3,
    title: "Numbers 1-5",
    description: "Start counting in Thai.",
    lessons: [
      { thai: "หนึ่ง", pronunciation: "Neung", english: "One" },
      { thai: "สอง", pronunciation: "Song", english: "Two" },
      { thai: "สาม", pronunciation: "Sam", english: "Three" },
      { thai: "สี่", pronunciation: "See", english: "Four" },
      { thai: "ห้า", pronunciation: "Ha", english: "Five" },
    ],
    quiz: [
      {
        question: "What is 'Three' in Thai?",
        questionInThai: "สาม",
        options: ["Neung", "Song", "Sam", "See"],
        answer: "Sam",
      },
      {
        question: "What number is 'ห้า' (Ha)?",
        options: ["Two", "Five", "One", "Four"],
        answer: "Five",
      },
    ],
  },
  {
    level: 4,
    title: "Introduction",
    description: "Learn to introduce yourself.",
    lessons: [
        { thai: "ฉันชื่อ...", pronunciation: "Chan cheu...", english: "My name is..." },
        { thai: "คุณชื่ออะไร", pronunciation: "Khun cheu arai?", english: "What is your name?" },
        { thai: "ยินดีที่ได้รู้จัก", pronunciation: "Yin dee tee dai roo jak", english: "Nice to meet you" },
    ],
    quiz: [
        {
            question: "How do you ask for someone's name?",
            questionInThai: "คุณชื่ออะไร",
            options: ["Chan cheu...", "Yin dee tee dai roo jak", "Khun cheu arai?", "Sawasdee"],
            answer: "Khun cheu arai?",
        },
    ],
  },
  {
    level: 5,
    title: "Food & Drinks",
    description: "Learn basic words for food and drinks.",
    lessons: [
        { thai: "น้ำ", pronunciation: "Naam", english: "Water" },
        { thai: "ข้าว", pronunciation: "Khao", english: "Rice" },
        { thai: "อร่อย", pronunciation: "Aroi", english: "Delicious" },
        { thai: "หิว", pronunciation: "Hiu", english: "Hungry" },
    ],
    quiz: [
        {
            question: "What does 'อร่อย' (Aroi) mean?",
            options: ["Water", "Hungry", "Rice", "Delicious"],
            answer: "Delicious",
        },
    ],
  },
  {
    level: 6,
    title: "Directions",
    description: "Simple directions and locations.",
    lessons: [
        { thai: "ซ้าย", pronunciation: "Sai", english: "Left" },
        { thai: "ขวา", pronunciation: "Khwaa", english: "Right" },
        { thai: "ตรงไป", pronunciation: "Dtrong bpai", english: "Go straight" },
        { thai: "ที่ไหน", pronunciation: "Tee nai?", english: "Where?" },
    ],
    quiz: [
        {
            question: "How do you say 'Right' in Thai?",
            questionInThai: "ขวา",
            options: ["Sai", "Khwaa", "Dtrong bpai", "Tee nai?"],
            answer: "Khwaa",
        },
    ],
  },
  {
    level: 7,
    title: "Shopping",
    description: "Basic phrases for shopping.",
    lessons: [
        { thai: "เท่าไหร่", pronunciation: "Tao rai?", english: "How much?" },
        { thai: "แพง", pronunciation: "Paeng", english: "Expensive" },
        { thai: "ลดหน่อยได้ไหม", pronunciation: "Lot noi dai mai?", english: "Can you give a discount?" },
    ],
    quiz: [
        {
            question: "What do you say to ask for the price?",
            questionInThai: "เท่าไหร่",
            options: ["Paeng", "Tao rai?", "Lot noi dai mai?", "Aroi"],
            answer: "Tao rai?",
        },
    ],
  },
  {
    level: 8,
    title: "Time",
    description: "Asking and telling basic time.",
    lessons: [
        { thai: "ตอนนี้กี่โมง", pronunciation: "Dton nee gee mohng?", english: "What time is it now?" },
        { thai: "วันนี้", pronunciation: "Wan nee", english: "Today" },
        { thai: "พรุ่งนี้", pronunciation: "Prung nee", english: "Tomorrow" },
    ],
    quiz: [
        {
            question: "How do you say 'Tomorrow'?",
            questionInThai: "พรุ่งนี้",
            options: ["Dton nee gee mohng?", "Wan nee", "Prung nee", "Sabai dee"],
            answer: "Prung nee",
        },
    ],
  },
  {
    level: 9,
    title: "Family",
    description: "Basic family member terms.",
    lessons: [
        { thai: "พ่อ", pronunciation: "Por", english: "Father" },
        { thai: "แม่", pronunciation: "Mae", english: "Mother" },
        { thai: "พี่ชาย / น้องชาย", pronunciation: "Pee chai / Nong chai", english: "Brother" },
        { thai: "พี่สาว / น้องสาว", pronunciation: "Pee sao / Nong sao", english: "Sister" },
    ],
    quiz: [
        {
            question: "The word for 'Mother' in Thai is:",
            questionInThai: "แม่",
            options: ["Por", "Mae", "Pee chai", "Nong sao"],
            answer: "Mae",
        },
    ],
  },
  {
    level: 10,
    title: "Putting It All Together",
    description: "Practice forming simple sentences.",
    lessons: [
        { thai: "ฉันหิวข้าว", pronunciation: "Chan hiu khao", english: "I'm hungry for rice" },
        { thai: "ขอน้ำหน่อย", pronunciation: "Khor naam noi", english: "Can I have some water?" },
        { thai: "วันนี้อากาศดี", pronunciation: "Wan nee aa-gaat dee", english: "The weather is good today" },
    ],
    quiz: [
        {
            question: "What does 'ฉันหิวข้าว' (Chan hiu khao) mean?",
            options: ["The weather is good", "I'm hungry for rice", "My name is Khao", "Nice to meet you"],
            answer: "I'm hungry for rice",
        },
    ],
  },
];
