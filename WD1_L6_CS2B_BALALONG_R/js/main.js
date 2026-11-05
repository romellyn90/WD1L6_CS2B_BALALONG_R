// js/main.js

/**
 * Developer Profile Portfolio Application Logic
 * Romellyn Gayamos Balalong
 */

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    renderProjects();
    initFilterButtons();
    initContactForm();
});

// Projects Data Array updated with your screenshots
const projectsData = [
    {
        id: 1,
        title: "Sakatos Shop Showcase",
        category: "midterms",
        image: "media/L3.png",
        shortDesc: "Premium footwear presentation landing page with modern layout techniques.",
        fullDesc: "A sleek e-commerce showcase interface featuring product highlights, hero banners, custom internal CSS styling, and structured responsive navigation.",
        techStack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
        github: "https://github.com/romellyn9/WD1_L3_CS2B_BALALONG"
    },
    {
        id: 2,
        title: "Student Grade Evaluation System",
        category: "midterms",
        image: "media/L4.png",
        shortDesc: "Automated student grade computation and pass/fail evaluation dashboard.",
        fullDesc: "An academic grade evaluation tool that processes student scores, dynamically determines pass/fail status badges (e.g., Passed, Passed Excellent, Failed), and tracks overall class statistics.",
        techStack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
        github: "https://github.com/romellyn90/WD1L4_CS2B_BALALONG_R"
    },
    {
        id: 3,
        title: "GroceryKo Sign Up Portal",
        category: "finals",
        image: "media/L5.png",
        shortDesc: "Clean user registration interface for online grocery platform.",
        fullDesc: "A responsive user sign-up page featuring form inputs for full name, address, username, email, and password with modern UI card layout and interactive button states.",
        techStack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
        github: "https://github.com/romellyn90/WD1L5_CS2B_BALALONG_R"
    }
];

// Render Portfolio Cards Dynamically
/**
 * Render Portfolio Cards Dynamically into DOM (Direct to GitHub on Click)
 * @param {string} filter - Category filter ('all', 'midterms', 'finals')
 */
function renderProjects(filter = "all") {
    const container = document.getElementById("projectsContainer");
    container.innerHTML = "";

    const filtered = filter === "all" 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    filtered.forEach(project => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";
        col.innerHTML = `
            <div class="card h-100 border-0 shadow-sm portfolio-card">
                <!-- Wrapping the image in an anchor tag linked to GitHub -->
                <a href="${project.github}" target="_blank" class="portfolio-img-wrapper rounded-top text-decoration-none">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                </a>
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-primary-subtle text-primary border border-primary w-auto align-self-start mb-2 text-uppercase" style="font-size:0.7rem">${project.category}</span>
                    <h5 class="card-title fw-bold">
                        <a href="${project.github}" target="_blank" class="text-decoration-none text-body">${project.title}</a>
                    </h5>
                    <p class="card-text text-body-secondary small flex-grow-1">${project.shortDesc}</p>
                    <div class="d-flex gap-2 mt-3">
                        <a href="${project.github}" target="_blank" class="btn btn-sm btn-outline-primary flex-fill"><i class="bi bi-github me-1"></i> View Repository</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}
// Portfolio Filter Controls
function initFilterButtons() {
    const filterBtns = document.querySelectorAll("#portfolioFilters button");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProjects(btn.dataset.filter);
        });
    });
}

// Populate and Open Details Modal
function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    document.getElementById("modalProjectTitle").textContent = project.title;
    document.getElementById("modalProjectImg").src = project.image;
    document.getElementById("modalProjectCategory").textContent = project.category.toUpperCase();
    document.getElementById("modalProjectDesc").textContent = project.fullDesc;
    document.getElementById("modalGithubLink").href = project.github;

    const techContainer = document.getElementById("modalProjectTech");
    techContainer.innerHTML = project.techStack
        .map(tech => `<span class="badge bg-secondary-subtle text-secondary border">${tech}</span>`)
        .join("");

    const modal = new bootstrap.Modal(document.getElementById("projectModal"));
    modal.show();
}

// Theme Switcher (Dark / Light)
function initThemeToggle() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    const icon = document.getElementById("themeIcon");
    const htmlElem = document.documentElement;

    toggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElem.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElem.setAttribute("data-bs-theme", newTheme);

        icon.className = newTheme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    });
}

// Contact Form Validation and Submission Handling
function initContactForm() {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", event => {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add("was-validated");
            return;
        }

        alert("Thank you! Your message has been sent successfully.");
        form.reset();
        form.classList.remove("was-validated");
    });
}