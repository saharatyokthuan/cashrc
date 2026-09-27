# รับข้อมูลจากผู้ใช้ (ได้ str เสมอ)
num1 = input("ใส่ตัวเลขที่ 1: ")
num2 = input("ใส่ตัวเลขที่ 2: ")

# แปลงเป็น int แล้วบวกกัน
result = int(num1) + int(num2)
print(f"{num1} + {num2} = {result}")

# แปลงตัวเลขเป็นข้อความ
price = 99.99
print("ราคา: " + str(price) + " บาท")