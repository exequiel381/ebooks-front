export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const mockBooks: Book[] = [
  // Programming
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Programming",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way."
  },
  {
    id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Programming",
    description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable."
  },
  {
    id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Programming",
    description: "No matter how much experience you have with JavaScript, odds are you don't fully understand the language. This concise yet in-depth guide takes you inside scope and closures, two core concepts you need to know to become a more efficient and effective JavaScript programmer."
  },

  // Business
  {
    id: "d4e5f6g7-h8i9-0123-defg-456789012345",
    title: "The Lean Startup",
    author: "Eric Ries",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    category: "Business",
    description: "Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched."
  },
  {
    id: "e5f6g7h8-i9j0-1234-efgh-567890123456",
    title: "Good to Great",
    author: "Jim Collins",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Business",
    description: "Built to Last showed how great companies triumph over time and how long-term sustained performance can be engineered into the DNA of an enterprise from the very beginning. But what about companies that are not born with great DNA? How can good companies, mediocre companies, even bad companies achieve enduring greatness?"
  },

  // Science Fiction
  {
    id: "f6g7h8i9-j0k1-2345-fghi-678901234567",
    title: "Dune",
    author: "Frank Herbert",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    category: "Science Fiction",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib. He would avenge the traitorous plot against his noble family—and would bring to fruition humankind's most ancient and unattainable dream."
  },
  {
    id: "g7h8i9j0-k1l2-3456-ghij-789012345678",
    title: "The Martian",
    author: "Andy Weir",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Science Fiction",
    description: "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars. Now, he's sure he'll be the first person to die there. After a dust storm nearly kills him and forces his crew to evacuate while thinking him dead, Mark finds himself stranded and completely alone with no way to even signal Earth that he's alive."
  },

  // Self-Help
  {
    id: "h8i9j0k1-l2m3-4567-hijk-890123456789",
    title: "Atomic Habits",
    author: "James Clear",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    category: "Self-Help",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results."
  },
  {
    id: "i9j0k1l2-m3n4-5678-ijkl-901234567890",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80",
    category: "Self-Help",
    description: "In The 7 Habits of Highly Effective People, author Stephen R. Covey presents a holistic, integrated, principle-centered approach for solving personal and professional problems. With penetrating insights and pointed anecdotes, Covey reveals a step-by-step pathway for living with fairness, integrity, service, and human dignity."
  },

  // History
  {
    id: "j0k1l2m3-n4o5-6789-jklm-012345678901",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 23.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80",
    category: "History",
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be 'human.'"
  },
  {
    id: "k1l2m3n4-o5p6-7890-klmn-123456789012",
    title: "The Guns of August",
    author: "Barbara W. Tuchman",
    price: 20.99,
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80",
    category: "History",
    description: "In this landmark account, renowned historian Barbara Tuchman re-creates the first month of World War I: thirty days in the summer of 1914 that determined the course of the conflict, the century, and ultimately our present world."
  }
];

export const categories: string[] = [
  "All",
  "Programming",
  "Business",
  "Science Fiction",
  "Self-Help",
  "History"
];