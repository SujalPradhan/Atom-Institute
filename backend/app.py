from flask_cors import CORS
from flask import Flask, jsonify, request, abort
from datetime import datetime
import os
import uuid

app = Flask(__name__)
CORS(app)

# Sample data - in a real application, this would be stored in a database
classes = [
    {"id": 1, "name": "Class 10", "image": "/placeholder.jpg", "description": "Comprehensive study materials for students in Class 10 "},
    {"id": 2, "name": "Class 11", "image": "/placeholder.jpg", "description": "Comprehensive study materials for students in Class 11 "},
    {"id": 3, "name": "Class 12", "image": "/placeholder.jpg", "description": "Comprehensive study materials for students in Class 12 "}
]

boards = ["CBSE", "ICSE", "Madhyamik"]

subjects = [
    {"id": 1, "name": "Physics", "icon": "⚛️", "description": "Learn about the fundamental principles governing the natural world"},
    {"id": 2, "name": "Chemistry", "icon": "🧪", "description": "Explore the composition, structure, and properties of matter"},
    {"id": 3, "name": "Biology", "icon": "🧬", "description": "Study of living organisms and their interactions with the environment"},
    {"id": 4, "name": "Mathematics", "icon": "📐", "description": "Develop problem-solving skills and logical reasoning"},
    {"id": 5, "name": "Computer Science", "icon": "💻", "description": "Learn programming and computational thinking"}
]

# Sample gallery data
gallery_images = [
    {
        "id": "img1",
        "src": "/images/logo.jpeg",
        "alt": "Institute Building",
        "category": "campus"
    },
    {
        "id": "img2",
        "src": "/placeholder.jpg",
        "alt": "Physics Laboratory",
        "category": "labs"
    },
    {
        "id": "img3",
        "src": "/placeholder.jpg",
        "alt": "Chemistry Laboratory",
        "category": "labs"
    },
    {
        "id": "img4",
        "src": "/placeholder.jpg",
        "alt": "Computer Lab",
        "category": "facilities"
    },
    {
        "id": "img5",
        "src": "/placeholder.jpg",
        "alt": "Library",
        "category": "facilities"
    },
    {
        "id": "img6",
        "src": "/placeholder.jpg",
        "alt": "Classroom A",
        "category": "classrooms"
    },
    {
        "id": "img7",
        "src": "/placeholder.jpg",
        "alt": "Classroom B",
        "category": "classrooms"
    },
    {
        "id": "img8",
        "src": "/placeholder.jpg",
        "alt": "Annual Science Exhibition",
        "category": "events"
    },
    {
        "id": "img9",
        "src": "/placeholder.jpg",
        "alt": "Sports Day",
        "category": "events"
    },
    {
        "id": "img10",
        "src": "/placeholder.jpg",
        "alt": "Cultural Program",
        "category": "events"
    }
]



notes_links = {
    "cbse10": "www.class10cbse.com",
    "cbse11": "www.class11cbse.com",
    "cbse12": "www.class12cbse.co",
    "icse10": "www.class10icse.com",
    "icse11": "www.class11icse.com",
    "icse12": "www.class12icse.com",
    "madhyamik10": "www.class10madhyamik.com",
    "madhyamik11": "www.class11madhyamik.com",
    "madhyamik12": "www.class12madhyamik.com"
}





faculty = [
    {
        "id": 1,
        "name": "Mr. Arpan Pradhan",
        "image": "/placeholder-user.jpg",
        "position": "Founder & Educator",
        "qualifications": "Msc in Computer Science, Shantiniketan University",
        "experience": "2+ years in education",
        "specialization": "Computer Science"
    },
    {
        "id": 2,
        "name": "Prof. Anjali Sharma",
        "image": "/placeholder-user.jpg",
        "position": "Head of Mathematics Department",
        "qualifications": "M.Sc. Mathematics, Calcutta University",
        "experience": "12+ years in teaching",
        "specialization": "Calculus and Algebra"
    },
    {
        "id": 3,
        "name": "Dr. Pradeep Banerjee",
        "image": "/placeholder-user.jpg",
        "position": "Chemistry Faculty",
        "qualifications": "Ph.D. in Chemistry, Jadavpur University",
        "experience": "10+ years in education",
        "specialization": "Organic Chemistry"
    },
    {
        "id": 4,
        "name": "Prof. Meena Chatterjee",
        "image": "/placeholder-user.jpg",
        "position": "Biology Faculty",
        "qualifications": "M.Sc. Biotechnology, Presidency University",
        "experience": "8+ years in teaching",
        "specialization": "Molecular Biology"
    },
    {
        "id": 5,
        "name": "Prof. Sanjay Das",
        "image": "/placeholder-user.jpg",
        "position": "Computer Science Faculty",
        "qualifications": "M.Tech in Computer Science, IIT Kharagpur",
        "experience": "9+ years in education",
        "specialization": "Programming and Data Structures"
    },
    {
        "id": 6,
        "name": "Dr. Sunita Roy",
        "image": "/placeholder-user.jpg",
        "position": "English & Literature Faculty",
        "qualifications": "Ph.D. in English Literature, Delhi University",
        "experience": "11+ years in teaching",
        "specialization": "Modern Literature and Language Skills"
    }
]

gallery_images = [
    {
        "id": 1,
        "description": "Our well-equipped science laboratory for practical experiments",
        "category": "facilities"
    },
    {
        "id": 2,
        "description": "Modern computer laboratory with high-speed internet",
        "category": "facilities"
    },
    {
        "id": 3,
        "description": "Students showcasing their innovative science projects",
        "category": "events"
    },
    {
        "id": 4,
        "description": "Annual sports day celebrating physical fitness and teamwork",
        "category": "events"
    },
    {
        "id": 5,
        "description": "Celebrating the achievements of our graduating students",
        "category": "events"
    },
    {
        "id": 6,
        "description": "Our extensive library with a wide collection of books and study materials",
        "category": "facilities"
    },
    {
        "id": 7,
        "description": "Modern classrooms with digital learning facilities",
        "category": "facilities"
    },
    {
        "id": 8,
        "description": "Students performing in the annual cultural program",
        "category": "events"
    }
]

achievements = [
    {
        "id": 1,
        "icon": "🏆"
    },
    {
        "id": 2,
        "icon": "🎓"
    },
    {
        "id": 3,
        "icon": "🌟"
    },
    {
        "id": 4,
        "icon": "🥇"
    }
]

# API routes
@app.route('/api/')
def hello_world():
    return jsonify({
        'message': 'Welcome to Atom Institute API',
        'status': 'online',
        'timestamp': datetime.now().isoformat()
    })

# Home page API endpoints
@app.route('/api/home/classes', methods=['GET'])
def get_home_classes():
    """Return a list of available classes for the home page"""
    return jsonify(classes)

@app.route('/api/home/achievements', methods=['GET'])
def get_home_achievements():
    """Return a list of achievements for the home page"""
    return jsonify(achievements)

@app.route('/api/home/testimonials', methods=['GET'])
def get_home_testimonials():
    """Return featured testimonials for the home page"""
    # Return only 3 testimonials for the home page
    featured_testimonials = testimonials[:3]
    return jsonify(featured_testimonials)

# About page API endpoints
@app.route('/api/classes/<int:class_num>/<string:board>/<string:subject>/notes', methods=['GET'])
def get_notes_by_subject(class_num, board, subject):
    """Return all notes available for a specific subject in a class and board"""
    # Validate board
    if board.upper() not in [b.upper() for b in boards]:
        abort(404, description=f"Board {board} not found")
    
    # Validate subject parameters
    subject_formatted = subject.replace("-", " ").title()
    
    # Look up by class number, board and subject
    class_key = str(class_num)
    if class_key not in notes_by_category:
        abort(404, description=f"No notes found for class {class_num}")
    
    # Find the board (case insensitive)
    board_key = None
    for b in notes_by_category[class_key].keys():
        if b.upper() == board.upper():
            board_key = b
            break
    
    if not board_key:
        abort(404, description=f"No notes found for board {board} in class {class_num}")
    
    # Find the subject (case insensitive)
    subject_key = None
    for s in notes_by_category[class_key][board_key].keys():
        if s.upper() == subject_formatted.upper():
            subject_key = s
            break
    
    if not subject_key:
        abort(404, description=f"No notes found for subject {subject} in class {class_num}, board {board}")
    
    # Simply return all notes for this subject
    return jsonify(notes_by_category[class_key][board_key][subject_key])

@app.route('/api/classes/<int:class_num>/<string:board>/<string:subject>/drive-link', methods=['GET'])
def get_drive_link_by_subject(class_num, board, subject):
    """Return the Google Drive link for a specific subject in a class and board"""
    # Validate board
    if board.upper() not in [b.upper() for b in boards]:
        abort(404, description=f"Board {board} not found")
    
    # Validate subject parameters
    subject_formatted = subject.replace("-", " ").title()
    
    # Look up by class number, board and subject
    class_key = str(class_num)
    if class_key not in notes_by_category:
        abort(404, description=f"No notes found for class {class_num}")
    
    # Find the board (case insensitive)
    board_key = None
    for b in notes_by_category[class_key].keys():
        if b.upper() == board.upper():
            board_key = b
            break
    
    if not board_key:
        abort(404, description=f"No notes found for board {board} in class {class_num}")
    
    # Find the subject (case insensitive)
    subject_key = None
    for s in notes_by_category[class_key][board_key].keys():
        if s.upper() == subject_formatted.upper():
            subject_key = s
            break
    
    if not subject_key:
        abort(404, description=f"No notes found for subject {subject} in class {class_num}, board {board}")
    
    # Get the first note's Google Drive link
    notes = notes_by_category[class_key][board_key][subject_key]
    if not notes:
        abort(404, description=f"No notes available for {subject} in class {class_num}, board {board}")
    
    # Return just the Google Drive link
    return jsonify({"googleDriveLink": notes[0]["googleDriveLink"]})

@app.route('/api/classes/<int:class_num>/<string:board>/subjects', methods=['GET'])
def get_subjects_by_class_and_board(class_num, board):
    """Return all subjects available for a specific class and board"""
    # Validate the board
    if board.upper() not in [b.upper() for b in boards]:
        abort(404, description=f"Board {board} not found")
    
    # Convert class_num to string key for notes_by_category
    class_key = str(class_num)
    if class_key not in notes_by_category:
        abort(404, description=f"No subjects found for class {class_num}")
    
    # Find the board (case insensitive)
    board_key = None
    for b in notes_by_category[class_key].keys():
        if b.upper() == board.upper():
            board_key = b
            break
    
    if not board_key:
        abort(404, description=f"No subjects found for board {board} in class {class_num}")
    
    # Get all subjects for this class and board
    subjects_data = []
    for idx, subject_name in enumerate(notes_by_category[class_key][board_key].keys()):
        # Get the icon for this subject
        icon = "📚"  # Default icon
        for s in subjects:
            if s["name"].upper() == subject_name.upper():
                icon = s.get("icon", "📚")
                description = s.get("description", f"Study materials for {subject_name}")
                break
        else:
            description = f"Study materials for {subject_name}"
        
        subjects_data.append({
            "id": idx + 1,
            "name": subject_name,
            "icon": icon,
            "description": description
        })
    
    return jsonify(subjects_data)

if __name__ == '__main__':
    # Set the port and host for the Flask app
    app.run()