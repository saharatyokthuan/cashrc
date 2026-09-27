// ===== Scroll to Top =====
        const scrollBtn = document.getElementById('scrollTopBtn');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ===== Console Log =====
        console.log('%c 🌐 ยินดีต้อนรับสู่คู่มือการเขียน HTML!', 'font-size: 20px; color: #2c3e50; font-weight: bold;');
        console.log('📚 เรียนรู้ HTML ตั้งแต่พื้นฐานจนถึงระดับสูง');

        // ===== Smooth anchor scroll =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // ===== Lesson info =====
        console.log('📑 เนื้อหานี้เป็นส่วนหนึ่งของคู่มือ HTML ฉบับสมบูรณ์ (16 บท)');
