// ── 1. ตั้งค่า EmailJS ────────────────────────────────────────────────────────
// ** ต้องเปลี่ยนค่า "??????" เป็นค่าจริงของคุณจากหน้าเว็บ EmailJS เท่านั้น **
const PUBLIC_KEY = "HXNbFFQOjfH9zWa2M"; 
const SERVICE_ID = "service_d9noj9l";
const TEMPLATE_ID = "template_d1thwkk";

emailjs.init(PUBLIC_KEY);

// ── 2. จัดการข้อมูลฟอร์ม ───────────────────────────────────────────────────────
const formData = {
    name: "",
    email: "",
    message: ""
};

// ตรวจสอบว่าหน้าเว็บโหลดเสร็จก่อนเริ่มทำงาน
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("submitBtn");
    
    if (btn) {
        // ดึงค่าจากช่อง Input ตลอดเวลา
        document.querySelectorAll("input, textarea").forEach(input => {
            input.addEventListener("input", (e) => {
                formData[e.target.id] = e.target.value;
            });
        });

        // เมื่อกดปุ่มส่ง
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            handleSubmit(btn);
        });
    }
});

// ── 3. ฟังก์ชันส่งข้อมูล ────────────────────────────────────────────────────────
function handleSubmit(btn) {
    const btnText = document.getElementById("btnText");

    // ตรวจสอบข้อมูลก่อนส่ง
    if (!formData.name || !formData.email || !formData.message) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    // แสดงสถานะกำลังส่ง
    btn.disabled = true;
    btnText.textContent = "Sending...";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
        .then(() => {
            btnText.textContent = "✓ Message Sent";
            btn.classList.add("sent");
            
            // ล้างค่าในฟอร์ม
            document.querySelectorAll("input, textarea").forEach(i => i.value = "");
            Object.keys(formData).forEach(key => formData[key] = "");

            // กลับเป็นสถานะปกติหลังจาก 3 วินาที
            setTimeout(() => {
                btn.disabled = false;
                btnText.textContent = "Send Message";
                btn.classList.remove("sent");
            }, 3000);
        })
        .catch((err) => {
            console.error(err);
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
            btn.disabled = false;
            btnText.textContent = "Send Message";
        });
}