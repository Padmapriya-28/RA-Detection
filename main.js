// ==========================================
// AI-Based RA Detection System - Main JavaScript
// Handles image upload, analysis, and visualization
// ==========================================

// Global variables
let selectedFile = null;
let confidenceChart = null;
let indicatorsChart = null;

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadContent = document.getElementById('uploadContent');
const previewContent = document.getElementById('previewContent');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const removeBtn = document.getElementById('removeBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const resultsSection = document.getElementById('resultsSection');
const newAnalysisBtn = document.getElementById('newAnalysisBtn');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    console.log('RA Detection System initialized');
});

// Initialize all event listeners
function initializeEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Buttons
    analyzeBtn.addEventListener('click', analyzeImage);
    removeBtn.addEventListener('click', removeImage);
    newAnalysisBtn.addEventListener('click', resetAnalysis);
}

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        if (validateFile(file)) {
            selectedFile = file;
            displayPreview(file);
        }
    }
}

// Validate file type and size
function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 16 * 1024 * 1024; // 16MB
    
    if (!allowedTypes.includes(file.type)) {
        showNotification('Error: Please upload a JPG, JPEG, or PNG image', 'error');
        return false;
    }
    
    if (file.size > maxSize) {
        showNotification('Error: File size must be less than 16MB', 'error');
        return false;
    }
    
    return true;
}

// Display image preview
function displayPreview(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        uploadContent.style.display = 'none';
        previewContent.style.display = 'block';
        uploadArea.style.border = '3px solid var(--primary-blue)';
    };
    
    reader.readAsDataURL(file);
}

// Remove selected image
function removeImage() {
    selectedFile = null;
    fileInput.value = '';
    previewImage.src = '';
    previewContent.style.display = 'none';
    uploadContent.style.display = 'block';
    uploadArea.style.border = '3px dashed var(--border-color)';
}

// Handle drag over
function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('drag-over');
}

// Handle drag leave
function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('drag-over');
}

// Handle file drop
function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const file = event.dataTransfer.files[0];
    if (file && validateFile(file)) {
        selectedFile = file;
        displayPreview(file);
    }
}

// Analyze image
async function analyzeImage() {
    if (!selectedFile) {
        showNotification('Please select an image first', 'error');
        return;
    }
    
    // Show loading overlay with animation
    showLoading();
    
    // Prepare form data
    const formData = new FormData();
    formData.append('image', selectedFile);
    
    try {
        // Send to backend
        const response = await fetch('/analyze', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Display results after loading animation completes
            setTimeout(() => {
                hideLoading();
                displayResults(data.results);
                scrollToResults();
            }, 3000); // 3 second loading animation
        } else {
            hideLoading();
            showNotification(`Analysis failed: ${data.error}`, 'error');
        }
        
    } catch (error) {
        hideLoading();
        console.error('Error:', error);
        showNotification('Network error. Please check if the server is running.', 'error');
    }
}

// Show loading overlay with step animations
function showLoading() {
    loadingOverlay.style.display = 'flex';
    
    const steps = document.querySelectorAll('.loading-steps .step');
    
    // Animate steps
    steps.forEach((step, index) => {
        setTimeout(() => {
            // Remove active class from all steps
            steps.forEach(s => s.classList.remove('active'));
            // Add active class to current step
            step.classList.add('active');
            
            // Update icons
            step.querySelector('i').className = 'fas fa-spinner fa-spin';
            
            // Mark previous steps as completed
            for (let i = 0; i < index; i++) {
                steps[i].querySelector('i').className = 'fas fa-check-circle';
            }
        }, index * 750);
    });
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// Display analysis results
function displayResults(results) {
    console.log('Results:', results);
    
    // Show results section
    resultsSection.style.display = 'block';
    
    // Display severity
    displaySeverity(results);
    
    // Display RA indicators
    displayIndicators(results.ra_indicators);
    
    // Create charts
    createCharts(results);
    
    // Display explanation
    displayExplanation(results.explanation);
    
    // Display recommendation
    displayRecommendation(results.recommendation);
}

// Display severity results
function displaySeverity(results) {
    const severity = results.severity;
    const confidence = (results.primary_confidence * 100).toFixed(1);
    const severityIndex = (results.severity_index * 100).toFixed(1);
    
    // Update severity badge
    const severityBadge = document.getElementById('severityBadge');
    const severityLevel = document.getElementById('severityLevel');
    const severityText = document.getElementById('severityText');
    const confidenceText = document.getElementById('confidenceText');
    const meterFill = document.getElementById('meterFill');
    
    severityLevel.textContent = severity;
    severityText.textContent = severity;
    confidenceText.textContent = confidence;
    
    // Apply severity-specific styling
    severityBadge.className = 'severity-badge ' + severity.toLowerCase();
    
    // Animate confidence meter
    setTimeout(() => {
        meterFill.style.width = confidence + '%';
    }, 100);
}

// Display RA indicators
function displayIndicators(indicators) {
    const swelling = (indicators.swelling_score * 100).toFixed(1);
    const inflammation = (indicators.inflammation_score * 100).toFixed(1);
    const deformity = (indicators.deformity_score * 100).toFixed(1);
    
    // Update values
    document.getElementById('swellingValue').textContent = swelling + '%';
    document.getElementById('inflammationValue').textContent = inflammation + '%';
    document.getElementById('deformityValue').textContent = deformity + '%';
    
    // Animate bars
    setTimeout(() => {
        document.getElementById('swellingBar').style.width = swelling + '%';
        document.getElementById('inflammationBar').style.width = inflammation + '%';
        document.getElementById('deformityBar').style.width = deformity + '%';
    }, 200);
}

// Create visualization charts
function createCharts(results) {
    createConfidenceChart(results.confidence_scores);
    createIndicatorsChart(results.ra_indicators);
}

// Create confidence distribution chart
function createConfidenceChart(confidenceScores) {
    const ctx = document.getElementById('confidenceChart').getContext('2d');
    
    // Destroy existing chart if any
    if (confidenceChart) {
        confidenceChart.destroy();
    }
    
    const data = {
        labels: ['Low Severity', 'Medium Severity', 'High Severity'],
        datasets: [{
            label: 'Confidence Score',
            data: [
                (confidenceScores.Low * 100).toFixed(1),
                (confidenceScores.Medium * 100).toFixed(1),
                (confidenceScores.High * 100).toFixed(1)
            ],
            backgroundColor: [
                'rgba(76, 175, 80, 0.7)',
                'rgba(255, 152, 0, 0.7)',
                'rgba(244, 67, 54, 0.7)'
            ],
            borderColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(255, 152, 0, 1)',
                'rgba(244, 67, 54, 1)'
            ],
            borderWidth: 2
        }]
    };
    
    confidenceChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Confidence (%)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Severity Level',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Confidence: ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}

// Create RA indicators chart
function createIndicatorsChart(indicators) {
    const ctx = document.getElementById('indicatorsChart').getContext('2d');
    
    // Destroy existing chart if any
    if (indicatorsChart) {
        indicatorsChart.destroy();
    }
    
    const data = {
        labels: ['Joint Swelling', 'Inflammation', 'Structural Changes'],
        datasets: [{
            label: 'Indicator Level',
            data: [
                (indicators.swelling_score * 100).toFixed(1),
                (indicators.inflammation_score * 100).toFixed(1),
                (indicators.deformity_score * 100).toFixed(1)
            ],
            backgroundColor: [
                'rgba(66, 165, 245, 0.7)',
                'rgba(255, 112, 67, 0.7)',
                'rgba(171, 71, 188, 0.7)'
            ],
            borderColor: [
                'rgba(66, 165, 245, 1)',
                'rgba(255, 112, 67, 1)',
                'rgba(171, 71, 188, 1)'
            ],
            borderWidth: 2
        }]
    };
    
    indicatorsChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed.r.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}

// Display AI explanation
function displayExplanation(explanation) {
    const explanationContent = document.getElementById('explanationContent');
    explanationContent.innerHTML = explanation;
}

// Display clinic recommendation
function displayRecommendation(recommendation) {
    document.getElementById('clinicName').textContent = recommendation.clinic_name;
    document.getElementById('clinicType').textContent = recommendation.clinic_type;
    document.getElementById('doctorName').textContent = recommendation.doctor_name;
    document.getElementById('specialization').textContent = recommendation.specialization;
    document.getElementById('treatmentPlan').textContent = recommendation.treatment_plan;
    document.getElementById('urgency').textContent = recommendation.urgency;
    document.getElementById('consultationFee').textContent = recommendation.estimated_consultation;
}

// Scroll to results section
function scrollToResults() {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Reset analysis and start new
function resetAnalysis() {
    // Hide results
    resultsSection.style.display = 'none';
    
    // Clear previous image
    removeImage();
    
    // Scroll to upload section
    document.getElementById('uploadSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles inline for simplicity
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 25px;
        background: ${type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.05rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Main JavaScript loaded successfully');
