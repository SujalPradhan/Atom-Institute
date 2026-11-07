/**
 * Learning Hub syllabus data.
 *
 * Each course below lists its chapter titles. To attach resources to a chapter,
 * pass an `extras` object as the last argument of course(), keyed by the exact
 * chapter title:
 *   { Electricity: { notes: [{ title: "Notes", url: "https://..." }],
 *                    mcq: [{ title: "Test 1", code: "ELEC01" }] } }
 * notes / ppt / solved take { title, url } (Notion or Google Drive links);
 * mcq takes { title, code } where code is a test code used on /tests.
 */

import { boards, classes, type Board } from "@/lib/data"

export type ResourceKind = "notes" | "ppt" | "solved" | "mcq"

export interface LinkResource {
  title: string
  url: string
}

export interface McqResource {
  title: string
  code: string
}

export interface Chapter {
  slug: string
  title: string
  notes?: LinkResource[]
  ppt?: LinkResource[]
  solved?: LinkResource[]
  mcq?: McqResource[]
}

export interface Course {
  classNumber: 10 | 11 | 12
  board: Board
  subjectSlug: string
  subject: string
  chapters: Chapter[]
}

type ClassNumber = Course["classNumber"]
type Extras = Record<string, Omit<Chapter, "slug" | "title">>

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function course(
  classNumber: ClassNumber,
  board: Board,
  subject: string,
  titles: string[],
  extras: Extras = {},
): Course {
  return {
    classNumber,
    board,
    subjectSlug: slugify(subject),
    subject,
    chapters: titles.map((title) => ({ slug: slugify(title), title, ...extras[title] })),
  }
}

const cbse10Science = [
  "Chemical Reactions and Equations",
  "Acids, Bases and Salts",
  "Metals and Non-metals",
  "Carbon and its Compounds",
  "Life Processes",
  "Control and Coordination",
  "How do Organisms Reproduce?",
  "Heredity",
  "Light – Reflection and Refraction",
  "The Human Eye and the Colourful World",
  "Electricity",
  "Magnetic Effects of Electric Current",
  "Our Environment",
]

const cbse10Maths = [
  "Real Numbers",
  "Polynomials",
  "Pair of Linear Equations in Two Variables",
  "Quadratic Equations",
  "Arithmetic Progressions",
  "Triangles",
  "Coordinate Geometry",
  "Introduction to Trigonometry",
  "Some Applications of Trigonometry",
  "Circles",
  "Areas Related to Circles",
  "Surface Areas and Volumes",
  "Statistics",
  "Probability",
]

const icse10Physics = [
  "Force",
  "Work, Energy and Power",
  "Machines",
  "Refraction of Light at Plane Surfaces",
  "Refraction through Lenses",
  "Spectrum",
  "Sound",
  "Current Electricity",
  "Household Circuits",
  "Electro-magnetism",
  "Calorimetry",
  "Radioactivity",
]

const icse10Chemistry = [
  "Periodic Table, Periodic Properties and Variations",
  "Chemical Bonding",
  "Acids, Bases and Salts",
  "Analytical Chemistry",
  "Mole Concept and Stoichiometry",
  "Electrolysis",
  "Metallurgy",
  "Study of Compounds: Hydrogen Chloride",
  "Study of Compounds: Ammonia",
  "Study of Compounds: Nitric Acid",
  "Study of Compounds: Sulphuric Acid",
  "Organic Chemistry",
]

const icse10Biology = [
  "Cell Cycle and Structure of Chromosomes",
  "Genetics",
  "Absorption by Roots",
  "Transpiration",
  "Photosynthesis",
  "Chemical Coordination in Plants",
  "The Circulatory System",
  "The Excretory System",
  "The Nervous System and Sense Organs",
  "The Endocrine System",
  "The Reproductive System",
  "Population",
  "Human Evolution",
  "Pollution",
]

const icse10Maths = [
  "Goods and Services Tax (GST)",
  "Banking",
  "Shares and Dividends",
  "Linear Inequations",
  "Quadratic Equations",
  "Ratio and Proportion",
  "Remainder and Factor Theorems",
  "Matrices",
  "Arithmetic Progression",
  "Geometric Progression",
  "Reflection",
  "Section and Mid-Point Formula",
  "Equation of a Straight Line",
  "Similarity",
  "Loci",
  "Circles",
  "Constructions",
  "Mensuration",
  "Trigonometrical Identities",
  "Heights and Distances",
  "Measures of Central Tendency",
  "Probability",
]

const icse10Computer = [
  "Revision of Class IX Syllabus",
  "Class as the Basis of all Computation",
  "User-Defined Methods",
  "Constructors",
  "Library Classes",
  "Encapsulation and Inheritance",
  "Arrays",
  "String Handling",
]

const wbbse10PhysicalScience = [
  "Behaviour of Gases",
  "Chemical Calculations",
  "Thermal Phenomena",
  "Light",
  "Current Electricity",
  "Atomic Nucleus",
  "Periodic Table and Periodicity of the Properties of Elements",
  "Ionic and Covalent Bonding",
  "Concentration of Solution",
  "Inorganic Chemistry in the Laboratory",
  "Metallurgy",
  "Chemistry in Our Environment",
]

const wbbse10LifeScience = [
  "Control and Coordination in Life",
  "Continuity of Life",
  "Heredity and Evolution",
  "Environment and its Resources",
  "Population and Pollution",
]

const wbbse10Maths = [
  "Linear Simultaneous Equations in Two Variables",
  "Quadratic Equations with One Variable",
  "Ratio and Proportion",
  "Compound Interest and Uniform Rate of Increase or Decrease",
  "Theorems Related to Circles",
  "Rectangular Parallelepiped or Cube",
  "Right Circular Cylinder",
  "Right Circular Cone",
  "Sphere",
  "Similarity",
  "Trigonometric Ratios and Trigonometric Identities",
  "Application of Trigonometric Ratios: Heights and Distances",
  "Statistics: Mean, Median, Ogive, Mode",
]

const cbse11Physics = [
  "Units and Measurements",
  "Motion in a Straight Line",
  "Motion in a Plane",
  "Laws of Motion",
  "Work, Energy and Power",
  "System of Particles and Rotational Motion",
  "Gravitation",
  "Mechanical Properties of Solids",
  "Mechanical Properties of Fluids",
  "Thermal Properties of Matter",
  "Thermodynamics",
  "Kinetic Theory",
  "Oscillations",
  "Waves",
]

const cbse11Chemistry = [
  "Some Basic Concepts of Chemistry",
  "Structure of Atom",
  "Classification of Elements and Periodicity in Properties",
  "Chemical Bonding and Molecular Structure",
  "Thermodynamics",
  "Equilibrium",
  "Redox Reactions",
  "Organic Chemistry: Some Basic Principles and Techniques",
  "Hydrocarbons",
]

const cbse11Maths = [
  "Sets",
  "Relations and Functions",
  "Trigonometric Functions",
  "Complex Numbers and Quadratic Equations",
  "Linear Inequalities",
  "Permutations and Combinations",
  "Binomial Theorem",
  "Sequences and Series",
  "Straight Lines",
  "Conic Sections",
  "Introduction to Three Dimensional Geometry",
  "Limits and Derivatives",
  "Statistics",
  "Probability",
]

const cbse11Biology = [
  "The Living World",
  "Biological Classification",
  "Plant Kingdom",
  "Animal Kingdom",
  "Morphology of Flowering Plants",
  "Anatomy of Flowering Plants",
  "Structural Organisation in Animals",
  "Cell: The Unit of Life",
  "Biomolecules",
  "Cell Cycle and Cell Division",
  "Photosynthesis in Higher Plants",
  "Respiration in Plants",
  "Plant Growth and Development",
  "Breathing and Exchange of Gases",
  "Body Fluids and Circulation",
  "Excretory Products and their Elimination",
  "Locomotion and Movement",
  "Neural Control and Coordination",
  "Chemical Coordination and Integration",
]

const cbse11Computer = [
  "Computer System",
  "Encoding Schemes and Number System",
  "Emerging Trends",
  "Introduction to Problem Solving",
  "Getting Started with Python",
  "Flow of Control",
  "Functions",
  "Strings",
  "Lists",
  "Tuples and Dictionaries",
  "Societal Impact",
]

const cbse12Physics = [
  "Electric Charges and Fields",
  "Electrostatic Potential and Capacitance",
  "Current Electricity",
  "Moving Charges and Magnetism",
  "Magnetism and Matter",
  "Electromagnetic Induction",
  "Alternating Current",
  "Electromagnetic Waves",
  "Ray Optics and Optical Instruments",
  "Wave Optics",
  "Dual Nature of Radiation and Matter",
  "Atoms",
  "Nuclei",
  "Semiconductor Electronics: Materials, Devices and Simple Circuits",
]

const cbse12Chemistry = [
  "Solutions",
  "Electrochemistry",
  "Chemical Kinetics",
  "The d- and f-Block Elements",
  "Coordination Compounds",
  "Haloalkanes and Haloarenes",
  "Alcohols, Phenols and Ethers",
  "Aldehydes, Ketones and Carboxylic Acids",
  "Amines",
  "Biomolecules",
]

const cbse12Maths = [
  "Relations and Functions",
  "Inverse Trigonometric Functions",
  "Matrices",
  "Determinants",
  "Continuity and Differentiability",
  "Application of Derivatives",
  "Integrals",
  "Application of Integrals",
  "Differential Equations",
  "Vector Algebra",
  "Three Dimensional Geometry",
  "Linear Programming",
  "Probability",
]

const cbse12Biology = [
  "Sexual Reproduction in Flowering Plants",
  "Human Reproduction",
  "Reproductive Health",
  "Principles of Inheritance and Variation",
  "Molecular Basis of Inheritance",
  "Evolution",
  "Human Health and Disease",
  "Microbes in Human Welfare",
  "Biotechnology: Principles and Processes",
  "Biotechnology and its Applications",
  "Organisms and Populations",
  "Ecosystem",
  "Biodiversity and Conservation",
]

const cbse12Computer = [
  "Revision of Python Topics",
  "Functions",
  "Exception Handling in Python",
  "File Handling in Python",
  "Data Structures: Stack",
  "Computer Networks",
  "Database Concepts",
  "Structured Query Language (SQL)",
  "Interface of Python with SQL",
]

const isc11Physics = [
  "Physical World and Measurement",
  "Kinematics",
  "Laws of Motion",
  "Work, Energy and Power",
  "Motion of System of Particles and Rigid Body",
  "Gravitation",
  "Properties of Bulk Matter",
  "Thermodynamics",
  "Behaviour of Perfect Gas and Kinetic Theory",
  "Oscillations and Waves",
]

const isc11Chemistry = [
  "Some Basic Concepts of Chemistry",
  "Structure of Atom",
  "Classification of Elements and Periodicity in Properties",
  "Chemical Bonding and Molecular Structure",
  "States of Matter: Gases and Liquids",
  "Chemical Thermodynamics",
  "Equilibrium",
  "Redox Reactions",
  "Organic Chemistry: Some Basic Principles and Techniques",
  "Hydrocarbons",
  "Environmental Chemistry",
]

const isc11Maths = [
  "Sets and Functions",
  "Trigonometric Functions",
  "Complex Numbers and Quadratic Equations",
  "Permutations and Combinations",
  "Binomial Theorem",
  "Sequences and Series",
  "Straight Lines",
  "Conic Sections",
  "Introduction to Three Dimensional Geometry",
  "Limits and Derivatives",
  "Mathematical Reasoning",
  "Statistics and Probability",
]

const isc11Biology = [
  "Diversity of Living Organisms",
  "Structural Organisation in Plants and Animals",
  "Cell: Structure and Function",
  "Plant Physiology",
  "Human Physiology",
]

const isc11Computer = [
  "Introduction to Object Oriented Programming Concepts",
  "Elementary Concept of Objects and Classes",
  "Values and Data Types",
  "Operators in Java",
  "Input in Java",
  "Mathematical Library Methods",
  "Conditional Constructs in Java",
  "Iterative Constructs in Java",
  "Nested for Loops",
  "Functions",
  "Arrays",
]

const isc12Physics = [
  "Electrostatics",
  "Current Electricity",
  "Magnetic Effects of Current and Magnetism",
  "Electromagnetic Induction and Alternating Current",
  "Electromagnetic Waves",
  "Ray Optics and Optical Instruments",
  "Wave Optics",
  "Dual Nature of Radiation and Matter",
  "Atoms and Nuclei",
  "Electronic Devices",
]

const isc12Chemistry = [
  "Solid State",
  "Solutions",
  "Electrochemistry",
  "Chemical Kinetics",
  "Surface Chemistry",
  "General Principles and Processes of Isolation of Elements",
  "p-Block Elements",
  "d- and f-Block Elements",
  "Coordination Compounds",
  "Haloalkanes and Haloarenes",
  "Alcohols, Phenols and Ethers",
  "Aldehydes, Ketones and Carboxylic Acids",
  "Organic Compounds Containing Nitrogen",
  "Biomolecules",
  "Polymers",
  "Chemistry in Everyday Life",
]

const isc12Maths = [
  "Relations and Functions",
  "Inverse Trigonometric Functions",
  "Matrices",
  "Determinants",
  "Continuity and Differentiability",
  "Application of Derivatives",
  "Integrals",
  "Application of Integrals",
  "Differential Equations",
  "Vectors",
  "Three Dimensional Geometry",
  "Linear Programming",
  "Probability",
]

const isc12Biology = [
  "Reproduction",
  "Genetics",
  "Evolution",
  "Biotechnology and its Applications",
  "Biology in Human Welfare",
  "Ecology and Environment",
]

const isc12Computer = [
  "Boolean Algebra",
  "Encapsulation and Inheritance",
  "Data Structures",
  "Recursion",
  "Computing and Ethics",
]

const wb11Physics = [
  "Physical World and Measurement",
  "Kinematics",
  "Laws of Motion",
  "Work, Energy and Power",
  "Motion of System of Particles and Rigid Body",
  "Gravitation",
  "Properties of Bulk Matter",
  "Thermodynamics",
  "Behaviour of Perfect Gas and Kinetic Theory",
  "Oscillations and Waves",
]

const wb11Chemistry = [
  "Some Basic Concepts of Chemistry",
  "Structure of Atom",
  "Classification of Elements and Periodicity in Properties",
  "Chemical Bonding and Molecular Structure",
  "States of Matter",
  "Thermodynamics",
  "Equilibrium",
  "Redox Reactions",
  "Organic Chemistry: Some Basic Principles and Techniques",
  "Hydrocarbons",
]

const wb11Maths = [
  "Sets",
  "Relations and Functions",
  "Trigonometric Functions",
  "Principle of Mathematical Induction",
  "Complex Numbers and Quadratic Equations",
  "Linear Inequalities",
  "Permutations and Combinations",
  "Binomial Theorem",
  "Sequences and Series",
  "Straight Lines",
  "Conic Sections",
  "Introduction to Three Dimensional Geometry",
  "Limits and Derivatives",
  "Statistics",
  "Probability",
]

const wb11Biology = [
  "Diversity of Living Organisms",
  "Structural Organisation in Plants and Animals",
  "Cell: Structure and Function",
  "Plant Physiology",
  "Human Physiology",
]

const wb11Computer = [
  "Computer System",
  "Encoding Schemes and Number System",
  "Introduction to Problem Solving",
  "Getting Started with Python",
  "Flow of Control",
  "Strings",
  "Lists",
  "Tuples and Dictionaries",
]

const wb12Physics = [
  "Electrostatics",
  "Current Electricity",
  "Magnetic Effects of Current and Magnetism",
  "Electromagnetic Induction and Alternating Current",
  "Electromagnetic Waves",
  "Optics",
  "Dual Nature of Radiation and Matter",
  "Atoms and Nuclei",
  "Electronic Devices",
]

const wb12Chemistry = [
  "Solid State",
  "Solutions",
  "Electrochemistry",
  "Chemical Kinetics",
  "Surface Chemistry",
  "General Principles and Processes of Isolation of Elements",
  "p-Block Elements",
  "d- and f-Block Elements",
  "Coordination Compounds",
  "Haloalkanes and Haloarenes",
  "Alcohols, Phenols and Ethers",
  "Aldehydes, Ketones and Carboxylic Acids",
  "Amines",
  "Biomolecules",
]

const wb12Maths = [
  "Relations and Functions",
  "Inverse Trigonometric Functions",
  "Matrices",
  "Determinants",
  "Continuity and Differentiability",
  "Application of Derivatives",
  "Integrals",
  "Application of Integrals",
  "Differential Equations",
  "Vector Algebra",
  "Three Dimensional Geometry",
  "Linear Programming",
  "Probability",
]

const wb12Biology = [
  "Reproduction",
  "Genetics and Evolution",
  "Biology and Human Welfare",
  "Biotechnology and its Applications",
  "Ecology and Environment",
]

const wb12Computer = [
  "Revision of Python Topics",
  "Functions",
  "File Handling in Python",
  "Data Structures: Stack",
  "Computer Networks",
  "Database Concepts",
  "Structured Query Language (SQL)",
]

// Class 12 lecture notes (Notion), video lectures and chapter MCQ tests.
// The same material is shared across boards; keys must match chapter titles.
const notion = (id: string) => `https://www.notion.so/${id}`

const chemistryPyqs = { title: "Previous year questions (2018–2024)", url: notion("179187ab1ad98065be75c10606945c1e") }

const solidStateLecture: Extras[string] = {
  notes: [
    { title: "Lecture notes", url: notion("a3c69801ca7c4bb4b46f470b4ce91692") },
    { title: "Video lecture", url: "https://www.youtube.com/watch?v=-SKpBwt7J8s&list=PLW0F47OesfFPAjU1Gn-IYExXLvNAeE7eR" },
  ],
  solved: [chemistryPyqs],
  mcq: [{ title: "Solid State · Chapter test", code: "SOLID12" }],
}

const solutionsLecture: Extras[string] = {
  notes: [
    { title: "Lecture notes", url: notion("ed147b91bf2b40d5997acd272fd8f2c3") },
    { title: "Video lecture", url: "https://www.youtube.com/watch?v=7LVrZTE4BqI" },
  ],
  solved: [{ title: "Solutions · PYQ", url: notion("180187ab1ad9804caa5dea0f4095278c") }, chemistryPyqs],
  mcq: [{ title: "Solutions · Chapter test", code: "SOLN12" }],
}

const electrochemistryLecture: Extras[string] = {
  notes: [
    { title: "Lecture notes", url: notion("185187ab1ad98015917fc8381b543527") },
    { title: "Video lecture", url: "https://www.youtube.com/watch?v=_l1nxK8tZVk" },
  ],
  solved: [chemistryPyqs],
  mcq: [{ title: "Electrochemistry · Chapter test", code: "ELECHEM12" }],
}

const electrostaticsLecture: Extras[string] = {
  notes: [
    { title: "Introduction to Physics & Electromagnetism", url: notion("65683b8fc25742ab869d3c28b8c610cb") },
    { title: "Lecture notes", url: notion("105dd174ac484b5d9169041e312dcf38") },
    { title: "Video lecture", url: "https://www.youtube.com/watch?v=QBOvZAhFExE" },
  ],
  mcq: [{ title: "Electrostatics · Chapter test", code: "ESTAT12" }],
}

const class12Chemistry: Extras = {
  "Solid State": solidStateLecture,
  Solutions: solutionsLecture,
  Electrochemistry: electrochemistryLecture,
}

export const courses: Course[] = [
  course(10, "CBSE", "Science", cbse10Science, {
    Electricity: { mcq: [{ title: "Demo Test · Class 10 Science", code: "DEMO10" }] },
  }),
  course(10, "CBSE", "Mathematics", cbse10Maths),
  course(10, "ICSE", "Physics", icse10Physics),
  course(10, "ICSE", "Chemistry", icse10Chemistry),
  course(10, "ICSE", "Biology", icse10Biology),
  course(10, "ICSE", "Mathematics", icse10Maths),
  course(10, "ICSE", "Computer Applications", icse10Computer),
  course(10, "Madhyamik", "Physical Science", wbbse10PhysicalScience),
  course(10, "Madhyamik", "Life Science", wbbse10LifeScience),
  course(10, "Madhyamik", "Mathematics", wbbse10Maths),

  course(11, "CBSE", "Physics", cbse11Physics),
  course(11, "CBSE", "Chemistry", cbse11Chemistry),
  course(11, "CBSE", "Mathematics", cbse11Maths),
  course(11, "CBSE", "Biology", cbse11Biology),
  course(11, "CBSE", "Computer Science", cbse11Computer),
  course(11, "ICSE", "Physics", isc11Physics),
  course(11, "ICSE", "Chemistry", isc11Chemistry),
  course(11, "ICSE", "Mathematics", isc11Maths),
  course(11, "ICSE", "Biology", isc11Biology),
  course(11, "ICSE", "Computer Science", isc11Computer),
  course(11, "Madhyamik", "Physics", wb11Physics),
  course(11, "Madhyamik", "Chemistry", wb11Chemistry),
  course(11, "Madhyamik", "Mathematics", wb11Maths),
  course(11, "Madhyamik", "Biology", wb11Biology),
  course(11, "Madhyamik", "Computer Science", wb11Computer),

  course(12, "CBSE", "Physics", cbse12Physics, { "Electric Charges and Fields": electrostaticsLecture }),
  course(12, "CBSE", "Chemistry", cbse12Chemistry, class12Chemistry),
  course(12, "CBSE", "Mathematics", cbse12Maths),
  course(12, "CBSE", "Biology", cbse12Biology),
  course(12, "CBSE", "Computer Science", cbse12Computer),
  course(12, "ICSE", "Physics", isc12Physics, { Electrostatics: electrostaticsLecture }),
  course(12, "ICSE", "Chemistry", isc12Chemistry, class12Chemistry),
  course(12, "ICSE", "Mathematics", isc12Maths),
  course(12, "ICSE", "Biology", isc12Biology),
  course(12, "ICSE", "Computer Science", isc12Computer),
  course(12, "Madhyamik", "Physics", wb12Physics, { Electrostatics: electrostaticsLecture }),
  course(12, "Madhyamik", "Chemistry", wb12Chemistry, class12Chemistry),
  course(12, "Madhyamik", "Mathematics", wb12Maths),
  course(12, "Madhyamik", "Biology", wb12Biology),
  course(12, "Madhyamik", "Computer Science", wb12Computer),
]

export interface Batch {
  classNumber: number
  board: Board
  name: string
  courses: Course[]
}

export function boardSlug(board: Board): string {
  return board.toLowerCase()
}

export function boardFromSlug(slug: string): Board | undefined {
  return boards.find((b) => boardSlug(b) === slug)
}

export function batchName(classNumber: number, board: Board): string {
  return `Class ${classNumber} · ${board}`
}

export function getBatch(classNumber: number, board: Board): Batch | undefined {
  if (!classes.some((c) => c.classNumber === classNumber)) return undefined
  const list = courses.filter((c) => c.classNumber === classNumber && c.board === board)
  if (list.length === 0) return undefined
  return { classNumber, board, name: batchName(classNumber, board), courses: list }
}

export function getCourse(classNumber: number, board: Board, subjectSlug: string): Course | undefined {
  return courses.find((c) => c.classNumber === classNumber && c.board === board && c.subjectSlug === subjectSlug)
}

export function getChapter(course: Course, chapterSlug: string): { chapter: Chapter; index: number } | undefined {
  const index = course.chapters.findIndex((c) => c.slug === chapterSlug)
  return index === -1 ? undefined : { chapter: course.chapters[index], index }
}

export function chapterResourceCount(chapter: Chapter): number {
  return (chapter.notes?.length ?? 0) + (chapter.ppt?.length ?? 0) + (chapter.solved?.length ?? 0) + (chapter.mcq?.length ?? 0)
}

export function resourceCount(source: Chapter | Course | Batch): number {
  if ("chapters" in source) return source.chapters.reduce((n, c) => n + chapterResourceCount(c), 0)
  if ("courses" in source) return source.courses.reduce((n, c) => n + resourceCount(c), 0)
  return chapterResourceCount(source)
}

export function chapterHref(course: Course, chapter: Chapter): string {
  return `${courseHref(course)}/${chapter.slug}`
}

export function courseHref(course: Course): string {
  return `${batchHref(course.classNumber, course.board)}/${course.subjectSlug}`
}

export function batchHref(classNumber: number, board: Board): string {
  const id = classes.find((c) => c.classNumber === classNumber)?.id
  return `/classes/${id}/${boardSlug(board)}`
}

export interface ChapterMatch {
  course: Course
  chapter: Chapter
  number: number
}

export function searchChapters(query: string): ChapterMatch[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const matches: ChapterMatch[] = []
  for (const course of courses) {
    const subjectHit = course.subject.toLowerCase().includes(q)
    course.chapters.forEach((chapter, i) => {
      if (subjectHit || chapter.title.toLowerCase().includes(q)) {
        matches.push({ course, chapter, number: i + 1 })
      }
    })
  }
  return matches
}
