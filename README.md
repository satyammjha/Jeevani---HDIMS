# Jeevani - HDIMS

**National Health Data Integration Platform**  
_(SIH 2024 PS - SIH1626: Health Data Information & Management System Mobile Application (HDIMS))_

**Author**: [Satyam Jha](mailto:satyammjha0@gmail.com)  
**GitHub**: [satyammjha](https://github.com/satyammjha)

## 🏥 Problem Statement & Significance

**India's Healthcare Challenges**:  
• 300M+ citizens unaware of eligible health schemes  
• 6-month delay in epidemic reporting through manual systems  
• 68% hospitals use paper-based patient records

**Jeevani's Solution**:  
✅ Real-time data bridge between 150k+ hospitals & government  
✅ AI-powered scheme matching for patients  
✅ Automated outbreak prediction system

## ✨ Core Features

### **Government Admin Portal**

| Feature                | Description                              |
| ---------------------- | ---------------------------------------- |
| 📈 National Analytics  | Real-time health metrics across states   |
| 🏥 Hospital Management | Add/verify hospitals with KYC validation |
| 🦠 Outbreak Prediction | ML models for disease spread forecasting |
| 📋 Scheme Monitoring   | Track PMJAY, Ayushman Bharat utilization |

### **Hospital Interface**

| Feature                  | Description                             |
| ------------------------ | --------------------------------------- |
| 📱 Offline Patient Entry | Work without internet, auto-sync later  |
| 🤖 Scheme Advisor AI     | NLP chatbot for benefit recommendations |
| 💊 Resource Tracker      | Manage beds, medicines, equipment       |

## 📸 Screenshots

### Admin Portal

1. **Admin Dashboard**  
   ![Admin Home](/screenshots/Admin-Home.jpg)  
   _National health overview with key metrics_

2. **Hospital Management**  
   ![Hospital Admin](/screenshots/Hospital%20Admin.jpg)  
   _Add/verify hospitals with geo-tags_

3. **Predictive Analytics**  
   ![Admin Analytics](/screenshots/Analysis%20-%20Admin.jpg)  
   _Disease spread forecasting models_

4. **Reporting Dashboard**  
   ![Admin Reports](/screenshots/Reports%20-%20Admin.jpg)  
   _Monthly scheme performance reports_

### Hospital Portal

5. **Hospital Home**  
   ![Hospital Home](/screenshots/Home%20-%20Hospital.jpg)  
   _Daily patient & resource overview_

6. **Patient Registration**  
   ![Add Patient](/screenshots/Add%20Patient%20-%20Hospital.jpg)  
   _Offline-capable patient entry form_

7. **AI Scheme Advisor**  
   ![Javvani AI](/screenshots/JaavaniAI%20-%20Hospital.jpg)  
   _Chatbot suggesting eligible health schemes_

8. **Patient Management**  
   ![Patient List](/screenshots/Patient%20List%20-%20Hospital.jpg)  
   _Search/edit patient records_

9. **Patient Details**  
   ![Patient Details](/screenshots/Patient%20Details%20-%20Hospital.jpg)  
   _Complete medical history view_

10. **Hospital Reports**  
    ![Hospital Reports](/screenshots/Reports-Hospital.jpg)  
    _Local resource utilization analytics_

## 🛠 Tech Stack

**Frontend**:  
• React Native 0.72 (Expo)
• Victory Native Charts

**Backend**:  
• Node.js 18 + Express.js  
• MongoDB Atlas

**AI Components**:  
• TensorFlow.js (Predictive Models)  
• Dialogflow CX (Chatbot)

## 📥 Installation

```bash
# Clone repository
git clone https://github.com/satyammjha/Jeevani---HDIMS.git

# Install dependencies
  npm install

# Configure environment
cp .env.example .env
```

# start project

npx react-native start
npx react-native run-andriod
