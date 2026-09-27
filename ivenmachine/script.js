'use strict';

/* ============================================= */
/* Constants (ค่าคงที่) */
/* ============================================= */
const MAX_STOCK_PER_SLOT = 4;

const COIN_CAPACITY = {
    '1': 100,
    '5': 100,
    '10': 60
};

const SHELF_GROUPS = [
    { shelf: 1, start: 11, end: 19 },
    { shelf: 2, start: 21, end: 29 },
    { shelf: 3, start: 31, end: 39 },
    { shelf: 4, start: 41, end: 49 },
    { shelf: 5, start: 51, end: 59 },
    { shelf: 6, start: 61, end: 69 }
];

const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
};

const FIELD_LABELS = [
    'สถานะเครื่อง',
    'สถานะสต๊อก',
    'สถานะสแกนเนอร์',
    'สถานะอุณหภูมิ',
    'สถานะธนบัตร',
    'สถานะลิฟท์ส่งสินค้า',
    'สถานะประตู',
    'สถานะประตูสินค้า',
    'ราคา',
    'สถานะช่องขาย',
    'Rank',
    'GP',
    'm'
];

const DROP_TEST_VALUES = ['Passed', 'Not tested', 'Failed'];

/* ============================================= */
/* Application State (สถานะของแอปพลิเคชัน) */
/* ============================================= */
const AppState = {
    machineData: null,
    slotsData: [],
    productsData: [],
    pmaData: [],
    filteredProducts: [],
    filters: {
        search: '',
        category: '',
        status: ''
    },
    confirmCallback: null
};

/* ============================================= */
/* Default Data (ข้อมูลเริ่มต้น) */
/* ============================================= */
const DEFAULT_MACHINE_DATA = {
    activationCode: 'bmdvsg',
    province: 'สุราษฎร์ธานี',
    district: 'เกาะสมุย',
    gm: 'คุณฤกษ์ ปักเขาตะนง',
    area: 'สามแยกแหลมดิน 1',
    status: {
        online: 'ออนไลน์',
        stock: '50 / 50',
        scanner: 'ออนไลน์',
        temperature: '9 °C',
        banknote: 'ปกติ',
        lift: 'ปกติ',
        door: 'ปิด',
        productDoor: 'ล็อค'
    },
    coins: {
        '1': 111,
        '5': 101,
        '10': 64
    }
};

const DEFAULT_SLOTS_DATA = [
    { slot: '#11', name: '(2) Hเลย์คลาสสิครสมันฝรั่งแท้ 69 ก.', price: 36, stock: 3, max: 4, dropTest: 'Passed', dropTestDate: '16 ส.ค. 2026 22:25', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'C' },
    { slot: '#12', name: '', price: 0, stock: 0, max: 4, dropTest: '-', dropTestDate: '-', channelStatus: '-', rank: '-', m: '-', gp: '-' },
    { slot: '#13', name: '(2) เถ้าแก่น้อยสาหร่ายทอดรสคลาสสิค(ใหญ่) 26 ก.', price: 43, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '20 พ.ค. 2026 20:31', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#14', name: '', price: 0, stock: 0, max: 4, dropTest: '-', dropTestDate: '-', channelStatus: '-', rank: '-', m: '-', gp: '-' },
    { slot: '#15', name: '(1) เมก้าแครบพร้อมน้ำจิ้มซีฟู้ดส์ (อิ่มคุ้ม)', price: 43, stock: 3, max: 4, dropTest: 'Passed', dropTestDate: '11 มิ.ย. 2026 15:00', channelStatus: 'เปิด', rank: 'B', m: 0.67, gp: 'A' },
    { slot: '#16', name: '(1) ดับเบิ้ลชีสเบอร์เกอร์หมูEZYGO RAM', price: 49, stock: 2, max: 4, dropTest: 'Passed', dropTestDate: '10 ก.ค. 2026 16:34', channelStatus: 'เปิด', rank: 'A', m: 1.33, gp: 'A' },
    { slot: '#17', name: '(1) โบโลน่าพริก', price: 40, stock: 3, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#18', name: '(1) ชิกเก้นแฟรงค์', price: 46, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '25 พ.ค. 2026 13:00', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'A' },
    { slot: '#19', name: '(1) เยลลี่โยโย่รสองุ่น 80 G', price: 29, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '10 ก.ค. 2026 13:11', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'B' },
    { slot: '#21', name: '(2) แหนมแท่งจิ๋ว Xถั่วลิสงอบเกลือ ทองการ์เด้น', price: 50, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '12 ก.พ. 2026 16:55', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#22', name: '', price: 0, stock: 0, max: 4, dropTest: '-', dropTestDate: '-', channelStatus: '-', rank: '-', m: '-', gp: '-' },
    { slot: '#23', name: '(2) พายคู่(ไส้สับปะรดและไส้ข้าวโพด)EB', price: 40, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '12 ก.พ. 2026 16:55', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#24', name: '', price: 0, stock: 0, max: 4, dropTest: '-', dropTestDate: '-', channelStatus: '-', rank: '-', m: '-', gp: '-' },
    { slot: '#25', name: '(1) มะม่วงแช่อิ่มศรีเมือง', price: 26, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '29 ส.ค. 2025 08:46', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'A' },
    { slot: '#26', name: '(1) Hชิคฟิงเกอร์ ฮอตแอนด์สไปซี่', price: 33, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '20 พ.ค. 2026 20:32', channelStatus: 'เปิด', rank: 'B', m: 0.67, gp: 'A' },
    { slot: '#27', name: '(1) Hช็อกโกแลตลาวาเค้ก EZYSweet', price: 33, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '13 ก.ค. 2026 01:42', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'A' },
    { slot: '#28', name: '(1) เปี๊ยะโมจิลาวาไข่เค็ม Aprils', price: 42, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '20 พ.ค. 2026 20:34', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'A' },
    { slot: '#29', name: '(1) ทิมเบอร์ริงดับเบิ้ลช็อกโกแลต Bow', price: 39, stock: 3, max: 4, dropTest: 'Passed', dropTestDate: '28 ต.ค. 2025 18:55', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'A' },
    { slot: '#31', name: '(1) Hไข่ไก่ต้มสุกตราซีพี', price: 22, stock: 3, max: 4, dropTest: 'Passed', dropTestDate: '20 พ.ค. 2026 20:32', channelStatus: 'เปิด', rank: 'B', m: 0.67, gp: 'B' },
    { slot: '#32', name: '(1) แซนวิชไส้แฮมชีส Oishi', price: 32, stock: 3, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#33', name: '(1) แซนวิชไส้ปูอัดอลาสก้ายำสาหร่ายญี่ปุ่น Oishi', price: 32, stock: 2, max: 4, dropTest: 'Passed', dropTestDate: '19 พ.ย. 2025 10:21', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#34', name: '(1) โอนิกิริแซลมอนย่างซีอิ๊ว', price: 33, stock: 2, max: 4, dropTest: 'Passed', dropTestDate: '01 ก.ย. 2025 16:45', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'B' },
    { slot: '#35', name: '(1) โอนิกิริไข่กุ้งมายองเนส', price: 33, stock: 3, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'B' },
    { slot: '#36', name: '(1) Hนมข้าวโอ๊ตกู๊ดเมทxKarun ชาไทย ด. 180 มล', price: 29, stock: 4, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'B' },
    { slot: '#37', name: '(1) Hโอวัลติน นมอัลมอนด์ผสมวอลนัท ไวท์มอลต์ ด.180 มล', price: 27, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '04 ก.ย. 2025 16:59', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'A' },
    { slot: '#38', name: '(1) Hโอวัลติน นมอัลมอนด์ผสมวอลนัท โกโก้มอลต์ ด.180 มล', price: 27, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '29 ก.ค. 2026 21:56', channelStatus: 'เปิด', rank: 'C', m: 0.33, gp: 'A' },
    { slot: '#39', name: '(1) Hวุ้นเส้นคัพมังกรคู่เรดดี้รสก๋วยเตี๋ยวเรือน้ำตก55ก', price: 29, stock: 3, max: 4, dropTest: 'Passed', dropTestDate: '07 ธ.ค. 2025 23:07', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#41', name: '(1) เนเวอร์ บายสิงห์ 100 มล.', price: 53, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '12 เม.ย. 2026 11:33', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#42', name: '(1) Hซีวิท ส้ม 140 มล.', price: 19, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '07 ธ.ค. 2025 22:59', channelStatus: 'เปิด', rank: 'B', m: 0.33, gp: 'A' },
    { slot: '#43', name: '(1) Hเอ็ม-150 ไฮวิตามินบี12 150 มล.', price: 14, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '19 ก.ค. 2026 13:40', channelStatus: 'เปิด', rank: 'A', m: 4, gp: 'B' },
    { slot: '#44', name: '(1) Hกระทิงแดง 150 มล.', price: 12, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '19 พ.ย. 2025 10:21', channelStatus: 'เปิด', rank: 'A', m: 1.67, gp: 'B' },
    { slot: '#45', name: '(1) เบอร์ดี้ โรบัสต้า 170 มล.', price: 20, stock: 3, max: 4, dropTest: 'Passed', dropTestDate: '28 ต.ค. 2025 18:15', channelStatus: 'เปิด', rank: 'A', m: 3.33, gp: 'B' },
    { slot: '#46', name: '(1) เรดบูลอิมพอร์ตแคน 250 มล.', price: 79, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '19 พ.ย. 2025 10:21', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#47', name: '(1) อเมซอน ฟิซเพรสโซ ยูซุ 330 มล.', price: 42, stock: 4, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'B', m: 0.67, gp: 'A' },
    { slot: '#48', name: '(1) Hสิงห์เลมอนโซดา 330 มล.', price: 20, stock: 4, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'B', m: 0.33, gp: 'A' },
    { slot: '#49', name: '(1) Hสปอนเซอร์แคน ออริจินัล 325 มล.', price: 16, stock: 4, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'B', m: 1, gp: 'B' },
    { slot: '#51', name: '(1) Hชินเซน น้ำส้มคั้น 100% 250 มล.', price: 51, stock: 2, max: 4, dropTest: 'Passed', dropTestDate: '26 มิ.ย. 2026 15:22', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#52', name: '(1) Hนมพาสฯฮูเร่ โปรตีนสูง 340 มล. รสช็อกโกแลต', price: 55, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '30 ก.ค. 2026 04:57', channelStatus: 'เปิด', rank: 'A', m: 1.33, gp: 'A' },
    { slot: '#53', name: '(1) Hนมเปรี้ยวบีทาเก้น 400 มล. พร่องมันเนย', price: 25, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '16 ส.ค. 2026 22:27', channelStatus: 'เปิด', rank: 'A', m: 2, gp: 'B' },
    { slot: '#54', name: '(1) Hโคโค่แม็ก น้ำมะพร้าว 350 มล.', price: 28, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '19 ก.ค. 2026 06:49', channelStatus: 'เปิด', rank: 'A', m: 1.33, gp: 'A' },
    { slot: '#55', name: '(1) เย็นเย็น จับเลี้ยงน้ำมะพร้าว 400 มล.', price: 21, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '24 ส.ค. 2026 17:30', channelStatus: 'เปิด', rank: 'B', m: 0.33, gp: 'A' },
    { slot: '#56', name: '(1) อีฟ ฟรุ๊ตที มะขาม 350 มล.', price: 28, stock: 4, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#57', name: '(1) เฮย์ทีอู่หลงองุ่นแบล็คเคอร์แรนท์ 450 มล.', price: 42, stock: 2, max: 4, dropTest: 'Passed', dropTestDate: '03 มิ.ย. 2026 07:42', channelStatus: 'เปิด', rank: 'B', m: 0.67, gp: 'A' },
    { slot: '#58', name: '(1) เฮย์ทีกรีนทีพีชแครนเบอร์รี่ 450 มล.', price: 42, stock: 4, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#59', name: '(1) ชาจิงเคียวโฮอโลเวร่า 480 มล.', price: 32, stock: 4, max: 4, dropTest: 'Not tested', dropTestDate: '-', channelStatus: 'เปิด', rank: 'B', m: 0.33, gp: 'A' },
    { slot: '#61', name: '(1) น้ำแร่เอเวียง 500 มล.', price: 52, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '17 ก.ย. 2026 17:00', channelStatus: 'เปิด', rank: 'B', m: 1, gp: 'A' },
    { slot: '#62', name: '(1) Hน้ำดื่มพีเอชพลัส 550 มล.', price: 23, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '17 ก.ย. 2026 17:00', channelStatus: 'เปิด', rank: 'A', m: 1.33, gp: 'A' },
    { slot: '#63', name: '(1) Hยูนิฟ ออลยูนีด ผักใบเขียว 300 มล.', price: 28, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '17 ก.ย. 2026 17:01', channelStatus: 'เปิด', rank: 'C', m: 0, gp: 'A' },
    { slot: '#64', name: '(1) Hโออิชิน้ำผึ้งมะนาว 500 มล.', price: 28, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '17 ก.ย. 2026 17:02', channelStatus: 'เปิด', rank: 'B', m: 0.33, gp: 'A' },
    { slot: '#65', name: '(1) Hอิชิตันน้ำผึ้งมะนาว 500 มล.', price: 28, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '18 ก.ค. 2025 17:08', channelStatus: 'เปิด', rank: 'B', m: 0.33, gp: 'A' },
    { slot: '#66', name: '(1) โค้กไม่มีน้ำตาล 510 มล.', price: 22, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '08 พ.ย. 2025 14:44', channelStatus: 'เปิด', rank: 'B', m: 1, gp: 'B' },
    { slot: '#67', name: '(1) เป๊ปซี่ 550 มล.', price: 23, stock: 3, max: 4, dropTest: 'Passed', dropTestDate: '04 ก.ย. 2025 16:59', channelStatus: 'เปิด', rank: 'B', m: 1, gp: 'B' },
    { slot: '#68', name: '(1) โค้ก 510 มล.', price: 22, stock: 4, max: 4, dropTest: 'Passed', dropTestDate: '05 ก.พ. 2026 15:03', channelStatus: 'เปิด', rank: 'A', m: 3, gp: 'B' },
    { slot: '#69', name: '(1) เซียโล่ ลิ้นจี่ 600 มล.', price: 17, stock: 3, max: 4, dropTest: 'Passed', dropTestDate: '17 ก.ย. 2026 17:02', channelStatus: 'เปิด', rank: 'A', m: 1, gp: 'A' }
];

const DEFAULT_PMA_DATA = [
    { pma: 'PMA', no: '01', name: 'แซนวิชเย็น' },
    { pma: 'PMA', no: '02', name: 'APPETIZE' },
    { pma: 'PMA', no: '03', name: 'ผลไม้&ขนมหวาน' },
    { pma: 'PMA', no: '05', name: 'COUNTERDRINK' },
    { pma: 'PMA', no: '06', name: 'FOODPLACE' },
    { pma: 'PMA', no: '07', name: 'แซนวิชอบร้อน' },
    { pma: 'PMA', no: '08', name: 'BUGGER' },
    { pma: 'PMA', no: '09', name: 'บัตร7-11' },
    { pma: 'PMA', no: '10', name: 'BEER&RTDALCOHOL' },
    { pma: 'PMA', no: '11', name: 'LIQUOR' },
    { pma: 'PMA', no: '12', name: 'บุหรี่นอก' },
    { pma: 'PMA', no: '13', name: 'บัตรโทรศัพท์ภายใน/ต่างประเทศ' },
    { pma: 'PMA', no: '14', name: 'HEALTHCARE' },
    { pma: 'PMA', no: '15', name: 'COUNTCOSTOMER' },
    { pma: 'PMA', no: '16', name: 'SALAD' },
    { pma: 'PMA', no: '18', name: 'MEDICINE' },
    { pma: 'PMA', no: '19', name: 'ข้าวกล่องแดง3Dแช่เย็น' },
    { pma: 'PMA', no: '20', name: 'ข้าวกล่องขาว6Mแช่แข็ง' },
    { pma: 'PMA', no: '21', name: 'SAUSAGE' },
    { pma: 'PMA', no: '22', name: 'ข้าวกล่องดำ7Dแช่เย็น' },
    { pma: 'PMA', no: '23', name: 'ไส้กรอกกริลล' },
    { pma: 'PMA', no: '24', name: 'ขนมจีบ&ซาลาเปา' },
    { pma: 'PMA', no: '25', name: 'HOTPASTY' },
    { pma: 'PMA', no: '26', name: 'บัตรโทรศัพท์ระหว่างประเทศ' },
    { pma: 'PMA', no: '27', name: 'บัตรเติมเกมส์' },
    { pma: 'PMA', no: '28', name: 'BOOKS' },
    { pma: 'PMA', no: '29', name: 'UHTMILK' },
    { pma: 'PMA', no: '30', name: 'นมพาสเจอร์ไรส์(ขวด)' },
    { pma: 'PMA', no: '31', name: 'PASTEURIZEDDRINK' },
    { pma: 'PMA', no: '32', name: 'เครื่องปรุง' },
    { pma: 'PMA', no: '33', name: 'บะหมี่กึ่งสำเร็จรูป' },
    { pma: 'PMA', no: '34', name: 'เครื่องชง' },
    { pma: 'PMA', no: '35', name: 'SPECIALITEM' },
    { pma: 'PMA', no: '36', name: 'CHILLEDCAKECPRAM' },
    { pma: 'PMA', no: '37', name: 'STAMP' },
    { pma: 'PMA', no: '38', name: 'NON-CABONATEDSOFTDRINK' },
    { pma: 'PMA', no: '39', name: 'ENTERTAINMENT' },
    { pma: 'PMA', no: '40', name: 'ลูกอมช็อคโกแลต' },
    { pma: 'PMA', no: '41', name: 'SNACKS' },
    { pma: 'PMA', no: '42', name: 'CABONATEDSOFTDRINK' },
    { pma: 'PMA', no: '43', name: 'ITDEVICES' },
    { pma: 'PMA', no: '44', name: 'ICECREAM' },
    { pma: 'PMA', no: '45', name: 'ICE' },
    { pma: 'PMA', no: '46', name: '7-SERVICE(บริการส่งพัสดุSPEEDD)' },
    { pma: 'PMA', no: '47', name: '7-SERVICE(บรรจุภัณฑ์SPEEDD)' },
    { pma: 'PMA', no: '48', name: 'HEALTHANDWELLNESS' },
    { pma: 'PMA', no: '49', name: 'ENERGY&SPORTDRINK' },
    { pma: 'PMA', no: '50', name: 'PERSONALCARE' },
    { pma: 'PMA', no: '51', name: 'HOUSEWARE' },
    { pma: 'PMA', no: '52', name: 'STATIONARY' },
    { pma: 'PMA', no: '53', name: 'DRUG&HEALTHCARE' },
    { pma: 'PMA', no: '54', name: 'SANITARY' },
    { pma: 'PMA', no: '55', name: 'HOUSEHOLD' },
    { pma: 'PMA', no: '56', name: 'ELECTRONIC' },
    { pma: 'PMA', no: '58', name: 'ซิมการ์ด' },
    { pma: 'PMA', no: '59', name: 'HERBALPERSONALCARE' },
    { pma: 'PMA', no: '60', name: 'BAKERY' },
    { pma: 'PMA', no: '61', name: 'ฟาร์มเฮาท์' },
    { pma: 'PMA', no: '62', name: 'FRESHBAKERY' },
    { pma: 'PMA', no: '63', name: 'THAISNACKS' },
    { pma: 'PMA', no: '65', name: 'พ.ร.บ.' },
    { pma: 'PMA', no: '67', name: 'เกมโกะ' },
    { pma: 'PMA', no: '68', name: 'สินค้าเทศกาล' },
    { pma: 'PMA', no: '69', name: 'CPGSYNERGY' },
    { pma: 'PMA', no: '70', name: 'เติมเงินออนไลน์(คอมมิชชั่น)' },
    { pma: 'PMA', no: '71', name: '7TOPUPCASH' },
    { pma: 'PMA', no: '72', name: 'บุหรี่ไทย' },
    { pma: 'PMA', no: '73', name: 'BELLINEEBAKERY' },
    { pma: 'PMA', no: '74', name: 'สินค้าการกุศล' },
    { pma: 'PMA', no: '75', name: 'BELLINEEPACKAGAREBAKERY' },
    { pma: 'PMA', no: '76', name: 'KUDSANSUPPLYUSE' },
    { pma: 'PMA', no: '77', name: '24CATALOG' },
    { pma: 'PMA', no: '78', name: 'กระเช้าผลไม้' },
    { pma: 'PMA', no: '79', name: 'BELLINEEBAKERY' },
    { pma: 'PMA', no: '80', name: 'KUDSANBAKERY' },
    { pma: 'PMA', no: '83', name: 'CPFRESHMART' },
    { pma: 'PMA', no: '84', name: 'VEGETABLE' },
    { pma: 'PMA', no: '85', name: 'สินค้าโครงการRTC' },
    { pma: 'PMA', no: '86', name: 'MAGAZINE' },
    { pma: 'PMA', no: '87', name: 'KUDSANBEVERAGE' },
    { pma: 'PMA', no: '88', name: 'จิตรลัดดา' },
    { pma: 'PMA', no: '89', name: 'CATALOGONSHELL' },
    { pma: 'PMA', no: '90', name: 'PROMOTIONPREMIUM' },
    { pma: 'PMA', no: '96', name: 'HOTSERV' },
    { pma: 'PMA', no: '97', name: 'เสื้อพนักงาน' },
    { pma: 'PMA', no: '98', name: 'P.O.P.สื่อภายในร้าน' },
    { pma: 'PMA', no: '99', name: 'ลังเบรค' }
];

const DEFAULT_PRODUCTS_DATA = [
    { masterProductId: '4102921', nameTh: 'Hเลย์คลาสสิครสมันฝรั่งแท้ 69 ก.', nameEn: "Lay's Classic Original 75 g.", spiralType: 'double_spiral', spiralSize: 80, beltColor: '', barcode: '8850718801213', category: 'ขนมและชอคโกแลต', allowSale: '', status: 'publish', gp: 'C', startDate: '' },
    { masterProductId: '4100100', nameTh: 'เถ้าแก่น้อยสาหร่ายทอดรสคลาสสิค(ใหญ่) 26 ก.', nameEn: 'Crispy Seaweed Japanese Style 30 g. Classic Flavour', spiralType: 'double_spiral', spiralSize: 80, beltColor: '', barcode: '8857107230043', category: 'ขนมและชอคโกแลต', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '0200474', nameTh: 'เมก้าแครบพร้อมน้ำจิ้มซีฟู้ดส์ (อิ่มคุ้ม)', nameEn: 'Mega Crab with Seafood Sauce', spiralType: 'spiral', spiralSize: 38, beltColor: '', barcode: '8850016635268', category: 'อาหารพร้อมทาน', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '0800321', nameTh: 'ดับเบิ้ลชีสเบอร์เกอร์หมูEZYGO RAM', nameEn: 'Double Cheese Pork Burger EZY TASTE', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8851351132825', category: 'อาหารพร้อมทาน', allowSale: '', status: 'publish', gp: 'A', startDate: '2023-10-12 08:00:00' },
    { masterProductId: '2105251', nameTh: 'โบโลน่าพริก', nameEn: 'CP Chili Bologna', spiralType: 'spiral', spiralSize: 38, beltColor: '', barcode: '8850554152111', category: 'อาหารพร้อมทาน', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '2109054', nameTh: 'ชิกเก้นแฟรงค์', nameEn: 'CP Chicken Frank Sausage', spiralType: 'spiral', spiralSize: 38, beltColor: '', barcode: '8850554811223', category: 'อาหารพร้อมทาน', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '4003071', nameTh: 'เยลลี่โยโย่รสองุ่น 80 G', nameEn: 'Yoyo Grape jelly 80 G.', spiralType: 'spiral', spiralSize: 60, beltColor: '', barcode: '8852047232119', category: 'ขนมและชอคโกแลต', allowSale: '', status: 'publish', gp: 'B', startDate: '' },
    { masterProductId: '0201001', nameTh: 'Party Pack แหนมตุ้มจิ๋ว ตราดอนเมืองกม.26', nameEn: 'Thai Fermented Sausage Donmueang Brand Party Pack', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8853988003479', category: 'อาหารพร้อมทาน', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2025-03-11 00:00:00' },
    { masterProductId: '6002292', nameTh: 'พายคู่(ไส้สับปะรดและไส้ข้าวโพด)EB', nameEn: 'Pineapple and Corn Filled Duo Pies EB', spiralType: 'double_spiral', spiralSize: 80, beltColor: '', barcode: '8851351753563', category: 'เบเกอรี่และขนมหวาน', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2024-07-22 02:00:00' },
    { masterProductId: '0300010', nameTh: 'มะม่วงแช่อิ่มศรีเมือง', nameEn: 'Preserved mango Srimuang Brand', spiralType: 'spiral', spiralSize: 60, beltColor: '', barcode: '8854357000013', category: 'ผักและผลไม้', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '0200086', nameTh: 'Hชิคฟิงเกอร์ ฮอตแอนด์สไปซี่', nameEn: 'CP Chicken Finger Hot & Spicy Flavour', spiralType: 'spiral', spiralSize: 60, beltColor: '', barcode: '8850653793987', category: 'อาหารพร้อมทาน', allowSale: '', status: 'publish', gp: 'A', startDate: '2023-11-10 08:00:00' },
    { masterProductId: '0300059', nameTh: 'Hช็อกโกแลตลาวาเค้ก EZYSweet', nameEn: 'Chocolate Lava Cake', spiralType: 'belt+spiral', spiralSize: 80, beltColor: 'เหลือง', barcode: '8858867801153', category: 'เบเกอรี่และขนมหวาน', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '0301063', nameTh: 'เปี๊ยะโมจิลาวาไข่เค็ม Aprils', nameEn: 'Salted Egg Mochi Lava Spring Rolls', spiralType: 'spiral', spiralSize: 80, beltColor: 'เขียว', barcode: '8859522800948', category: 'เบเกอรี่และขนมหวาน', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2025-02-09 10:00:00' },
    { masterProductId: '0302294', nameTh: 'ทิมเบอร์ริงดับเบิ้ลช็อกโกแลต Bow', nameEn: 'Double Chocolate Timber Ring Bow Bakery', spiralType: 'belt+spiral', spiralSize: 80, beltColor: 'เหลือง', barcode: '8859123416227', category: 'เบเกอรี่และขนมหวาน', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2025-01-15 16:00:00' },
    { masterProductId: '0200013', nameTh: 'Hไข่ไก่ต้มสุกตราซีพี', nameEn: 'CP Hard Boiled Egg', spiralType: 'belt', spiralSize: 1, beltColor: 'เหลือง', barcode: '8855521000235', category: 'อาหารพร้อมทาน', allowSale: '', status: 'publish', gp: 'B', startDate: '' },
    { masterProductId: '0100013', nameTh: 'แซนวิชไส้แฮมชีส Oishi', nameEn: 'OISHI EATO Ham Cheese Sandwich', spiralType: 'belt', spiralSize: 1, beltColor: 'เหลือง', barcode: '8859501320061', category: 'อาหารพร้อมทาน', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2024-10-17 07:00:00' },
    { masterProductId: '0100012', nameTh: 'แซนวิชไส้ปูอัดอลาสก้ายำสาหร่ายญี่ปุ่น Oishi', nameEn: 'OISHI EATO Japanese style Alaska Crab Stick and Wakame Seaweed Salad Sandwich', spiralType: 'belt', spiralSize: 1, beltColor: 'เหลือง', barcode: '8859501320078', category: 'อาหารพร้อมทาน', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2024-10-17 00:00:00' },
    { masterProductId: '1900046', nameTh: 'โอนิกิริแซลมอนย่างซีอิ๊ว', nameEn: 'EZYGO Salmon Teriyaki Onigiri', spiralType: 'belt+spiral', spiralSize: 60, beltColor: 'ม่วง', barcode: '8851351381216', category: 'อาหารพร้อมทาน', allowSale: 'ทุกตู้', status: 'publish', gp: 'B', startDate: '2024-11-15 08:00:00' },
    { masterProductId: '1900040', nameTh: 'โอนิกิริไข่กุ้งมายองเนส', nameEn: 'EZYGO Capelin Roe Mayonnaise Onigiri', spiralType: 'belt+spiral', spiralSize: 60, beltColor: 'ม่วง', barcode: '8851351385764', category: 'อาหารพร้อมทาน', allowSale: 'ทุกตู้', status: 'publish', gp: 'B', startDate: '2024-11-15 08:00:00' },
    { masterProductId: '2903123', nameTh: 'Hนมข้าวโอ๊ตกู๊ดเมทxKarun ชาไทย ด. 180 มล', nameEn: 'Goodmate x Karun Thai Tea Oat Milk 180 ml.', spiralType: 'belt', spiralSize: 1, beltColor: 'ม่วง', barcode: '8854761002481', category: 'นมและโยเกิร์ต', allowSale: 'ทุกตู้', status: 'publish', gp: 'B', startDate: '2026-09-04 18:00:00' },
    { masterProductId: '2903118', nameTh: 'ไวตามิ้ลค์ โปรตีนสูง ชาไต้หวัน ด.500', nameEn: 'Vitamilk High Protein Taiwanese Milk Tea Flavor 500 ml.', spiralType: 'belt', spiralSize: 1, beltColor: 'ม่วง', barcode: '8851028007333', category: 'นมและโยเกิร์ต', allowSale: 'ทุกตู้', status: 'publish', gp: 'B', startDate: '2026-08-16 17:00:00' },
    { masterProductId: '3300593', nameTh: 'Hวุ้นเส้นคัพมังกรคู่เรดดี้รสก๋วยเตี๋ยวเรือน้ำตก55ก', nameEn: 'Double Dragon Ready Vermicelli Cup Namtok Noodle Flavor 55 g.', spiralType: 'belt', spiralSize: 1, beltColor: 'เหลือง', barcode: '8850122801038', category: 'อาหารพร้อมทาน', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '3806518', nameTh: 'เนเวอร์ บายสิงห์ 100 มล.', nameEn: 'Never by SINGHA 100 ml.', spiralType: 'belt', spiralSize: 1, beltColor: 'ม่วง', barcode: '8850999027531', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-09-04 18:00:00' },
    { masterProductId: '3800983', nameTh: 'Hซีวิท ส้ม 140 มล.', nameEn: 'C-VITT ORANGE 140ML', spiralType: 'belt', spiralSize: 1, beltColor: 'ม่วง', barcode: '8851123237031', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '4901001', nameTh: 'Hเอ็ม-150 ไฮวิตามินบี12 150 มล.', nameEn: 'M-150 original 150 ml.', spiralType: 'belt', spiralSize: 1, beltColor: 'ม่วง', barcode: '8851123212021', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'B', startDate: '' },
    { masterProductId: '4901008', nameTh: 'Hกระทิงแดง 150 มล.', nameEn: 'Red Bull 150 ml.', spiralType: 'belt', spiralSize: 1, beltColor: 'ม่วง', barcode: '8850228000106', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'B', startDate: '' },
    { masterProductId: '3801004', nameTh: 'เบอร์ดี้ โรบัสต้า 170 มล.', nameEn: 'Birdy Robusta 180 ml.', spiralType: 'belt+spiral', spiralSize: 80, beltColor: 'ม่วง', barcode: '8850250000365', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'B', startDate: '' },
    { masterProductId: '4900043', nameTh: 'เรดบูลอิมพอร์ตแคน 250 มล.', nameEn: 'Red Bull Imported 250 ml.', spiralType: 'belt+spiral', spiralSize: 80, beltColor: 'ม่วง', barcode: '9002490221249', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '3806429', nameTh: 'อเมซอน ฟิซเพรสโซ ยูซุ 330 มล.', nameEn: 'Café Amazon Fizpresso Yuzu 330 ml.', spiralType: 'belt+spiral', spiralSize: 80, beltColor: 'ม่วง', barcode: '8850999027715', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-08-26 11:00:00' },
    { masterProductId: '4200400', nameTh: 'Hสิงห์เลมอนโซดา 330 มล พ.6', nameEn: 'Singha Lemon Soda 330ml. Pack 6 Pcs.', spiralType: 'belt', spiralSize: 1, beltColor: 'ม่วง', barcode: '8850999016870', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'B', startDate: '2025-10-06 03:00:00' },
    { masterProductId: '4900019', nameTh: 'Hสปอนเซอร์แคน ออริจินัล 325 มล.', nameEn: 'Sponsor Original Can 325 ml.', spiralType: 'belt+spiral', spiralSize: 80, beltColor: 'ม่วง', barcode: '8850228000588', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'B', startDate: '' },
    { masterProductId: '3100082', nameTh: 'Hชินเซน น้ำส้มคั้น 100% 250 มล.', nameEn: 'Shinsen Orange Juice 100% 250 ml.', spiralType: 'belt+spiral', spiralSize: 80, beltColor: 'ม่วง', barcode: '8859421000012', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '3001006', nameTh: 'Hนมพาสฯฮูเร่ โปรตีนสูง 340 มล. กลิ่นสตรอเบอร์รี', nameEn: 'HOORAY Protein Lactose Free Strawberry Flavor 340 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8859488111140', category: 'นมและโยเกิร์ต', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-07-13 03:00:00' },
    { masterProductId: '3002764', nameTh: 'Hนมเปรี้ยวบีทาเก้น 400 มล. พร่องมันเนย', nameEn: 'Low Fat Formula Fermented Milk 400 ml', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8850393919975', category: 'นมและโยเกิร์ต', allowSale: '', status: 'publish', gp: 'B', startDate: '' },
    { masterProductId: '3800107', nameTh: 'Hโคโค่แม็ก น้ำมะพร้าว 350 มล.', nameEn: 'Cocomax 100% Coconut Water 350 ml', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8850161160851', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '3806435', nameTh: 'เย็นเย็น จับเลี้ยงน้ำมะพร้าว 400 มล.', nameEn: 'Yen Yen Cool Herb Tea with Coconut Water 400 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8858891309199', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-09-04 18:00:00' },
    { masterProductId: '3806471', nameTh: 'อีฟ ฟรุ๊ตที มะขาม 350 มล.', nameEn: 'If Fruits Tea Tamarind Drink 350 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8859015707570', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-09-02 18:00:00' },
    { masterProductId: '3805745', nameTh: 'เฮย์ทีอู่หลงองุ่นแบล็คเคอร์แรนท์ 450 มล.', nameEn: 'HEYTEA Oolong Tea with Blackcurrant 450 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '6974348720972', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2025-11-05 08:00:00' },
    { masterProductId: '3806384', nameTh: 'เฮย์ทีกรีนทีพีชแครนเบอร์รี่ 450 มล.', nameEn: 'HEYTEA Peach Cranberry Green Tea 450ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '6974348720958', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-08-26 11:00:00' },
    { masterProductId: '3806325', nameTh: 'ชาจิงเคียวโฮอโลเวร่า 480 มล.', nameEn: 'CHA JING Kyoho Grape Tea with Aloe Vera 480 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8859015707815', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-07-28 00:00:00' },
    { masterProductId: '3800112', nameTh: 'น้ำแร่เอเวียง 500 มล.', nameEn: 'Evian Natural Mineral Water PET 500ml. (1x24)', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '3068320055008', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '3801365', nameTh: 'Hน้ำดื่มพีเอชพลัส 550 มล.', nameEn: 'ICHITAN ALKALINE WATER WITH VITAMIN B COMPLEX 550 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8858891306402', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '3806487', nameTh: 'Hยูนิฟ ออลยูนีด ผักใบเขียว 300 มล.', nameEn: 'Unif All You Need Green Veggie Juice 300 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8850388000237', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-09-04 18:00:00' },
    { masterProductId: '3802045', nameTh: 'Hโออิชิน้ำผึ้งมะนาว 500 มล.', nameEn: 'Oishi Green Tea Honey Lemon 500 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8854698005043', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '3800692', nameTh: 'Hอิชิตันน้ำผึ้งมะนาว 500 มล.', nameEn: 'ICHITAN ORGANIC GREEN TEA HONEY LEMON 600ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8858891302619', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'A', startDate: '' },
    { masterProductId: '4200027', nameTh: 'โค้กไม่มีน้ำตาล 510 มล.', nameEn: 'Coke Zero Sugar 500 ml', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8851959141076', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'B', startDate: '2024-10-17 21:00:00' },
    { masterProductId: '4200041', nameTh: 'เป๊ปซี่ 550 มล.', nameEn: 'PEPSI COLA 550ML', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8858998581047', category: 'เครื่องดื่ม', allowSale: '', status: 'publish', gp: 'B', startDate: '' },
    { masterProductId: '4200026', nameTh: 'โค้ก 510 มล.', nameEn: 'Coke Regular 500 ml', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8851959141014', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'B', startDate: '2024-10-17 21:00:00' },
    { masterProductId: '4201258', nameTh: 'เซียโล่ ลิ้นจี่ 600 มล.', nameEn: 'Beverage Drink Lychee Soda Flavour Cielo Brand 600 ml.', spiralType: 'spiral', spiralSize: 80, beltColor: '', barcode: '8858638009245', category: 'เครื่องดื่ม', allowSale: 'ทุกตู้', status: 'publish', gp: 'A', startDate: '2026-03-18 04:00:00' }
];

/* ============================================= */
/* Utility Functions (ฟังก์ชันช่วยเหลือ) */
/* ============================================= */
function $(id) {
    return document.getElementById(id);
}

function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) {
        return '0';
    }
    return Number(num).toLocaleString('en-US');
}

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function formatDateTime(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

function getTodayString() {
    return formatDate(new Date());
}

function escapeHtml(text) {
    if (text === null || text === undefined) {
        return '';
    }
    const str = String(text);
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, function (char) {
        return map[char];
    });
}

function getStatusBadgeClass(status) {
    if (!status) {
        return 'badge-info';
    }
    const lower = String(status).toLowerCase().trim();
    if (lower === 'ออนไลน์' || lower === 'ปกติ' || lower === 'ปิด' || lower === 'ล็อค' || lower === 'publish') {
        return 'badge-success';
    }
    if (lower === 'ออฟไลน์' || lower === 'ผิดปกติ' || lower === 'เปิด' || lower === 'disable') {
        return 'badge-danger';
    }
    return 'badge-info';
}

function getSlotStockClass(stock) {
    if (stock === null || stock === undefined || isNaN(stock)) {
        return 'slot-empty';
    }
    if (stock <= 0) {
        return 'slot-empty';
    }
    if (stock === 1) {
        return 'slot-low';
    }
    if (stock < MAX_STOCK_PER_SLOT) {
        return 'slot-medium';
    }
    return 'slot-full';
}

function calculateRefillQuantity(stock, max) {
    let safeStock = Number(stock);
    if (isNaN(safeStock) || safeStock < 0) {
        safeStock = 0;
    }
    const safeMax = Number(max) || MAX_STOCK_PER_SLOT;
    if (safeStock >= safeMax) {
        return 0;
    }
    return safeMax - safeStock;
}

function calculateCoinRefill(current, capacity) {
    const safeCurrent = Number(current) || 0;
    const safeCapacity = Number(capacity) || 0;
    if (safeCurrent >= safeCapacity) {
        return 0;
    }
    return safeCapacity - safeCurrent;
}

function isBoundaryLine(line) {
    if (/^ชั้นที่\s*\d+/.test(line)) {
        return true;
    }
    if (/^#\d+$/.test(line)) {
        return true;
    }
    if (/^\(\d+\)\s*\S/.test(line)) {
        return true;
    }
    return false;
}

function isNoiseHeader(line) {
    if (!/^สถานะ\S+/.test(line)) {
        return false;
    }
    if (FIELD_LABELS.indexOf(line) !== -1) {
        return false;
    }
    return true;
}

function getNextValueFromLines(lines, idx, lookahead) {
    const maxLook = lookahead || 3;
    for (let k = idx + 1; k < Math.min(idx + 1 + maxLook, lines.length); k++) {
        const v = lines[k];
        if (!v) {
            continue;
        }
        if (FIELD_LABELS.indexOf(v) !== -1) {
            return null;
        }
        if (isBoundaryLine(v)) {
            return null;
        }
        if (isNoiseHeader(v)) {
            continue;
        }
        return v;
    }
    return null;
}

/* ============================================= */
/* Notification Functions (ฟังก์ชันแจ้งเตือน) */
/* ============================================= */
let notificationTimer = null;

function showNotification(message, type) {
    const bar = $('notification-bar');
    const msgEl = $('notification-message');
    const iconEl = $('notification-icon');
    if (!bar || !msgEl) {
        return;
    }
    msgEl.textContent = message;
    bar.classList.remove('hidden');
    bar.style.backgroundColor = '';
    if (iconEl) {
        if (type === NOTIFICATION_TYPES.SUCCESS) {
            iconEl.className = 'fa-solid fa-circle-check';
        } else if (type === NOTIFICATION_TYPES.WARNING) {
            iconEl.className = 'fa-solid fa-triangle-exclamation';
        } else if (type === NOTIFICATION_TYPES.ERROR) {
            iconEl.className = 'fa-solid fa-circle-xmark';
        } else {
            iconEl.className = 'fa-solid fa-circle-info';
        }
    }
    if (type === NOTIFICATION_TYPES.SUCCESS) {
        bar.style.backgroundColor = '#d1fae5';
    } else if (type === NOTIFICATION_TYPES.WARNING) {
        bar.style.backgroundColor = '#fef3c7';
    } else if (type === NOTIFICATION_TYPES.ERROR) {
        bar.style.backgroundColor = '#fee2e2';
    } else {
        bar.style.backgroundColor = '#eff6ff';
    }
    if (notificationTimer) {
        window.clearTimeout(notificationTimer);
    }
    notificationTimer = window.setTimeout(function () {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const bar = $('notification-bar');
    if (bar) {
        bar.classList.add('hidden');
    }
}

/* ============================================= */
/* Confirm Modal Functions (ฟังก์ชัน Modal ยืนยัน) */
/* ============================================= */
function showConfirm(message, callback) {
    const modal = $('confirm-modal');
    const msgEl = $('confirm-modal-message');
    if (!modal || !msgEl) {
        return;
    }
    msgEl.textContent = message;
    modal.classList.remove('hidden');
    AppState.confirmCallback = callback;
}

function hideConfirm() {
    const modal = $('confirm-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    AppState.confirmCallback = null;
}

/* ============================================= */
/* Render: Machine Overview (แสดงภาพรวมเครื่อง) */
/* ============================================= */
function renderMachineOverview() {
    const data = AppState.machineData;
    if (!data) {
        return;
    }
    const codeEl = $('machine-activation-code');
    const provinceEl = $('machine-province');
    const districtEl = $('machine-district');
    const gmEl = $('machine-gm');
    const areaEl = $('machine-area');
    if (codeEl) {
        codeEl.textContent = data.activationCode || '-';
    }
    if (provinceEl) {
        provinceEl.textContent = data.province || '-';
    }
    if (districtEl) {
        districtEl.textContent = data.district || '-';
    }
    if (gmEl) {
        gmEl.textContent = data.gm || '-';
    }
    if (areaEl) {
        areaEl.textContent = data.area || '-';
    }
    const statusMap = [
        { id: 'status-online', value: data.status.online },
        { id: 'status-stock', value: data.status.stock },
        { id: 'status-scanner', value: data.status.scanner },
        { id: 'status-temperature', value: data.status.temperature },
        { id: 'status-banknote', value: data.status.banknote },
        { id: 'status-lift', value: data.status.lift },
        { id: 'status-door', value: data.status.door },
        { id: 'status-product-door', value: data.status.productDoor }
    ];
    statusMap.forEach(function (item) {
        const el = $(item.id);
        if (el) {
            el.textContent = item.value || '-';
            el.className = 'badge ' + getStatusBadgeClass(item.value);
        }
    });
}

/* ============================================= */
/* Render: Coin Summary (แสดงสรุปเหรียญ) */
/* ============================================= */
function renderCoinSummary() {
    const coins = AppState.machineData ? AppState.machineData.coins : { '1': 0, '5': 0, '10': 0 };
    const denominations = ['1', '5', '10'];
    denominations.forEach(function (denom) {
        const current = Number(coins[denom]) || 0;
        const capacity = COIN_CAPACITY[denom];
        const refill = calculateCoinRefill(current, capacity);
        const currentEl = $('coin-' + denom + '-current');
        const maxEl = $('coin-' + denom + '-max');
        const refillEl = $('coin-' + denom + '-refill');
        const progressEl = $('coin-' + denom + '-progress');
        if (currentEl) {
            currentEl.textContent = formatNumber(current);
        }
        if (maxEl) {
            maxEl.textContent = formatNumber(capacity);
        }
        if (refillEl) {
            refillEl.textContent = formatNumber(refill) + ' เหรียญ';
        }
        if (progressEl) {
            const percent = capacity > 0 ? Math.min(100, (current / capacity) * 100) : 0;
            progressEl.style.width = percent + '%';
        }
    });
}

/* ============================================= */
/* Render: Product Refill Summary (แสดงสรุปสินค้าที่ต้องเติม) */
/* ============================================= */
function renderProductRefillSummary() {
    const slots = AppState.slotsData || [];
    let totalSlots = 0;
    let refillSlots = 0;
    let noRefillSlots = 0;
    let totalRefillItems = 0;
    const tbody = $('refill-table-body');
    if (!tbody) {
        return;
    }
    const rows = [];
    slots.forEach(function (slot) {
        if (!slot.slot || !slot.name) {
            return;
        }
        totalSlots++;
        const stock = Number(slot.stock);
        const max = Number(slot.max) || MAX_STOCK_PER_SLOT;
        const refill = calculateRefillQuantity(stock, max);
        const displayStock = (isNaN(stock) || stock < 0) ? 0 : stock;
        if (refill > 0) {
            refillSlots++;
            totalRefillItems += refill;
        } else {
            noRefillSlots++;
        }
        const stockClass = (isNaN(stock) || stock < 0) ? 'col-stock negative' : 'col-stock';
        const refillClass = refill > 0 ? 'col-refill highlight' : 'col-refill';
        const statusBadge = refill > 0
            ? '<span class="badge badge-warning">ต้องเติม</span>'
            : '<span class="badge badge-success">ไม่ต้องเติม</span>';
        rows.push(
            '<tr>' +
                '<td class="col-slot">' + escapeHtml(slot.slot) + '</td>' +
                '<td class="col-name" title="' + escapeHtml(slot.name) + '">' + escapeHtml(slot.name) + '</td>' +
                '<td class="' + stockClass + '">' + displayStock + '</td>' +
                '<td class="col-max">' + max + '</td>' +
                '<td class="' + refillClass + '">' + refill + '</td>' +
                '<td class="col-status">' + statusBadge + '</td>' +
            '</tr>'
        );
    });
    if (rows.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="6" class="text-center"><i class="fa-solid fa-inbox"></i><p>ยังไม่มีข้อมูล กรุณานำเข้าไฟล์ (Import) ก่อน</p></td></tr>';
    } else {
        tbody.innerHTML = rows.join('');
    }
    const totalSlotsEl = $('total-slots-count');
    const refillSlotsEl = $('refill-slots-count');
    const noRefillSlotsEl = $('no-refill-slots-count');
    const totalRefillItemsEl = $('total-refill-items');
    if (totalSlotsEl) {
        totalSlotsEl.textContent = formatNumber(totalSlots);
    }
    if (refillSlotsEl) {
        refillSlotsEl.textContent = formatNumber(refillSlots);
    }
    if (noRefillSlotsEl) {
        noRefillSlotsEl.textContent = formatNumber(noRefillSlots);
    }
    if (totalRefillItemsEl) {
        totalRefillItemsEl.textContent = formatNumber(totalRefillItems);
    }
}

/* ============================================= */
/* Render: Machine Layout (แสดงแผนผังตู้) */
/* ============================================= */
function renderMachineLayout() {
    const container = $('shelves-container');
    if (!container) {
        return;
    }
    const slots = AppState.slotsData || [];
    if (slots.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fa-solid fa-inbox"></i><p>ยังไม่มีข้อมูล กรุณานำเข้าไฟล์ (Import) ก่อน</p></div>';
        return;
    }
    const slotMap = {};
    slots.forEach(function (slot) {
        slotMap[slot.slot] = slot;
    });
    const shelvesHtml = [];
    SHELF_GROUPS.forEach(function (group) {
        const slotCards = [];
        for (let i = group.start; i <= group.end; i++) {
            const slotKey = '#' + i;
            const slot = slotMap[slotKey];
            if (!slot || !slot.name) {
                slotCards.push(
                    '<div class="slot-card slot-empty">' +
                        '<div class="slot-header">' + slotKey + '</div>' +
                        '<div class="slot-body">' +
                            '<p class="product-name">-</p>' +
                            '<p class="product-price">-</p>' +
                            '<p class="product-stock">0/4</p>' +
                        '</div>' +
                    '</div>'
                );
                continue;
            }
            const stock = Number(slot.stock);
            const displayStock = (isNaN(stock) || stock < 0) ? 0 : stock;
            const max = Number(slot.max) || MAX_STOCK_PER_SLOT;
            const stockClass = getSlotStockClass(displayStock);
            const shortName = slot.name.length > 20 ? slot.name.substring(0, 20) + '...' : slot.name;
            slotCards.push(
                '<div class="slot-card ' + stockClass + '">' +
                    '<div class="slot-header">' + escapeHtml(slot.slot) + '</div>' +
                    '<div class="slot-body">' +
                        '<p class="product-name" title="' + escapeHtml(slot.name) + '">' + escapeHtml(shortName) + '</p>' +
                        '<p class="product-price">' + (slot.price ? formatNumber(slot.price) + ' บาท' : '-') + '</p>' +
                        '<p class="product-stock">' + displayStock + '/' + max + '</p>' +
                    '</div>' +
                '</div>'
            );
        }
        shelvesHtml.push(
            '<div class="shelf">' +
                '<h3><i class="fa-solid fa-layer-group"></i> ชั้นที่ ' + group.shelf + '</h3>' +
                '<div class="slots-scroll-wrapper">' +
                    '<div class="slots-grid">' + slotCards.join('') + '</div>' +
                '</div>' +
            '</div>'
        );
    });
    container.innerHTML = shelvesHtml.join('');
}

/* ============================================= */
/* Render: Master Product List (แสดงรายการสินค้าทั้งหมด) */
/* ============================================= */
function applyFilters() {
    const products = AppState.productsData || [];
    const filters = AppState.filters;
    const search = (filters.search || '').toLowerCase().trim();
    const category = (filters.category || '').trim();
    const status = (filters.status || '').trim();
    AppState.filteredProducts = products.filter(function (product) {
        if (search) {
            const nameTh = (product.nameTh || '').toLowerCase();
            const nameEn = (product.nameEn || '').toLowerCase();
            const barcode = String(product.barcode || '').toLowerCase();
            const masterId = String(product.masterProductId || '').toLowerCase();
            if (nameTh.indexOf(search) === -1 &&
                nameEn.indexOf(search) === -1 &&
                barcode.indexOf(search) === -1 &&
                masterId.indexOf(search) === -1) {
                return false;
            }
        }
        if (category && product.category !== category) {
            return false;
        }
        if (status && product.status !== status) {
            return false;
        }
        return true;
    });
}

function renderMasterProductList() {
    applyFilters();
    const tbody = $('master-product-table-body');
    if (!tbody) {
        return;
    }
    const list = AppState.filteredProducts;
    if (list.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="11" class="text-center"><i class="fa-solid fa-inbox"></i><p>ไม่พบข้อมูลสินค้า</p></td></tr>';
    } else {
        const rows = list.map(function (product) {
            const statusClass = product.status === 'publish' ? 'badge-success' : 'badge-danger';
            return (
                '<tr>' +
                    '<td>' + escapeHtml(product.masterProductId) + '</td>' +
                    '<td class="col-name" title="' + escapeHtml(product.nameTh) + '">' + escapeHtml(product.nameTh) + '</td>' +
                    '<td class="col-name" title="' + escapeHtml(product.nameEn) + '">' + escapeHtml(product.nameEn) + '</td>' +
                    '<td>' + escapeHtml(product.spiralType) + '</td>' +
                    '<td>' + escapeHtml(product.spiralSize) + '</td>' +
                    '<td>' + escapeHtml(product.beltColor) + '</td>' +
                    '<td>' + escapeHtml(product.barcode) + '</td>' +
                    '<td>' + escapeHtml(product.category) + '</td>' +
                    '<td>' + escapeHtml(product.gp) + '</td>' +
                    '<td><span class="badge ' + statusClass + '">' + escapeHtml(product.status) + '</span></td>' +
                    '<td>' + escapeHtml(product.startDate) + '</td>' +
                '</tr>'
            );
        });
        tbody.innerHTML = rows.join('');
    }
    const countEl = $('master-product-count');
    if (countEl) {
        countEl.textContent = 'แสดง ' + formatNumber(list.length) + ' รายการ';
    }
}

/* ============================================= */
/* Render: Category Filter Options (สร้างตัวเลือกหมวดหมู่) */
/* ============================================= */
function renderCategoryOptions() {
    const select = $('filter-category');
    if (!select) {
        return;
    }
    const categories = [];
    const seen = {};
    (AppState.productsData || []).forEach(function (product) {
        const cat = product.category;
        if (cat && !seen[cat]) {
            seen[cat] = true;
            categories.push(cat);
        }
    });
    categories.sort();
    const options = ['<option value="">ทุกหมวดหมู่</option>'];
    categories.forEach(function (cat) {
        options.push('<option value="' + escapeHtml(cat) + '">' + escapeHtml(cat) + '</option>');
    });
    select.innerHTML = options.join('');
    select.value = AppState.filters.category || '';
}

/* ============================================= */
/* Render: All (แสดงผลทั้งหมด) */
/* ============================================= */
function renderAll() {
    renderMachineOverview();
    renderCoinSummary();
    renderProductRefillSummary();
    renderMachineLayout();
    renderCategoryOptions();
    renderMasterProductList();
}

/* ============================================= */
/* Parser Functions (ฟังก์ชันแยกวิเคราะห์ข้อมูล) */
/* ============================================= */
function parseMachineSheet(rows) {
    if (!rows || rows.length < 2) {
        return null;
    }
    const machine = {
        activationCode: '',
        province: '',
        district: '',
        gm: '',
        area: '',
        status: {
            online: '',
            stock: '',
            scanner: '',
            temperature: '',
            banknote: '',
            lift: '',
            door: '',
            productDoor: ''
        },
        coins: { '1': 0, '5': 0, '10': 0 }
    };
    rows.forEach(function (row) {
        if (!row || row.length < 2) {
            return;
        }
        const key = String(row[0]).trim();
        const value = row[1];
        if (key === 'activationCode') {
            machine.activationCode = value;
        } else if (key === 'province') {
            machine.province = value;
        } else if (key === 'district') {
            machine.district = value;
        } else if (key === 'gm') {
            machine.gm = value;
        } else if (key === 'area') {
            machine.area = value;
        } else if (key === 'status.online') {
            machine.status.online = value;
        } else if (key === 'status.stock') {
            machine.status.stock = value;
        } else if (key === 'status.scanner') {
            machine.status.scanner = value;
        } else if (key === 'status.temperature') {
            machine.status.temperature = value;
        } else if (key === 'status.banknote') {
            machine.status.banknote = value;
        } else if (key === 'status.lift') {
            machine.status.lift = value;
        } else if (key === 'status.door') {
            machine.status.door = value;
        } else if (key === 'status.productDoor') {
            machine.status.productDoor = value;
        } else if (key === 'coins.1') {
            machine.coins['1'] = Number(value) || 0;
        } else if (key === 'coins.5') {
            machine.coins['5'] = Number(value) || 0;
        } else if (key === 'coins.10') {
            machine.coins['10'] = Number(value) || 0;
        }
    });
    return machine;
}

function parseSlotsSheet(rows) {
    const slots = [];
    rows.forEach(function (row) {
        const slot = row.slot || row.Slot || row['ช่อง'] || '';
        if (!slot) {
            return;
        }
        const stock = Number(row.stock !== undefined ? row.stock : row['คงเหลือ']) || 0;
        const max = Number(row.max !== undefined ? row.max : row['สูงสุด']) || MAX_STOCK_PER_SLOT;
        slots.push({
            slot: String(slot),
            name: row.name !== undefined ? String(row.name) : (row['ชื่อสินค้า'] || ''),
            price: Number(row.price !== undefined ? row.price : row['ราคา']) || 0,
            stock: stock,
            max: max,
            dropTest: row.dropTest !== undefined ? String(row.dropTest) : '-',
            dropTestDate: row.dropTestDate !== undefined ? String(row.dropTestDate) : '-',
            channelStatus: row.channelStatus !== undefined ? String(row.channelStatus) : '-',
            rank: row.rank !== undefined ? String(row.rank) : '-',
            m: row.m !== undefined ? row.m : '-',
            gp: row.gp !== undefined ? String(row.gp) : '-'
        });
    });
    return slots;
}

function parseProductsSheet(rows) {
    return rows.map(function (row) {
        return {
            masterProductId: row['Master Product ID'] !== undefined ? String(row['Master Product ID']) : (row.masterProductId !== undefined ? String(row.masterProductId) : ''),
            nameTh: row['ชื่อสินค้า'] !== undefined ? String(row['ชื่อสินค้า']) : (row.nameTh !== undefined ? String(row.nameTh) : ''),
            nameEn: row['ชื่อสินค้า EN'] !== undefined ? String(row['ชื่อสินค้า EN']) : (row.nameEn !== undefined ? String(row.nameEn) : ''),
            spiralType: row['ประเภท Spiral'] !== undefined ? String(row['ประเภท Spiral']) : (row.spiralType !== undefined ? String(row.spiralType) : ''),
            spiralSize: row['ขนาด Spiral'] !== undefined ? String(row['ขนาด Spiral']) : (row.spiralSize !== undefined ? String(row.spiralSize) : ''),
            beltColor: row['สีสายพาน'] !== undefined ? String(row['สีสายพาน']) : (row.beltColor !== undefined ? String(row.beltColor) : ''),
            barcode: row['Barcode'] !== undefined ? String(row['Barcode']) : (row.barcode !== undefined ? String(row.barcode) : ''),
            category: row['หมวดหมู่'] !== undefined ? String(row['หมวดหมู่']) : (row.category !== undefined ? String(row.category) : ''),
            allowSale: row['อนุญาตขาย'] !== undefined ? String(row['อนุญาตขาย']) : (row.allowSale !== undefined ? String(row.allowSale) : ''),
            status: row['สถานะ'] !== undefined ? String(row['สถานะ']) : (row.status !== undefined ? String(row.status) : ''),
            gp: row['%GP'] !== undefined ? String(row['%GP']) : (row.gp !== undefined ? String(row.gp) : ''),
            startDate: row['วันที่เริ่มจำหน่าย'] !== undefined ? String(row['วันที่เริ่มจำหน่าย']) : (row.startDate !== undefined ? String(row.startDate) : '')
        };
    }).filter(function (p) {
        return p.masterProductId || p.nameTh;
    });
}

function parsePmaSheet(rows) {
    return rows.map(function (row) {
        return {
            pma: row['PMA'] !== undefined ? String(row['PMA']) : 'PMA',
            no: row['No.'] !== undefined ? String(row['No.']) : '',
            name: row['Name'] !== undefined ? String(row['Name']) : ''
        };
    }).filter(function (p) {
        return p.no || p.name;
    });
}

function parseCsvText(text) {
    const rows = [];
    let current = '';
    let row = [];
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        if (inQuotes) {
            if (char === '"' && nextChar === '"') {
                current += '"';
                i++;
            } else if (char === '"') {
                inQuotes = false;
            } else {
                current += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                row.push(current);
                current = '';
            } else if (char === '\n') {
                row.push(current);
                rows.push(row);
                row = [];
                current = '';
            } else if (char === '\r') {
                if (nextChar !== '\n') {
                    row.push(current);
                    rows.push(row);
                    row = [];
                    current = '';
                }
            } else {
                current += char;
            }
        }
    }
    if (current !== '' || row.length > 0) {
        row.push(current);
        rows.push(row);
    }
    return rows;
}

/* ============================================= */
/* Parser: Vending TXT (แยกวิเคราะห์ไฟล์ .txt) */
/* ============================================= */
function parseVendingTxt(text) {
    const rawLines = text.split('\n');
    const lines = rawLines.map(function (line) {
        return line.trim();
    });

    const machine = {
        activationCode: '',
        province: '',
        district: '',
        gm: '',
        area: '',
        status: {
            online: '',
            stock: '',
            scanner: '',
            temperature: '',
            banknote: '',
            lift: '',
            door: '',
            productDoor: ''
        },
        coins: { '1': 0, '5': 0, '10': 0 }
    };

    const activationMatch = text.match(/Machine Activation Code:\s*(\S+)/);
    if (activationMatch) {
        machine.activationCode = activationMatch[1];
    }

    function findStatusValue(label) {
        for (let k = 0; k < lines.length; k++) {
            if (lines[k] === label) {
                const v = getNextValueFromLines(lines, k, 3);
                if (v) {
                    return v;
                }
            }
        }
        return '';
    }

    machine.status.online = findStatusValue('สถานะเครื่อง');
    machine.status.stock = findStatusValue('สถานะสต๊อก');
    machine.status.scanner = findStatusValue('สถานะสแกนเนอร์');
    machine.status.temperature = findStatusValue('สถานะอุณหภูมิ');
    machine.status.banknote = findStatusValue('สถานะธนบัตร');
    machine.status.lift = findStatusValue('สถานะลิฟท์ส่งสินค้า');
    machine.status.door = findStatusValue('สถานะประตู');
    machine.status.productDoor = findStatusValue('สถานะประตูสินค้า');

    const coinRegex = /(\d+)\s*฿\s*\*\s*(\d+)/g;
    let coinMatch = coinRegex.exec(text);
    while (coinMatch !== null) {
        const denom = String(coinMatch[1]);
        const count = parseInt(coinMatch[2], 10);
        if (denom === '1' || denom === '5' || denom === '10') {
            machine.coins[denom] = count;
        }
        coinMatch = coinRegex.exec(text);
    }

    const slots = [];
    let currentSlot = null;
    let currentFloor = null;
    let pendingSlot = null;
    const nameRegex = /^\((\d+)\)\s*(\S.*)$/;
    const floorRegex = /^ชั้นที่\s*(\d+)/;
    const slotRegex = /^#(\d+)$/;
    const stockRegex = /^(\d+)\s*\/\s*(\d+)$/;
    const dateRegex = /^\d{1,2}\s+\S+\s+\d{4}\s+\d{2}:\d{2}$/;
    const numberRegex = /^-?\d+(?:\.\d+)?$/;

    for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        if (!ln) {
            continue;
        }

        const floorMatch = ln.match(floorRegex);
        if (floorMatch) {
            if (currentSlot) {
                slots.push(currentSlot);
                currentSlot = null;
            }
            currentFloor = parseInt(floorMatch[1], 10);
            pendingSlot = null;
            continue;
        }

        const slotMatch = ln.match(slotRegex);
        if (slotMatch) {
            if (currentSlot) {
                slots.push(currentSlot);
                currentSlot = null;
            }
            pendingSlot = '#' + slotMatch[1];
            continue;
        }

        const nameMatch = ln.match(nameRegex);
        if (nameMatch) {
            if (currentSlot) {
                slots.push(currentSlot);
            }
            currentSlot = {
                slot: pendingSlot || '',
                floor: currentFloor,
                name: nameMatch[2].trim(),
                qtyPerSlot: parseInt(nameMatch[1], 10),
                price: 0,
                stock: 0,
                max: MAX_STOCK_PER_SLOT,
                dropTest: '-',
                dropTestDate: '-',
                channelStatus: '-',
                rank: '-',
                m: '-',
                gp: '-'
            };
            pendingSlot = null;
            continue;
        }

        if (!currentSlot) {
            continue;
        }

        if (ln.indexOf('ราคา') === 0) {
            const priceMatch = ln.match(/(\d+(?:\.\d{1,2})?)/);
            if (priceMatch) {
                currentSlot.price = parseFloat(priceMatch[1]);
            }
            continue;
        }

        const stockMatch = ln.match(stockRegex);
        if (stockMatch) {
            currentSlot.stock = parseInt(stockMatch[1], 10);
            currentSlot.max = parseInt(stockMatch[2], 10);
            continue;
        }

        if (DROP_TEST_VALUES.indexOf(ln) !== -1) {
            currentSlot.dropTest = ln;
            continue;
        }

        if (dateRegex.test(ln)) {
            currentSlot.dropTestDate = ln;
            continue;
        }

        if (ln === 'สถานะช่องขาย') {
            const v = getNextValueFromLines(lines, i, 3);
            if (v) {
                currentSlot.channelStatus = v;
            }
            continue;
        }

        if (ln === 'Rank') {
            const v = getNextValueFromLines(lines, i, 3);
            if (v) {
                currentSlot.rank = v;
            }
            continue;
        }

        if (ln === 'GP') {
            const v = getNextValueFromLines(lines, i, 3);
            if (v) {
                currentSlot.gp = v;
            }
            continue;
        }

        if (ln === 'm') {
            const v = getNextValueFromLines(lines, i, 3);
            if (v && numberRegex.test(v)) {
                currentSlot.m = parseFloat(v);
            }
            continue;
        }
    }

    if (currentSlot) {
        slots.push(currentSlot);
    }

    return {
        machine: machine,
        slots: slots
    };
}

/* ============================================= */
/* Import: TXT (นำเข้าไฟล์ vending.txt) */
/* ============================================= */
function importTxt(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const text = e.target.result;
            const parsed = parseVendingTxt(text);
            if (!parsed.machine || !parsed.machine.activationCode) {
                showNotification('ไม่พบข้อมูลเครื่องในไฟล์ .txt (Machine Activation Code หายไป)', NOTIFICATION_TYPES.WARNING);
                return;
            }
            if (!parsed.slots || parsed.slots.length === 0) {
                showNotification('ไม่พบข้อมูลสินค้าในช่องขายในไฟล์ .txt', NOTIFICATION_TYPES.WARNING);
                return;
            }

            const oldMachine = AppState.machineData || {};
            AppState.machineData = {
                activationCode: parsed.machine.activationCode,
                province: oldMachine.province || '',
                district: oldMachine.district || '',
                gm: oldMachine.gm || '',
                area: oldMachine.area || '',
                status: parsed.machine.status,
                coins: parsed.machine.coins
            };

            AppState.slotsData = parsed.slots;
            renderAll();
            showNotification('นำเข้าไฟล์ .txt สำเร็จ (อัปเดตข้อมูลเครื่อง เหรียญ และช่องขาย)', NOTIFICATION_TYPES.SUCCESS);
        } catch (error) {
            showNotification('เกิดข้อผิดพลาดในการอ่านไฟล์ .txt: ' + error.message, NOTIFICATION_TYPES.ERROR);
        }
    };
    reader.readAsText(file, 'UTF-8');
}

/* ============================================= */
/* Import: XLSX (นำเข้าไฟล์ Excel) */
/* ============================================= */
function importXlsx(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            let imported = false;
            if (workbook.SheetNames.indexOf('Machine') !== -1) {
                const sheet = workbook.Sheets['Machine'];
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const machine = parseMachineSheet(rows);
                if (machine) {
                    const oldMachine = AppState.machineData || {};
                    machine.province = machine.province || oldMachine.province || '';
                    machine.district = machine.district || oldMachine.district || '';
                    machine.gm = machine.gm || oldMachine.gm || '';
                    machine.area = machine.area || oldMachine.area || '';
                    AppState.machineData = machine;
                    imported = true;
                }
            }
            if (workbook.SheetNames.indexOf('Slots') !== -1) {
                const sheet = workbook.Sheets['Slots'];
                const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
                const slots = parseSlotsSheet(rows);
                if (slots.length > 0) {
                    AppState.slotsData = slots;
                    imported = true;
                }
            }
            if (workbook.SheetNames.indexOf('Products') !== -1) {
                const sheet = workbook.Sheets['Products'];
                const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
                const products = parseProductsSheet(rows);
                if (products.length > 0) {
                    AppState.productsData = products;
                    imported = true;
                }
            }
            if (workbook.SheetNames.indexOf('PMA') !== -1) {
                const sheet = workbook.Sheets['PMA'];
                const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
                const pma = parsePmaSheet(rows);
                if (pma.length > 0) {
                    AppState.pmaData = pma;
                    imported = true;
                }
            }
            if (imported) {
                renderAll();
                showNotification('นำเข้าไฟล์ .xlsx สำเร็จ', NOTIFICATION_TYPES.SUCCESS);
            } else {
                showNotification('ไม่พบข้อมูลที่สามารถนำเข้าได้ในไฟล์ .xlsx', NOTIFICATION_TYPES.WARNING);
            }
        } catch (error) {
            showNotification('เกิดข้อผิดพลาดในการอ่านไฟล์ .xlsx: ' + error.message, NOTIFICATION_TYPES.ERROR);
        }
    };
    reader.readAsArrayBuffer(file);
}

/* ============================================= */
/* Import: CSV (นำเข้าไฟล์ CSV) */
/* ============================================= */
function importCsv(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const text = e.target.result;
            const rows = parseCsvText(text);
            if (rows.length < 2) {
                showNotification('ไฟล์ CSV ไม่มีข้อมูลเพียงพอ', NOTIFICATION_TYPES.WARNING);
                return;
            }
            const header = rows[0].map(function (h) {
                return String(h).trim();
            });
            const dataRows = rows.slice(1).map(function (row) {
                const obj = {};
                header.forEach(function (key, index) {
                    obj[key] = row[index] !== undefined ? row[index] : '';
                });
                return obj;
            });
            if (header.indexOf('slot') !== -1 || header.indexOf('Slot') !== -1) {
                AppState.slotsData = parseSlotsSheet(dataRows);
                renderAll();
                showNotification('นำเข้าไฟล์ .csv (Slots) สำเร็จ', NOTIFICATION_TYPES.SUCCESS);
                return;
            }
            if (header.indexOf('Master Product ID') !== -1) {
                AppState.productsData = parseProductsSheet(dataRows);
                renderAll();
                showNotification('นำเข้าไฟล์ .csv (Products) สำเร็จ', NOTIFICATION_TYPES.SUCCESS);
                return;
            }
            showNotification('ไม่รู้จักรูปแบบไฟล์ CSV', NOTIFICATION_TYPES.WARNING);
        } catch (error) {
            showNotification('เกิดข้อผิดพลาดในการอ่านไฟล์ .csv: ' + error.message, NOTIFICATION_TYPES.ERROR);
        }
    };
    reader.readAsText(file, 'UTF-8');
}

/* ============================================= */
/* Import: JSON (นำเข้าไฟล์ JSON) */
/* ============================================= */
function importJson(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            let imported = false;
            if (data.machineData) {
                AppState.machineData = data.machineData;
                imported = true;
            }
            if (data.slotsData && Array.isArray(data.slotsData)) {
                AppState.slotsData = data.slotsData;
                imported = true;
            }
            if (data.productsData && Array.isArray(data.productsData)) {
                AppState.productsData = data.productsData;
                imported = true;
            }
            if (data.pmaData && Array.isArray(data.pmaData)) {
                AppState.pmaData = data.pmaData;
                imported = true;
            }
            if (imported) {
                renderAll();
                showNotification('นำเข้าไฟล์ .json สำเร็จ', NOTIFICATION_TYPES.SUCCESS);
            } else {
                showNotification('ไม่พบข้อมูลที่สามารถนำเข้าได้ในไฟล์ .json', NOTIFICATION_TYPES.WARNING);
            }
        } catch (error) {
            showNotification('เกิดข้อผิดพลาดในการอ่านไฟล์ .json: ' + error.message, NOTIFICATION_TYPES.ERROR);
        }
    };
    reader.readAsText(file, 'UTF-8');
}

/* ============================================= */
/* Build: Refill Sheet (สร้างข้อมูลชีต "การเติมสินค้า") */
/* ============================================= */
function buildRefillSheetData() {
    const slots = AppState.slotsData || [];
    const products = AppState.productsData || [];

    const productMap = {};
    products.forEach(function (p) {
        if (p.nameTh) {
            productMap[p.nameTh] = p;
        }
    });

    const header = [
        'รหัสสินค้า',
        'ชื่อสินค้า',
        'PMA',
        'บาร์โค้ด',
        'คงเหลือ',
        'ค่า MAX',
        'ต้องเติม',
        'นำไปเติม',
        'หลังเติม'
    ];
    const rows = [header];
    const refillInfo = [];

    slots.forEach(function (slot) {
        if (!slot.slot || !slot.name) {
            return;
        }
        const product = productMap[slot.name] || {};
        const masterId = product.masterProductId || '';
        let pma = '';
        if (masterId && masterId.length >= 2) {
            pma = String(masterId).substring(0, 2);
        }
        const barcode = product.barcode || '';
        const stock = Number(slot.stock);
        const cleanStock = (isNaN(stock) || stock < 0) ? 0 : stock;
        const max = Number(slot.max) || MAX_STOCK_PER_SLOT;

        rows.push([
            masterId,
            slot.name,
            pma,
            barcode,
            cleanStock,
            max,
            '',
            '',
            ''
        ]);
        refillInfo.push({
            name: slot.name,
            masterId: masterId
        });
    });

    return {
        rows: rows,
        refillInfo: refillInfo
    };
}

function applyRefillSheetFormulas(ws, rowCount) {
    for (let row = 2; row <= rowCount; row++) {
        const gKey = 'G' + row;
        ws[gKey] = { t: 'n', f: 'MAX(0,F' + row + '-E' + row + ')' };

        const hKey = 'H' + row;
        if (!ws[hKey]) {
            ws[hKey] = { t: 's', v: '' };
        }

        const iKey = 'I' + row;
        ws[iKey] = { t: 'n', f: 'IF(H' + row + '<>0,E' + row + '+H' + row + ',E' + row + ')' };
    }

    const totalRow = rowCount + 1;
    const aKey = 'A' + totalRow;
    ws[aKey] = { t: 's', v: 'รวม' };

    const bKey = 'B' + totalRow;
    ws[bKey] = { t: 's', v: 'จำนวนรวม' };

    const gKey = 'G' + totalRow;
    ws[gKey] = { t: 'n', f: 'SUM(G2:G' + rowCount + ')' };

    const hKey = 'H' + totalRow;
    ws[hKey] = { t: 'n', f: 'SUM(H2:H' + rowCount + ')' };

    const iKey = 'I' + totalRow;
    ws[iKey] = { t: 'n', f: 'SUM(I2:I' + rowCount + ')' };
}

function buildRefillSheet() {
    const data = buildRefillSheetData();
    const ws = XLSX.utils.aoa_to_sheet(data.rows);

    if (data.rows.length > 1) {
        applyRefillSheetFormulas(ws, data.rows.length);
    }

    ws['!cols'] = [
        { wch: 14 },
        { wch: 45 },
        { wch: 8 },
        { wch: 16 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
        { wch: 12 },
        { wch: 10 }
    ];

    ws['!freeze'] = { xSplit: 0, ySplit: 1 };

    return ws;
}

/* ============================================= */
/* Export: XLSX (ส่งออกเป็นไฟล์ Excel) */
/* ============================================= */
function buildMachineRows(machine) {
    const rows = [
        ['key', 'value'],
        ['activationCode', machine.activationCode || ''],
        ['province', machine.province || ''],
        ['district', machine.district || ''],
        ['gm', machine.gm || ''],
        ['area', machine.area || ''],
        ['status.online', machine.status.online || ''],
        ['status.stock', machine.status.stock || ''],
        ['status.scanner', machine.status.scanner || ''],
        ['status.temperature', machine.status.temperature || ''],
        ['status.banknote', machine.status.banknote || ''],
        ['status.lift', machine.status.lift || ''],
        ['status.door', machine.status.door || ''],
        ['status.productDoor', machine.status.productDoor || ''],
        ['coins.1', machine.coins['1'] || 0],
        ['coins.5', machine.coins['5'] || 0],
        ['coins.10', machine.coins['10'] || 0]
    ];
    return rows;
}

function exportXlsx() {
    try {
        const workbook = XLSX.utils.book_new();

        const wsRefill = buildRefillSheet();
        XLSX.utils.book_append_sheet(workbook, wsRefill, 'การเติมสินค้า');

        if (AppState.machineData) {
            const machineRows = buildMachineRows(AppState.machineData);
            const ws = XLSX.utils.aoa_to_sheet(machineRows);
            XLSX.utils.book_append_sheet(workbook, ws, 'Machine');
        }

        if (AppState.slotsData && AppState.slotsData.length > 0) {
            const slotHeaders = ['slot', 'name', 'price', 'stock', 'max', 'dropTest', 'dropTestDate', 'channelStatus', 'rank', 'm', 'gp'];
            const slotRows = [slotHeaders];
            AppState.slotsData.forEach(function (s) {
                slotRows.push([s.slot, s.name, s.price, s.stock, s.max, s.dropTest, s.dropTestDate, s.channelStatus, s.rank, s.m, s.gp]);
            });
            const ws = XLSX.utils.aoa_to_sheet(slotRows);
            XLSX.utils.book_append_sheet(workbook, ws, 'Slots');
        }

        if (AppState.productsData && AppState.productsData.length > 0) {
            const productHeaders = ['Master Product ID', 'ชื่อสินค้า', 'ชื่อสินค้า EN', 'ประเภท Spiral', 'ขนาด Spiral', 'สีสายพาน', 'Barcode', 'หมวดหมู่', 'อนุญาตขาย', 'สถานะ', '%GP', 'วันที่เริ่มจำหน่าย'];
            const productRows = [productHeaders];
            AppState.productsData.forEach(function (p) {
                productRows.push([p.masterProductId, p.nameTh, p.nameEn, p.spiralType, p.spiralSize, p.beltColor, p.barcode, p.category, p.allowSale, p.status, p.gp, p.startDate]);
            });
            const ws = XLSX.utils.aoa_to_sheet(productRows);
            XLSX.utils.book_append_sheet(workbook, ws, 'Products');
        }

        if (AppState.pmaData && AppState.pmaData.length > 0) {
            const pmaHeaders = ['PMA', 'No.', 'Name'];
            const pmaRows = [pmaHeaders];
            AppState.pmaData.forEach(function (p) {
                pmaRows.push([p.pma, p.no, p.name]);
            });
            const ws = XLSX.utils.aoa_to_sheet(pmaRows);
            XLSX.utils.book_append_sheet(workbook, ws, 'PMA');
        }

        XLSX.writeFile(workbook, 'product.xlsx');
        showNotification('ส่งออกไฟล์ product.xlsx สำเร็จ (มีชีต "การเติมสินค้า" เป็นชีตแรก)', NOTIFICATION_TYPES.SUCCESS);
    } catch (error) {
        showNotification('เกิดข้อผิดพลาดในการส่งออกไฟล์ .xlsx: ' + error.message, NOTIFICATION_TYPES.ERROR);
    }
}

/* ============================================= */
/* Export: CSV (ส่งออกเป็นไฟล์ CSV) */
/* ============================================= */
function exportCsv() {
    try {
        const headers = ['slot', 'name', 'price', 'stock', 'max', 'refillQuantity', 'dropTest', 'dropTestDate', 'channelStatus', 'rank', 'm', 'gp'];
        const rows = [headers];
        (AppState.slotsData || []).forEach(function (s) {
            const stock = Number(s.stock);
            const max = Number(s.max) || MAX_STOCK_PER_SLOT;
            const refill = calculateRefillQuantity(stock, max);
            rows.push([s.slot, s.name, s.price, stock, max, refill, s.dropTest, s.dropTestDate, s.channelStatus, s.rank, s.m, s.gp]);
        });
        const csvContent = rows.map(function (row) {
            return row.map(function (cell) {
                const str = cell === null || cell === undefined ? '' : String(cell);
                if (str.indexOf(',') !== -1 || str.indexOf('"') !== -1 || str.indexOf('\n') !== -1) {
                    return '"' + str.replace(/"/g, '""') + '"';
                }
                return str;
            }).join(',');
        }).join('\n');
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'product_' + getTodayString() + '.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showNotification('ส่งออกไฟล์ product_' + getTodayString() + '.csv สำเร็จ', NOTIFICATION_TYPES.SUCCESS);
    } catch (error) {
        showNotification('เกิดข้อผิดพลาดในการส่งออกไฟล์ .csv: ' + error.message, NOTIFICATION_TYPES.ERROR);
    }
}

/* ============================================= */
/* Export: JSON (ส่งออกเป็นไฟล์ JSON) */
/* ============================================= */
function exportJson() {
    try {
        const data = {
            exportDate: formatDateTime(new Date()),
            machineData: AppState.machineData,
            slotsData: AppState.slotsData,
            productsData: AppState.productsData,
            pmaData: AppState.pmaData
        };
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'product_' + getTodayString() + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showNotification('ส่งออกไฟล์ product_' + getTodayString() + '.json สำเร็จ', NOTIFICATION_TYPES.SUCCESS);
    } catch (error) {
        showNotification('เกิดข้อผิดพลาดในการส่งออกไฟล์ .json: ' + error.message, NOTIFICATION_TYPES.ERROR);
    }
}

/* ============================================= */
/* Reset Filters (ล้างตัวกรอง) */
/* ============================================= */
function resetFilters() {
    AppState.filters.search = '';
    AppState.filters.category = '';
    AppState.filters.status = '';
    const searchEl = $('search-product');
    const categoryEl = $('filter-category');
    const statusEl = $('filter-status');
    if (searchEl) {
        searchEl.value = '';
    }
    if (categoryEl) {
        categoryEl.value = '';
    }
    if (statusEl) {
        statusEl.value = '';
    }
    renderMasterProductList();
    showNotification('ล้างตัวกรองแล้ว', NOTIFICATION_TYPES.INFO);
}

/* ============================================= */
/* Event Binding (ผูกเหตุการณ์) */
/* ============================================= */
function bindEvents() {
    const importTxtEl = $('import-txt');
    const importXlsxEl = $('import-xlsx');
    const importCsvEl = $('import-csv');
    const importJsonEl = $('import-json');
    const exportXlsxEl = $('export-xlsx');
    const exportCsvEl = $('export-csv');
    const exportJsonEl = $('export-json');
    const notificationCloseEl = $('notification-close');
    const confirmCancelEl = $('confirm-modal-cancel');
    const confirmOkEl = $('confirm-modal-ok');
    const searchEl = $('search-product');
    const categoryEl = $('filter-category');
    const statusEl = $('filter-status');
    const clearFiltersEl = $('clear-filters');

    if (importTxtEl) {
        importTxtEl.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                importTxt(file);
            }
            e.target.value = '';
        });
    }

    if (importXlsxEl) {
        importXlsxEl.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                importXlsx(file);
            }
            e.target.value = '';
        });
    }

    if (importCsvEl) {
        importCsvEl.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                importCsv(file);
            }
            e.target.value = '';
        });
    }

    if (importJsonEl) {
        importJsonEl.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                importJson(file);
            }
            e.target.value = '';
        });
    }

    if (exportXlsxEl) {
        exportXlsxEl.addEventListener('click', function () {
            exportXlsx();
        });
    }

    if (exportCsvEl) {
        exportCsvEl.addEventListener('click', function () {
            exportCsv();
        });
    }

    if (exportJsonEl) {
        exportJsonEl.addEventListener('click', function () {
            exportJson();
        });
    }

    if (notificationCloseEl) {
        notificationCloseEl.addEventListener('click', function () {
            hideNotification();
        });
    }

    if (confirmCancelEl) {
        confirmCancelEl.addEventListener('click', function () {
            hideConfirm();
        });
    }

    if (confirmOkEl) {
        confirmOkEl.addEventListener('click', function () {
            if (typeof AppState.confirmCallback === 'function') {
                AppState.confirmCallback();
            }
            hideConfirm();
        });
    }

    if (searchEl) {
        searchEl.addEventListener('input', function (e) {
            AppState.filters.search = e.target.value;
            renderMasterProductList();
        });
    }

    if (categoryEl) {
        categoryEl.addEventListener('change', function (e) {
            AppState.filters.category = e.target.value;
            renderMasterProductList();
        });
    }

    if (statusEl) {
        statusEl.addEventListener('change', function (e) {
            AppState.filters.status = e.target.value;
            renderMasterProductList();
        });
    }

    if (clearFiltersEl) {
        clearFiltersEl.addEventListener('click', function () {
            resetFilters();
        });
    }
}

/* ============================================= */
/* Initialization (เริ่มต้นการทำงาน) */
/* ============================================= */
function loadDefaultData() {
    AppState.machineData = JSON.parse(JSON.stringify(DEFAULT_MACHINE_DATA));
    AppState.slotsData = JSON.parse(JSON.stringify(DEFAULT_SLOTS_DATA));
    AppState.productsData = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS_DATA));
    AppState.pmaData = JSON.parse(JSON.stringify(DEFAULT_PMA_DATA));
}

function init() {
    loadDefaultData();
    bindEvents();
    renderAll();
    showNotification('โหลดข้อมูลเริ่มต้นสำเร็จ พร้อมใช้งาน', NOTIFICATION_TYPES.SUCCESS);
}

document.addEventListener('DOMContentLoaded', function () {
    init();
});