(() => {
  "use strict";

  // ============================================================
  // Utility
  // ============================================================
  
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  const esc = (str) => str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  // ============================================================
  // State
  // ============================================================
  
  let done = new Set(JSON.parse(localStorage.getItem("py-course-progress") || "[]"));

  // ============================================================
  // Highlight
  // ============================================================
  
  const highlight = (scope = document.getElementById("content")) => {
    if (window.Prism) {
      Prism.highlightAllUnder(scope);
    }
  };

  // ============================================================
  // Code Block Builder
  // ============================================================
  
  const codeBlock = (label, code, lang = "python") => {
    const isOut = lang === "none";
    return `
    <div class="code ${isOut ? "is-output" : ""}">
      ${label ? `<span class="code-label">${label}</span>` : ""}
      <span class="lang-tag">${isOut ? "output" : lang}</span>
      <button class="copy" title="คัดลอกโค้ด">คัดลอก</button>
      <pre class="${isOut ? "" : "line-numbers"} language-${lang}"><code class="language-${lang}">${esc(code)}</code></pre>
    </div>`;
  };

  // ============================================================
  // Render Content
  // ============================================================
  
  const renderContent = () => {
    let html = "";
    
    COURSE.phases.forEach((phase) => {
      html += `<div class="phase">`;
      html += `<div class="phase-head"><h2>${phase.name}</h2></div>`;
      
      phase.chapters.forEach((chapter) => {
        html += `<div class="chapter-header">${chapter.name}</div>`;
        
        chapter.lessons.forEach((lesson) => {
          const isDone = done.has(lesson.id);
          html += `
            <article class="card ${isDone ? "is-done" : ""}" data-id="${lesson.id}">
              <div class="card-header">
                <input type="checkbox" ${isDone ? "checked" : ""} aria-label="ทำเสร็จแล้ว">
                <h3 class="card-title">
                  <span class="card-id">${lesson.id}</span>
                  ${lesson.title}
                </h3>
              </div>
              <div class="card-goal">◇ ${lesson.goal}</div>
              
              <div class="tabs">
                <button class="tab active" data-panel="prob">โจทย์</button>
                <button class="tab" data-panel="sol">เฉลย</button>
              </div>
              
              <div class="panel active" data-panel="prob">
                ${codeBlock("โจทย์", lesson.problem)}
                ${codeBlock("ผลลัพธ์ที่ควรได้", lesson.output, "none")}
              </div>
              
              <div class="panel" data-panel="sol">
                ${codeBlock("เฉลย", lesson.solution)}
              </div>
            </article>
          `;
        });
      });
      
      html += `</div>`;
    });
    
    $("#content").innerHTML = html;
    highlight();
    updateProgress();
    updateTOCActive();
  };

  // ============================================================
  // Progress
  // ============================================================
  
  const updateProgress = () => {
    const total = $$(".card").length;
    const completed = $$(".card.is-done").length;
    $("#progressLabel").textContent = `${completed} / ${total}`;
    updateTOCDone();
  };

  // ============================================================
  // TOC
  // ============================================================
  
  const buildTOC = () => {
    let html = "";
    
    COURSE.phases.forEach((phase) => {
      html += `<div class="toc-phase">`;
      html += `<h3>${phase.name.replace(/[^\w\s]/g, "").trim()}</h3>`;
      
      phase.chapters.forEach((chapter) => {
        chapter.lessons.forEach((lesson) => {
          const isDone = done.has(lesson.id);
          html += `
            <a href="#${lesson.id}" data-id="${lesson.id}" class="${isDone ? "done" : ""}">
              ${lesson.id} ${lesson.title}
            </a>
          `;
        });
      });
      
      html += `</div>`;
    });
    
    $("#toc").innerHTML = html;
  };

  const updateTOCDone = () => {
    $$("#toc a").forEach((a) => {
      const id = a.dataset.id;
      a.classList.toggle("done", done.has(id));
    });
  };

  const updateTOCActive = () => {
    // ใช้ Intersection Observer เพื่อ highlight TOC
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.id;
          $$("#toc a").forEach((a) => {
            a.classList.toggle("active", a.dataset.id === id);
          });
        }
      });
    }, { threshold: 0.3 });
    
    $$(".card").forEach((card) => observer.observe(card));
  };

  // ============================================================
  // Event Delegation
  // ============================================================
  
  $("#content").addEventListener("click", (e) => {
    // Tab switching
    if (e.target.classList.contains("tab")) {
      const card = e.target.closest(".card");
      const panel = e.target.dataset.panel;
      
      $$(".tab", card).forEach((t) => t.classList.toggle("active", t === e.target));
      $$(".panel", card).forEach((p) => p.classList.toggle("active", p.dataset.panel === panel));
    }
    
    // Copy code
    if (e.target.classList.contains("copy")) {
      const pre = e.target.closest(".code").querySelector("pre");
      const clone = pre.cloneNode(true);
      clone.querySelector(".line-numbers-rows")?.remove();
      
      navigator.clipboard.writeText(clone.textContent.trim()).then(() => {
        e.target.textContent = "คัดลอกอล้ว";
        setTimeout(() => { e.target.textContent = "คัดลอก"; }, 1500);
      }).catch(() => {
        // Fallback
        const range = document.createRange();
        range.selectNode(pre);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        e.target.textContent = "คัดลอกแล้ว";
        setTimeout(() => { e.target.textContent = "คัดลอก"; }, 1500);
      });
    }
  });

  // Checkbox change
  $("#content").addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const card = e.target.closest(".card");
      const id = card.dataset.id;
      
      if (e.target.checked) {
        done.add(id);
        card.classList.add("is-done");
      } else {
        done.delete(id);
        card.classList.remove("is-done");
      }
      
      localStorage.setItem("py-course-progress", JSON.stringify([...done]));
      updateProgress();
    }
  });

  // ============================================================
  // Search
  // ============================================================
  
  $("#search").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    $$(".card").forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = (!q || text.includes(q)) ? "" : "none";
    });
  });

  // ============================================================
  // Reset
  // ============================================================
  
  $("#resetBtn").addEventListener("click", () => {
    if (confirm("⚠รีเซ็ตความคืบหน้าทั้งหมดใช่หรือไม่?")) {
      done.clear();
      localStorage.setItem("py-course-progress", JSON.stringify([]));
      $$(".card").forEach((card) => {
        card.classList.remove("is-done");
        card.querySelector('input[type="checkbox"]').checked = false;
      });
      updateProgress();
    }
  });

  // ============================================================
  // Theme
  // ============================================================
  
  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    $("#themeBtn").textContent = next === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", next);
  };

  // Load theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  $("#themeBtn").textContent = savedTheme === "dark" ? "☀️" : "🌙";
  $("#themeBtn").addEventListener("click", toggleTheme);

  // ============================================================
  // Mobile Menu
  // ============================================================
  
  $("#menuBtn").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
  });

  // Close sidebar on outside click (mobile)
  document.addEventListener("click", (e) => {
    const sidebar = $("#sidebar");
    if (sidebar.classList.contains("open")) {
      if (!sidebar.contains(e.target) && e.target.id !== "menuBtn") {
        sidebar.classList.remove("open");
      }
    }
  });

  // ============================================================
  // Keyboard shortcuts
  // ============================================================
  
  document.addEventListener("keydown", (e) => {
    // Ctrl+Shift+D = toggle dark mode
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
      e.preventDefault();
      toggleTheme();
    }
    // Escape = close sidebar
    if (e.key === "Escape") {
      $("#sidebar").classList.remove("open");
    }
    // / = focus search
    if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
      if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
        $("#search").focus();
      }
    }
  });

  // ============================================================
  // Init
  // ============================================================
  
  buildTOC();
  renderContent();

  console.log("🐍 Python Course loaded!");
  console.log(`📚 ${$$(".card").length} lessons, ${done.size} completed`);
})();