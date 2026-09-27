# รับเงินเดือน
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
print(f"{'เงินสุทธิ':<15} : {net_salary:>15,.2f} บาท")