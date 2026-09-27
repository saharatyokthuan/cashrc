name = "สมชาย"
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
print(f"{name:<10} {salary:>15,.2f}")