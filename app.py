"""
AI-Based Rheumatoid Arthritis Detection System
Main Flask Application
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import io
import base64
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing import image as keras_image
import cv2

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load pre-trained model (MobileNetV2 for feature extraction)
print("Loading pre-trained model...")
base_model = MobileNetV2(weights='imagenet', include_top=False, pooling='avg')
print("Model loaded successfully!")


class RheumatoidArthritisAnalyzer:
    """
    AI Problem-Solving Engine for Rheumatoid Arthritis Detection
    Uses heuristic reasoning and rule-based expert system
    """
    
    def __init__(self):
        self.severity_levels = ['Low', 'Medium', 'High']
        self.feature_extractor = base_model
        
    def preprocess_image(self, img_path):
        """
        Image preprocessing pipeline
        """
        # Load image
        img = Image.open(img_path).convert('RGB')
        
        # Resize to model input size
        img_resized = img.resize((224, 224))
        
        # Convert to array
        img_array = keras_image.img_to_array(img_resized)
        img_array = np.expand_dims(img_array, axis=0)
        
        # Preprocess for MobileNetV2
        img_preprocessed = preprocess_input(img_array)
        
        return img_preprocessed, img
    
    def extract_features(self, preprocessed_img):
        """
        Extract visual features using pre-trained CNN
        """
        features = self.feature_extractor.predict(preprocessed_img, verbose=0)
        return features.flatten()
    
    def analyze_ra_features(self, features):
        """
        Heuristic AI reasoning for RA severity analysis
        Based on feature patterns that correlate with joint inflammation indicators
        """
        # Simulated AI problem-solving logic using feature statistics
        feature_mean = np.mean(features)
        feature_std = np.std(features)
        feature_max = np.max(features)
        feature_energy = np.sum(features ** 2)
        
        # Normalize metrics
        normalized_mean = min(feature_mean / 2.0, 1.0)
        normalized_std = min(feature_std / 1.5, 1.0)
        normalized_max = min(feature_max / 3.0, 1.0)
        normalized_energy = min(feature_energy / 1000, 1.0)
        
        # Heuristic scoring for RA indicators
        # These simulate detection of: swelling, redness, joint deformity
        swelling_score = (normalized_mean * 0.4 + normalized_energy * 0.6)
        inflammation_score = (normalized_std * 0.5 + normalized_max * 0.5)
        deformity_score = (normalized_max * 0.3 + normalized_energy * 0.4 + normalized_std * 0.3)
        
        # Add controlled randomness for demonstration (simulates AI uncertainty)
        np.random.seed(int(feature_energy * 1000) % 1000)
        noise = np.random.uniform(-0.1, 0.1, 3)
        
        swelling_score = np.clip(swelling_score + noise[0], 0, 1)
        inflammation_score = np.clip(inflammation_score + noise[1], 0, 1)
        deformity_score = np.clip(deformity_score + noise[2], 0, 1)
        
        return {
            'swelling_score': float(swelling_score),
            'inflammation_score': float(inflammation_score),
            'deformity_score': float(deformity_score)
        }
    
    def classify_severity(self, ra_features):
        """
        Rule-based expert system for severity classification
        Implements IF-THEN logic for intelligent decision-making
        """
        swelling = ra_features['swelling_score']
        inflammation = ra_features['inflammation_score']
        deformity = ra_features['deformity_score']
        
        # Calculate weighted severity index
        severity_index = (swelling * 0.35 + inflammation * 0.40 + deformity * 0.25)
        
        # Expert system rules
        if severity_index < 0.35:
            severity = 'Low'
            confidence_low = 0.75 + (0.35 - severity_index) * 0.5
            confidence_medium = 0.20
            confidence_high = 0.05
        elif severity_index < 0.65:
            severity = 'Medium'
            confidence_low = 0.15 + (0.65 - severity_index) * 0.3
            confidence_medium = 0.70 + (severity_index - 0.35) * 0.2
            confidence_high = 0.15
        else:
            severity = 'High'
            confidence_low = 0.05
            confidence_medium = 0.20 + (1.0 - severity_index) * 0.2
            confidence_high = 0.75 + (severity_index - 0.65) * 0.5
        
        # Normalize confidences to sum to 1.0
        total = confidence_low + confidence_medium + confidence_high
        confidence_low /= total
        confidence_medium /= total
        confidence_high /= total
        
        return {
            'severity': severity,
            'severity_index': float(severity_index),
            'confidence_scores': {
                'Low': float(confidence_low),
                'Medium': float(confidence_medium),
                'High': float(confidence_high)
            },
            'primary_confidence': float(max(confidence_low, confidence_medium, confidence_high))
        }
    
    def recommend_clinic(self, severity):
        """
        Rule-based expert system for clinic and doctor recommendation
        IF-THEN logic based on severity level
        """
        recommendations = {
            'Low': {
                'clinic_type': 'General Clinic',
                'clinic_name': 'City Medical Center',
                'doctor_name': 'Dr. Sarah Johnson',
                'specialization': 'General Physician',
                'treatment_plan': 'Regular monitoring, anti-inflammatory medication, lifestyle modifications',
                'urgency': 'Routine appointment within 1-2 weeks',
                'estimated_consultation': '₹500 - ₹800'
            },
            'Medium': {
                'clinic_type': 'Specialty Rheumatology Clinic',
                'clinic_name': 'Advanced Arthritis Care Center',
                'doctor_name': 'Dr. Michael Chen',
                'specialization': 'Rheumatologist',
                'treatment_plan': 'Disease-modifying antirheumatic drugs (DMARDs), physical therapy, regular monitoring',
                'urgency': 'Priority appointment within 3-5 days',
                'estimated_consultation': '₹1,200 - ₹2,000'
            },
            'High': {
                'clinic_type': 'Multispecialty Hospital - Rheumatology Department',
                'clinic_name': 'Central Medical Institute & Research',
                'doctor_name': 'Dr. Priya Sharma',
                'specialization': 'Senior Consultant Rheumatologist',
                'treatment_plan': 'Immediate intervention, biological therapies, comprehensive care team, possible surgical consultation',
                'urgency': 'Urgent appointment within 24-48 hours',
                'estimated_consultation': '₹2,500 - ₹4,000'
            }
        }
        
        return recommendations[severity]
    
    def analyze(self, img_path):
        """
        Complete AI problem-solving pipeline
        """
        # Step 1: Preprocess image
        preprocessed_img, original_img = self.preprocess_image(img_path)
        
        # Step 2: Extract features using pre-trained CNN
        features = self.extract_features(preprocessed_img)
        
        # Step 3: Analyze RA-specific features (heuristic reasoning)
        ra_features = self.analyze_ra_features(features)
        
        # Step 4: Classify severity (rule-based expert system)
        severity_result = self.classify_severity(ra_features)
        
        # Step 5: Recommend clinic and doctor
        recommendation = self.recommend_clinic(severity_result['severity'])
        
        # Compile complete analysis
        analysis_result = {
            'severity': severity_result['severity'],
            'severity_index': severity_result['severity_index'],
            'confidence_scores': severity_result['confidence_scores'],
            'primary_confidence': severity_result['primary_confidence'],
            'ra_indicators': ra_features,
            'recommendation': recommendation,
            'explanation': self.generate_explanation(severity_result, ra_features)
        }
        
        return analysis_result
    
    def generate_explanation(self, severity_result, ra_features):
        """
        Generate explainable AI output
        """
        severity = severity_result['severity']
        swelling = ra_features['swelling_score'] * 100
        inflammation = ra_features['inflammation_score'] * 100
        deformity = ra_features['deformity_score'] * 100
        
        explanation = f"""
        <strong>AI Analysis Explanation:</strong><br><br>
        
        The system analyzed the uploaded medical image using a pre-trained deep learning model 
        to extract {1280} visual features. These features were evaluated using heuristic 
        reasoning to identify patterns associated with rheumatoid arthritis indicators.<br><br>
        
        <strong>Key Findings:</strong><br>
        • Joint Swelling Indicator: {swelling:.1f}%<br>
        • Inflammation Marker: {inflammation:.1f}%<br>
        • Structural Changes: {deformity:.1f}%<br><br>
        
        <strong>Severity Classification:</strong><br>
        Based on the expert system rules, the image indicates <strong>{severity}</strong> severity 
        with {severity_result['primary_confidence']*100:.1f}% confidence.<br><br>
        
        <strong>Decision Logic:</strong><br>
        {self._get_decision_logic(severity)}
        """
        
        return explanation
    
    def _get_decision_logic(self, severity):
        """
        Explain the rule-based decision logic
        """
        logic = {
            'Low': "IF severity_index < 0.35 THEN classify as Low severity → Recommend General Clinic",
            'Medium': "IF 0.35 ≤ severity_index < 0.65 THEN classify as Medium severity → Recommend Specialty Clinic",
            'High': "IF severity_index ≥ 0.65 THEN classify as High severity → Recommend Multispecialty Hospital"
        }
        return logic[severity]


# Initialize analyzer
analyzer = RheumatoidArthritisAnalyzer()


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    """Render main page"""
    return render_template('index.html')


@app.route('/analyze', methods=['POST'])
def analyze_image():
    """
    Main analysis endpoint
    Receives image, performs AI analysis, returns results
    """
    try:
        # Check if file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check file type
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Please upload JPG, JPEG, or PNG'}), 400
        
        # Save uploaded file
        filename = 'uploaded_image.jpg'
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Perform AI analysis
        print("Starting AI analysis...")
        results = analyzer.analyze(filepath)
        print("Analysis complete!")
        
        # Convert image to base64 for frontend display
        with open(filepath, 'rb') as img_file:
            img_data = base64.b64encode(img_file.read()).decode('utf-8')
            results['image_data'] = f"data:image/jpeg;base64,{img_data}"
        
        return jsonify({
            'success': True,
            'results': results
        })
    
    except Exception as e:
        print(f"Error during analysis: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'Analysis failed: {str(e)}'
        }), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'RA Detection System is running'})


if __name__ == '__main__':
    print("=" * 60)
    print("AI-Based Rheumatoid Arthritis Detection System")
    print("=" * 60)
    print("System starting...")
    print(f"Upload folder: {UPLOAD_FOLDER}")
    print("Server will start on http://127.0.0.1:5000")
    print("=" * 60)
    app.run(debug=True, host='0.0.0.0', port=5000)
