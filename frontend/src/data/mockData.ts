export interface Teacher {
  id: number;
  name: string;
  phone: string;
  language: string;
  languageLabel: string;
  grade: number;
  subject: string;
  school: string;
  state: string;
  avatar: string;
  avatarColor: string;
  dayInJourney: number;
  currentTopic: string;
  flag: string;
}

export interface WhatsAppMessage {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
  day?: string;
  source?: string;
  peerName?: string;
}

export interface CallStep {
  type: "system" | "bot" | "user" | "processing";
  text: string;
  delay: number;
  source?: string;
}

export interface CallScenario {
  title: string;
  language: string;
  steps: CallStep[];
}

export const TEACHERS: Teacher[] = [
  {
    id: 1,
    name: "Meena Sharma",
    phone: "+91 98000 00001",
    language: "hi",
    languageLabel: "Hindi",
    grade: 3,
    subject: "Math",
    school: "ZP Primary School, Nagpur",
    state: "Maharashtra",
    avatar: "MS",
    avatarColor: "#1a3a5c",
    dayInJourney: 3,
    currentTopic: "Subtraction with Borrowing",
    flag: "🟠"
  },
  {
    id: 2,
    name: "Priya Patil",
    phone: "+91 98000 00002",
    language: "mr",
    languageLabel: "Marathi",
    grade: 4,
    subject: "Language",
    school: "ZP Primary School, Pune",
    state: "Maharashtra",
    avatar: "PP",
    avatarColor: "#2a7d4f",
    dayInJourney: 7,
    currentTopic: "Reading Comprehension",
    flag: "🟢"
  },
  {
    id: 3,
    name: "Kavitha R",
    phone: "+91 98000 00003",
    language: "ta",
    languageLabel: "Tamil",
    grade: 5,
    subject: "Math",
    school: "Panchayat Union School, Coimbatore",
    state: "Tamil Nadu",
    avatar: "KR",
    avatarColor: "#7c3aed",
    dayInJourney: 15,
    currentTopic: "Fractions",
    flag: "🟣"
  }
]

export const WHATSAPP_HISTORY: Record<number, WhatsAppMessage[]> = {
  1: [
    { id: 1, role: "bot", text: "🎉 बधाई हो मीना जी! आपने DIKSHA पर 'उधार के साथ घटाव' मॉड्यूल पूरा किया। आपकी अगली क्लास कब है इस टॉपिक पर?", time: "09:00", day: "Day 0" },
    { id: 2, role: "user", text: "गुरुवार सुबह 10 बजे", time: "09:03" },
    { id: 3, role: "bot", text: "✅ नोट किया! कल की क्लास के लिए एक टिप: NCERT के अनुसार, बच्चों को पहले 10 के बंडल (दहाई) की अवधारणा दें। पत्थर या बीन्स से दिखाएं — एक बंडल = 10। बोर्ड से पहले हाथ से करें।", time: "09:03", source: "NCERT", day: "Day 1" },
    { id: 4, role: "bot", text: "🔔 मीना जी, आज की घटाव क्लास कैसी रही?", time: "12:30", day: "Day 3" },
    { id: 5, role: "user", text: "आधे बच्चों को समझ नहीं आया। बोर्ड पर दिखाया पर फिर भी confusion था", time: "12:45" },
    { id: 6, role: "bot", text: "समझ गई। तीन सवाल:\n\n1️⃣ बच्चे अकेले काम कर रहे थे या ग्रुप में?\n2️⃣ आपने कोई visual aid (abacus, पत्थर, चित्र) इस्तेमाल किया?\n3️⃣ बच्चे कहाँ अटके — शुरुआत में, बीच में, या अंत में?", time: "12:45" },
    { id: 7, role: "user", text: "अकेले। सिर्फ बोर्ड। बीच में जब उधार लेना पड़ा तब अटके", time: "12:48" },
    { id: 8, role: "bot", text: "🔍 मिला! पुणे की Teacher Priya Patil ने भी यही problem face की थी:\n\n\"उधार वाले step के लिए मैंने दो रंग के chalk use किए — लाल = जो उधार लिया, हरा = बाकी बचा। बच्चों को visually दिखा जब 6-9 नहीं होता। 34 में से 28 बच्चों ने अगले दिन खुद करके दिखाया।\"\n\nक्या यह तरीका आप कल try करना चाहेंगी? हाँ/नहीं", time: "12:49", source: "peer", peerName: "Priya Patil, Pune" },
    { id: 9, role: "user", text: "हाँ ज़रूर try करूँगी", time: "12:52" },
    { id: 10, role: "bot", text: "बढ़िया 💪 कल क्लास के बाद बताइएगा कैसा रहा। आपका यह feedback दूसरे teachers की मदद करेगा। आप Day 3 पर हैं — 27 दिन और बाकी हैं। चलते रहें! 🌟", time: "12:52", day: "Day 3 complete" }
  ],
  2: [
    { id: 1, role: "bot", text: "🎉 अभिनंदन प्रिया ताई! DIKSHA वर 'वाचन आकलन' मॉड्यूल पूर्ण केला. पुढील वर्ग कधी आहे?", time: "10:00", day: "Day 0" },
    { id: 2, role: "user", text: "शुक्रवारी सकाळी 9 वाजता", time: "10:05" },
    { id: 3, role: "bot", text: "✅ नोंद केली! NCERT नुसार टीप: वाचन आकलनासाठी 'Think-Pair-Share' वापरा. एक paragraph वाचा, जोडी बनवा, 2 मिनिटे चर्चा, नंतर वर्गात सांगा. मुले स्वतः अर्थ शोधतात.", time: "10:05", source: "NCERT", day: "Day 1" },
    { id: 4, role: "bot", text: "🔔 प्रिया ताई, आजचा वाचन आकलनाचा वर्ग कसा झाला?", time: "11:00", day: "Day 3" },
    { id: 5, role: "user", text: "छान झाला! मुलांनी खूप उत्साहाने भाग घेतला. Think-Pair-Share खूप उपयोगी ठरला", time: "11:10" },
    { id: 6, role: "bot", text: "अप्रतिम! 🌟 हे कसे केले ते सांगाल? तुमचा अनुभव इतर teachers ना नक्की मदत करेल.", time: "11:10" },
    { id: 7, role: "user", text: "मी एक छोटी गोष्ट वाचली, मुलांना जोड्यांमध्ये विभागले आणि प्रत्येक जोडीला एक प्रश्न दिला", time: "11:15" },
    { id: 8, role: "bot", text: "🎯 तुमची peer solution आता database मध्ये save झाली! इतर Marathi teachers याचा उपयोग करतील.\n\n👥 आज तुम्हाला एका teacher शी connect करतो — नागपूरच्या मीना शर्मा, Class 3, Math. त्यांना visual methods बद्दल सल्ला हवा आहे. बोलायचे का?", time: "11:16", source: "peer", day: "Day 7" }
  ],
  3: [
    { id: 1, role: "bot", text: "🎉 வாழ்த்துகள் கவிதா! DIKSHA இல் 'பின்னங்கள்' தொகுதியை முடித்தீர்கள். அடுத்த வகுப்பு எப்போது?", time: "08:00", day: "Day 0" },
    { id: 2, role: "user", text: "திங்கள் காலை 11 மணிக்கு", time: "08:05" },
    { id: 3, role: "bot", text: "✅ குறித்துகொண்டேன்! NCERT குறிப்பு: பின்னங்களை கற்பிக்க வட்டங்களை வரையுங்கள். 1/2 என்றால் வட்டத்தை 2 பாகமாக பிரித்து 1 பாகத்தை நிரப்புங்கள். கை செய்முறையில் காண்பியுங்கள்.", time: "08:05", source: "NCERT", day: "Day 1" },
    { id: 4, role: "bot", text: "🔔 கவிதா, இன்றைய பின்னங்கள் வகுப்பு எப்படி இருந்தது?", time: "13:00", day: "Day 3" },
    { id: 5, role: "user", text: "சிறிது கஷ்டமாக இருந்தது. 2/3 மற்றும் 3/4 ஒப்பிடுவதில் குழந்தைகளுக்கு குழப்பம்", time: "13:10" },
    { id: 6, role: "bot", text: "புரிந்துகொண்டேன். மூன்று கேள்விகள்:\n\n1️⃣ குழந்தைகள் தனியாக வேலை செய்தார்களா அல்லது குழுவாக?\n2️⃣ வட்டம்/படம் போன்ற visual aid பயன்படுத்தினீர்களா?\n3️⃣ எங்கே குழப்பம் — தொடக்கம், நடுவில், அல்லது இறுதியில்?", time: "13:11" },
    { id: 7, role: "user", text: "தனியாக. படம் வரைந்தேன். ஆனால் எண்ணக்காரன் வேறு, பகுதி வேறு என்று ஒப்பிடும் போது குழப்பம்", time: "13:15" },
    { id: 8, role: "bot", text: "🔍 Coimbatore Teacher Rajesh Kumar இதே பிரச்சனையை தீர்த்தார்:\n\n\"நான் இரண்டு ஒரே அளவு paper strips எடுத்தேன். ஒன்றை 3 பாகம், மற்றதை 4 பாகம் செய்தேன். குழந்தைகள் கையால் ஒப்பிட்டு பார்த்தார்கள். 40 இல் 35 புரிந்துகொண்டார்கள்.\"\n\nநாளை paper strip method try பண்ணுவீர்களா?", time: "13:16", source: "peer", peerName: "Rajesh Kumar, Coimbatore", day: "Day 15 module ready" }
  ]
}

export const CALL_SCENARIOS: Record<number, CallScenario> = {
  1: {
    title: "Meena — Class 3 Math emergency",
    language: "Hindi",
    steps: [
      { type: "system", text: "📞 Call connected to Shikshak-Setu", delay: 500 },
      { type: "bot", text: "नमस्ते! मैं शिक्षक-सेतु हूँ। आप Hindi में बात कर सकते हैं। आपकी क्लास में क्या समस्या है?", delay: 1000 },
      { type: "user", text: "मेरे Class 3 के बच्चे घटाव में उधार लेना बिल्कुल नहीं समझ पा रहे", delay: 3000 },
      { type: "processing", text: "🔍 Finding best solution...", delay: 500 },
      { type: "bot", text: "समझ गई। अभी क्लास में यह करें: दो रंग के चॉक लें। लाल = उधार लिया हुआ, हरा = बाकी बचा। 52 - 27 में पहले इकाई: 2-7 नहीं होता, दहाई से 1 बंडल उधार लो। लाल से 12 लिखो, हरे से बाकी। बच्चे visually देखेंगे तो समझेंगे।", delay: 2000, source: "peer + NCERT" },
      { type: "bot", text: "क्या यह तरीका try करेंगी? हाँ बोलिए अगर हाँ।", delay: 1500 },
      { type: "user", text: "हाँ ज़रूर", delay: 2000 },
      { type: "bot", text: "बढ़िया! क्लास के बाद WhatsApp पर feedback दें। आपका यह अनुभव दूसरे teachers की मदद करेगा। शुभकामनाएं! 🌟", delay: 1500 },
      { type: "system", text: "📱 WhatsApp follow-up sent to +91 98000 00001", delay: 500 }
    ]
  },
  2: {
    title: "Priya — Class 4 Language support",
    language: "Marathi",
    steps: [
      { type: "system", text: "📞 Call connected to Shikshak-Setu", delay: 500 },
      { type: "bot", text: "नमस्कार! मी शिक्षक-सेतू आहे. Marathi मध्ये बोलू शकता. तुमच्या वर्गात काय अडचण आहे?", delay: 1000 },
      { type: "user", text: "माझ्या Class 4 च्या मुलांना वाचन आकलनाचे प्रश्न समजत नाहीत", delay: 3000 },
      { type: "processing", text: "🔍 Finding best solution...", delay: 500 },
      { type: "bot", text: "समजले. आत्ता वर्गात हे करा: passage वाचल्यानंतर मुलांना विचारा 'कोण, काय, कुठे, केव्हा, का' — पाच प्रश्न. फळ्यावर लिहा. मुले गटात उत्तरे शोधतात. प्रत्येक गट एक प्रश्न घेतो. NCERT नुसार हे comprehension 60% वाढवते.", delay: 2000, source: "NCERT" },
      { type: "user", text: "हे खूप चांगले आहे, नक्की करतो", delay: 2000 },
      { type: "bot", text: "उत्तम! संध्याकाळी WhatsApp वर कळवा कसे झाले. तुमचा अनुभव इतर Marathi teachers ना मदत करेल! 🌟", delay: 1500 },
      { type: "system", text: "📱 WhatsApp follow-up sent to +91 98000 00002", delay: 500 }
    ]
  },
  3: {
    title: "Kavitha — Class 5 Fractions emergency",
    language: "Tamil",
    steps: [
      { type: "system", text: "📞 Call connected to Shikshak-Setu", delay: 500 },
      { type: "bot", text: "வணக்கம்! நான் சிக்‌ஷக்-சேது. Tamil இல் பேசலாம். உங்கள் வகுப்பில் என்ன பிரச்சனை?", delay: 1000 },
      { type: "user", text: "Class 5 பின்னங்கள் ஒப்பிடும் போது குழந்தைகளுக்கு குழப்பமாக இருக்கிறது", delay: 3000 },
      { type: "processing", text: "🔍 Finding best solution...", delay: 500 },
      { type: "bot", text: "புரிந்துகொண்டேன். இப்போதே இதை செய்யுங்கள்: இரண்டு சம அளவு paper strips எடுங்கள். ஒன்றை 3 சம பாகமாக மடியுங்கள், மற்றதை 4 சம பாகமாக. குழந்தைகள் கையால் பிடித்து ஒப்பிட்டு பார்க்கட்டும். எது பெரியது என்று தாங்களே கண்டுபிடிப்பார்கள்.", delay: 2000, source: "peer" },
      { type: "user", text: "நன்றி, இப்போதே try பண்றேன்", delay: 2000 },
      { type: "bot", text: "सரி! வகுப்பு முடிந்த பிறகு WhatsApp இல் தெரியுங்கள். உங்கள் அனுபவம் மற்ற Tamil teachers உதவும்! 🌟", delay: 1500 },
      { type: "system", text: "📱 WhatsApp follow-up sent to +91 98000 00003", delay: 500 }
    ]
  }
}
