// ハンバーガーメニュー
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const body = document.body;

if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        nav.classList.toggle("active");
        body.classList.toggle("no-scroll");
    });
}

const navLinks = document.querySelectorAll("#nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
});

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {

    // 左右画像切り替え（IntersectionObserver）
    const left = document.querySelector(".pc_left img");
    const right = document.querySelector(".pc_right img");
    const sections = document.querySelectorAll(".scroll-content h2");

    if (left && right && sections.length) {

        const leftImages = [
            "img/pc_left.jpg",
            "img/pc_left2.jpg",
            "img/pc_left3.jpg",
            "img/pc_left4.jpg",
            "img/pc_left5.jpg"
        ];

        const rightImages = [
            "img/pc_right.jpg",
            "img/pc_right2.jpg",
            "img/pc_right3.jpg",
            "img/pc_right4.jpg",
            "img/pc_right5.jpg"
        ];

        left.style.transition = "opacity 0.8s ease";
        right.style.transition = "opacity 0.8s ease";

        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const index = [...sections].indexOf(entry.target);

                left.style.opacity = 0;
                right.style.opacity = 0;

                setTimeout(() => {
                    left.src = leftImages[index % leftImages.length];
                    right.src = rightImages[index % rightImages.length];

                    left.style.opacity = 1;
                    right.style.opacity = 1;
                }, 400);
            });
        }, { threshold: 0.5 });

        sections.forEach(sec => imgObserver.observe(sec));
    }

    // 一括アニメーション管理（fade-up / concept / text）
    const animateTargets = document.querySelectorAll(
        ".fade-up, .concept_text"
    );

    if (animateTargets.length) {

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;

                // fade-up系
                if (el.classList.contains("fade-up")) {
                    el.classList.add("active");
                }

                // concept text
                if (el.classList.contains("concept_text")) {
                    el.classList.add("visible");

                    const ps = el.querySelectorAll("p");
                    ps.forEach((p, i) => {
                        p.style.transitionDelay = `${0.1 + i * 0.2}s`;
                    });
                }

                animationObserver.unobserve(el);
            });
        }, { threshold: 0.3 });

        animateTargets.forEach(el => animationObserver.observe(el));
    }

    // モーダル（LIVE DAY）
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDetail = document.getElementById("modal-detail");
    const closeBtn = document.querySelector(".close");

    const liveDays = document.querySelectorAll(".live-day");

    if (modal && modalTitle && modalDetail && closeBtn) {

        liveDays.forEach(day => {
            day.addEventListener("click", () => {

                const title = day.dataset.title || "";
                const detail = day.dataset.detail || "";

                modalTitle.textContent = title;
                modalDetail.innerHTML = detail.replace(/\n/g, "<br>");

                modal.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });

        const closeModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
        };

        closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

});