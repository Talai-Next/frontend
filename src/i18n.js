import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "title": "Talai Next",
        "setting": "Settings",
        "lang_text": "Please select a language",
        "lang_en": "English",
        "lang_th": "Thai",
        "search": "Search here",
        "line": "Line",
        "arrival_time": "Minutes to your location",
        "not_reach": "This line does not pass the nearest stop to you",
        "not_available": "No bus available",
        "cur_location": "Your location",
        "des_location": "Navigating to",
        "nearby_station": "Nearby stations",
        "bus_route": "The bus route you need to take",
        "marker_setting": "Marker settings",
        "bus_stop_marker": "Bus stop marker",
        "crosswalk_marker": "Crosswalk marker",
        "speed_bump_marker": "Speed bump marker",
        "bus_stop_marker_des": "Show or hide bus stop locations on the map",
        "crosswalk_marker_des": "Show crosswalk locations for pedestrians",
        "speed_bump_marker_des": "Show speed bump locations for slowing down vehicles",
        "dark_mode": "Dark mode",
        "ok": "OK",
        "cancel": "Cancel",
        "report_label": "Rate your bus experience",
        "select_bus_stop": "Please select your bus stop",
        "rate_exp": "Rate your experience",
        "rate_exp_des": "Rate based on the crowd density on the bus by selecting the appropriate image",
        "rate_exp_des1" : "1: Very Low Density - Very few passengers.",
        "rate_exp_des2" : "2: Low Density - Few passengers.",
        "rate_exp_des3" : "3: Medium Density - Moderate number of passengers.",
        "rate_exp_des4" : "4: High Density - Quite crowded.",
        "rate_exp_des5" : "5: Very High Density - Extremely crowded with passengers.",
        "comment": "Additional comments",
        "comment_des": "Add a comment...",
        "submit": "Submit",
        "special": "Special",
        "minute" : "min",
        "feedback_success" : "Feedback submitted successfully!"
      }
    },
    th: {
      translation: {
        "title": "Talai Next",
        "setting": "ตั้งค่า",
        "lang_text": "กรุณาเลือกภาษา",
        "lang_en": "ภาษาอังกฤษ",
        "lang_th": "ภาษาไทย",
        "search": "ค้นหาที่นี่",
        "line": "สาย",
        "arrival_time": "นาทีถึงที่ที่คุณอยู่",
        "not_reach": "สายนี้ไม่ผ่านป้ายที่อยู่ใกล้ที่สุดของคุณ",
        "not_available": "ไม่มีรถให้บริการ",
        "cur_location": "ตำแหน่งของคุณ",
        "des_location": "กำลังนำทางไป",
        "nearby_station": "สถานีใกล้ฉัน",
        "bus_route": "สายที่ต้องขึ้น",
        "marker_setting": "ตั้งค่าหมุด",
        "bus_stop_marker": "หมุดสถานี",
        "crosswalk_marker": "หมุดทางม้าลาย",
        "speed_bump_marker": "หมุดลูกระนาด",
        "bus_stop_marker_des": "แสดงหรือซ่อนตำแหน่งป้ายรถตะลัยบนแผนที่",
        "crosswalk_marker_des": "แสดงตำแหน่งทางม้าลายสำหรับคนเดินเท้า",
        "speed_bump_marker_des": "แสดงตำแหน่งลูกระนาดสำหรับชะลอความเร็วรถ",
        "dark_mode": "โหมดกลางคืน",
        "ok": "ตกลง",
        "cancel": "ยกเลิก",
        "report_label": "ให้คะแนนประสบการณ์การขึ้นรถ",
        "select_bus_stop": "กรุณาเลือกป้ายที่คุณอยู่",
        "rate_exp": "ให้คะแนนประสบการณ์",
        "rate_exp_des": "ให้คะแนนจากความหนาแน่นของจำนวนคนบนรถ โดยเลือกจำนวนคนจากรูป",
        "rate_exp_des1": "1: ความหนาแน่นต่ำมาก - มีผู้โดยสารน้อยมาก",
        "rate_exp_des2": "2: ความหนาแน่นต่ำ - มีผู้โดยสารน้อย",
        "rate_exp_des3": "3: ความหนาแน่นปานกลาง - มีจำนวนผู้โดยสารปานกลาง",
        "rate_exp_des4": "4: ความหนาแน่นสูง - ค่อนข้างแออัด",
        "rate_exp_des5": "5: ความหนาแน่นสูงมาก - มีผู้โดยสารหนาแน่นมาก",
        "comment": "ความคิดเห็นเพิ่มเติม",
        "comment_des": "เพิ่มความคิดเห็น...",
        "submit": "ส่ง",
        "special": "พิเศษ",
        "minute" : "นาที",
        "feedback_success" : "ส่งรายงานสำเร็จ!"
      }
    }
  },
  lng: savedLang, 
  fallbackLng: 'en', 
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
