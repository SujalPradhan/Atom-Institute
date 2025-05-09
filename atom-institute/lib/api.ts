// Types
export interface Class {
  id: number;
  name: string;
  boards?: string[];
  description: string;
  image?: string;
}

export interface Board {
  id: number;
  name: string;
  subjects: string[];
}

export interface Subject {
  id: number;
  name: string;
  description: string;
  image?: string;
  icon?: string;
  googleDriveFolderLink?: string;  // Add this field for direct Google Drive folder links
}

export interface Achievement {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  class: string;
  board: string;
  testimonial: string;
  image?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export interface Note {
  id: number;
  title: string;
  description: string;
  content?: string;
  downloadUrl?: string;
  viewUrl?: string;
  fileSize?: string;
  fileType?: string;
}

// Notes URLs by class and board
export const notesUrls: Record<string, Record<string, string>> = {
  "10": {
    "CBSE": "www.class10cbse.com",
    "ICSE": "www.class10icse.com",
    "MADHYAMIK": "www.class10madhyamik.com"
  },
  "11": {
    "CBSE": "www.class11cbse.com",
    "ICSE": "www.class11icse.com",
    "MADHYAMIK": "www.class11madhyamik.com"
  },
  "12": {
    "CBSE": "www.class12cbse.co", // Note: this one ends with .co instead of .com
    "ICSE": "www.class12icse.com",
    "MADHYAMIK": "www.class12madhyamik.com"
  }
};

// Helper function to get notes URL by class and board
export function getNotesUrlByClassAndBoard(classNum: number, board: string): string {
  const classKey = String(classNum === 1 ? 10 : classNum === 2 ? 11 : classNum === 3 ? 12 : classNum);
  const boardKey = board.toUpperCase();
  
  if (notesUrls[classKey] && notesUrls[classKey][boardKey]) {
    return notesUrls[classKey][boardKey];
  }
  
  // Fallback to CBSE if board not found
  if (notesUrls[classKey] && notesUrls[classKey]["CBSE"]) {
    return notesUrls[classKey]["CBSE"];
  }
  
  // Default fallback
  return "";
}

// Helper function for error handling
const handleApiError = (error: unknown, fallback: any, context: string): any => {
  console.error(`Error in ${context}:`, error);
  
  // We could add error reporting/logging here
  
  // Return fallback data so UI doesn't break
  return fallback;
};

// Define fallback data for home classes
const fallbackHomeClasses: Class[] = [
  { 
    id: 1, 
    name: "Class 10", 
    image: "/placeholder.jpg", 
    description: "Comprehensive study materials for students in Class 10" 
  },
  { 
    id: 2, 
    name: "Class 11", 
    image: "/placeholder.jpg", 
    description: "Comprehensive study materials for students in Class 11" 
  },
  { 
    id: 3, 
    name: "Class 12", 
    image: "/placeholder.jpg", 
    description: "Comprehensive study materials for students in Class 12" 
  }
];

// Define fallback data for home achievements
const fallbackHomeAchievements: Achievement[] = [
  {
    id: 1,
    icon: "trophy",
    title: "100% Pass Rate",
    description: "All our students have successfully passed their board exams"
  },
  {
    id: 2,
    icon: "medal",
    title: "Top Scorers",
    description: "Multiple students scored above 90% in Science and Mathematics"
  },
  {
    id: 3,
    icon: "award",
    title: "Competitive Exam Success",
    description: "Students from our institute regularly qualify for JEE and NEET"
  }
];

// Define fallback data for home testimonials
const fallbackHomeTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Singh",
    class: "Class 12",
    board: "CBSE",
    testimonial: "Atom Institute helped me achieve 95% in my board exams. The teachers are very dedicated and the study materials are comprehensive.",
    image: "/placeholder-user.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    class: "Class 10",
    board: "ICSE",
    testimonial: "I was struggling with Physics until I joined Atom Institute. The concepts are explained so clearly that I scored 92% in my final exams.",
    image: "/placeholder-user.jpg"
  },
  {
    id: 3,
    name: "Rahul Gupta",
    class: "Class 11",
    board: "Madhyamik",
    testimonial: "The study materials provided by Atom Institute are exceptional. They cover every aspect of the syllabus in detail and include plenty of practice questions.",
    image: "/placeholder-user.jpg"
  }
];

// API functions
export async function getHomeClasses(): Promise<Class[]> {
  try {
    // Check if API URL is explicitly defined
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // If no API URL is defined, don't attempt to make the network request
    if (!apiUrl) {
      console.log('No API URL defined, using fallback home classes data');
      return fallbackHomeClasses;
    }
    
    // Attempt to fetch from API
    console.log(`Fetching home classes from: ${apiUrl}/api/home/classes`);
    const response = await fetch(`${apiUrl}/api/home/classes`);
    
    if (!response.ok) {
      console.log(`Home classes API request failed with status: ${response.status}, using fallback data`);
      return fallbackHomeClasses;
    }
    
    const data = await response.json();
    
    // If the API returns an empty array, use fallback data
    if (Array.isArray(data) && data.length === 0) {
      console.log('API returned empty array for home classes, using fallback data');
      return fallbackHomeClasses;
    }
    
    return data;
  } catch (error) {
    console.log(`Error fetching home classes: ${error}, using fallback data`);
    return fallbackHomeClasses;
  }
}

export async function getHomeAchievements(): Promise<Achievement[]> {
  try {
    // Check if API URL is explicitly defined
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // If no API URL is defined, don't attempt to make the network request
    if (!apiUrl) {
      console.log('No API URL defined, using fallback home achievements data');
      return fallbackHomeAchievements;
    }
    
    // Attempt to fetch from API
    console.log(`Fetching home achievements from: ${apiUrl}/api/home/achievements`);
    const response = await fetch(`${apiUrl}/api/home/achievements`);
    
    if (!response.ok) {
      console.log(`Home achievements API request failed with status: ${response.status}, using fallback data`);
      return fallbackHomeAchievements;
    }
    
    const data = await response.json();
    
    // If the API returns an empty array, use fallback data
    if (Array.isArray(data) && data.length === 0) {
      console.log('API returned empty array for home achievements, using fallback data');
      return fallbackHomeAchievements;
    }
    
    return data;
  } catch (error) {
    console.log(`Error fetching home achievements: ${error}, using fallback data`);
    return fallbackHomeAchievements;
  }
}

export async function getHomeTestimonials(): Promise<Testimonial[]> {
  try {
    // Check if API URL is explicitly defined
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // If no API URL is defined, don't attempt to make the network request
    if (!apiUrl) {
      console.log('No API URL defined, using fallback home testimonials data');
      return fallbackHomeTestimonials;
    }
    
    // Attempt to fetch from API
    console.log(`Fetching home testimonials from: ${apiUrl}/api/home/testimonials`);
    const response = await fetch(`${apiUrl}/api/home/testimonials`);
    
    if (!response.ok) {
      console.log(`Home testimonials API request failed with status: ${response.status}, using fallback data`);
      return fallbackHomeTestimonials;
    }
    
    const data = await response.json();
    
    // If the API returns an empty array, use fallback data
    if (Array.isArray(data) && data.length === 0) {
      console.log('API returned empty array for home testimonials, using fallback data');
      return fallbackHomeTestimonials;
    }
    
    return data;
  } catch (error) {
    console.log(`Error fetching home testimonials: ${error}, using fallback data`);
    return fallbackHomeTestimonials;
  }
}

export async function getClasses(): Promise<Class[]> {
  try {
    // Check if API URL is explicitly defined
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // If no API URL is defined, don't attempt to make the network request
    if (!apiUrl) {
      console.log('No API URL defined, using fallback classes data');
      return fallbackClasses;
    }
    
    // Attempt to fetch from API
    console.log(`Fetching classes from: ${apiUrl}/api/classes`);
    const response = await fetch(`${apiUrl}/api/classes`);
    
    if (!response.ok) {
      console.log(`API request failed with status: ${response.status}, using fallback data`);
      return fallbackClasses;
    }
    
    const data = await response.json();
    
    // If the API returns an empty array, use fallback data
    if (Array.isArray(data) && data.length === 0) {
      console.log('API returned empty array, using fallback data');
      return fallbackClasses;
    }
    
    return data;
  } catch (error) {
    console.log(`Error fetching classes: ${error}, using fallback data`);
    // Return fallback classes instead of an empty array
    return fallbackClasses;
  }
}

// Fallback classes to show when API fails or returns empty data
const fallbackClasses: Class[] = [
  { 
    id: 1, 
    name: "Class 10", 
    image: "/placeholder.jpg", 
    description: "Comprehensive study materials for students in Class 10" 
  },
  { 
    id: 2, 
    name: "Class 11", 
    image: "/placeholder.jpg", 
    description: "Comprehensive study materials for students in Class 11" 
  },
  { 
    id: 3, 
    name: "Class 12", 
    image: "/placeholder.jpg", 
    description: "Comprehensive study materials for students in Class 12" 
  }
];

// Function to get a specific class by ID
export async function getClassById(classId: number): Promise<Class> {
  // Check if classId is valid (currently only 1, 2, 3 are valid for Classes 10, 11, 12)
  if (classId < 1 || classId > 3) {
    console.warn(`Invalid class ID: ${classId}. Using fallback class.`);
    // Return fallback for invalid class ID
    return fallbackClasses[0]; // Default to Class 10
  }
  
  try {
    // Check if API URL is explicitly defined
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // If no API URL is defined, don't attempt to make the network request
    if (!apiUrl) {
      console.log(`No API URL defined, using fallback class data for ID ${classId}`);
      return fallbackClasses[classId - 1];
    }
    
    // Attempt to fetch from API
    console.log(`Fetching class with ID ${classId} from: ${apiUrl}/api/classes/${classId}`);
    const response = await fetch(`${apiUrl}/api/classes/${classId}`);
    
    if (!response.ok) {
      console.warn(`Failed to fetch class with ID ${classId}, status: ${response.status}. Using fallback.`);
      // If API doesn't have this endpoint or returns an error, use fallback data
      return fallbackClasses[classId - 1];
    }
    
    const data = await response.json();
    
    // Validate the returned data
    if (!data || !data.name) {
      console.warn(`Invalid data returned for class ${classId}. Using fallback.`);
      return fallbackClasses[classId - 1];
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching class ${classId}: ${error}. Using fallback data.`);
    // Use fallback data instead of throwing error
    return fallbackClasses[classId - 1];
  }
}

export async function getBoards(classId: number): Promise<Board[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/classes/${classId}/boards`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, [], 'getBoards');
  }
}

// Get all boards for a specific class
export async function getBoardsByClass(classId: number): Promise<string[]> {
  // Define fallback boards
  const fallbackBoards = ["CBSE", "ICSE", "Madhyamik"];
  
  try {
    // Check if API URL is explicitly defined
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // If no API URL is defined, don't attempt to make the network request
    if (!apiUrl) {
      console.log('No API URL defined, using fallback boards data');
      return fallbackBoards;
    }
    
    // Attempt to fetch from API
    console.log(`Fetching boards for class ${classId} from: ${apiUrl}/api/classes/${classId}/boards`);
    const response = await fetch(`${apiUrl}/api/classes/${classId}/boards`);
    
    if (!response.ok) {
      console.log(`Boards API request failed with status: ${response.status}, using fallback data`);
      return fallbackBoards;
    }
    
    const data = await response.json();
    
    // If the API returns an empty array, use fallback data
    if (Array.isArray(data) && data.length === 0) {
      console.log('API returned empty array for boards, using fallback data');
      return fallbackBoards;
    }
    
    return data;
  } catch (error) {
    console.log(`Error fetching boards for class ${classId}: ${error}, using fallback data`);
    // Return fallback boards instead of an empty array
    return fallbackBoards;
  }
}

export async function getSubjects(classId: number, boardId: number): Promise<Subject[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/classes/${classId}/boards/${boardId}/subjects`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, [], 'getSubjects');
  }
}

// Get a specific subject by ID
export async function getSubjectById(subjectId: number): Promise<Subject> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Try to fetch from subjects endpoint
    const response = await fetch(`${apiUrl}/api/subjects/${subjectId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch subject with ID ${subjectId}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch subject: ${error}`);
  }
}

// Helper function to get subject name by ID
function getSubjectNameById(id: number): string {
  // Common subject mappings
  const subjectMap: Record<number, string> = {
    1: "Physics",
    2: "Chemistry",
    3: "Mathematics",
    4: "Biology",
    5: "Computer Science",
  };
  
  return subjectMap[id] || `Subject ${id}`;
}

// Get subjects for a specific class and board
export async function getSubjectsByClassAndBoard(classId: number, board: string): Promise<Subject[]> {
  try {
    console.log(`Fetching subjects for Class ${classId}, Board ${board}`);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Need to convert class ID to display name format in the URL (e.g., 1 to 10)
    const classNum = classId === 1 ? 10 : classId === 2 ? 11 : classId === 3 ? 12 : classId;
    
    // Ensure board is properly formatted (backend comparison is case-insensitive)
    const formattedBoard = board.toUpperCase();
    
    // Make sure URL is constructed properly
    const url = `${apiUrl}/api/classes/${classNum}/${formattedBoard}/subjects`;
    console.log(`Making API request to: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch subjects with status: ${response.status}`);
      // Return an empty array if the API call fails
      return [];
    }
    
    const subjects = await response.json();
    console.log(`Fetched ${subjects.length} subjects for Class ${classId} (${classNum}), Board ${formattedBoard}:`, subjects);
    
    return subjects;
  } catch (error) {
    console.error(`Failed to fetch subjects for class ${classId}, board ${board}:`, error);
    // Return empty array on error
    return [];
  }
}

// Get notes for a specific subject
export async function getNotesBySubject(classId: number, board: string, subjectId: number): Promise<Note[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Convert subject ID to name for the API call
    const subjectName = getSubjectNameById(subjectId);
    
    // The API is case sensitive, use the exact name without encoding
    console.log(`Getting notes for Class ${classId}, Board ${board}, Subject ${subjectName} (ID: ${subjectId})`);
    console.log(`API URL: ${apiUrl}/api/classes/${classId}/${board}/${subjectName}/notes`);
    
    // Make the API call with the exact subject name
    const response = await fetch(`${apiUrl}/api/classes/${classId}/${board}/${subjectName}/notes`);
    
    if (!response.ok) {
      console.log(`Notes endpoint failed with status ${response.status}`);
      return []; // Return empty array
    }
    
    // Parse response data
    const data = await response.json();
    console.log('Notes data received successfully:', data);
    
    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.error('API returned non-array data:', data);
      return [];
    }
    
    // Convert the notes data to ensure it matches the expected Note interface format
    const formattedNotes: Note[] = data.map((note: any) => ({
      id: note.id,
      title: note.title || '',
      description: note.description || '',
      content: note.content || null,
      downloadUrl: note.downloadUrl || note.googleDriveLink || null,
      viewUrl: note.viewUrl || (note.googleDriveLink ? note.googleDriveLink.replace('/file/d/', '/document/d/') : null),
      fileSize: note.fileSize || null,
      fileType: note.fileType || null
    }));
    
    return formattedNotes;
  } catch (error) {
    console.error(`Error fetching notes for subject ${subjectId}:`, error);
    return []; // Return empty array
  }
}

// Get Google Drive link for a specific subject
export async function getSubjectDriveLink(classId: number, board: string, subjectId: number): Promise<string> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Convert internal class ID to the actual class number
    const classNum = classId === 1 ? 10 : classId === 2 ? 11 : classId === 3 ? 12 : classId;
    // Ensure consistent board formatting
    const formattedBoard = board.toUpperCase();
    
    console.log(`Getting drive link for Class ${classId} (${classNum}), Board ${formattedBoard}, Subject ID ${subjectId}`);
    
    // First get all subjects to find the name for this subject ID
    let subjectName;
    try {
      const subjects = await getSubjectsByClassAndBoard(classId, formattedBoard);
      const subject = subjects.find(s => s.id === subjectId);
      if (subject) {
        subjectName = subject.name;
        console.log(`Found subject: ${subjectName} (ID: ${subjectId})`);
      } else {
        console.warn(`Subject with ID ${subjectId} not found in fetched subjects`);
        throw new Error(`Subject with ID ${subjectId} not found`);
      }
    } catch (error) {
      console.error(`Error finding subject name for ID ${subjectId}:`, error);
      // Fall back to the mapping if we can't get the subject from the API
      subjectName = getSubjectNameById(subjectId);
      console.log(`Using fallback subject name mapping: ${subjectName}`);
    }
    
    // Make the API call to get the Drive link for this subject
    const url = `${apiUrl}/api/classes/${classNum}/${formattedBoard}/${subjectName}/drive-link`;
    console.log(`Fetching drive link from: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch drive link with status: ${response.status}`);
      throw new Error(`Failed to fetch Google Drive link for subject ${subjectName}`);
    }
    
    const data = await response.json();
    console.log(`Received drive link for ${subjectName}:`, data);
    
    if (!data.googleDriveLink) {
      throw new Error(`No Google Drive link available for ${subjectName}`);
    }
    
    // Return the Google Drive link
    return data.googleDriveLink;
  } catch (error) {
    console.error(`Error fetching Google Drive link:`, error);
    throw error; // Re-throw the error for handling in the component
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/gallery`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, [], 'getGalleryImages');
  }
}

// Get gallery categories
export async function getGalleryCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/gallery/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, ["campus", "labs", "facilities", "classrooms", "events"], 'getGalleryCategories');
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/testimonials`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, [], 'getTestimonials');
  }
}

export async function getNotes(classId: number, boardId: number, subjectId: number): Promise<string[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/classes/${classId}/boards/${boardId}/subjects/${subjectId}/notes`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, [], 'getNotes');
  }
}

// Helper alias for backwards compatibility
export const getAllClasses = getClasses;