# 🛒 POS-MOBILE

### ระบบขายหน้าร้านมือถือ

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No Backend](https://img.shields.io/badge/Backend-ไม่ต้องมี-brightgreen?style=flat-square)

---

## 📁 โครงสร้างไฟล์

```
📦 POS-MOBILE
├── 🌐 index.html          → หน้าเว็บทั้งหมดแบบ single-page (header, sidebar, ทุกหน้า, ทุก modal)
├── 🎨 style-pos.css       → ธีมสี, เลย์เอาต์, responsive
├── ⚙️ script-pos.js       → ลอจิกทั้งหมด: จัดการข้อมูล, render, คำนวณ, นำทางระหว่างหน้า
└── 📋 master-products.js  → รายการสินค้ากลาง CP All (~1,145 รายการ) สำหรับค้นหา/auto-fill
```

ทุกหน้าอยู่ใน `index.html` ไฟล์เดียว สลับหน้าด้วย JavaScript (`showPage()`) ไม่มีการโหลดหน้าใหม่

## ✨ ฟีเจอร์หลัก

| หน้า | รายละเอียด |
|:---|:---|
| 🛒 **ขายสินค้า** | ค้นหาสินค้า/สแกนบาร์โค้ด (กล้องสด หรือถ่ายรูป), ตะกร้าสินค้า, ส่วนลด, VAT 7%, ชำระเงินสด/โอน/บัตร, คีย์แพดคำนวณเงินทอน, พักบิล/เรียกบิล, ขายเชื่อ |
| 📦 **สินค้า** | เพิ่ม/แก้ไขสินค้า, ค้นหา/กรองตามหมวดหมู่และสต๊อก, เพิ่มจากรายการสินค้ากลาง, auto-fill ชื่อ+หมวดหมู่จากรหัส/บาร์โค้ด, ปรับสต๊อก, แจ้งเตือนสต๊อกต่ำ/ใกล้หมดอายุ |
| 🚚 **สั่งซื้อ** | บันทึกรายการสั่งซื้อจากผู้จำหน่าย, ค้นหาตามช่วงวันที่, export Excel |
| 💳 **ลูกหนี้** | บันทึกยอดขายเชื่อ, ติดตามยอดค้างชำระ, รับชำระหนี้บางส่วน/เต็มจำนวน |
| 📊 **รายงาน** | ยอดขาย (กราฟแท่ง+โดนัทตามหมวดหมู่, สินค้าขายดี, เปรียบเทียบช่วงเวลา), สต๊อก, รายจ่าย — export Excel ทุกแท็บ |
| ⚙️ **เพิ่มเติม/ตั้งค่า** | บันทึกรายจ่าย, ปรับสต๊อกด่วน, บิลพัก, นำเข้า/ส่งออก Excel, สำรอง/กู้คืนข้อมูล JSON, จัดการ mapping หมวดหมู่สินค้าตามรหัส, ข้อมูลร้าน/ตั้งค่าระบบ |

## 🔄 นำเข้า / ส่งออกข้อมูล

- ⬇️ ส่งออกสินค้า, ยอดขาย, สต๊อก, สั่งซื้อ, รายจ่าย เป็น **Excel (.xlsx)**
- ⬆️ นำเข้า Excel Master Product และไฟล์อัปเดตชื่อ+หมวดหมู่
- 🗄️ สำรอง/กู้คืนข้อมูลทั้งหมดเป็นไฟล์ JSON

## 💾 การเก็บข้อมูล

ข้อมูลทั้งหมดเก็บใน `localStorage` ของเบราว์เซอร์ — ไม่มีการส่งขึ้นเซิร์ฟเวอร์ ข้อมูลอยู่เฉพาะในเครื่อง/เบราว์เซอร์นั้นๆ

## 🚀 วิธีใช้งาน

เปิดไฟล์ `index.html` ในเบราว์เซอร์ได้ทันที — ไม่ต้อง build ไม่ต้อง install

## 📦 Dependencies (โหลดผ่าน CDN)

| ไลบรารี | ใช้ทำอะไร |
|:---|:---|
| [SheetJS (xlsx.js)](https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js) | นำเข้า/ส่งออกไฟล์ Excel |
| [Chart.js](https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js) | กราฟในหน้ารายงาน |
---


 made in Thailand ® 2024
