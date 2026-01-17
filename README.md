# AI-Based Rheumatoid Arthritis Detection and Smart Clinic Recommendation System

![RA Detection System](https://img.shields.io/badge/AI-Healthcare-blue)
![Python](https://img.shields.io/badge/Python-3.8%2B-green)
![Flask](https://img.shields.io/badge/Flask-3.0-lightgrey)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-orange)

## 📋 Project Overview

An intelligent medical imaging analysis system that uses AI problem-solving techniques to detect and classify the severity of Rheumatoid Arthritis (RA) from uploaded medical images. The system employs explainable AI to provide transparent analysis and recommends appropriate healthcare facilities based on severity classification.

### 🎯 Key Features

- **AI-Powered Analysis**: Uses pre-trained MobileNetV2 CNN for feature extraction
- **Severity Classification**: Intelligent classification into Low, Medium, and High severity
- **Explainable AI**: Visual graphs and detailed explanations of AI decisions
- **Smart Recommendations**: Rule-based expert system for clinic and doctor recommendations
- **Professional UI**: Hospital-themed, responsive design with medical color palette
- **No Dataset Required**: Works with image upload only, no training data needed

## 🏥 AI Problem-Solving Techniques Implemented

### 1. **Heuristic Reasoning**
- Feature analysis using statistical metrics
- Pattern recognition for RA indicators
- Weighted scoring for severity assessment

### 2. **Rule-Based Expert System**
- IF-THEN logic for severity classification
- Intelligent decision-making for recommendations
- Transparent decision pathways

### 3. **Explainable AI (XAI)**
- Confidence score visualization
- Feature importance analysis
- Decision logic explanation

### 4. **Problem Decomposition**
- Image preprocessing pipeline
- Feature extraction layer
- Classification module
- Recommendation engine

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **TensorFlow/Keras** - Deep learning
- **OpenCV** - Image processing
- **PIL** - Image handling
- **NumPy** - Numerical computing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with medical theme
- **JavaScript (ES6)** - Interactivity
- **Chart.js** - Data visualization
- **Font Awesome** - Icons

## 📁 Project Structure

```
RA Detection/
│
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── README.md                       # Project documentation
│
├── templates/
│   └── index.html                  # Main web interface
│
├── static/
│   ├── css/
│   │   └── style.css              # Hospital-themed styles
│   ├── js/
│   │   └── main.js                # Frontend logic
│   └── uploads/                   # Temporary image storage
│
└── screenshots/                    # Demo screenshots (optional)
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- 4GB+ RAM recommended
- Modern web browser (Chrome, Firefox, Edge)

### Step 1: Clone or Download Project

```bash
cd "E:\RA Detection"
```

### Step 2: Create Virtual Environment (Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

**Note**: First run will download MobileNetV2 weights (~14MB) automatically.

### Step 4: Run the Application

```bash
python app.py
```

The server will start at: `http://127.0.0.1:5000`

### Step 5: Access the Web Interface

Open your browser and navigate to:
```
http://127.0.0.1:5000
```

## 💻 Usage Guide

### 1. Upload Image
- Click "Browse Files" or drag & drop a medical image
- Supported formats: JPG, JPEG, PNG (Max 16MB)
- Images can be X-rays, MRI scans, or clinical photos of joints

### 2. Analyze
- Click "Analyze Image" button
- AI processes the image (takes 3-5 seconds)
- Loading screen shows processing steps

### 3. View Results
The system displays:
- **Severity Level**: Low, Medium, or High
- **Confidence Score**: AI certainty percentage
- **RA Indicators**: Joint swelling, inflammation, structural changes
- **Visualization Graphs**: 
  - Bar chart: Severity confidence distribution
  - Radar chart: RA indicator levels
- **AI Explanation**: How the decision was made
- **Clinic Recommendation**: Suggested healthcare facility and doctor

### 4. Take Action
- Print the report
- Analyze another image
- Book appointment (demo feature)

## 🧠 How It Works

### AI Analysis Pipeline

```
Image Upload
    ↓
Preprocessing (Resize, Normalize)
    ↓
Feature Extraction (MobileNetV2 CNN)
    ↓
Heuristic Analysis (1280 features)
    ↓
RA Indicator Calculation
    ├── Joint Swelling Score
    ├── Inflammation Marker
    └── Structural Changes
    ↓
Severity Classification (Rule-Based)
    ├── IF severity_index < 0.35 → Low
    ├── IF 0.35 ≤ severity_index < 0.65 → Medium
    └── IF severity_index ≥ 0.65 → High
    ↓
Clinic Recommendation (Expert System)
    ├── Low → General Clinic
    ├── Medium → Specialty Clinic
    └── High → Multispecialty Hospital
    ↓
Results Display with Explainability
```

### Severity Classification Logic

**Low Severity (Index < 0.35)**
- Minimal joint changes
- Early-stage indicators
- **Recommendation**: General Physician at City Medical Center

**Medium Severity (Index 0.35-0.65)**
- Moderate inflammation
- Progressive changes
- **Recommendation**: Rheumatologist at Specialty Clinic

**High Severity (Index ≥ 0.65)**
- Severe inflammation/deformity
- Advanced stage
- **Recommendation**: Senior Consultant at Multispecialty Hospital

## 📊 Sample Output

### Analysis Results
```
Severity Level: Medium
Confidence: 72.4%
Severity Index: 54.2%

RA Indicators:
- Joint Swelling: 61.3%
- Inflammation Marker: 68.7%
- Structural Changes: 42.8%

Recommended:
Clinic: Advanced Arthritis Care Center
Doctor: Dr. Michael Chen (Rheumatologist)
Urgency: Priority appointment within 3-5 days
```
## 🔬 Technical Details

### Pre-trained Model: MobileNetV2
- **Input Size**: 224x224x3 (RGB)
- **Features Extracted**: 1280 dimensions
- **Purpose**: Transfer learning for feature extraction
- **No Training**: Uses only inference

### Heuristic Scoring Algorithm
```python
# Simplified version
severity_index = (
    swelling_score * 0.35 +
    inflammation_score * 0.40 +
    deformity_score * 0.25
)
```

### Expert System Rules
```
IF severity_index < 0.35:
    THEN severity = Low
    AND recommend General Clinic

ELIF severity_index < 0.65:
    THEN severity = Medium
    AND recommend Specialty Clinic

ELSE:
    THEN severity = High
    AND recommend Multispecialty Hospital
```

## 🐛 Troubleshooting

### Issue: TensorFlow Installation Fails
```bash
# Try installing CPU-only version
pip install tensorflow-cpu==2.15.0
```

### Issue: Model Download Slow
- First run downloads MobileNetV2 weights (~14MB)
- Ensure stable internet connection
- Wait 2-3 minutes for download

### Issue: Port Already in Use
```python
# Change port in app.py
app.run(debug=True, host='0.0.0.0', port=5001)  # Change to 5001
```

### Issue: Image Upload Fails
- Check file size (Max 16MB)
- Ensure format is JPG/PNG
- Try different image

## 📈 Future Enhancements

Potential improvements for extended versions:

1. **Enhanced AI**
   - Fine-tune model on actual RA dataset
   - Multi-disease classification
   - Severity progression prediction

2. **Additional Features**
   - Patient history tracking
   - Report PDF generation
   - Email notification system
   - Appointment booking integration

3. **Advanced Visualization**
   - 3D joint visualization
   - Comparison with previous scans
   - Treatment progress tracking

4. **Mobile Application**
   - React Native mobile app
   - Camera integration
   - Offline analysis capability


## 🙏 Acknowledgments

- TensorFlow/Keras team for pre-trained models
- Flask framework developers
- Chart.js for visualization library
- Medical AI research community

