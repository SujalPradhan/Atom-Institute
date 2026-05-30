/**
 * Static content for the Atom Institute site.
 *
 * This is a fully standalone frontend — there is no backend. All content the
 * site renders lives in this module as typed, synchronous data. To update the
 * site's content, edit the constants below.
 */

// ----------------------------------------------------------------------------
// Boards
// ----------------------------------------------------------------------------

export const boards = ["CBSE", "ICSE", "Madhyamik"] as const
export type Board = (typeof boards)[number]

export interface BoardInfo {
  name: Board
  /** The expanded name of the board, shown beneath the abbreviation. */
  fullName: string
  description: string
}

export const boardInfo: Record<Board, BoardInfo> = {
  CBSE: {
    name: "CBSE",
    fullName: "Central Board of Secondary Education",
    description: "National curriculum followed by schools across India.",
  },
  ICSE: {
    name: "ICSE",
    fullName: "Indian Certificate of Secondary Education",
    description: "English-medium curriculum administered by the CISCE.",
  },
  Madhyamik: {
    name: "Madhyamik",
    fullName: "West Bengal Board of Secondary Education",
    description: "State board curriculum for students in West Bengal.",
  },
}

// ----------------------------------------------------------------------------
// Classes
// ----------------------------------------------------------------------------

export interface ClassInfo {
  /** Stable route id used in URLs, e.g. /classes/1 */
  id: number
  /** The class as students know it: 10, 11 or 12 */
  classNumber: number
  name: string
  description: string
}

export const classes: ClassInfo[] = [
  {
    id: 1,
    classNumber: 10,
    name: "Class 10",
    description: "Comprehensive study materials for students in Class 10",
  },
  {
    id: 2,
    classNumber: 11,
    name: "Class 11",
    description: "Comprehensive study materials for students in Class 11",
  },
  {
    id: 3,
    classNumber: 12,
    name: "Class 12",
    description: "Comprehensive study materials for students in Class 12",
  },
]

export function getClassById(id: number): ClassInfo | undefined {
  return classes.find((c) => c.id === id)
}

// ----------------------------------------------------------------------------
// Study material links (Google Drive folders)
// ----------------------------------------------------------------------------
//
// Each class + board points to a Google Drive folder. Fill in the URLs below
// when the folders are ready. Keys are `${classNumber}-${BOARD}` (board
// uppercased), e.g. "10-CBSE". An empty string means "not configured yet" —
// the UI shows a friendly "coming soon" message instead of a broken link.
//
// To make materials more granular later (e.g. per subject), extend the key
// scheme to `${classNumber}-${BOARD}-${SUBJECT}` and update getDriveLink.

export const driveLinks: Record<string, string> = {
  "10-CBSE": "",
  "10-ICSE": "",
  "10-MADHYAMIK": "",
  "11-CBSE": "",
  "11-ICSE": "",
  "11-MADHYAMIK": "",
  "12-CBSE": "",
  "12-ICSE": "",
  "12-MADHYAMIK": "",
}

/** Returns the Drive folder URL for a class+board, or null if not configured. */
export function getDriveLink(classNumber: number, board: string): string | null {
  const key = `${classNumber}-${board.toUpperCase()}`
  const url = driveLinks[key]
  return url && url.trim().length > 0 ? url : null
}

// ----------------------------------------------------------------------------
// Subjects (shown on the home page)
// ----------------------------------------------------------------------------

export interface Subject {
  id: number
  name: string
  topics: string
}

export const subjects: Subject[] = [
  { id: 1, name: "Physics", topics: "Mechanics, Thermodynamics, Electronics" },
  { id: 2, name: "Chemistry", topics: "Organic, Inorganic, Physical Chemistry" },
  { id: 3, name: "Mathematics", topics: "Algebra, Calculus, Geometry" },
  { id: 4, name: "Biology", topics: "Botany, Zoology, Human Physiology" },
  { id: 5, name: "Computer Science", topics: "Programming, Data Structures, Algorithms" },
]

// ----------------------------------------------------------------------------
// Faculty (About page)
// ----------------------------------------------------------------------------

export interface Faculty {
  id: number
  name: string
  image: string
  position: string
  qualifications: string
  experience: string
  specialization: string
}

export const faculty: Faculty[] = [
  {
    id: 1,
    name: "Mr. Arpan Pradhan",
    image: "/images/teacher1.jpg",
    position: "Founder & Educator",
    qualifications: "M.Sc. in Computer Science, Shantiniketan University",
    experience: "2+ years in education",
    specialization: "Computer Science",
  },
  {
    id: 2,
    name: "Prof. Anjali Sharma",
    image: "/placeholder-user.jpg",
    position: "Head of Mathematics Department",
    qualifications: "M.Sc. Mathematics, Calcutta University",
    experience: "12+ years in teaching",
    specialization: "Calculus and Algebra",
  },
  {
    id: 3,
    name: "Dr. Pradeep Banerjee",
    image: "/placeholder-user.jpg",
    position: "Chemistry Faculty",
    qualifications: "Ph.D. in Chemistry, Jadavpur University",
    experience: "10+ years in education",
    specialization: "Organic Chemistry",
  },
  {
    id: 4,
    name: "Prof. Meena Chatterjee",
    image: "/placeholder-user.jpg",
    position: "Biology Faculty",
    qualifications: "M.Sc. Biotechnology, Presidency University",
    experience: "8+ years in teaching",
    specialization: "Molecular Biology",
  },
  {
    id: 5,
    name: "Prof. Sanjay Das",
    image: "/placeholder-user.jpg",
    position: "Computer Science Faculty",
    qualifications: "M.Tech in Computer Science, IIT Kharagpur",
    experience: "9+ years in education",
    specialization: "Programming and Data Structures",
  },
  {
    id: 6,
    name: "Dr. Sunita Roy",
    image: "/placeholder-user.jpg",
    position: "English & Literature Faculty",
    qualifications: "Ph.D. in English Literature, Delhi University",
    experience: "11+ years in teaching",
    specialization: "Modern Literature and Language Skills",
  },
]

// ----------------------------------------------------------------------------
// Testimonials
// ----------------------------------------------------------------------------

export interface Testimonial {
  id: number
  name: string
  testimonial: string
  classNumber: number
  board: Board
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    testimonial:
      "The teachers at Atom Institute helped me understand complex physics concepts in a simple way. Their guidance was instrumental in my board exam success.",
    classNumber: 12,
    board: "CBSE",
  },
  {
    id: 2,
    name: "Priya Patel",
    testimonial:
      "The study materials and practice questions provided by Atom Institute were comprehensive and helped me score well in my exams.",
    classNumber: 10,
    board: "ICSE",
  },
  {
    id: 3,
    name: "Aditya Roy",
    testimonial:
      "The interactive teaching method and personal attention from teachers made learning enjoyable. I improved my grades significantly after joining.",
    classNumber: 11,
    board: "Madhyamik",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    testimonial:
      "Atom Institute provided me with a strong foundation in mathematics. The concepts I learned here helped me excel in competitive exams as well.",
    classNumber: 12,
    board: "CBSE",
  },
  {
    id: 5,
    name: "Arjun Singh",
    testimonial:
      "The chemistry lab experiments at Atom Institute made the subject practical and easy to understand. The teachers are supportive and knowledgeable.",
    classNumber: 10,
    board: "ICSE",
  },
  {
    id: 6,
    name: "Nandini Das",
    testimonial:
      "I appreciate how the teachers at Atom Institute focus on building concepts rather than just memorization. This approach helped me develop analytical thinking.",
    classNumber: 11,
    board: "Madhyamik",
  },
]

// ----------------------------------------------------------------------------
// Gallery
// ----------------------------------------------------------------------------

export interface GalleryItem {
  id: number
  title: string
  image: string
  description: string
}

export const gallery: GalleryItem[] = [
  { id: 1, title: "Our Faculty", image: "/images/teacher1.jpg", description: "Dedicated educators guiding our students" },
  { id: 2, title: "Physics Lab", image: "/placeholder.jpg", description: "Modern physics laboratory" },
  { id: 3, title: "Computer Lab", image: "/placeholder.jpg", description: "Computer science lab" },
  { id: 4, title: "Chemistry Lab", image: "/placeholder.jpg", description: "Hands-on chemistry experiments" },
  { id: 5, title: "Library", image: "/placeholder.jpg", description: "Well-stocked library" },
  { id: 6, title: "Classroom", image: "/placeholder.jpg", description: "Interactive classroom" },
]

// ----------------------------------------------------------------------------
// Contact / institute details (used across the site)
// ----------------------------------------------------------------------------

export const contact = {
  phone: "+91 12345 67890",
  email: "contact@atominstitute.edu",
  location: "Kalimpong, West Bengal, India",
}

/**
 * Social links shown in the footer. Leave a value empty to hide that icon
 * (we never render dead "#" links).
 */
export const socialLinks = {
  facebook: "",
  instagram: "",
  youtube: "",
}
