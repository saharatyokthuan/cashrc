/* ============================================================
   data.js — เนื้อหาทั้งหมดของคอร์ส Python พื้นฐาน
   โครงสร้าง: COURSE.phases[].chapters[].lessons[]
   ============================================================ */

const COURSE = {
  phases: [
    // ==================== เฟส 1 ====================
    {
      id: "phase1",
      name: "🌱 เฟส 1 — พื้นฐานที่ต้องแน่น",
      chapters: [
        {
          id: "ch1_1",
          name: "📌 ตัวแปรและชนิดข้อมูล",
          lessons: [
            {
              id: "1.1",
              title: "ตัวแปรและชนิดข้อมูล",
              goal: "รู้จักชนิดข้อมูลพื้นฐาน int, float, str, bool และการตรวจสอบชนิด",
              problem: 
`# ประกาศตัวแปรชนิดต่างๆ
name = "สมชาย"      # str  ข้อความ
age = 25            # int  จำนวนเต็ม
gpa = 3.75          # float ทศนิยม
is_student = True   # bool จริง/เท็จ

# ตรวจสอบชนิดข้อมูล
print(type(name))
print(type(age))
print(type(gpa))
print(type(is_student))`,
              output: 
`<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>`,
              solution: 
`name = "สมชาย"
age = 25
gpa = 3.75
is_student = True

print(type(name))
print(type(age))
print(type(gpa))
print(type(is_student))`
            },
            {
              id: "1.2",
              title: "การแปลงชนิดข้อมูล",
              goal: "เรียนรู้การแปลงระหว่างชนิดข้อมูลด้วย int(), float(), str()",
              problem: `# รับข้อมูลจากผู้ใช้ (ได้ str เสมอ)
num1 = input("ใส่ตัวเลขที่ 1: ")
num2 = input("ใส่ตัวเลขที่ 2: ")

# แปลงเป็น int แล้วบวกกัน
result = int(num1) + int(num2)
print(f"{num1} + {num2} = {result}")

# แปลงตัวเลขเป็นข้อความ
price = 99.99
print("ราคา: " + str(price) + " บาท")`,
              output: `ใส่ตัวเลขที่ 1: 10
ใส่ตัวเลขที่ 2: 20
10 + 20 = 30
ราคา: 99.99 บาท`,
              solution: `num1 = input("ใส่ตัวเลขที่ 1: ")
num2 = input("ใส่ตัวเลขที่ 2: ")

result = int(num1) + int(num2)
print(f"{num1} + {num2} = {result}")

price = 99.99
print("ราคา: " + str(price) + " บาท")`
            },
            {
              id: "1.3",
              title: "f-string และการจัดรูปแบบ",
              goal: "ใช้ f-string เพื่อแสดงผลข้อความและตัวเลขสวยงาม",
              problem: `name = "สมชาย"
age = 25
salary = 25000.5

# f-string พื้นฐาน
print(f"สวัสดี {name} อายุ {age} ปี")

# กำหนดจำนวนตำแหน่งทศนิยม
print(f"เงินเดือน {salary:.2f} บาท")

# ใช้ comma คั่นหลักพัน
print(f"เงินเดือน {salary:,.2f} บาท")

# จัดชิดซ้าย/ขวา
print(f"{'ชื่อ':<10} {'เงินเดือน':>15}")
print(f"{name:<10} {salary:>15,.2f}")`,
              output: `สวัสดี สมชาย อายุ 25 ปี
เงินเดือน 25000.50 บาท
เงินเดือน 25,000.50 บาท
ชื่อ             เงินเดือน
สมชาย         25,000.50`,
              solution: `name = "สมชาย"
age = 25
salary = 25000.5

print(f"สวัสดี {name} อายุ {age} ปี")
print(f"เงินเดือน {salary:.2f} บาท")
print(f"เงินเดือน {salary:,.2f} บาท")

print(f"{'ชื่อ':<10} {'เงินเดือน':>15}")
print(f"{name:<10} {salary:>15,.2f}")`
            }
          ]
        },
        {
          id: "ch1_2",
          name: "📌 รับ-แสดงผล",
          lessons: [
            {
              id: "1.4",
              title: "input() และ print()",
              goal: "รับข้อมูลจากผู้ใช้และแสดงผลลัพธ์",
              problem: `# รับข้อมูลจากผู้ใช้
name = input("กรุณาใส่ชื่อของคุณ: ")
age = int(input("กรุณาใส่อายุ: "))

# แสดงผล
print("========== ข้อมูลของคุณ ==========")
print(f"ชื่อ: {name}")
print(f"อายุ: {age} ปี")
print(f"อีก 10 ปี คุณจะอายุ {age + 10} ปี")`,
              output: `กรุณาใส่ชื่อของคุณ: สมชาย
กรุณาใส่อายุ: 25
========== ข้อมูลของคุณ ==========
ชื่อ: สมชาย
อายุ: 25 ปี
อีก 10 ปี คุณจะอายุ 35 ปี`,
              solution: `name = input("กรุณาใส่ชื่อของคุณ: ")
age = int(input("กรุณาใส่อายุ: "))

print("========== ข้อมูลของคุณ ==========")
print(f"ชื่อ: {name}")
print(f"อายุ: {age} ปี")
print(f"อีก 10 ปี คุณจะอายุ {age + 10} ปี")`
            },
            {
              id: "1.5",
              title: "แปลงอุณหภูมิ (°C → °F)",
              goal: "ประยุกต์ใช้ input, float, f-string ในการแปลงหน่วย",
              problem: `# รับอุณหภูมิ Celsius
celsius = float(input("ใส่อุณหภูมิ (°C): "))

# แปลงเป็น Fahrenheit
fahrenheit = (celsius * 9/5) + 32

# แสดงผลแบบสวยงาม
print(f"{celsius:.1f}°C = {fahrenheit:.1f}°F")

# แสดงตารางเปรียบเทียบ
print("\n--- ตารางเปรียบเทียบ ---")
for c in range(0, 101, 20):
    f = (c * 9/5) + 32
    print(f"{c:>3}°C = {f:>6.1f}°F")`,
              output: `ใส่อุณหภูมิ (°C): 36.5
36.5°C = 97.7°F

--- ตารางเปรียบเทียบ ---
  0°C =   32.0°F
 20°C =   68.0°F
 40°C =  104.0°F
 60°C =  140.0°F
 80°C =  176.0°F
100°C =  212.0°F`,
              solution: `celsius = float(input("ใส่อุณหภูมิ (°C): "))
fahrenheit = (celsius * 9/5) + 32

print(f"{celsius:.1f}°C = {fahrenheit:.1f}°F")

print("\n--- ตารางเปรียบเทียบ ---")
for c in range(0, 101, 20):
    f = (c * 9/5) + 32
    print(f"{c:>3}°C = {f:>6.1f}°F")`
            }
          ]
        },
        {
          id: "ch1_3",
          name: "📌 ตัวดำเนินการ",
          lessons: [
            {
              id: "1.6",
              title: "ตัวดำเนินการทางคณิตศาสตร์",
              goal: "ใช้ + - * / // % ** และลำดับความสำคัญ",
              problem: `a = 17
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} × {b} = {a * b}")
print(f"{a} ÷ {b} = {a / b}")
print(f"{a} ÷ {b} (ปัดลง) = {a // b}")
print(f"{a} หาร {b} เหลือเศษ = {a % b}")
print(f"{a} ยกกำลัง {b} = {a ** b}")

# ลำดับความสำคัญ
x = 2 + 3 * 4 ** 2  # 2 + 3 * 16 = 50
print(f"2 + 3 × 4² = {x}")`,
              output: `17 + 5 = 22
17 - 5 = 12
17 × 5 = 85
17 ÷ 5 = 3.4
17 ÷ 5 (ปัดลง) = 3
17 หาร 5 เหลือเศษ = 2
17 ยกกำลัง 5 = 1419857
2 + 3 × 4² = 50`,
              solution: `a = 17
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} × {b} = {a * b}")
print(f"{a} ÷ {b} = {a / b}")
print(f"{a} ÷ {b} (ปัดลง) = {a // b}")
print(f"{a} หาร {b} เหลือเศษ = {a % b}")
print(f"{a} ยกกำลัง {b} = {a ** b}")

x = 2 + 3 * 4 ** 2
print(f"2 + 3 × 4² = {x}")`
            },
            {
              id: "1.7",
              title: "คำนวณเงินเดือนสุทธิ",
              goal: "ใช้ min(), max() และตัวดำเนินการเพื่อจำกัดค่า",
              problem: `# รับเงินเดือน
salary = float(input("กรุณาใส่เงินเดือน (บาท): "))

# คำนวณประกันสังคม 5% แต่ไม่เกิน 750 บาท
insurance = min(salary * 0.05, 750)

# คำนวณเงินเดือนสุทธิ
net_salary = salary - insurance

# แสดงผล
print("=" * 40)
print(f"{'เงินเดือนรวม':<15} : {salary:>15,.2f} บาท")
print(f"{'ประกันสังคม':<15} : {insurance:>15,.2f} บาท")
print("-" * 40)
print(f"{'เงินสุทธิ':<15} : {net_salary:>15,.2f} บาท")`,
              output: `กรุณาใส่เงินเดือน (บาท): 25000
========================================
เงินเดือนรวม      :       25,000.00 บาท
ประกันสังคม       :        1,250.00 บาท
----------------------------------------
เงินสุทธิ         :       23,750.00 บาท`,
              solution: `salary = float(input("กรุณาใส่เงินเดือน (บาท): "))

insurance = min(salary * 0.05, 750)
net_salary = salary - insurance

print("=" * 40)
print(f"{'เงินเดือนรวม':<15} : {salary:>15,.2f} บาท")
print(f"{'ประกันสังคม':<15} : {insurance:>15,.2f} บาท")
print("-" * 40)
print(f"{'เงินสุทธิ':<15} : {net_salary:>15,.2f} บาท")`
            }
          ]
        }
      ]
    },

    // ==================== เฟส 2 ====================
    {
      id: "phase2",
      name: "🔀 เฟส 2 — เงื่อนไข (Conditions)",
      chapters: [
        {
          id: "ch2_1",
          name: "📌 if / elif / else",
          lessons: [
            {
              id: "2.1",
              title: "ตัดเกรดด้วย if-elif-else",
              goal: "ใช้เงื่อนไขหลายขั้นตอนในการตัดเกรด",
              problem: `# รับคะแนน
score = float(input("คะแนน (0-100): "))

# ตัดเกรด
if score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 60:
    grade = "C"
elif score >= 50:
    grade = "D"
else:
    grade = "F"

# แสดงผลพร้อมคำอธิบาย
grades = {
    "A": "ดีเยี่ยม",
    "B": "ดีมาก",
    "C": "ดี",
    "D": "พอใช้",
    "F": "ไม่ผ่าน"
}

print(f"คะแนน {score:.1f} → เกรด {grade} ({grades[grade]})")`,
              output: `คะแนน (0-100): 75
คะแนน 75.0 → เกรด B (ดีมาก)`,
              solution: `score = float(input("คะแนน (0-100): "))

if score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 60:
    grade = "C"
elif score >= 50:
    grade = "D"
else:
    grade = "F"

grades = {
    "A": "ดีเยี่ยม",
    "B": "ดีมาก",
    "C": "ดี",
    "D": "พอใช้",
    "F": "ไม่ผ่าน"
}

print(f"คะแนน {score:.1f} → เกรด {grade} ({grades[grade]})")`
            },
            {
              id: "2.2",
              title: "ตรวจสอบช่วงวัย",
              goal: "ใช้เงื่อนไขหลายระดับเพื่อบอกช่วงวัย",
              problem: `# รับอายุ
age = int(input("กรุณาใส่อายุ: "))

# ตรวจสอบช่วงวัย
if age < 0:
    print("❌ อายุไม่ถูกต้อง")
elif age <= 12:
    category = "เด็ก"
elif age <= 19:
    category = "วัยรุ่น"
elif age <= 39:
    category = "วัยผู้ใหญ่ตอนต้น"
elif age <= 59:
    category = "วัยผู้ใหญ่ตอนกลาง"
else:
    category = "ผู้สูงอายุ"

# แสดงผล
print(f"คุณอายุ {age} ปี จัดอยู่ในช่วง {category}")

# ตรวจสอบสิทธิ์ต่างๆ
if age >= 18:
    print("✅ มีสิทธิ์เลือกตั้ง")
if age >= 20:
    print("✅ สามารถสมัครบัตรเครดิตได้")
if age >= 60:
    print("✅ มีสิทธิ์บัตรสวัสดิการแห่งรัฐ")`,
              output: `กรุณาใส่อายุ: 25
คุณอายุ 25 ปี จัดอยู่ในช่วง วัยผู้ใหญ่ตอนต้น
✅ มีสิทธิ์เลือกตั้ง
✅ สามารถสมัครบัตรเครดิตได้`,
              solution: `age = int(input("กรุณาใส่อายุ: "))

if age < 0:
    print("❌ อายุไม่ถูกต้อง")
elif age <= 12:
    category = "เด็ก"
elif age <= 19:
    category = "วัยรุ่น"
elif age <= 39:
    category = "วัยผู้ใหญ่ตอนต้น"
elif age <= 59:
    category = "วัยผู้ใหญ่ตอนกลาง"
else:
    category = "ผู้สูงอายุ"

print(f"คุณอายุ {age} ปี จัดอยู่ในช่วง {category}")

if age >= 18:
    print("✅ มีสิทธิ์เลือกตั้ง")
if age >= 20:
    print("✅ สามารถสมัครบัตรเครดิตได้")
if age >= 60:
    print("✅ มีสิทธิ์บัตรสวัสดิการแห่งรัฐ")`
            }
          ]
        },
        {
          id: "ch2_2",
          name: "📌 ตัวดำเนินการตรรกะ",
          lessons: [
            {
              id: "2.3",
              title: "and / or / not",
              goal: "ใช้ตัวดำเนินการตรรกะในการตรวจสอบเงื่อนไขซับซ้อน",
              problem: `# ตรวจสอบคุณสมบัติผู้สมัครงาน
age = 25
experience = 3
education = "ปริญญาตรี"
has_cert = True

# ใช้ and - ทุกเงื่อนไขต้องจริง
if age >= 22 and experience >= 2 and education == "ปริญญาตรี":
    print("✅ ผ่านเกณฑ์คุณสมบัติเบื้องต้น")
else:
    print("❌ ไม่ผ่านเกณฑ์คุณสมบัติเบื้องต้น")

# ใช้ or - อย่างใดอย่างหนึ่งก็พอ
if has_cert or experience >= 5:
    print("✅ มีคุณสมบัติพิเศษ (มีใบรับรองหรือประสบการณ์ 5 ปี+)")

# ใช้ not - กลับค่าความจริง
is_holiday = False
if not is_holiday:
    print("📅 วันนี้เป็นวันทำงาน")`,
              output: `✅ ผ่านเกณฑ์คุณสมบัติเบื้องต้น
✅ มีคุณสมบัติพิเศษ (มีใบรับรองหรือประสบการณ์ 5 ปี+)
📅 วันนี้เป็นวันทำงาน`,
              solution: `age = 25
experience = 3
education = "ปริญญาตรี"
has_cert = True

if age >= 22 and experience >= 2 and education == "ปริญญาตรี":
    print("✅ ผ่านเกณฑ์คุณสมบัติเบื้องต้น")
else:
    print("❌ ไม่ผ่านเกณฑ์คุณสมบัติเบื้องต้น")

if has_cert or experience >= 5:
    print("✅ มีคุณสมบัติพิเศษ (มีใบรับรองหรือประสบการณ์ 5 ปี+)")

is_holiday = False
if not is_holiday:
    print("📅 วันนี้เป็นวันทำงาน")`
            },
            {
              id: "2.4",
              title: "in และ membership test",
              goal: "ตรวจสอบว่าค่าอยู่ในกลุ่มข้อมูลหรือไม่",
              problem: `# ตรวจสอบวันหยุด
day = input("วันนี้วันอะไร? ")

weekdays = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"]
weekends = ["เสาร์", "อาทิตย์"]

if day in weekends:
    print("🎉 วันหยุด! พักผ่อนสบายๆ")
elif day in weekdays:
    print("💼 วันทำงาน ตั้งใจทำงานนะ!")
else:
    print("❌ ไม่รู้จักวันนี้")

# ตรวจสอบรหัสผ่าน
password = "1234"
common_passwords = ["1234", "password", "123456", "12345678"]

if password in common_passwords:
    print("⚠️ รหัสผ่านนี้ง่ายเกินไป ควรเปลี่ยน!")
else:
    print("✅ รหัสผ่านมีความปลอดภัยดี")`,
              output: `วันนี้วันอะไร? เสาร์
🎉 วันหยุด! พักผ่อนสบายๆ
⚠️ รหัสผ่านนี้ง่ายเกินไป ควรเปลี่ยน!`,
              solution: `day = input("วันนี้วันอะไร? ")

weekdays = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"]
weekends = ["เสาร์", "อาทิตย์"]

if day in weekends:
    print("🎉 วันหยุด! พักผ่อนสบายๆ")
elif day in weekdays:
    print("💼 วันทำงาน ตั้งใจทำงานนะ!")
else:
    print("❌ ไม่รู้จักวันนี้")

password = "1234"
common_passwords = ["1234", "password", "123456", "12345678"]

if password in common_passwords:
    print("⚠️ รหัสผ่านนี้ง่ายเกินไป ควรเปลี่ยน!")
else:
    print("✅ รหัสผ่านมีความปลอดภัยดี")`
            }
          ]
        },
        {
          id: "ch2_3",
          name: "📌 เงื่อนไขซ้อนและ Ternary",
          lessons: [
            {
              id: "2.5",
              title: "Ternary Operator",
              goal: "เขียน if-else แบบย่อในบรรทัดเดียว",
              problem: `# Ternary operator พื้นฐาน
age = 20
status = "ผู้ใหญ่" if age >= 18 else "เด็ก"
print(f"อายุ {age} → {status}")

# ใช้ ternary ในการกำหนดค่า
score = 75
result = "ผ่าน" if score >= 50 else "ไม่ผ่าน"
print(f"คะแนน {score} → {result}")

# ใช้ min/max แทนเงื่อนไข
price = 450
discount = 0.1 if price > 300 else 0.05
final_price = price * (1 - discount)
print(f"ราคา {price} บาท ลด {discount*100:.0f}% → {final_price:.2f} บาท")

# หลายเงื่อนไขในบรรทัดเดียว (ควรใช้แค่กรณีง่ายๆ)
x = 5
msg = "มาก" if x > 10 else "กลาง" if x > 5 else "น้อย"
print(f"x = {x} → {msg}")`,
              output: `อายุ 20 → ผู้ใหญ่
คะแนน 75 → ผ่าน
ราคา 450 บาท ลด 10% → 405.00 บาท
x = 5 → น้อย`,
              solution: `age = 20
status = "ผู้ใหญ่" if age >= 18 else "เด็ก"
print(f"อายุ {age} → {status}")

score = 75
result = "ผ่าน" if score >= 50 else "ไม่ผ่าน"
print(f"คะแนน {score} → {result}")

price = 450
discount = 0.1 if price > 300 else 0.05
final_price = price * (1 - discount)
print(f"ราคา {price} บาท ลด {discount*100:.0f}% → {final_price:.2f} บาท")

x = 5
msg = "มาก" if x > 10 else "กลาง" if x > 5 else "น้อย"
print(f"x = {x} → {msg}")`
            },
            {
              id: "2.6",
              title: "min() / max() ในการจำกัดค่า",
              goal: "ใช้ min/max แทนการเขียนเงื่อนไขเพื่อจำกัดค่า",
              problem: `# คำนวณค่าจัดส่ง
price = float(input("ราคาสินค้า (บาท): "))

# ค่าจัดส่ง 3% ของราคา ขั้นต่ำ 20 บาท สูงสุด 100 บาท
shipping = min(max(price * 0.03, 20), 100)

# หรือเขียนแยก
base_shipping = price * 0.03
min_shipping = max(base_shipping, 20)    # อย่างน้อย 20
shipping = min(min_shipping, 100)        # ไม่เกิน 100

total = price + shipping

print("=" * 40)
print(f"{'ราคาสินค้า':<15} : {price:>15,.2f} บาท")
print(f"{'ค่าจัดส่ง':<15} : {shipping:>15,.2f} บาท")
print("-" * 40)
print(f"{'รวมทั้งสิ้น':<15} : {total:>15,.2f} บาท")`,
              output: `ราคาสินค้า (บาท): 1500
========================================
ราคาสินค้า      :        1,500.00 บาท
ค่าจัดส่ง        :          45.00 บาท
----------------------------------------
รวมทั้งสิ้น      :        1,545.00 บาท`,
              solution: `price = float(input("ราคาสินค้า (บาท): "))

shipping = min(max(price * 0.03, 20), 100)
total = price + shipping

print("=" * 40)
print(f"{'ราคาสินค้า':<15} : {price:>15,.2f} บาท")
print(f"{'ค่าจัดส่ง':<15} : {shipping:>15,.2f} บาท")
print("-" * 40)
print(f"{'รวมทั้งสิ้น':<15} : {total:>15,.2f} บาท")`
            }
          ]
        }
      ]
    },

    // ==================== เฟส 3 ====================
    {
      id: "phase3",
      name: "🔁 เฟส 3 — การวนซ้ำ (Loops)",
      chapters: [
        {
          id: "ch3_1",
          name: "📌 for loop",
          lessons: [
            {
              id: "3.1",
              title: "for loop พื้นฐานและ range()",
              goal: "ใช้ for loop กับ range() เพื่อวนซ้ำตามจำนวนรอบ",
              problem: `# range(start, stop, step)
print("=== นับ 1-10 ===")
for i in range(1, 11):
    print(i, end=" ")

print("\n\n=== เลขคู่ 2-20 ===")
for i in range(2, 21, 2):
    print(i, end=" ")

print("\n\n=== นับถอยหลัง 5-1 ===")
for i in range(5, 0, -1):
    print(i, end=" ")

print("\n\n=== สูตรคูณแม่ 2 ===")
for i in range(1, 13):
    print(f"2 × {i:2} = {2*i:3}")`,
              output: `=== นับ 1-10 ===
1 2 3 4 5 6 7 8 9 10 

=== เลขคู่ 2-20 ===
2 4 6 8 10 12 14 16 18 20 

=== นับถอยหลัง 5-1 ===
5 4 3 2 1 

=== สูตรคูณแม่ 2 ===
2 ×  1 =   2
2 ×  2 =   4
2 ×  3 =   6
2 ×  4 =   8
2 ×  5 =  10
2 ×  6 =  12
2 ×  7 =  14
2 ×  8 =  16
2 ×  9 =  18
2 × 10 =  20
2 × 11 =  22
2 × 12 =  24`,
              solution: `print("=== นับ 1-10 ===")
for i in range(1, 11):
    print(i, end=" ")

print("\n\n=== เลขคู่ 2-20 ===")
for i in range(2, 21, 2):
    print(i, end=" ")

print("\n\n=== นับถอยหลัง 5-1 ===")
for i in range(5, 0, -1):
    print(i, end=" ")

print("\n\n=== สูตรคูณแม่ 2 ===")
for i in range(1, 13):
    print(f"2 × {i:2} = {2*i:3}")`
            },
            {
              id: "3.2",
              title: "วนลูปใน List และ enumerate()",
              goal: "ใช้ for loop วนข้อมูลใน list และใช้ enumerate() เพื่อนับลำดับ",
              problem: `fruits = ["แอปเปิ้ล", "กล้วย", "ส้ม", "องุ่น", "มะม่วง"]

# วนลูปอ่านค่า
print("=== ผลไม้ ===")
for fruit in fruits:
    print(f"- {fruit}")

# ใช้ enumerate เพื่อนับลำดับ
print("\n=== รายการผลไม้ (พร้อมลำดับ) ===")
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# ใช้ range(len()) เพื่อเข้าถึง index
print("\n=== ผลไม้และจำนวนตัวอักษร ===")
for i in range(len(fruits)):
    print(f"{fruits[i]}: {len(fruits[i])} ตัวอักษร")`,
              output: `=== ผลไม้ ===
- แอปเปิ้ล
- กล้วย
- ส้ม
- องุ่น
- มะม่วง

=== รายการผลไม้ (พร้อมลำดับ) ===
1. แอปเปิ้ล
2. กล้วย
3. ส้ม
4. องุ่น
5. มะม่วง

=== ผลไม้และจำนวนตัวอักษร ===
แอปเปิ้ล: 6 ตัวอักษร
กล้วย: 4 ตัวอักษร
ส้ม: 2 ตัวอักษร
องุ่น: 4 ตัวอักษร
มะม่วง: 5 ตัวอักษร`,
              solution: `fruits = ["แอปเปิ้ล", "กล้วย", "ส้ม", "องุ่น", "มะม่วง"]

print("=== ผลไม้ ===")
for fruit in fruits:
    print(f"- {fruit}")

print("\n=== รายการผลไม้ (พร้อมลำดับ) ===")
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

print("\n=== ผลไม้และจำนวนตัวอักษร ===")
for i in range(len(fruits)):
    print(f"{fruits[i]}: {len(fruits[i])} ตัวอักษร")`
            }
          ]
        },
        {
          id: "ch3_2",
          name: "📌 while loop",
          lessons: [
            {
              id: "3.3",
              title: "while loop พื้นฐาน",
              goal: "ใช้ while loop เมื่อไม่รู้จำนวนรอบล่วงหน้า",
              problem: `# นับ 1-10 ด้วย while
print("=== นับ 1-10 ===")
i = 1
while i <= 10:
    print(i, end=" ")
    i += 1

# คำนวณผลรวมจนกว่าผู้ใช้จะหยุด
print("\n\n=== บวกเลขไปเรื่อยๆ ===")
total = 0
count = 0

while True:
    num = input("ใส่ตัวเลข (Enter เพื่อจบ): ")
    if num == "":
        break
    total += float(num)
    count += 1

if count > 0:
    print(f"รวม {count} จำนวน = {total:.2f}")
    print(f"เฉลี่ย = {total/count:.2f}")`,
              output: `=== นับ 1-10 ===
1 2 3 4 5 6 7 8 9 10 

=== บวกเลขไปเรื่อยๆ ===
ใส่ตัวเลข (Enter เพื่อจบ): 10
ใส่ตัวเลข (Enter เพื่อจบ): 20
ใส่ตัวเลข (Enter เพื่อจบ): 30
ใส่ตัวเลข (Enter เพื่อจบ): 
รวม 3 จำนวน = 60.00
เฉลี่ย = 20.00`,
              solution: `print("=== นับ 1-10 ===")
i = 1
while i <= 10:
    print(i, end=" ")
    i += 1

print("\n\n=== บวกเลขไปเรื่อยๆ ===")
total = 0
count = 0

while True:
    num = input("ใส่ตัวเลข (Enter เพื่อจบ): ")
    if num == "":
        break
    total += float(num)
    count += 1

if count > 0:
    print(f"รวม {count} จำนวน = {total:.2f}")
    print(f"เฉลี่ย = {total/count:.2f}")`
            },
            {
              id: "3.4",
              title: "เกมทายเลข",
              goal: "ใช้ while loop และ random สร้างเกมทายเลข",
              problem: `import random

# สุ่มเลข 1-100
secret = random.randint(1, 100)
attempts = 0

print("🎯 เกมทายเลข 1-100")

while True:
    try:
        guess = int(input("ทายเลข: "))
        attempts += 1
        
        if guess < secret:
            print("⬆️ เลขน้อยไป ลองเพิ่มขึ้น")
        elif guess > secret:
            print("⬇️ เลขมากไป ลองลดลง")
        else:
            print(f"🎉 ถูกต้อง! เลขคือ {secret}")
            print(f"คุณทาย {attempts} ครั้ง")
            break
    except ValueError:
        print("❌ กรุณาใส่ตัวเลขเท่านั้น")`,
              output: `🎯 เกมทายเลข 1-100
ทายเลข: 50
⬆️ เลขน้อยไป ลองเพิ่มขึ้น
ทายเลข: 75
⬇️ เลขมากไป ลองลดลง
ทายเลข: 63
🎉 ถูกต้อง! เลขคือ 63
คุณทาย 3 ครั้ง`,
              solution: `import random

secret = random.randint(1, 100)
attempts = 0

print("🎯 เกมทายเลข 1-100")

while True:
    try:
        guess = int(input("ทายเลข: "))
        attempts += 1
        
        if guess < secret:
            print("⬆️ เลขน้อยไป ลองเพิ่มขึ้น")
        elif guess > secret:
            print("⬇️ เลขมากไป ลองลดลง")
        else:
            print(f"🎉 ถูกต้อง! เลขคือ {secret}")
            print(f"คุณทาย {attempts} ครั้ง")
            break
    except ValueError:
        print("❌ กรุณาใส่ตัวเลขเท่านั้น")`
            }
          ]
        },
        {
          id: "ch3_3",
          name: "📌 break / continue / else",
          lessons: [
            {
              id: "3.5",
              title: "break, continue และ else ใน loop",
              goal: "ควบคุมการทำงานของ loop ด้วย break, continue และ else",
              problem: `# break - หยุด loop ทันที
print("=== break เมื่อเจอเลข 5 ===")
for i in range(1, 11):
    if i == 5:
        break
    print(i, end=" ")

# continue - ข้ามรอบนี้
print("\n\n=== continue ข้ามเลขคู่ ===")
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i, end=" ")

# for...else - ทำงานเมื่อ loop จบโดยไม่ break
print("\n\n=== ตรวจสอบจำนวนเฉพาะ ===")
num = 17
for i in range(2, num):
    if num % i == 0:
        print(f"{num} ไม่ใช่จำนวนเฉพาะ (หารด้วย {i} ลงตัว)")
        break
else:
    print(f"{num} เป็นจำนวนเฉพาะ")

# ตัวอย่างเพิ่มเติม: หาเลขเฉพาะ 2-20
print("\n=== จำนวนเฉพาะ 2-20 ===")
for n in range(2, 21):
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            break
    else:
        print(n, end=" ")`,
              output: `=== break เมื่อเจอเลข 5 ===
1 2 3 4 

=== continue ข้ามเลขคู่ ===
1 3 5 7 9 

=== ตรวจสอบจำนวนเฉพาะ ===
17 เป็นจำนวนเฉพาะ

=== จำนวนเฉพาะ 2-20 ===
2 3 5 7 11 13 17 19`,
              solution: `print("=== break เมื่อเจอเลข 5 ===")
for i in range(1, 11):
    if i == 5:
        break
    print(i, end=" ")

print("\n\n=== continue ข้ามเลขคู่ ===")
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i, end=" ")

print("\n\n=== ตรวจสอบจำนวนเฉพาะ ===")
num = 17
for i in range(2, num):
    if num % i == 0:
        print(f"{num} ไม่ใช่จำนวนเฉพาะ (หารด้วย {i} ลงตัว)")
        break
else:
    print(f"{num} เป็นจำนวนเฉพาะ")

print("\n=== จำนวนเฉพาะ 2-20 ===")
for n in range(2, 21):
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            break
    else:
        print(n, end=" ")`
            }
          ]
        }
      ]
    },

    // ==================== เฟส 4 ====================
    {
      id: "phase4",
      name: "🧩 เฟส 4 — ฟังก์ชัน (Functions)",
      chapters: [
        {
          id: "ch4_1",
          name: "📌 สร้างฟังก์ชัน",
          lessons: [
            {
              id: "4.1",
              title: "def และ return",
              goal: "สร้างฟังก์ชันและส่งค่ากลับด้วย return",
              problem: `# ฟังก์ชันคำนวณพื้นที่
def circle_area(radius):
    """คำนวณพื้นที่วงกลม"""
    return 3.14159 * radius ** 2

def rectangle_area(width, height):
    """คำนวณพื้นที่สี่เหลี่ยม"""
    return width * height

def triangle_area(base, height):
    """คำนวณพื้นที่สามเหลี่ยม"""
    return 0.5 * base * height

# เรียกใช้ฟังก์ชัน
print(f"วงกลม r=5: {circle_area(5):.2f}")
print(f"สี่เหลี่ยม 4×6: {rectangle_area(4, 6)}")
print(f"สามเหลี่ยม ฐาน3 สูง4: {triangle_area(3, 4)}")

# ฟังก์ชันที่คืนค่าหลายค่า (tuple)
def calc_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

scores = [80, 90, 75, 85, 95]
min_s, max_s, avg = calc_stats(scores)
print(f"\nคะแนน: {scores}")
print(f"ต่ำสุด: {min_s}, สูงสุด: {max_s}, เฉลี่ย: {avg:.2f}")`,
              output: `วงกลม r=5: 78.54
สี่เหลี่ยม 4×6: 24
สามเหลี่ยม ฐาน3 สูง4: 6.0

คะแนน: [80, 90, 75, 85, 95]
ต่ำสุด: 75, สูงสุด: 95, เฉลี่ย: 85.00`,
              solution: `def circle_area(radius):
    return 3.14159 * radius ** 2

def rectangle_area(width, height):
    return width * height

def triangle_area(base, height):
    return 0.5 * base * height

print(f"วงกลม r=5: {circle_area(5):.2f}")
print(f"สี่เหลี่ยม 4×6: {rectangle_area(4, 6)}")
print(f"สามเหลี่ยม ฐาน3 สูง4: {triangle_area(3, 4)}")

def calc_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

scores = [80, 90, 75, 85, 95]
min_s, max_s, avg = calc_stats(scores)
print(f"\nคะแนน: {scores}")
print(f"ต่ำสุด: {min_s}, สูงสุด: {max_s}, เฉลี่ย: {avg:.2f}")`
            },
            {
              id: "4.2",
              title: "ฟังก์ชันแปลงอุณหภูมิ",
              goal: "สร้างฟังก์ชันแปลงอุณหภูมิทั้งสองทิศทาง",
              problem: `def c_to_f(celsius):
    """แปลง Celsius → Fahrenheit"""
    return (celsius * 9/5) + 32

def f_to_c(fahrenheit):
    """แปลง Fahrenheit → Celsius"""
    return (fahrenheit - 32) * 5/9

def show_temp_table(start, end, step):
    """แสดงตารางเปรียบเทียบอุณหภูมิ"""
    print("=" * 35)
    print(f"{'°C':>6} {'°F':>10} {' | '} {'°F':>6} {'°C':>10}")
    print("-" * 35)
    for c in range(start, end + 1, step):
        f = c_to_f(c)
        print(f"{c:>6} {f:>10.1f} {' | '} {f:>6.0f} {f_to_c(f):>10.1f}")

# ทดสอบฟังก์ชัน
print(f"36.5°C = {c_to_f(36.5):.1f}°F")
print(f"98.6°F = {f_to_c(98.6):.1f}°C")

# แสดงตาราง
show_temp_table(0, 100, 20)`,
              output: `36.5°C = 97.7°F
98.6°F = 37.0°C
===================================
    °C        °F  |     °F        °C
-----------------------------------
     0       32.0  |     32       0.0
    20       68.0  |     68      -20.0
    40      104.0  |    104      -40.0
    60      140.0  |    140      -60.0
    80      176.0  |    176      -80.0
   100      212.0  |    212     -100.0`,
              solution: `def c_to_f(celsius):
    return (celsius * 9/5) + 32

def f_to_c(fahrenheit):
    return (fahrenheit - 32) * 5/9

def show_temp_table(start, end, step):
    print("=" * 35)
    print(f"{'°C':>6} {'°F':>10} {' | '} {'°F':>6} {'°C':>10}")
    print("-" * 35)
    for c in range(start, end + 1, step):
        f = c_to_f(c)
        print(f"{c:>6} {f:>10.1f} {' | '} {f:>6.0f} {f_to_c(f):>10.1f}")

print(f"36.5°C = {c_to_f(36.5):.1f}°F")
print(f"98.6°F = {f_to_c(98.6):.1f}°C")
show_temp_table(0, 100, 20)`
            }
          ]
        },
        {
          id: "ch4_2",
          name: "📌 พารามิเตอร์",
          lessons: [
            {
              id: "4.3",
              title: "พารามิเตอร์และค่า default",
              goal: "ใช้พารามิเตอร์และกำหนดค่าเริ่มต้นให้พารามิเตอร์",
              problem: `def greet(name, prefix="คุณ", suffix="", excited=False):
    """ทักทายแบบต่างๆ"""
    mark = "!" if excited else ""
    result = f"สวัสดี {prefix}{name}{suffix}{mark}"
    return result

# ทดสอบกรณีต่างๆ
print(greet("สมชาย"))
print(greet("สมหญิง", prefix="คุณ"))
print(greet("สมศักดิ์", prefix="ดร.", suffix=" Ph.D."))
print(greet("สมศรี", excited=True))
print(greet("สมใจ", prefix="คุณ", suffix=" (VIP)", excited=True))

# ฟังก์ชันแบบ *args (รับหลายค่า)
def total(*numbers):
    """รวมตัวเลขทั้งหมดที่ส่งมา"""
    return sum(numbers)

print(f"\nรวม 1+2+3+4 = {total(1, 2, 3, 4)}")
print(f"รวม 10+20+30 = {total(10, 20, 30)}")

# ฟังก์ชันแบบ **kwargs (รับ key-value)
def show_info(**info):
    """แสดงข้อมูลแบบ key-value"""
    for key, value in info.items():
        print(f"  {key}: {value}")

print("\nข้อมูลนักเรียน:")
show_info(name="สมชาย", age=20, grade="A", major="วิศวกรรม")`,
              output: `สวัสดี คุณสมชาย
สวัสดี คุณสมหญิง
สวัสดี ดร.สมศักดิ์ Ph.D.
สวัสดี คุณสมศรี!
สวัสดี คุณสมใจ (VIP)!

รวม 1+2+3+4 = 10
รวม 10+20+30 = 60

ข้อมูลนักเรียน:
  name: สมชาย
  age: 20
  grade: A
  major: วิศวกรรม`,
              solution: `def greet(name, prefix="คุณ", suffix="", excited=False):
    mark = "!" if excited else ""
    result = f"สวัสดี {prefix}{name}{suffix}{mark}"
    return result

print(greet("สมชาย"))
print(greet("สมหญิง", prefix="คุณ"))
print(greet("สมศักดิ์", prefix="ดร.", suffix=" Ph.D."))
print(greet("สมศรี", excited=True))
print(greet("สมใจ", prefix="คุณ", suffix=" (VIP)", excited=True))

def total(*numbers):
    return sum(numbers)

print(f"\nรวม 1+2+3+4 = {total(1, 2, 3, 4)}")
print(f"รวม 10+20+30 = {total(10, 20, 30)}")

def show_info(**info):
    for key, value in info.items():
        print(f"  {key}: {value}")

print("\nข้อมูลนักเรียน:")
show_info(name="สมชาย", age=20, grade="A", major="วิศวกรรม")`
            },
            {
              id: "4.4",
              title: "ฟังก์ชันสั่งอาหาร",
              goal: "ใช้พารามิเตอร์แบบต่างๆ ในการสร้างฟังก์ชันสั่งอาหาร",
              problem: `def order(food, quantity=1, size="M", topping=None, extra=None):
    """ฟังก์ชันสั่งอาหาร"""
    price = {"พิซซ่า": 200, "เบอร์เกอร์": 150, "ซูชิ": 250}
    base_price = price.get(food, 100)
    
    size_prices = {"S": 0.8, "M": 1.0, "L": 1.3, "XL": 1.6}
    size_mult = size_prices.get(size.upper(), 1.0)
    
    total_price = base_price * size_mult * quantity
    
    details = f"{quantity}x {food}"
    if size.upper() in size_prices:
        details += f" (ขนาด{size.upper()})"
    if topping:
        details += f" + {topping}"
    if extra:
        details += f" + {extra}"
    
    return details, total_price

# ทดสอบ
print("=== สั่งอาหาร ===")
orders = [
    order("พิซซ่า"),
    order("เบอร์เกอร์", 2),
    order("ซูชิ", 1, "L"),
    order("พิซซ่า", 1, "XL", "ชีสพิเศษ"),
    order("เบอร์เกอร์", 3, "L", extra="เฟรนช์ฟรายส์")
]

for detail, price in orders:
    print(f"{detail:<25} {price:>8,.2f} บาท")

# สรุปยอด
total_all = sum(price for _, price in orders)
print("-" * 35)
print(f"{'รวมทั้งหมด':<25} {total_all:>8,.2f} บาท")`,
              output: `=== สั่งอาหาร ===
1x พิซซ่า                     200.00 บาท
2x เบอร์เกอร์                 300.00 บาท
1x ซูชิ (ขนาดL)              325.00 บาท
1x พิซซ่า (ขนาดXL) + ชีสพิเศษ 320.00 บาท
3x เบอร์เกอร์ (ขนาดL) + เฟรนช์ฟรายส์ 585.00 บาท
-----------------------------------
รวมทั้งหมด                 1,730.00 บาท`,
              solution: `def order(food, quantity=1, size="M", topping=None, extra=None):
    price = {"พิซซ่า": 200, "เบอร์เกอร์": 150, "ซูชิ": 250}
    base_price = price.get(food, 100)
    
    size_prices = {"S": 0.8, "M": 1.0, "L": 1.3, "XL": 1.6}
    size_mult = size_prices.get(size.upper(), 1.0)
    
    total_price = base_price * size_mult * quantity
    
    details = f"{quantity}x {food}"
    if size.upper() in size_prices:
        details += f" (ขนาด{size.upper()})"
    if topping:
        details += f" + {topping}"
    if extra:
        details += f" + {extra}"
    
    return details, total_price

print("=== สั่งอาหาร ===")
orders = [
    order("พิซซ่า"),
    order("เบอร์เกอร์", 2),
    order("ซูชิ", 1, "L"),
    order("พิซซ่า", 1, "XL", "ชีสพิเศษ"),
    order("เบอร์เกอร์", 3, "L", extra="เฟรนช์ฟรายส์")
]

for detail, price in orders:
    print(f"{detail:<25} {price:>8,.2f} บาท")

total_all = sum(price for _, price in orders)
print("-" * 35)
print(f"{'รวมทั้งหมด':<25} {total_all:>8,.2f} บาท")`
            }
          ]
        },
        {
          id: "ch4_3",
          name: "📌 ขอบเขตตัวแปร",
          lessons: [
            {
              id: "4.5",
              title: "Local vs Global",
              goal: "เข้าใจความแตกต่างของตัวแปรภายในและภายนอกฟังก์ชัน",
              problem: `# ตัวแปร Global
counter = 0
total = 0

def bad_counter():
    """❌ ใช้ global variable (ไม่แนะนำ)"""
    global counter
    counter += 1
    return counter

def good_counter(c):
    """✅ ใช้ parameter และ return (แนะนำ)"""
    return c + 1

def add_to_total(amount):
    """❌ ใช้ global variable"""
    global total
    total += amount
    return total

def good_add(total, amount):
    """✅ ใช้ parameter และ return"""
    return total + amount

# ทดสอบ
print("=== Counter ===")
print(f"bad: {bad_counter()}")  # ใช้ global
print(f"bad: {bad_counter()}")

count = 0
print(f"good: {good_counter(count)}")  # ใช้ parameter
count = good_counter(count)
print(f"good: {count}")

print("\n=== Total ===")
print(f"total (bad): {add_to_total(100)}")
print(f"total (bad): {add_to_total(200)}")

my_total = 0
my_total = good_add(my_total, 100)
print(f"total (good): {my_total}")
my_total = good_add(my_total, 200)
print(f"total (good): {my_total}")`,
              output: `=== Counter ===
bad: 1
bad: 2
good: 1
good: 1

=== Total ===
total (bad): 100
total (bad): 300
total (good): 100
total (good): 300`,
              solution: `counter = 0
total = 0

def bad_counter():
    global counter
    counter += 1
    return counter

def good_counter(c):
    return c + 1

def add_to_total(amount):
    global total
    total += amount
    return total

def good_add(total, amount):
    return total + amount

print("=== Counter ===")
print(f"bad: {bad_counter()}")
print(f"bad: {bad_counter()}")

count = 0
print(f"good: {good_counter(count)}")
count = good_counter(count)
print(f"good: {count}")

print("\n=== Total ===")
print(f"total (bad): {add_to_total(100)}")
print(f"total (bad): {add_to_total(200)}")

my_total = 0
my_total = good_add(my_total, 100)
print(f"total (good): {my_total}")
my_total = good_add(my_total, 200)
print(f"total (good): {my_total}")`
            }
          ]
        }
      ]
    },

    // ==================== เฟส 5 ====================
    {
      id: "phase5",
      name: "📦 เฟส 5 — โครงสร้างข้อมูล",
      chapters: [
        {
          id: "ch5_1",
          name: "📌 List",
          lessons: [
            {
              id: "5.1",
              title: "การจัดการ List",
              goal: "เรียนรู้การเพิ่ม, ลบ, เรียง และเข้าถึงข้อมูลใน List",
              problem: `# สร้างและจัดการ List
scores = [85, 92, 78, 95, 60]

# การเข้าถึง
print(f"คะแนน: {scores}")
print(f"ตัวแรก: {scores[0]}")
print(f"ตัวสุดท้าย: {scores[-1]}")
print(f"3 ตัวแรก: {scores[:3]}")
print(f"3 ตัวหลัง: {scores[-3:]}")

# การเพิ่ม-ลบ
scores.append(88)        # เพิ่มท้าย
print(f"หลัง append: {scores}")
scores.insert(0, 100)    # เพิ่มที่ตำแหน่ง 0
print(f"หลัง insert: {scores}")
scores.pop()              # ลบตัวสุดท้าย
print(f"หลัง pop: {scores}")
scores.remove(95)        # ลบค่า 95
print(f"หลัง remove: {scores}")

# การเรียง
scores.sort()
print(f"เรียงน้อย→มาก: {scores}")
scores.sort(reverse=True)
print(f"เรียงมาก→น้อย: {scores}")

# List comprehension
passed = [s for s in scores if s >= 80]
print(f"ผ่าน (≥80): {passed}")`,
              output: `คะแนน: [85, 92, 78, 95, 60]
ตัวแรก: 85
ตัวสุดท้าย: 60
3 ตัวแรก: [85, 92, 78]
3 ตัวหลัง: [78, 95, 60]
หลัง append: [85, 92, 78, 95, 60, 88]
หลัง insert: [100, 85, 92, 78, 95, 60, 88]
หลัง pop: [100, 85, 92, 78, 95, 60]
หลัง remove: [100, 85, 92, 78, 60]
เรียงน้อย→มาก: [60, 78, 85, 92, 100]
เรียงมาก→น้อย: [100, 92, 85, 78, 60]
ผ่าน (≥80): [100, 92, 85]`,
              solution: `scores = [85, 92, 78, 95, 60]

print(f"คะแนน: {scores}")
print(f"ตัวแรก: {scores[0]}")
print(f"ตัวสุดท้าย: {scores[-1]}")
print(f"3 ตัวแรก: {scores[:3]}")
print(f"3 ตัวหลัง: {scores[-3:]}")

scores.append(88)
print(f"หลัง append: {scores}")
scores.insert(0, 100)
print(f"หลัง insert: {scores}")
scores.pop()
print(f"หลัง pop: {scores}")
scores.remove(95)
print(f"หลัง remove: {scores}")

scores.sort()
print(f"เรียงน้อย→มาก: {scores}")
scores.sort(reverse=True)
print(f"เรียงมาก→น้อย: {scores}")

passed = [s for s in scores if s >= 80]
print(f"ผ่าน (≥80): {passed}")`
            },
            {
              id: "5.2",
              title: "วิเคราะห์คะแนนด้วย List",
              goal: "ใช้ List ในการเก็บและวิเคราะห์ข้อมูล",
              problem: `# รับคะแนน 5 คน
scores = []
for i in range(5):
    score = float(input(f"คะแนนคนที่ {i+1}: "))
    scores.append(score)

# วิเคราะห์ข้อมูล
average = sum(scores) / len(scores)
max_score = max(scores)
min_score = min(scores)

print("\n" + "=" * 40)
print(f"{'คะแนนทั้งหมด':<15} : {scores}")
print(f"{'ค่าเฉลี่ย':<15} : {average:.2f}")
print(f"{'สูงสุด':<15} : {max_score}")
print(f"{'ต่ำสุด':<15} : {min_score}")

# ใครได้高于平均?
print("\n📊 ผู้ที่ได้คะแนนสูงกว่าค่าเฉลี่ย:")
for i, score in enumerate(scores, 1):
    if score > average:
        print(f"  คนที่ {i}: {score:.1f} (+{score - average:.1f})")

# เรียงจากมากไปน้อย
ranked = sorted(scores, reverse=True)
print(f"\n🏆 อันดับ: {ranked}")`,
              output: `คะแนนคนที่ 1: 80
คะแนนคนที่ 2: 90
คะแนนคนที่ 3: 75
คะแนนคนที่ 4: 85
คะแนนคนที่ 5: 95

========================================
คะแนนทั้งหมด      : [80.0, 90.0, 75.0, 85.0, 95.0]
ค่าเฉลี่ย          : 85.00
สูงสุด             : 95.0
ต่ำสุด             : 75.0

📊 ผู้ที่ได้คะแนนสูงกว่าค่าเฉลี่ย:
  คนที่ 2: 90.0 (+5.0)
  คนที่ 4: 85.0 (+0.0)
  คนที่ 5: 95.0 (+10.0)

🏆 อันดับ: [95.0, 90.0, 85.0, 80.0, 75.0]`,
              solution: `scores = []
for i in range(5):
    score = float(input(f"คะแนนคนที่ {i+1}: "))
    scores.append(score)

average = sum(scores) / len(scores)
max_score = max(scores)
min_score = min(scores)

print("\n" + "=" * 40)
print(f"{'คะแนนทั้งหมด':<15} : {scores}")
print(f"{'ค่าเฉลี่ย':<15} : {average:.2f}")
print(f"{'สูงสุด':<15} : {max_score}")
print(f"{'ต่ำสุด':<15} : {min_score}")

print("\n📊 ผู้ที่ได้คะแนนสูงกว่าค่าเฉลี่ย:")
for i, score in enumerate(scores, 1):
    if score > average:
        print(f"  คนที่ {i}: {score:.1f} (+{score - average:.1f})")

ranked = sorted(scores, reverse=True)
print(f"\n🏆 อันดับ: {ranked}")`
            }
          ]
        },
        {
          id: "ch5_2",
          name: "📌 Dictionary",
          lessons: [
            {
              id: "5.3",
              title: "Dictionary พื้นฐาน",
              goal: "ใช้ Dictionary เก็บข้อมูลแบบ key-value",
              problem: `# สร้าง Dictionary
student = {
    "id": "60123456",
    "name": "สมชาย",
    "age": 20,
    "gpa": 3.75,
    "subjects": ["Python", "Database", "Web"]
}

# การเข้าถึง
print(f"ชื่อ: {student['name']}")
print(f"เกรดเฉลี่ย: {student['gpa']}")
print(f"วิชาที่เรียน: {', '.join(student['subjects'])}")

# การเพิ่ม/แก้ไข
student["phone"] = "081-234-5678"  # เพิ่ม
student["gpa"] = 3.80               # แก้ไข
print(f"หลังเพิ่มเบอร์: {student['phone']}")

# ใช้ get() เพื่อป้องกัน KeyError
print(f"ที่อยู่: {student.get('address', 'ไม่มีข้อมูล')}")

# วนลูป Dictionary
print("\n📋 ข้อมูลนักเรียน:")
for key, value in student.items():
    if key == "subjects":
        print(f"  {key}: {', '.join(value)}")
    else:
        print(f"  {key}: {value}")`,
              output: `ชื่อ: สมชาย
เกรดเฉลี่ย: 3.75
วิชาที่เรียน: Python, Database, Web
หลังเพิ่มเบอร์: 081-234-5678
ที่อยู่: ไม่มีข้อมูล

📋 ข้อมูลนักเรียน:
  id: 60123456
  name: สมชาย
  age: 20
  gpa: 3.8
  subjects: Python, Database, Web
  phone: 081-234-5678`,
              solution: `student = {
    "id": "60123456",
    "name": "สมชาย",
    "age": 20,
    "gpa": 3.75,
    "subjects": ["Python", "Database", "Web"]
}

print(f"ชื่อ: {student['name']}")
print(f"เกรดเฉลี่ย: {student['gpa']}")
print(f"วิชาที่เรียน: {', '.join(student['subjects'])}")

student["phone"] = "081-234-5678"
student["gpa"] = 3.80
print(f"หลังเพิ่มเบอร์: {student['phone']}")

print(f"ที่อยู่: {student.get('address', 'ไม่มีข้อมูล')}")

print("\n📋 ข้อมูลนักเรียน:")
for key, value in student.items():
    if key == "subjects":
        print(f"  {key}: {', '.join(value)}")
    else:
        print(f"  {key}: {value}")`
            },
            {
              id: "5.4",
              title: "นับจำนวนคำด้วย Dictionary",
              goal: "ใช้ Dictionary ในการนับความถี่ของคำ",
              problem: `text = "แมว หมา แมว ปลา นก หมา แมว นก นก ปลา"

# แยกคำ
words = text.split()
print(f"คำทั้งหมด: {words}")

# นับความถี่
word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print("\n📊 ความถี่ของคำ:")
for word, count in sorted(word_count.items(), key=lambda x: x[1], reverse=True):
    print(f"  {word}: {count} ครั้ง")

# ใช้ Counter (ถ้ามี)
# from collections import Counter
# print(Counter(words))`,
              output: `คำทั้งหมด: ['แมว', 'หมา', 'แมว', 'ปลา', 'นก', 'หมา', 'แมว', 'นก', 'นก', 'ปลา']

📊 ความถี่ของคำ:
  แมว: 3 ครั้ง
  นก: 3 ครั้ง
  หมา: 2 ครั้ง
  ปลา: 2 ครั้ง`,
              solution: `text = "แมว หมา แมว ปลา นก หมา แมว นก นก ปลา"

words = text.split()
print(f"คำทั้งหมด: {words}")

word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print("\n📊 ความถี่ของคำ:")
for word, count in sorted(word_count.items(), key=lambda x: x[1], reverse=True):
    print(f"  {word}: {count} ครั้ง")`
            }
          ]
        },
        {
          id: "ch5_3",
          name: "📌 Tuple & Set",
          lessons: [
            {
              id: "5.5",
              title: "Tuple และ Set",
              goal: "เข้าใจคุณสมบัติของ Tuple (แก้ไขไม่ได้) และ Set (ไม่ซ้ำ)",
              problem: `# Tuple - ไม่สามารถเปลี่ยนแปลงได้
point = (13.75, 100.50)  # พิกัดกรุงเทพ
lat, lon = point         # Unpacking
print(f"พิกัด: {lat}, {lon}")

# ข้อดีของ Tuple
colors = ("แดง", "เขียว", "น้ำเงิน")
print(f"สี: {colors}")
# colors[0] = "เหลือง"  # ❌ Error! Tuple ไม่สามารถแก้ไขได้

# Set - ไม่มีค่าซ้ำ
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = set(numbers)
print(f"จำนวนไม่ซ้ำ: {len(unique)} -> {unique}")

# การดำเนินการกับ Set
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

print(f"A: {a}")
print(f"B: {b}")
print(f"ร่วม (∩): {a & b}")      # intersection
print(f"รวม (∪): {a | b}")      # union
print(f"ต่าง (A-B): {a - b}")    # difference
print(f"ต่าง (B-A): {b - a}")

# หาคนที่ลงทะเบียนทั้งสองวิชา
python_students = {"สมชาย", "สมหญิง", "สมศักดิ์"}
java_students = {"สมหญิง", "สมศรี", "สมศักดิ์"}

both = python_students & java_students
print(f"\nเรียนทั้ง Python และ Java: {both}")`,
              output: `พิกัด: 13.75, 100.5
สี: ('แดง', 'เขียว', 'น้ำเงิน')
จำนวนไม่ซ้ำ: 4 -> {1, 2, 3, 4}
A: {1, 2, 3, 4, 5}
B: {4, 5, 6, 7, 8}
ร่วม (∩): {4, 5}
รวม (∪): {1, 2, 3, 4, 5, 6, 7, 8}
ต่าง (A-B): {1, 2, 3}
ต่าง (B-A): {8, 6, 7}

เรียนทั้ง Python และ Java: {'สมหญิง', 'สมศักดิ์'}`,
              solution: `point = (13.75, 100.50)
lat, lon = point
print(f"พิกัด: {lat}, {lon}")

colors = ("แดง", "เขียว", "น้ำเงิน")
print(f"สี: {colors}")

numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = set(numbers)
print(f"จำนวนไม่ซ้ำ: {len(unique)} -> {unique}")

a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

print(f"A: {a}")
print(f"B: {b}")
print(f"ร่วม (∩): {a & b}")
print(f"รวม (∪): {a | b}")
print(f"ต่าง (A-B): {a - b}")
print(f"ต่าง (B-A): {b - a}")

python_students = {"สมชาย", "สมหญิง", "สมศักดิ์"}
java_students = {"สมหญิง", "สมศรี", "สมศักดิ์"}

both = python_students & java_students
print(f"\nเรียนทั้ง Python และ Java: {both}")`
            }
          ]
        }
      ]
    },

    // ==================== เฟส 6 ====================
    {
      id: "phase6",
      name: "🛠 เฟส 6 — งานจริง (Error, File, Module)",
      chapters: [
        {
          id: "ch6_1",
          name: "📌 การจัดการข้อผิดพลาด",
          lessons: [
            {
              id: "6.1",
              title: "try / except",
              goal: "ใช้ try-except เพื่อจัดการข้อผิดพลาด",
              problem: `def safe_divide(a, b):
    """หารแบบปลอดภัย"""
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return None
    except TypeError:
        return None

# ทดสอบ
print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # None
print(safe_divide("10", 2))  # None

# รับข้อมูลและจัดการข้อผิดพลาด
def get_valid_number(prompt):
    while True:
        try:
            num = float(input(prompt))
            return num
        except ValueError:
            print("❌ กรุณาใส่ตัวเลขให้ถูกต้อง")

print("\n=== เครื่องคิดเลข ===")
a = get_valid_number("ใส่ตัวเลขที่ 1: ")
b = get_valid_number("ใส่ตัวเลขที่ 2: ")

try:
    result = a / b
    print(f"{a} ÷ {b} = {result:.2f}")
except ZeroDivisionError:
    print("❌ ไม่สามารถหารด้วย 0 ได้")
except Exception as e:
    print(f"❌ เกิดข้อผิดพลาด: {e}")
finally:
    print("✅ จบการทำงาน")`,
              output: `5.0
None
None

=== เครื่องคิดเลข ===
ใส่ตัวเลขที่ 1: 10
ใส่ตัวเลขที่ 2: 0
❌ ไม่สามารถหารด้วย 0 ได้
✅ จบการทำงาน`,
              solution: `def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return None
    except TypeError:
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide("10", 2))

def get_valid_number(prompt):
    while True:
        try:
            num = float(input(prompt))
            return num
        except ValueError:
            print("❌ กรุณาใส่ตัวเลขให้ถูกต้อง")

print("\n=== เครื่องคิดเลข ===")
a = get_valid_number("ใส่ตัวเลขที่ 1: ")
b = get_valid_number("ใส่ตัวเลขที่ 2: ")

try:
    result = a / b
    print(f"{a} ÷ {b} = {result:.2f}")
except ZeroDivisionError:
    print("❌ ไม่สามารถหารด้วย 0 ได้")
except Exception as e:
    print(f"❌ เกิดข้อผิดพลาด: {e}")
finally:
    print("✅ จบการทำงาน")`
            },
            {
              id: "6.2",
              title: "raise และ自定义 Exception",
              goal: "ใช้ raise เพื่อสร้างข้อผิดพลาดเอง",
              problem: `class NegativeAgeError(Exception):
    """อายุติดลบ"""
    pass

def set_age(age):
    if age < 0:
        raise NegativeAgeError("อายุต้องไม่น้อยกว่า 0")
    if age > 150:
        raise ValueError("อายุไม่เกิน 150 ปี")
    return age

# ทดสอบ
while True:
    try:
        age_str = input("ใส่อายุ: ")
        if not age_str:
            break
        
        age = int(age_str)
        valid_age = set_age(age)
        print(f"✅ อายุ {valid_age} ปี ถูกต้อง")
        break
        
    except NegativeAgeError as e:
        print(f"❌ {e}")
    except ValueError as e:
        print(f"❌ ข้อมูลไม่ถูกต้อง: {e}")
    except KeyboardInterrupt:
        print("\n👋 บาย!")
        break

# ตรวจสอบรหัสผ่าน
def validate_password(password):
    if len(password) < 8:
        raise ValueError("รหัสผ่านต้องยาวอย่างน้อย 8 ตัว")
    if not any(c.isdigit() for c in password):
        raise ValueError("ต้องมีตัวเลขอย่างน้อย 1 ตัว")
    if not any(c.isupper() for c in password):
        raise ValueError("ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
    return True

try:
    pwd = input("ตั้งรหัสผ่าน: ")
    if validate_password(pwd):
        print("✅ รหัสผ่านปลอดภัย")
except ValueError as e:
    print(f"❌ {e}")`,
              output: `ใส่อายุ: -5
❌ อายุต้องไม่น้อยกว่า 0
ใส่อายุ: 25
✅ อายุ 25 ปี ถูกต้อง
ตั้งรหัสผ่าน: abc123
❌ ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว`,
              solution: `class NegativeAgeError(Exception):
    pass

def set_age(age):
    if age < 0:
        raise NegativeAgeError("อายุต้องไม่น้อยกว่า 0")
    if age > 150:
        raise ValueError("อายุไม่เกิน 150 ปี")
    return age

while True:
    try:
        age_str = input("ใส่อายุ: ")
        if not age_str:
            break
        
        age = int(age_str)
        valid_age = set_age(age)
        print(f"✅ อายุ {valid_age} ปี ถูกต้อง")
        break
        
    except NegativeAgeError as e:
        print(f"❌ {e}")
    except ValueError as e:
        print(f"❌ ข้อมูลไม่ถูกต้อง: {e}")
    except KeyboardInterrupt:
        print("\n👋 บาย!")
        break

def validate_password(password):
    if len(password) < 8:
        raise ValueError("รหัสผ่านต้องยาวอย่างน้อย 8 ตัว")
    if not any(c.isdigit() for c in password):
        raise ValueError("ต้องมีตัวเลขอย่างน้อย 1 ตัว")
    if not any(c.isupper() for c in password):
        raise ValueError("ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
    return True

try:
    pwd = input("ตั้งรหัสผ่าน: ")
    if validate_password(pwd):
        print("✅ รหัสผ่านปลอดภัย")
except ValueError as e:
    print(f"❌ {e}")`
            }
          ]
        },
        {
          id: "ch6_2",
          name: "📌 การอ่าน-เขียนไฟล์",
          lessons: [
            {
              id: "6.3",
              title: "อ่านและเขียนไฟล์ข้อความ",
              goal: "ใช้ with open() ในการจัดการไฟล์",
              problem: `import json
from datetime import datetime

# เขียนไฟล์ข้อความ
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("สมชาย,25,วิศวกรรม\\n")
    f.write("สมหญิง,22,บริหาร\\n")
    f.write("สมศักดิ์,28,วิทยาศาสตร์\\n")

# อ่านไฟล์ข้อความ
print("=== อ่านข้อมูลจากไฟล์ ===")
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        name, age, major = line.strip().split(",")
        print(f"ชื่อ: {name} อายุ: {age} สาขา: {major}")

# เขียนไฟล์ JSON
students = [
    {"name": "สมชาย", "age": 25, "major": "วิศวกรรม"},
    {"name": "สมหญิง", "age": 22, "major": "บริหาร"},
    {"name": "สมศักดิ์", "age": 28, "major": "วิทยาศาสตร์"}
]

with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students, f, ensure_ascii=False, indent=2)

# อ่านไฟล์ JSON
print("\n=== อ่าน JSON ===")
with open("students.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    for s in data:
        print(f"{s['name']} ({s['age']} ปี) - {s['major']}")`,
              output: `=== อ่านข้อมูลจากไฟล์ ===
ชื่อ: สมชาย อายุ: 25 สาขา: วิศวกรรม
ชื่อ: สมหญิง อายุ: 22 สาขา: บริหาร
ชื่อ: สมศักดิ์ อายุ: 28 สาขา: วิทยาศาสตร์

=== อ่าน JSON ===
สมชาย (25 ปี) - วิศวกรรม
สมหญิง (22 ปี) - บริหาร
สมศักดิ์ (28 ปี) - วิทยาศาสตร์`,
              solution: `import json

with open("data.txt", "w", encoding="utf-8") as f:
    f.write("สมชาย,25,วิศวกรรม\\n")
    f.write("สมหญิง,22,บริหาร\\n")
    f.write("สมศักดิ์,28,วิทยาศาสตร์\\n")

print("=== อ่านข้อมูลจากไฟล์ ===")
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        name, age, major = line.strip().split(",")
        print(f"ชื่อ: {name} อายุ: {age} สาขา: {major}")

students = [
    {"name": "สมชาย", "age": 25, "major": "วิศวกรรม"},
    {"name": "สมหญิง", "age": 22, "major": "บริหาร"},
    {"name": "สมศักดิ์", "age": 28, "major": "วิทยาศาสตร์"}
]

with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students, f, ensure_ascii=False, indent=2)

print("\n=== อ่าน JSON ===")
with open("students.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    for s in data:
        print(f"{s['name']} ({s['age']} ปี) - {s['major']}")`
            },
            {
              id: "6.4",
              title: "ระบบบันทึกรายรับ-รายจ่าย",
              goal: "สร้างโปรแกรมบันทึกและสรุปข้อมูลไฟล์ CSV",
              problem: `import csv
from datetime import datetime

def add_transaction(category, amount, note=""):
    """เพิ่มรายการใหม่"""
    with open("transactions.csv", "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M"),
            category,
            amount,
            note
        ])

def show_summary():
    """แสดงสรุป"""
    try:
        with open("transactions.csv", "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            total_income = 0
            total_expense = 0
            
            for row in reader:
                _, category, amount, _ = row
                amt = float(amount)
                if category == "รายรับ":
                    total_income += amt
                elif category == "รายจ่าย":
                    total_expense += amt
            
            print("=" * 40)
            print(f"{'รายรับรวม':<15} : {total_income:>15,.2f} บาท")
            print(f"{'รายจ่ายรวม':<15} : {total_expense:>15,.2f} บาท")
            print("-" * 40)
            print(f"{'คงเหลือ':<15} : {total_income - total_expense:>15,.2f} บาท")
    except FileNotFoundError:
        print("❌ ยังไม่มีข้อมูล")

# ทดสอบ
add_transaction("รายรับ", 30000, "เงินเดือน")
add_transaction("รายจ่าย", 5000, "ค่าอาหาร")
add_transaction("รายจ่าย", 2000, "ค่าน้ำมัน")
show_summary()`,
              output: `========================================
รายรับรวม         :       30,000.00 บาท
รายจ่ายรวม        :        7,000.00 บาท
----------------------------------------
คงเหลือ           :       23,000.00 บาท`,
              solution: `import csv
from datetime import datetime

def add_transaction(category, amount, note=""):
    with open("transactions.csv", "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M"),
            category,
            amount,
            note
        ])

def show_summary():
    try:
        with open("transactions.csv", "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            total_income = 0
            total_expense = 0
            
            for row in reader:
                _, category, amount, _ = row
                amt = float(amount)
                if category == "รายรับ":
                    total_income += amt
                elif category == "รายจ่าย":
                    total_expense += amt
            
            print("=" * 40)
            print(f"{'รายรับรวม':<15} : {total_income:>15,.2f} บาท")
            print(f"{'รายจ่ายรวม':<15} : {total_expense:>15,.2f} บาท")
            print("-" * 40)
            print(f"{'คงเหลือ':<15} : {total_income - total_expense:>15,.2f} บาท")
    except FileNotFoundError:
        print("❌ ยังไม่มีข้อมูล")

add_transaction("รายรับ", 30000, "เงินเดือน")
add_transaction("รายจ่าย", 5000, "ค่าอาหาร")
add_transaction("รายจ่าย", 2000, "ค่าน้ำมัน")
show_summary()`
            }
          ]
        },
        {
          id: "ch6_3",
          name: "📌 โมดูล",
          lessons: [
            {
              id: "6.5",
              title: "การสร้างและใช้งานโมดูล",
              goal: "เรียนรู้การแยกโค้ดเป็นโมดูลและนำมาใช้",
              problem: `# ===== mymath.py (โมดูล) =====
# def circle_area(r):
#     return 3.14159 * r ** 2
# 
# def rectangle_area(w, h):
#     return w * h
# 
# def triangle_area(b, h):
#     return 0.5 * b * h
# 
# def square_area(s):
#     return s ** 2
# 
# if __name__ == "__main__":
#     # ทดสอบฟังก์ชัน
#     print("วงกลม r=5:", circle_area(5))
#     print("สี่เหลี่ยม 4x6:", rectangle_area(4, 6))

# ===== main.py (ไฟล์หลัก) =====
# ใช้โมดูล mymath
import mymath as math

print("=== คำนวณพื้นที่ ===")
print(f"วงกลม r=7: {math.circle_area(7):.2f}")
print(f"สี่เหลี่ยม 5×8: {math.rectangle_area(5, 8)}")
print(f"สามเหลี่ยม ฐาน4 สูง6: {math.triangle_area(4, 6)}")
print(f"สี่เหลี่ยมจัตุรัส ขนาด5: {math.square_area(5)}")

# การ import แบบอื่น
from mymath import circle_area, rectangle_area
print(f"\nนำเข้าส่วนที่ต้องการ: {circle_area(3):.2f}")

# ใช้โมดูลมาตรฐาน
import random
import datetime
import os

print(f"\\nเลขสุ่ม 1-100: {random.randint(1, 100)}")
print(f"วันที่ปัจจุบัน: {datetime.date.today()}")
print(f"ระบบปฏิบัติการ: {os.name}")`,
              output: `=== คำนวณพื้นที่ ===
วงกลม r=7: 153.94
สี่เหลี่ยม 5×8: 40
สามเหลี่ยม ฐาน4 สูง6: 12.0
สี่เหลี่ยมจัตุรัส ขนาด5: 25

นำเข้าส่วนที่ต้องการ: 28.27

เลขสุ่ม 1-100: 42
วันที่ปัจจุบัน: 2026-09-03
ระบบปฏิบัติการ: posix`,
              solution: `# ตัวอย่างการใช้งานโมดูล
print("=== การสร้างโมดูล mymath.py ===")
print('''
# mymath.py
def circle_area(r):
    return 3.14159 * r ** 2

def rectangle_area(w, h):
    return w * h

def triangle_area(b, h):
    return 0.5 * b * h

def square_area(s):
    return s ** 2

if __name__ == "__main__":
    print("วงกลม r=5:", circle_area(5))
    print("สี่เหลี่ยม 4x6:", rectangle_area(4, 6))
''')

print("\n=== การใช้งานโมดูล ===")
print('''
# main.py
import mymath as math
from mymath import circle_area, rectangle_area
import random, datetime, os

print(f"วงกลม r=7: {math.circle_area(7):.2f}")
print(f"สี่เหลี่ยม 5×8: {math.rectangle_area(5, 8)}")
print(f"สี่เหลี่ยมจัตุรัส: {math.square_area(5)}")
print(f"เลขสุ่ม: {random.randint(1, 100)}")
print(f"วันที่: {datetime.date.today()}")
''')`
            }
          ]
        }
      ]
    },

    // ==================== เฟส 7 ====================
    {
      id: "phase7",
      name: "🏆 เฟส 7 — OOP & โปรเจกต์รวม",
      chapters: [
        {
          id: "ch7_1",
          name: "📌 Class และ Object",
          lessons: [
            {
              id: "7.1",
              title: "สร้าง Class พื้นฐาน",
              goal: "เรียนรู้การสร้าง Class และ Object ใน Python",
              problem: `class Student:
    """คลาสแทนนักเรียน"""
    
    # Class variable (shared by all instances)
    school = "โรงเรียนวิศวกรรมศาสตร์"
    
    def __init__(self, name, age, grade):
        """Constructor - เรียกเมื่อสร้าง object"""
        self.name = name
        self.age = age
        self.grade = grade
        self.score = 0
    
    def add_score(self, points):
        """เพิ่มคะแนน"""
        self.score += points
        return self.score
    
    def get_status(self):
        """บอกสถานะ"""
        if self.score >= 80:
            return "เก่งมาก"
        elif self.score >= 60:
            return "ดี"
        elif self.score >= 40:
            return "พอใช้"
        else:
            return "ต้องปรับปรุง"
    
    def __str__(self):
        """กำหนดการแสดงผลเมื่อ print"""
        return f"{self.name} ({self.age} ปี) - เกรด {self.grade} คะแนน {self.score}"

# สร้าง object
s1 = Student("สมชาย", 20, "A")
s2 = Student("สมหญิง", 19, "B")

# ใช้งาน
s1.add_score(85)
s2.add_score(45)

print(s1)
print(s2)

print(f"{s1.name} สถานะ: {s1.get_status()}")
print(f"{s2.name} สถานะ: {s2.get_status()}")
print(f"โรงเรียน: {Student.school}")`,
              output: `สมชาย (20 ปี) - เกรด A คะแนน 85
สมหญิง (19 ปี) - เกรด B คะแนน 45
สมชาย สถานะ: เก่งมาก
สมหญิง สถานะ: พอใช้
โรงเรียน: โรงเรียนวิศวกรรมศาสตร์`,
              solution: `class Student:
    school = "โรงเรียนวิศวกรรมศาสตร์"
    
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade
        self.score = 0
    
    def add_score(self, points):
        self.score += points
        return self.score
    
    def get_status(self):
        if self.score >= 80:
            return "เก่งมาก"
        elif self.score >= 60:
            return "ดี"
        elif self.score >= 40:
            return "พอใช้"
        else:
            return "ต้องปรับปรุง"
    
    def __str__(self):
        return f"{self.name} ({self.age} ปี) - เกรด {self.grade} คะแนน {self.score}"

s1 = Student("สมชาย", 20, "A")
s2 = Student("สมหญิง", 19, "B")

s1.add_score(85)
s2.add_score(45)

print(s1)
print(s2)
print(f"{s1.name} สถานะ: {s1.get_status()}")
print(f"{s2.name} สถานะ: {s2.get_status()}")
print(f"โรงเรียน: {Student.school}")`
            },
            {
              id: "7.2",
              title: "BankAccount Class",
              goal: "สร้างระบบบัญชีธนาคารแบบ OOP",
              problem: `class BankAccount:
    """บัญชีธนาคาร"""
    
    def __init__(self, account_number, holder_name, initial_balance=0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = initial_balance
        self.transactions = []
        self._add_transaction("เปิดบัญชี", initial_balance)
    
    def _add_transaction(self, type, amount):
        """บันทึกธุรกรรม"""
        self.transactions.append({
            "type": type,
            "amount": amount,
            "balance": self.balance
        })
    
    def deposit(self, amount):
        """ฝากเงิน"""
        if amount <= 0:
            raise ValueError("จำนวนเงินต้องมากกว่า 0")
        self.balance += amount
        self._add_transaction("ฝาก", amount)
        return self.balance
    
    def withdraw(self, amount):
        """ถอนเงิน"""
        if amount <= 0:
            raise ValueError("จำนวนเงินต้องมากกว่า 0")
        if amount > self.balance:
            raise ValueError("ยอดเงินไม่พอ")
        self.balance -= amount
        self._add_transaction("ถอน", amount)
        return self.balance
    
    def get_balance(self):
        """ดูยอดเงิน"""
        return self.balance
    
    def show_transactions(self):
        """แสดงประวัติ"""
        print(f"=== ประวัติบัญชี {self.account_number} ===")
        for t in self.transactions:
            print(f"{t['type']:>8} {t['amount']:>10,.2f}  |  คงเหลือ: {t['balance']:>12,.2f}")
        print("-" * 40)
        print(f"ยอดคงเหลือ: {self.balance:>30,.2f}")

# ทดสอบ
acc = BankAccount("123-456", "สมชาย", 1000)
acc.deposit(5000)
acc.withdraw(2000)
acc.withdraw(1000)
acc.show_transactions()`,
              output: `=== ประวัติบัญชี 123-456 ===
   เปิดบัญชี    1,000.00  |  คงเหลือ:     1,000.00
      ฝาก      5,000.00  |  คงเหลือ:     6,000.00
      ถอน      2,000.00  |  คงเหลือ:     4,000.00
      ถอน      1,000.00  |  คงเหลือ:     3,000.00
----------------------------------------
ยอดคงเหลือ:                        3,000.00`,
              solution: `class BankAccount:
    def __init__(self, account_number, holder_name, initial_balance=0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = initial_balance
        self.transactions = []
        self._add_transaction("เปิดบัญชี", initial_balance)
    
    def _add_transaction(self, type, amount):
        self.transactions.append({
            "type": type,
            "amount": amount,
            "balance": self.balance
        })
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("จำนวนเงินต้องมากกว่า 0")
        self.balance += amount
        self._add_transaction("ฝาก", amount)
        return self.balance
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("จำนวนเงินต้องมากกว่า 0")
        if amount > self.balance:
            raise ValueError("ยอดเงินไม่พอ")
        self.balance -= amount
        self._add_transaction("ถอน", amount)
        return self.balance
    
    def get_balance(self):
        return self.balance
    
    def show_transactions(self):
        print(f"=== ประวัติบัญชี {self.account_number} ===")
        for t in self.transactions:
            print(f"{t['type']:>8} {t['amount']:>10,.2f}  |  คงเหลือ: {t['balance']:>12,.2f}")
        print("-" * 40)
        print(f"ยอดคงเหลือ: {self.balance:>30,.2f}")

acc = BankAccount("123-456", "สมชาย", 1000)
acc.deposit(5000)
acc.withdraw(2000)
acc.withdraw(1000)
acc.show_transactions()`
            }
          ]
        },
        {
          id: "ch7_2",
          name: "📌 การสืบทอด (Inheritance)",
          lessons: [
            {
              id: "7.3",
              title: "Inheritance และ Polymorphism",
              goal: "ใช้การสืบทอดเพื่อสร้างคลาสลูกและ override เมธอด",
              problem: `class Employee:
    """คลาสพื้นฐานสำหรับพนักงาน"""
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def get_net_salary(self):
        """คำนวณเงินเดือนสุทธิ"""
        insurance = min(self.salary * 0.05, 750)
        return self.salary - insurance
    
    def __str__(self):
        return f"{self.name}: {self.get_net_salary():,.2f} บาท"

class Manager(Employee):
    """คลาสผู้จัดการ - สืบทอดจาก Employee"""
    def __init__(self, name, salary, bonus=0):
        super().__init__(name, salary)  # เรียก constructor ของแม่
        self.bonus = bonus
    
    def get_net_salary(self):
        """Override - คำนวณรวมโบนัส"""
        return super().get_net_salary() + self.bonus

class Developer(Employee):
    """คลาสนักพัฒนา"""
    def __init__(self, name, salary, skills=None):
        super().__init__(name, salary)
        self.skills = skills or []
    
    def add_skill(self, skill):
        self.skills.append(skill)
    
    def __str__(self):
        skills_str = ", ".join(self.skills) if self.skills else "ไม่มี"
        return f"{super().__str__()} | ทักษะ: {skills_str}"

# ทดสอบ
employees = [
    Employee("สมชาย", 20000),
    Manager("สมหญิง", 45000, 10000),
    Developer("สมศักดิ์", 35000, ["Python", "SQL"]),
    Developer("สมศรี", 32000)
]

print("=== เงินเดือนพนักงาน ===")
for emp in employees:
    print(emp)

# Polymorphism - เรียกเมธอดเดียวกันได้ทุกตัว
print("\n=== เงินเดือนสุทธิ (แบบ polymorphism) ===")
for emp in employees:
    print(f"{emp.name}: {emp.get_net_salary():,.2f} บาท")`,
              output: `=== เงินเดือนพนักงาน ===
สมชาย: 19,250.00 บาท
สมหญิง: 52,750.00 บาท
สมศักดิ์: 33,250.00 บาท | ทักษะ: Python, SQL
สมศรี: 30,400.00 บาท | ทักษะ: ไม่มี

=== เงินเดือนสุทธิ (แบบ polymorphism) ===
สมชาย: 19,250.00 บาท
สมหญิง: 52,750.00 บาท
สมศักดิ์: 33,250.00 บาท
สมศรี: 30,400.00 บาท`,
              solution: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def get_net_salary(self):
        insurance = min(self.salary * 0.05, 750)
        return self.salary - insurance
    
    def __str__(self):
        return f"{self.name}: {self.get_net_salary():,.2f} บาท"

class Manager(Employee):
    def __init__(self, name, salary, bonus=0):
        super().__init__(name, salary)
        self.bonus = bonus
    
    def get_net_salary(self):
        return super().get_net_salary() + self.bonus

class Developer(Employee):
    def __init__(self, name, salary, skills=None):
        super().__init__(name, salary)
        self.skills = skills or []
    
    def add_skill(self, skill):
        self.skills.append(skill)
    
    def __str__(self):
        skills_str = ", ".join(self.skills) if self.skills else "ไม่มี"
        return f"{super().__str__()} | ทักษะ: {skills_str}"

employees = [
    Employee("สมชาย", 20000),
    Manager("สมหญิง", 45000, 10000),
    Developer("สมศักดิ์", 35000, ["Python", "SQL"]),
    Developer("สมศรี", 32000)
]

print("=== เงินเดือนพนักงาน ===")
for emp in employees:
    print(emp)

print("\n=== เงินเดือนสุทธิ (แบบ polymorphism) ===")
for emp in employees:
    print(f"{emp.name}: {emp.get_net_salary():,.2f} บาท")`
            }
          ]
        },
        {
          id: "ch7_3",
          name: "📌 โปรเจกต์รวม — ระบบจัดการร้านค้า",
          lessons: [
            {
              id: "7.4",
              title: "Shop Management System",
              goal: "โปรเจกต์รวมทุกสิ่งที่เรียนมาในคอร์ส",
              problem: `import json
from datetime import datetime

class Product:
    """คลาสสินค้า"""
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    
    def total_value(self):
        return self.price * self.quantity
    
    def __str__(self):
        return f"{self.name}: {self.price:,.2f} × {self.quantity} = {self.total_value():,.2f}"

class Shop:
    """ระบบจัดการร้านค้า"""
    def __init__(self, file="shop_data.json"):
        self.file = file
        self.products = {}
        self.sales = []
        self.load()
    
    def load(self):
        """โหลดข้อมูลจากไฟล์"""
        try:
            with open(self.file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.products = {k: Product(k, v["price"], v["quantity"]) 
                                for k, v in data.get("products", {}).items()}
                self.sales = data.get("sales", [])
        except FileNotFoundError:
            pass
    
    def save(self):
        """บันทึกข้อมูลลงไฟล์"""
        data = {
            "products": {name: {"price": p.price, "quantity": p.quantity} 
                        for name, p in self.products.items()},
            "sales": self.sales
        }
        with open(self.file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def add_product(self, name, price, quantity):
        """เพิ่มสินค้า"""
        if name in self.products:
            self.products[name].quantity += quantity
        else:
            self.products[name] = Product(name, price, quantity)
        self.save()
    
    def sell(self, name, quantity=1):
        """ขายสินค้า"""
        if name not in self.products:
            raise ValueError(f"ไม่พบสินค้า {name}")
        
        product = self.products[name]
        if product.quantity < quantity:
            raise ValueError(f"สินค้า {name} คงเหลือ {product.quantity} ชิ้น")
        
        product.quantity -= quantity
        total = product.price * quantity
        
        # บันทึกการขาย
        self.sales.append({
            "product": name,
            "quantity": quantity,
            "total": total,
            "time": datetime.now().strftime("%Y-%m-%d %H:%M")
        })
        
        # ลบสินค้าที่หมด
        if product.quantity == 0:
            del self.products[name]
        
        self.save()
        return total
    
    def get_report(self):
        """แสดงรายงาน"""
        print("=" * 50)
        print(f"{'สินค้า':<20} {'ราคา':>10} {'คงเหลือ':>10} {'มูลค่า':>12}")
        print("-" * 50)
        
        total_value = 0
        low_stock = []
        
        for name, p in self.products.items():
            value = p.total_value()
            total_value += value
            print(f"{name:<20} {p.price:>10,.2f} {p.quantity:>10} {value:>12,.2f}")
            if p.quantity < 5:
                low_stock.append(name)
        
        print("-" * 50)
        print(f"{'รวมมูลค่าสินค้า':<20} {total_value:>32,.2f}")
        print("=" * 50)
        
        if low_stock:
            print(f"⚠️ สินค้าใกล้หมด ({len(low_stock)} รายการ): {', '.join(low_stock)}")
        
        # สรุปยอดขาย
        total_sales = sum(s["total"] for s in self.sales)
        total_items = sum(s["quantity"] for s in self.sales)
        print(f"📊 ยอดขายรวม: {total_sales:,.2f} บาท ({total_items} ชิ้น)")

# ทดสอบ
shop = Shop()
shop.add_product("กาแฟ", 45, 30)
shop.add_product("ขนมปัง", 25, 3)  # ใกล้หมด
shop.add_product("น้ำผลไม้", 35, 15)

shop.sell("กาแฟ", 2)
shop.sell("ขนมปัง", 1)

shop.get_report()`,
              output: `==================================================
สินค้า                        ราคา   คงเหลือ        มูลค่า
--------------------------------------------------
กาแฟ                       45.00         28     1,260.00
ขนมปัง                     25.00          2        50.00
น้ำผลไม้                   35.00         15       525.00
--------------------------------------------------
รวมมูลค่าสินค้า                           1,835.00
==================================================
⚠️ สินค้าใกล้หมด (1 รายการ): ขนมปัง
📊 ยอดขายรวม: 115.00 บาท (3 ชิ้น)`,
              solution: `import json
from datetime import datetime

class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    
    def total_value(self):
        return self.price * self.quantity
    
    def __str__(self):
        return f"{self.name}: {self.price:,.2f} × {self.quantity} = {self.total_value():,.2f}"

class Shop:
    def __init__(self, file="shop_data.json"):
        self.file = file
        self.products = {}
        self.sales = []
        self.load()
    
    def load(self):
        try:
            with open(self.file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.products = {k: Product(k, v["price"], v["quantity"]) 
                                for k, v in data.get("products", {}).items()}
                self.sales = data.get("sales", [])
        except FileNotFoundError:
            pass
    
    def save(self):
        data = {
            "products": {name: {"price": p.price, "quantity": p.quantity} 
                        for name, p in self.products.items()},
            "sales": self.sales
        }
        with open(self.file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def add_product(self, name, price, quantity):
        if name in self.products:
            self.products[name].quantity += quantity
        else:
            self.products[name] = Product(name, price, quantity)
        self.save()
    
    def sell(self, name, quantity=1):
        if name not in self.products:
            raise ValueError(f"ไม่พบสินค้า {name}")
        
        product = self.products[name]
        if product.quantity < quantity:
            raise ValueError(f"สินค้า {name} คงเหลือ {product.quantity} ชิ้น")
        
        product.quantity -= quantity
        total = product.price * quantity
        
        self.sales.append({
            "product": name,
            "quantity": quantity,
            "total": total,
            "time": datetime.now().strftime("%Y-%m-%d %H:%M")
        })
        
        if product.quantity == 0:
            del self.products[name]
        
        self.save()
        return total
    
    def get_report(self):
        print("=" * 50)
        print(f"{'สินค้า':<20} {'ราคา':>10} {'คงเหลือ':>10} {'มูลค่า':>12}")
        print("-" * 50)
        
        total_value = 0
        low_stock = []
        
        for name, p in self.products.items():
            value = p.total_value()
            total_value += value
            print(f"{name:<20} {p.price:>10,.2f} {p.quantity:>10} {value:>12,.2f}")
            if p.quantity < 5:
                low_stock.append(name)
        
        print("-" * 50)
        print(f"{'รวมมูลค่าสินค้า':<20} {total_value:>32,.2f}")
        print("=" * 50)
        
        if low_stock:
            print(f"⚠️ สินค้าใกล้หมด ({len(low_stock)} รายการ): {', '.join(low_stock)}")
        
        total_sales = sum(s["total"] for s in self.sales)
        total_items = sum(s["quantity"] for s in self.sales)
        print(f"📊 ยอดขายรวม: {total_sales:,.2f} บาท ({total_items} ชิ้น)")

shop = Shop()
shop.add_product("กาแฟ", 45, 30)
shop.add_product("ขนมปัง", 25, 3)
shop.add_product("น้ำผลไม้", 35, 15)

shop.sell("กาแฟ", 2)
shop.sell("ขนมปัง", 1)

shop.get_report()`
            }
          ]
        }
      ]
    }
  ]
};