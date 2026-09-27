# รับอุณหภูมิ Celsius
celsius = float(input("ใส่อุณหภูมิ (°C): "))

# แปลงเป็น Fahrenheit
fahrenheit = (celsius * 9/5) + 32

# แสดงผลแบบสวยงาม
print(f"{celsius:.1f}°C = {fahrenheit:.1f}°F")

# แสดงตารางเปรียบเทียบ
print("\n--- ตารางเปรียบเทียบ ---")
for c in range(0, 101, 20):
    f = (c * 9/5) + 32
    print(f"{c:>3}°C = {f:>6.1f}°F")