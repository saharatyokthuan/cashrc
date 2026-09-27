#!/usr/bin/env python3
"""
check_progress.py — ตรวจสอบความคืบหน้าของผู้เรียน Python
อ่านข้อมูลจาก data.js โดยตรงด้วย parser แบบปลอดภัย
"""

import json
import re
import os
import sys
from pathlib import Path
from typing import Dict, Set, List, Tuple, Any, Optional, Union


# ============================================================
# 1. ค้นหาไฟล์ data.js อัตโนมัติ
# ============================================================

def find_project_root() -> Path:
    """ค้นหา root ของโปรเจค (ที่มี index.html หรือ js/data.js)"""
    current = Path.cwd()
    
    # ตรวจสอบตำแหน่งปัจจุบัน
    if (current / "js" / "data.js").exists():
        return current
    
    # ตรวจสอบ parent
    for parent in current.parents:
        if (parent / "js" / "data.js").exists():
            return parent
        
        if parent.name == "tools" and (parent.parent / "js" / "data.js").exists():
            return parent.parent
    
    if current.name == "tools":
        parent = current.parent
        if (parent / "js" / "data.js").exists():
            return parent
    
    for sub in ["..", "../..", "../../.."]:
        path = Path(sub)
        if (path / "js" / "data.js").exists():
            return path.resolve()
    
    raise FileNotFoundError("ไม่พบไฟล์ js/data.js")


def get_data_js_path() -> Path:
    """คืนค่า path ของ data.js"""
    root = find_project_root()
    return root / "js" / "data.js"


# ============================================================
# 2. JavaScript Parser แบบปลอดภัย
# ============================================================

class JSParser:
    """แปลง JavaScript object เป็น Python dict"""
    
    def __init__(self, content: str):
        self.content = content
        self.pos = 0
        self.length = len(content)
    
    def parse(self) -> Dict:
        """เริ่มต้น parsing"""
        self.skip_whitespace()
        result = self.parse_value()
        return result
    
    def peek(self) -> Optional[str]:
        """ดูตัวอักษรถัดไป"""
        if self.pos >= self.length:
            return None
        return self.content[self.pos]
    
    def next_char(self) -> Optional[str]:
        """อ่านตัวอักษรถัดไป"""
        if self.pos >= self.length:
            return None
        c = self.content[self.pos]
        self.pos += 1
        return c
    
    def skip_whitespace(self):
        """ข้าม whitespace และ comment"""
        while self.pos < self.length:
            c = self.content[self.pos]
            
            # ข้าม whitespace
            if c in ' \t\n\r':
                self.pos += 1
                continue
            
            # ข้าม // comment
            if c == '/' and self.pos + 1 < self.length and self.content[self.pos + 1] == '/':
                self.pos += 2
                while self.pos < self.length and self.content[self.pos] not in '\n\r':
                    self.pos += 1
                continue
            
            # ข้าม /* comment */
            if c == '/' and self.pos + 1 < self.length and self.content[self.pos + 1] == '*':
                self.pos += 2
                while self.pos < self.length:
                    if self.pos + 1 < self.length and self.content[self.pos] == '*' and self.content[self.pos + 1] == '/':
                        self.pos += 2
                        break
                    self.pos += 1
                continue
            
            break
    
    def parse_value(self) -> Any:
        """parse ค่า"""
        self.skip_whitespace()
        c = self.peek()
        
        if c is None:
            return None
        
        if c == '{':
            return self.parse_object()
        elif c == '[':
            return self.parse_array()
        elif c == '"' or c == "'":
            return self.parse_string()
        elif c == '`':
            return self.parse_template_string()
        elif c.isdigit() or c == '-':
            return self.parse_number()
        elif c.isalpha() or c == '_':
            return self.parse_identifier()
        else:
            self.pos += 1
            return None
    
    def parse_object(self) -> Dict:
        """parse object { key: value, ... }"""
        result = {}
        self.pos += 1  # skip {
        self.skip_whitespace()
        
        if self.peek() == '}':
            self.pos += 1
            return result
        
        while True:
            self.skip_whitespace()
            
            # key
            key = self.parse_key()
            self.skip_whitespace()
            
            # :
            if self.peek() == ':':
                self.pos += 1
            else:
                break
            
            self.skip_whitespace()
            
            # value
            value = self.parse_value()
            result[key] = value
            
            self.skip_whitespace()
            
            # , หรือ }
            c = self.peek()
            if c == ',':
                self.pos += 1
                self.skip_whitespace()
                if self.peek() == '}':
                    self.pos += 1
                    break
            elif c == '}':
                self.pos += 1
                break
            else:
                break
        
        return result
    
    def parse_array(self) -> List:
        """parse array [ value, value, ... ]"""
        result = []
        self.pos += 1  # skip [
        self.skip_whitespace()
        
        if self.peek() == ']':
            self.pos += 1
            return result
        
        while True:
            self.skip_whitespace()
            value = self.parse_value()
            if value is not None:
                result.append(value)
            
            self.skip_whitespace()
            
            c = self.peek()
            if c == ',':
                self.pos += 1
                self.skip_whitespace()
                if self.peek() == ']':
                    self.pos += 1
                    break
            elif c == ']':
                self.pos += 1
                break
            else:
                break
        
        return result
    
    def parse_string(self) -> str:
        """parse string"""
        quote = self.next_char()  # " or '
        result = []
        
        while self.pos < self.length:
            c = self.next_char()
            
            if c == '\\':
                # escape
                esc = self.next_char()
                if esc == 'n':
                    result.append('\n')
                elif esc == 't':
                    result.append('\t')
                elif esc == 'r':
                    result.append('\r')
                elif esc == '"':
                    result.append('"')
                elif esc == "'":
                    result.append("'")
                elif esc == '\\':
                    result.append('\\')
                else:
                    result.append(esc)
            elif c == quote:
                break
            else:
                result.append(c)
        
        return ''.join(result)
    
    def parse_template_string(self) -> str:
        """parse backtick template literal `...` (no ${} interpolation support needed here)"""
        self.pos += 1  # skip opening `
        result = []

        while self.pos < self.length:
            c = self.next_char()

            if c == '\\':
                esc = self.next_char()
                if esc == 'n':
                    result.append('\n')
                elif esc == 't':
                    result.append('\t')
                elif esc == 'r':
                    result.append('\r')
                elif esc == '`':
                    result.append('`')
                elif esc == '\\':
                    result.append('\\')
                elif esc == '$':
                    result.append('$')
                else:
                    result.append(esc)
            elif c == '`':
                break
            else:
                result.append(c)

        return ''.join(result)

    def parse_number(self) -> Union[int, float]:
        """parse number"""
        start = self.pos
        
        # handle negative
        if self.peek() == '-':
            self.pos += 1
        
        while self.pos < self.length:
            c = self.peek()
            if c is not None and (c.isdigit() or c == '.'):
                self.pos += 1
            else:
                break
        
        num_str = self.content[start:self.pos]
        
        try:
            if '.' in num_str:
                return float(num_str)
            return int(num_str)
        except ValueError:
            return 0
    
    def parse_identifier(self) -> Union[str, bool, None]:
        """parse identifier (true, false, null, หรือ key)"""
        start = self.pos
        
        while self.pos < self.length:
            c = self.peek()
            if c is not None and (c.isalnum() or c == '_'):
                self.pos += 1
            else:
                break
        
        ident = self.content[start:self.pos]
        
        # Boolean / Null
        if ident == 'true':
            return True
        elif ident == 'false':
            return False
        elif ident == 'null':
            return None
        
        # ถ้าเป็น key (ไม่ quote) ให้คืนค่าเป็น string
        return ident
    
    def parse_key(self) -> str:
        """parse object key"""
        self.skip_whitespace()
        c = self.peek()
        
        if c == '"' or c == "'":
            return self.parse_string()
        else:
            # unquoted key
            start = self.pos
            while self.pos < self.length:
                c = self.peek()
                if c is not None and (c.isalnum() or c == '_'):
                    self.pos += 1
                else:
                    break
            return self.content[start:self.pos]


def parse_data_js(filepath: Path = None) -> Dict:
    """อ่านและแปลงข้อมูลจาก data.js"""
    if filepath is None:
        filepath = get_data_js_path()
    
    if not filepath.exists():
        raise FileNotFoundError(f"ไม่พบไฟล์: {filepath}")
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # หา const COURSE = ... ;
    pattern = r'const\s+COURSE\s*=\s*(\{[\s\S]*?\n\});'
    match = re.search(pattern, content)
    
    if not match:
        pattern = r'COURSE\s*=\s*(\{[\s\S]*?\n\});'
        match = re.search(pattern, content)
    
    if not match:
        raise ValueError("ไม่พบข้อมูล COURSE ใน data.js")
    
    js_data = match.group(1)
    
    # ใช้ JSParser
    parser = JSParser(js_data)
    result = parser.parse()
    
    if not isinstance(result, dict):
        raise ValueError("ข้อมูลไม่ถูกต้อง")
    
    return result


# ============================================================
# 3. อ่านความคืบหน้า
# ============================================================

def get_progress_file_path() -> Path:
    """ค้นหาไฟล์ progress.json"""
    root = find_project_root()
    
    candidates = [
        root / "progress.json",
        root / "tools" / "progress.json",
        Path.cwd() / "progress.json",
        Path.cwd() / ".." / "progress.json",
    ]
    
    for path in candidates:
        if path.exists():
            return path
    
    return root / "progress.json"


def get_progress_from_file(filepath: Path = None) -> Set[str]:
    """อ่านความคืบหน้าจากไฟล์ JSON"""
    if filepath is None:
        filepath = get_progress_file_path()
    
    if not filepath.exists():
        return set()
    
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, list):
                return set(data)
            return set()
    except (json.JSONDecodeError, TypeError) as e:
        print(f"⚠️ อ่าน progress.json ไม่ได้: {e}")
        return set()


def save_progress(completed: Set[str], filepath: Path = None):
    """บันทึกความคืบหน้า"""
    if filepath is None:
        filepath = get_progress_file_path()
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(sorted(list(completed)), f, ensure_ascii=False, indent=2)


def get_progress_from_browser() -> Set[str]:
    """อ่านจาก localStorage ผ่าน selenium"""
    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.options import Options
        from selenium.webdriver.support.ui import WebDriverWait
        from selenium.webdriver.support import expected_conditions as EC
        
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        
        driver = webdriver.Chrome(options=options)
        
        root = find_project_root()
        index_path = root / "index.html"
        
        if not index_path.exists():
            print(f"⚠️ ไม่พบ index.html ที่ {index_path}")
            return set()
        
        driver.get(f"file://{index_path.absolute()}")
        driver.implicitly_wait(2)
        
        progress = driver.execute_script(
            "return localStorage.getItem('py-course-progress')"
        )
        driver.quit()
        
        if progress:
            return set(json.loads(progress))
        return set()
        
    except ImportError:
        print("⚠️ ต้องการ selenium: pip install selenium")
        return set()
    except Exception as e:
        print(f"⚠️ ไม่สามารถอ่านจากเบราว์เซอร์: {e}")
        return set()


# ============================================================
# 4. วิเคราะห์
# ============================================================

def extract_lessons(course: Dict) -> List[Dict]:
    """ดึงบทเรียนทั้งหมดจาก course"""
    lessons = []
    
    for phase in course.get("phases", []):
        for chapter in phase.get("chapters", []):
            for lesson in chapter.get("lessons", []):
                lessons.append({
                    "id": lesson.get("id", ""),
                    "title": lesson.get("title", ""),
                    "phase": phase.get("name", ""),
                    "chapter": chapter.get("name", "")
                })
    
    return lessons


def analyze_progress(course: Dict, completed: Set[str]) -> Dict:
    """วิเคราะห์ความคืบหน้า"""
    phases = []
    all_lessons = []
    total = 0
    done = 0
    
    for phase in course.get("phases", []):
        phase_name = phase.get("name", "Unknown")
        phase_lessons = []
        phase_total = 0
        phase_done = 0
        
        for chapter in phase.get("chapters", []):
            for lesson in chapter.get("lessons", []):
                lesson_id = lesson.get("id", "")
                phase_total += 1
                is_done = lesson_id in completed
                if is_done:
                    phase_done += 1
                
                lesson_data = {
                    "id": lesson_id,
                    "title": lesson.get("title", ""),
                    "done": is_done
                }
                phase_lessons.append(lesson_data)
                all_lessons.append(lesson_data)
        
        total += phase_total
        done += phase_done
        phases.append({
            "name": phase_name,
            "total": phase_total,
            "done": phase_done,
            "percent": (phase_done / phase_total * 100) if phase_total > 0 else 0,
            "lessons": phase_lessons
        })
    
    percent = (done / total * 100) if total > 0 else 0
    
    status = (
        "🎉 สำเร็จแล้ว! เรียนครบทุกบท" if percent == 100 else
        "🔥 ใกล้เสร็จแล้ว! เก่งมาก" if percent >= 75 else
        "💪 ทำได้ดีมาก ครึ่งทางแล้ว!" if percent >= 50 else
        "📚 เริ่มต้นได้ดีแล้ว สู้ๆ!" if percent >= 25 else
        "🌱 เพิ่งเริ่มต้น สู้ๆ นะ!"
    )
    
    return {
        "total": total,
        "done": done,
        "percent": percent,
        "status": status,
        "phases": phases,
        "all_lessons": all_lessons
    }


# ============================================================
# 5. แสดงผล
# ============================================================

def print_report(result: Dict, show_remaining: bool = True):
    """แสดงรายงาน"""
    print("=" * 60)
    print("  🐍 รายงานความคืบหน้า — Python สำหรับผู้เริ่มต้น")
    print("=" * 60)
    
    print(f"\n📊 สถานะ: {result['status']}")
    print(f"📈 ความคืบหน้า: {result['done']} / {result['total']} บท")
    print(f"   ({result['percent']:.1f}%)\n")
    
    # กราฟแท่ง
    bar_len = 30
    filled = int(result['percent'] / 100 * bar_len)
    bar = "█" * filled + "░" * (bar_len - filled)
    print(f"   [{bar}] {result['percent']:.1f}%")
    
    print("\n" + "-" * 60)
    print("📚 รายละเอียดตามเฟส:")
    print("-" * 60)
    
    for phase in result["phases"]:
        pct = phase["percent"]
        bar = "█" * int(pct / 100 * 15) + "░" * (15 - int(pct / 100 * 15))
        icon = "✅" if pct == 100 else "🟡" if pct >= 50 else "🔴"
        
        name = phase["name"]
        if len(name) > 28:
            name = name[:26] + "…"
        
        print(f"  {icon} {name:<28} {phase['done']:>2}/{phase['total']:<2}  [{bar}] {pct:>4.0f}%")
    
    if show_remaining:
        remaining = [l for l in result["all_lessons"] if not l["done"]]
        
        if remaining:
            print("\n" + "-" * 60)
            print(f"📝 บทเรียนที่ยังไม่ได้เรียน ({len(remaining)} บท):")
            print("-" * 60)
            
            show = remaining[:10]
            for i, lesson in enumerate(show, 1):
                print(f"  {i:>2}. {lesson['id']} — {lesson['title']}")
            
            if len(remaining) > 10:
                print(f"  ... และอีก {len(remaining) - 10} บท")
        else:
            print("\n🎉 เรียนครบทุกบทแล้ว!")
    
    print("\n" + "=" * 60)


def export_csv(result: Dict, filename: Path = None):
    """Export เป็น CSV"""
    import csv
    
    if filename is None:
        root = find_project_root()
        filename = root / "progress_report.csv"
    
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Phase", "Lesson ID", "Title", "Status"])
        
        for phase in result["phases"]:
            for lesson in phase["lessons"]:
                writer.writerow([
                    phase["name"],
                    lesson["id"],
                    lesson["title"],
                    "✅" if lesson["done"] else "⬜"
                ])
    
    print(f"💾 Export CSV: {filename}")


# ============================================================
# 6. ฟังก์ชัน Interactive
# ============================================================

def get_progress_interactive(available_lessons: List[Dict]) -> Set[str]:
    """ให้ผู้ใช้ป้อน ID บทเรียนที่เรียนแล้ว"""
    print("\n📝 กรุณาป้อน ID บทเรียนที่เรียนแล้ว (คั่นด้วย comma หรือ space)")
    print("   พิมพ์ 'list' เพื่อดูรายการทั้งหมด")
    print("   พิมพ์ 'done' เพื่อจบ\n")
    
    completed = set()
    
    print("📚 ตัวอย่าง ID: 1.1, 1.2, 2.1, 3.1\n")
    
    while True:
        line = input("🎯 ID บทเรียน: ").strip()
        
        if line.lower() in ["done", "q", "quit", "exit"]:
            break
        
        if line.lower() == "list":
            print("\n📚 รายการบทเรียนทั้งหมด:")
            for lesson in available_lessons[:20]:
                status = "✅" if lesson["id"] in completed else "⬜"
                print(f"  {status} {lesson['id']} — {lesson['title']}")
            if len(available_lessons) > 20:
                print(f"  ... และอีก {len(available_lessons) - 20} บท")
            print()
            continue
        
        if not line:
            continue
        
        ids = re.split(r'[,\s]+', line)
        added = 0
        for id_str in ids:
            id_str = id_str.strip()
            if id_str and re.match(r'^\d+\.\d+$', id_str):
                completed.add(id_str)
                added += 1
            elif id_str:
                print(f"  ⚠️ รูปแบบไม่ถูกต้อง: {id_str} (ควรเป็น เช่น 1.1)")
        
        if added:
            print(f"  ✅ เพิ่ม {added} บท ({len(completed)} บททั้งหมด)")
    
    return completed


# ============================================================
# 7. Main
# ============================================================

def main():
    """ฟังก์ชันหลัก"""
    print("🐍 กำลังตรวจสอบความคืบหน้า...\n")
    
    try:
        root = find_project_root()
        print(f"📁 Project root: {root}")
    except FileNotFoundError as e:
        print(f"❌ {e}")
        return
    
    try:
        data_path = get_data_js_path()
        course = parse_data_js(data_path)
        print(f"✅ อ่าน data.js สำเร็จ")
        
        total_lessons = 0
        for phase in course.get("phases", []):
            for chapter in phase.get("chapters", []):
                total_lessons += len(chapter.get("lessons", []))
        print(f"📚 พบ {len(course.get('phases', []))} เฟส, {total_lessons} บทเรียน")
        
    except Exception as e:
        print(f"❌ อ่าน data.js ไม่ได้: {e}")
        return
    
    all_lessons = extract_lessons(course)
    lesson_ids = {l["id"] for l in all_lessons}
    
    print("\n" + "-" * 40)
    print("เลือกวิธีการอ่านความคืบหน้า:")
    print("  1. จากไฟล์ progress.json")
    print("  2. จากเบราว์เซอร์ (ใช้ selenium)")
    print("  3. ป้อนด้วยตัวเอง")
    print("  4. เริ่มต้นใหม่ (ไม่มีข้อมูล)")
    
    choice = input("\nเลือก (1-4) [1]: ").strip() or "1"
    
    completed = set()
    
    if choice == "1":
        progress_path = get_progress_file_path()
        completed = get_progress_from_file(progress_path)
        if completed:
            valid = completed & lesson_ids
            invalid = completed - lesson_ids
            if invalid:
                print(f"⚠️ มี ID ที่ไม่ถูกต้อง {len(invalid)} รายการ: {sorted(invalid)}")
            completed = valid
            print(f"✅ อ่าน progress.json สำเร็จ ({len(completed)} บท)")
        else:
            print("ℹ️ ไม่พบข้อมูลใน progress.json")
    
    elif choice == "2":
        print("🔄 กำลังเชื่อมต่อเบราว์เซอร์...")
        completed = get_progress_from_browser()
        if completed:
            valid = completed & lesson_ids
            completed = valid
            print(f"✅ อ่านจากเบราว์เซอร์สำเร็จ ({len(completed)} บท)")
        else:
            print("ℹ️ ไม่พบข้อมูลในเบราว์เซอร์")
    
    elif choice == "3":
        completed = get_progress_interactive(all_lessons)
        print(f"\n✅ รับข้อมูลสำเร็จ ({len(completed)} บท)")
    
    else:
        print("ℹ️ เริ่มต้นใหม่")
    
    result = analyze_progress(course, completed)
    print_report(result, show_remaining=True)
    
    export_csv(result)
    
    json_path = root / "progress_report.json"
    with open(json_path, "w", encoding="utf-8") as f:
        output = {
            "total": result["total"],
            "done": result["done"],
            "percent": result["percent"],
            "status": result["status"],
            "phases": [
                {
                    "name": p["name"],
                    "total": p["total"],
                    "done": p["done"],
                    "percent": p["percent"]
                }
                for p in result["phases"]
            ]
        }
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"💾 Export JSON: {json_path}")
    
    if completed:
        progress_path = get_progress_file_path()
        save_progress(completed, progress_path)
        print(f"💾 บันทึก progress: {progress_path}")


if __name__ == "__main__":
    main()