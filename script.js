/* =========================================================
   CV BUILDER JAVASCRIPT
   ========================================================= */


/* =========================================================
   GLOBAL DATA
   ========================================================= */

let cvData = {
    personal: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        photo: ""
    },

    summary: "",

    education: [],

    experience: [],

    skills: [],

    projects: [],

    certifications: [],

    references: [],

    color: "#2563eb"
};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const fullName = document.getElementById("fullName");
const jobTitle = document.getElementById("jobTitle");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const locationInput = document.getElementById("location");
const website = document.getElementById("website");
const linkedin = document.getElementById("linkedin");
const github = document.getElementById("github");
const summary = document.getElementById("summary");

const educationContainer =
    document.getElementById("educationContainer");

const experienceContainer =
    document.getElementById("experienceContainer");

const projectContainer =
    document.getElementById("projectContainer");

const certificationContainer =
    document.getElementById("certificationContainer");

const referenceContainer =
    document.getElementById("referenceContainer");

const skillInput =
    document.getElementById("skillInput");

const skillTags =
    document.getElementById("skillTags");

const profilePhoto =
    document.getElementById("profilePhoto");

const photoPreview =
    document.getElementById("photoPreview");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const themeToggleBtn =
    document.getElementById("themeToggleBtn");


/* =========================================================
   THEME MODE
   ========================================================= */

function applyTheme(theme) {

    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    if (themeToggleBtn) {

        themeToggleBtn.textContent =
            isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

        themeToggleBtn.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    localStorage.setItem("careerCVTheme", theme);
}


function initializeTheme() {

    const savedTheme =
        localStorage.getItem("careerCVTheme");

    if (savedTheme) {

        applyTheme(savedTheme);

        return;
    }

    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    applyTheme(prefersDark ? "dark" : "light");
}


/* =========================================================
   INITIALIZE APPLICATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const nextTheme =
                document.body.classList.contains("dark-mode")
                    ? "light"
                    : "dark";

            applyTheme(nextTheme);
        });
    }

    loadCV();

    attachPersonalInformationListeners();

    setupButtons();

    updatePreview();

});


/* =========================================================
   PERSONAL INFORMATION
   ========================================================= */

function attachPersonalInformationListeners() {

    const fields = [
        fullName,
        jobTitle,
        email,
        phone,
        locationInput,
        website,
        linkedin,
        github,
        summary
    ];

    fields.forEach(field => {

        field.addEventListener("input", () => {

            updateDataFromForm();

            updatePreview();

        });

    });

}


/* =========================================================
   UPDATE DATA FROM FORM
   ========================================================= */

function updateDataFromForm() {

    cvData.personal.fullName = fullName.value.trim();

    cvData.personal.jobTitle = jobTitle.value.trim();

    cvData.personal.email = email.value.trim();

    cvData.personal.phone = phone.value.trim();

    cvData.personal.location = locationInput.value.trim();

    cvData.personal.website = website.value.trim();

    cvData.personal.linkedin = linkedin.value.trim();

    cvData.personal.github = github.value.trim();

    cvData.summary = summary.value.trim();

}


/* =========================================================
   SETUP BUTTONS
   ========================================================= */

function setupButtons() {

    document
        .getElementById("addEducationBtn")
        .addEventListener("click", addEducation);

    document
        .getElementById("addExperienceBtn")
        .addEventListener("click", addExperience);

    document
        .getElementById("addProjectBtn")
        .addEventListener("click", addProject);

    document
        .getElementById("addCertificationBtn")
        .addEventListener("click", addCertification);

    document
        .getElementById("addReferenceBtn")
        .addEventListener("click", addReference);

    document
        .getElementById("addSkillBtn")
        .addEventListener("click", addSkill);

    document
        .getElementById("saveBtn")
        .addEventListener("click", saveCV);

    document
        .getElementById("newCVBtn")
        .addEventListener("click", newCV);

    document
        .getElementById("printBtn")
        .addEventListener("click", printCV);

    document
        .getElementById("previewPrintBtn")
        .addEventListener("click", printCV);

    profilePhoto.addEventListener(
        "change",
        handlePhotoUpload
    );

    skillInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                addSkill();

            }

        }
    );

    setupColorButtons();

}


/* =========================================================
   EDUCATION
   ========================================================= */

function addEducation(data = {}) {

    const education = {

        id: Date.now() + Math.random(),

        institution: data.institution || "",

        qualification: data.qualification || "",

        field: data.field || "",

        startYear: data.startYear || "",

        endYear: data.endYear || "",

        description: data.description || ""

    };

    cvData.education.push(education);

    renderEducation();

    updatePreview();

}


function renderEducation() {

    educationContainer.innerHTML = "";

    cvData.education.forEach((item, index) => {

        const element =
            document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <button
                type="button"
                class="remove-item"
                onclick="removeEducation(${index})"
            >
                ×
            </button>

            <div class="dynamic-grid">

                <div class="form-group">
                    <label>Institution</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.institution)}"
                        data-field="institution"
                        data-index="${index}"
                        class="education-field"
                        placeholder="University / Institution"
                    >
                </div>

                <div class="form-group">
                    <label>Qualification</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.qualification)}"
                        data-field="qualification"
                        data-index="${index}"
                        class="education-field"
                        placeholder="B.Sc / HND / Diploma"
                    >
                </div>

                <div class="form-group">
                    <label>Course / Field</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.field)}"
                        data-field="field"
                        data-index="${index}"
                        class="education-field"
                        placeholder="Computer Science"
                    >
                </div>

                <div class="form-group">
                    <label>Start Year</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.startYear)}"
                        data-field="startYear"
                        data-index="${index}"
                        class="education-field"
                        placeholder="2020"
                    >
                </div>

                <div class="form-group">
                    <label>End Year</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.endYear)}"
                        data-field="endYear"
                        data-index="${index}"
                        class="education-field"
                        placeholder="2024"
                    >
                </div>

                <div class="form-group full-width">
                    <label>Description</label>

                    <textarea
                        data-field="description"
                        data-index="${index}"
                        class="education-field"
                        placeholder="Relevant achievements or activities..."
                    >${escapeHTML(item.description)}</textarea>
                </div>

            </div>
        `;

        educationContainer.appendChild(element);

    });

    document
        .querySelectorAll(".education-field")
        .forEach(field => {

            field.addEventListener("input", event => {

                const index =
                    Number(event.target.dataset.index);

                const property =
                    event.target.dataset.field;

                cvData.education[index][property] =
                    event.target.value;

                updatePreview();

            });

        });

}


function removeEducation(index) {

    cvData.education.splice(index, 1);

    renderEducation();

    updatePreview();

}


/* =========================================================
   EXPERIENCE
   ========================================================= */

function addExperience(data = {}) {

    const experience = {

        id: Date.now() + Math.random(),

        jobTitle: data.jobTitle || "",

        company: data.company || "",

        location: data.location || "",

        startDate: data.startDate || "",

        endDate: data.endDate || "",

        description: data.description || ""

    };

    cvData.experience.push(experience);

    renderExperience();

    updatePreview();

}


function renderExperience() {

    experienceContainer.innerHTML = "";

    cvData.experience.forEach((item, index) => {

        const element =
            document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <button
                type="button"
                class="remove-item"
                onclick="removeExperience(${index})"
            >
                ×
            </button>

            <div class="dynamic-grid">

                <div class="form-group">
                    <label>Job Title</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.jobTitle)}"
                        data-field="jobTitle"
                        data-index="${index}"
                        class="experience-field"
                        placeholder="Frontend Developer"
                    >
                </div>

                <div class="form-group">
                    <label>Company</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.company)}"
                        data-field="company"
                        data-index="${index}"
                        class="experience-field"
                        placeholder="Company Name"
                    >
                </div>

                <div class="form-group">
                    <label>Location</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.location)}"
                        data-field="location"
                        data-index="${index}"
                        class="experience-field"
                        placeholder="Abuja, Nigeria"
                    >
                </div>

                <div class="form-group">
                    <label>Start Date</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.startDate)}"
                        data-field="startDate"
                        data-index="${index}"
                        class="experience-field"
                        placeholder="Jan 2023"
                    >
                </div>

                <div class="form-group">
                    <label>End Date</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.endDate)}"
                        data-field="endDate"
                        data-index="${index}"
                        class="experience-field"
                        placeholder="Present"
                    >
                </div>

                <div class="form-group full-width">
                    <label>Responsibilities / Achievements</label>

                    <textarea
                        data-field="description"
                        data-index="${index}"
                        class="experience-field"
                        placeholder="Describe your responsibilities and achievements..."
                    >${escapeHTML(item.description)}</textarea>
                </div>

            </div>
        `;

        experienceContainer.appendChild(element);

    });

    document
        .querySelectorAll(".experience-field")
        .forEach(field => {

            field.addEventListener("input", event => {

                const index =
                    Number(event.target.dataset.index);

                const property =
                    event.target.dataset.field;

                cvData.experience[index][property] =
                    event.target.value;

                updatePreview();

            });

        });

}


function removeExperience(index) {

    cvData.experience.splice(index, 1);

    renderExperience();

    updatePreview();

}


/* =========================================================
   SKILLS
   ========================================================= */

function addSkill() {

    const skill =
        skillInput.value.trim();

    if (!skill) return;

    if (
        cvData.skills.some(
            existing =>
                existing.toLowerCase() ===
                skill.toLowerCase()
        )
    ) {

        showToast("This skill has already been added.");

        return;

    }

    cvData.skills.push(skill);

    skillInput.value = "";

    renderSkills();

    updatePreview();

}


function renderSkills() {

    skillTags.innerHTML = "";

    cvData.skills.forEach((skill, index) => {

        const tag =
            document.createElement("span");

        tag.className = "skill-tag";

        tag.innerHTML = `
            ${escapeHTML(skill)}

            <button
                type="button"
                onclick="removeSkill(${index})"
            >
                ×
            </button>
        `;

        skillTags.appendChild(tag);

    });

}


function removeSkill(index) {

    cvData.skills.splice(index, 1);

    renderSkills();

    updatePreview();

}


/* =========================================================
   PROJECTS
   ========================================================= */

function addProject(data = {}) {

    const project = {

        id: Date.now() + Math.random(),

        name: data.name || "",

        technologies: data.technologies || "",

        link: data.link || "",

        description: data.description || ""

    };

    cvData.projects.push(project);

    renderProjects();

    updatePreview();

}


function renderProjects() {

    projectContainer.innerHTML = "";

    cvData.projects.forEach((item, index) => {

        const element =
            document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <button
                type="button"
                class="remove-item"
                onclick="removeProject(${index})"
            >
                ×
            </button>

            <div class="dynamic-grid">

                <div class="form-group">
                    <label>Project Name</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.name)}"
                        data-index="${index}"
                        data-field="name"
                        class="project-field"
                        placeholder="CV Builder"
                    >
                </div>

                <div class="form-group">
                    <label>Technologies</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.technologies)}"
                        data-index="${index}"
                        data-field="technologies"
                        class="project-field"
                        placeholder="HTML, CSS, JavaScript"
                    >
                </div>

                <div class="form-group full-width">
                    <label>Project Link</label>

                    <input
                        type="url"
                        value="${escapeHTML(item.link)}"
                        data-index="${index}"
                        data-field="link"
                        class="project-field"
                        placeholder="https://example.com"
                    >
                </div>

                <div class="form-group full-width">
                    <label>Description</label>

                    <textarea
                        data-index="${index}"
                        data-field="description"
                        class="project-field"
                        placeholder="Describe your project..."
                    >${escapeHTML(item.description)}</textarea>
                </div>

            </div>
        `;

        projectContainer.appendChild(element);

    });

    document
        .querySelectorAll(".project-field")
        .forEach(field => {

            field.addEventListener("input", event => {

                const index =
                    Number(event.target.dataset.index);

                const property =
                    event.target.dataset.field;

                cvData.projects[index][property] =
                    event.target.value;

                updatePreview();

            });

        });

}


function removeProject(index) {

    cvData.projects.splice(index, 1);

    renderProjects();

    updatePreview();

}


/* =========================================================
   CERTIFICATIONS
   ========================================================= */

function addCertification(data = {}) {

    const certification = {

        id: Date.now() + Math.random(),

        name: data.name || "",

        organization: data.organization || "",

        year: data.year || ""

    };

    cvData.certifications.push(certification);

    renderCertifications();

    updatePreview();

}


function renderCertifications() {

    certificationContainer.innerHTML = "";

    cvData.certifications.forEach((item, index) => {

        const element =
            document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <button
                type="button"
                class="remove-item"
                onclick="removeCertification(${index})"
            >
                ×
            </button>

            <div class="dynamic-grid">

                <div class="form-group">
                    <label>Certificate Name</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.name)}"
                        data-index="${index}"
                        data-field="name"
                        class="certification-field"
                        placeholder="JavaScript Certificate"
                    >
                </div>

                <div class="form-group">
                    <label>Issuing Organization</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.organization)}"
                        data-index="${index}"
                        data-field="organization"
                        class="certification-field"
                        placeholder="Organization Name"
                    >
                </div>

                <div class="form-group">
                    <label>Year</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.year)}"
                        data-index="${index}"
                        data-field="year"
                        class="certification-field"
                        placeholder="2025"
                    >
                </div>

            </div>
        `;

        certificationContainer.appendChild(element);

    });

    document
        .querySelectorAll(".certification-field")
        .forEach(field => {

            field.addEventListener("input", event => {

                const index =
                    Number(event.target.dataset.index);

                const property =
                    event.target.dataset.field;

                cvData.certifications[index][property] =
                    event.target.value;

                updatePreview();

            });

        });

}


function removeCertification(index) {

    cvData.certifications.splice(index, 1);

    renderCertifications();

    updatePreview();

}


/* =========================================================
   REFERENCES
   ========================================================= */

function addReference(data = {}) {

    const reference = {

        id: Date.now() + Math.random(),

        name: data.name || "",

        position: data.position || "",

        organization: data.organization || "",

        email: data.email || "",

        phone: data.phone || ""

    };

    cvData.references.push(reference);

    renderReferences();

    updatePreview();

}


function renderReferences() {

    referenceContainer.innerHTML = "";

    cvData.references.forEach((item, index) => {

        const element =
            document.createElement("div");

        element.className = "dynamic-item";

        element.innerHTML = `

            <button
                type="button"
                class="remove-item"
                onclick="removeReference(${index})"
            >
                ×
            </button>

            <div class="dynamic-grid">

                <div class="form-group">
                    <label>Name</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.name)}"
                        data-index="${index}"
                        data-field="name"
                        class="reference-field"
                        placeholder="John Smith"
                    >
                </div>

                <div class="form-group">
                    <label>Position</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.position)}"
                        data-index="${index}"
                        data-field="position"
                        class="reference-field"
                        placeholder="Manager"
                    >
                </div>

                <div class="form-group">
                    <label>Organization</label>

                    <input
                        type="text"
                        value="${escapeHTML(item.organization)}"
                        data-index="${index}"
                        data-field="organization"
                        class="reference-field"
                        placeholder="Company Name"
                    >
                </div>

                <div class="form-group">
                    <label>Email</label>

                    <input
                        type="email"
                        value="${escapeHTML(item.email)}"
                        data-index="${index}"
                        data-field="email"
                        class="reference-field"
                        placeholder="reference@example.com"
                    >
                </div>

                <div class="form-group">
                    <label>Phone</label>

                    <input
                        type="tel"
                        value="${escapeHTML(item.phone)}"
                        data-index="${index}"
                        data-field="phone"
                        class="reference-field"
                        placeholder="+234 800 000 0000"
                    >
                </div>

            </div>
        `;

        referenceContainer.appendChild(element);

    });

    document
        .querySelectorAll(".reference-field")
        .forEach(field => {

            field.addEventListener("input", event => {

                const index =
                    Number(event.target.dataset.index);

                const property =
                    event.target.dataset.field;

                cvData.references[index][property] =
                    event.target.value;

                updatePreview();

            });

        });

}


function removeReference(index) {

    cvData.references.splice(index, 1);

    renderReferences();

    updatePreview();

}


/* =========================================================
   UPDATE CV PREVIEW
   ========================================================= */

function updatePreview() {

    updateDataFromForm();

    /* Personal information */

    document.getElementById("previewName").textContent =
        cvData.personal.fullName || "Your Name";

    document.getElementById("previewJobTitle").textContent =
        cvData.personal.jobTitle || "Professional Title";

    document.getElementById("previewEmail").textContent =
        cvData.personal.email || "email@example.com";

    document.getElementById("previewPhone").textContent =
        cvData.personal.phone || "+234 000 000 0000";

    document.getElementById("previewLocation").textContent =
        cvData.personal.location || "Location";


    /* Website */

    const previewWebsite =
        document.getElementById("previewWebsite");

    previewWebsite.textContent =
        cvData.personal.website || "";


    /* LinkedIn */

    const previewLinkedin =
        document.getElementById("previewLinkedin");

    previewLinkedin.textContent =
        cvData.personal.linkedin || "";


    /* GitHub */

    const previewGithub =
        document.getElementById("previewGithub");

    previewGithub.textContent =
        cvData.personal.github || "";


    /* Summary */

    const previewSummary =
        document.getElementById("previewSummary");

    previewSummary.textContent =
        cvData.summary ||
        "Your professional summary will appear here.";


    /* Dynamic sections */

    renderEducationPreview();

    renderExperiencePreview();

    renderSkillsPreview();

    renderProjectsPreview();

    renderCertificationsPreview();

    renderReferencesPreview();


    /* Theme */

    document.documentElement.style
        .setProperty(
            "--primary-color",
            cvData.color
        );

}


/* =========================================================
   EDUCATION PREVIEW
   ========================================================= */

function renderEducationPreview() {

    const container =
        document.getElementById("previewEducation");

    container.innerHTML = "";

    if (cvData.education.length === 0) {

        container.innerHTML = `
            <p class="empty-preview">
                Your education will appear here.
            </p>
        `;

        return;

    }

    cvData.education.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "preview-item";

        const dates =
            [item.startYear, item.endYear]
                .filter(Boolean)
                .join(" - ");

        element.innerHTML = `

            <h4>
                ${escapeHTML(item.qualification || "Qualification")}
            </h4>

            <div class="company">
                ${escapeHTML(item.institution || "Institution")}
            </div>

            <div class="date">
                ${escapeHTML(item.field || "")}
                ${item.field && dates ? " • " : ""}
                ${escapeHTML(dates)}
            </div>

            ${
                item.description
                    ? `<p>${escapeHTML(item.description)}</p>`
                    : ""
            }

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   EXPERIENCE PREVIEW
   ========================================================= */

function renderExperiencePreview() {

    const container =
        document.getElementById("previewExperience");

    container.innerHTML = "";

    if (cvData.experience.length === 0) {

        container.innerHTML = `
            <p class="empty-preview">
                Your work experience will appear here.
            </p>
        `;

        return;

    }

    cvData.experience.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "preview-item";

        const dates =
            [item.startDate, item.endDate]
                .filter(Boolean)
                .join(" - ");

        element.innerHTML = `

            <h4>
                ${escapeHTML(item.jobTitle || "Job Title")}
            </h4>

            <div class="company">
                ${escapeHTML(item.company || "Company")}
                ${
                    item.location
                        ? " • " + escapeHTML(item.location)
                        : ""
                }
            </div>

            <div class="date">
                ${escapeHTML(dates)}
            </div>

            ${
                item.description
                    ? `
                        <p>
                            ${escapeHTML(item.description)}
                        </p>
                    `
                    : ""
            }

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   SKILLS PREVIEW
   ========================================================= */

function renderSkillsPreview() {

    const container =
        document.getElementById("previewSkills");

    container.innerHTML = "";

    if (cvData.skills.length === 0) {

        container.innerHTML = `
            <span class="skill-pill">
                Your skills
            </span>
        `;

        return;

    }

    cvData.skills.forEach(skill => {

        const element =
            document.createElement("span");

        element.className = "skill-pill";

        element.textContent = skill;

        container.appendChild(element);

    });

}


/* =========================================================
   PROJECTS PREVIEW
   ========================================================= */

function renderProjectsPreview() {

    const container =
        document.getElementById("previewProjects");

    container.innerHTML = "";

    if (cvData.projects.length === 0) {

        container.innerHTML = `
            <p class="empty-preview">
                Your projects will appear here.
            </p>
        `;

        return;

    }

    cvData.projects.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "project-preview";

        element.innerHTML = `

            <h4>
                ${escapeHTML(item.name || "Project")}
            </h4>

            ${
                item.technologies
                    ? `
                        <div class="project-tech">
                            ${escapeHTML(item.technologies)}
                        </div>
                    `
                    : ""
            }

            ${
                item.description
                    ? `
                        <p>
                            ${escapeHTML(item.description)}
                        </p>
                    `
                    : ""
            }

            ${
                item.link
                    ? `
                        <p>
                            ${escapeHTML(item.link)}
                        </p>
                    `
                    : ""
            }

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   CERTIFICATIONS PREVIEW
   ========================================================= */

function renderCertificationsPreview() {

    const container =
        document.getElementById("previewCertifications");

    container.innerHTML = "";

    if (cvData.certifications.length === 0) {

        container.innerHTML = `
            <p class="empty-preview">
                Your certifications will appear here.
            </p>
        `;

        return;

    }

    cvData.certifications.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "preview-item";

        element.innerHTML = `

            <h4>
                ${escapeHTML(
                    item.name || "Certificate"
                )}
            </h4>

            <div class="company">
                ${escapeHTML(
                    item.organization || ""
                )}
            </div>

            <div class="date">
                ${escapeHTML(item.year || "")}
            </div>

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   REFERENCES PREVIEW
   ========================================================= */

function renderReferencesPreview() {

    const container =
        document.getElementById("previewReferences");

    container.innerHTML = "";

    if (cvData.references.length === 0) {

        container.innerHTML = `
            <p class="empty-preview">
                References will appear here.
            </p>
        `;

        return;

    }

    cvData.references.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "reference-item";

        element.innerHTML = `

            <h4>
                ${escapeHTML(item.name || "Reference")}
            </h4>

            <p>
                ${escapeHTML(item.position || "")}
                ${
                    item.organization
                        ? " • " +
                          escapeHTML(item.organization)
                        : ""
                }
            </p>

            ${
                item.email
                    ? `
                        <p>
                            ${escapeHTML(item.email)}
                        </p>
                    `
                    : ""
            }

            ${
                item.phone
                    ? `
                        <p>
                            ${escapeHTML(item.phone)}
                        </p>
                    `
                    : ""
            }

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   PROFILE PHOTO
   ========================================================= */

function handlePhotoUpload(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        showToast("Please select an image file.");

        return;

    }

    const reader =
        new FileReader();

    reader.onload = function(event) {

        cvData.personal.photo =
            event.target.result;

        displayPhoto(
            event.target.result
        );

        saveCV(false);

    };

    reader.readAsDataURL(file);

}


function displayPhoto(image) {

    photoPreview.innerHTML = `
        <img
            src="${image}"
            alt="Profile Photo"
        >
    `;

    document.getElementById(
        "previewPhoto"
    ).innerHTML = `
        <img
            src="${image}"
            alt="Profile Photo"
        >
    `;

}


/* =========================================================
   COLOR THEMES
   ========================================================= */

function setupColorButtons() {

    document
        .querySelectorAll(".color-option")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const color =
                        button.dataset.color;

                    cvData.color = color;

                    document.documentElement.style
                        .setProperty(
                            "--primary-color",
                            color
                        );

                    document
                        .querySelectorAll(".color-option")
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );

                    button.classList.add("active");

                    updatePreview();

                }
            );

        });

}


/* =========================================================
   SAVE CV
   ========================================================= */

function saveCV(showMessage = true) {

    updateDataFromForm();

    try {

        localStorage.setItem(
            "professionalCV",
            JSON.stringify(cvData)
        );

        if (showMessage) {

            showToast(
                "CV saved successfully!"
            );

        }

    } catch (error) {

        showToast(
            "Unable to save CV. Storage may be full."
        );

        console.error(error);

    }

}


/* =========================================================
   LOAD CV
   ========================================================= */

function loadCV() {

    const savedData =
        localStorage.getItem(
            "professionalCV"
        );

    if (!savedData) {

        /*
         * Start with one education and
         * experience field for convenience.
         */

        addEducation();

        addExperience();

        return;

    }

    try {

        const saved =
            JSON.parse(savedData);

        cvData = {
            ...cvData,
            ...saved
        };

        populateForm();

    } catch (error) {

        console.error(
            "Unable to load saved CV:",
            error
        );

    }

}


/* =========================================================
   POPULATE FORM
   ========================================================= */

function populateForm() {

    fullName.value =
        cvData.personal.fullName || "";

    jobTitle.value =
        cvData.personal.jobTitle || "";

    email.value =
        cvData.personal.email || "";

    phone.value =
        cvData.personal.phone || "";

    locationInput.value =
        cvData.personal.location || "";

    website.value =
        cvData.personal.website || "";

    linkedin.value =
        cvData.personal.linkedin || "";

    github.value =
        cvData.personal.github || "";

    summary.value =
        cvData.summary || "";


    renderEducation();

    renderExperience();

    renderSkills();

    renderProjects();

    renderCertifications();

    renderReferences();


    if (cvData.personal.photo) {

        displayPhoto(
            cvData.personal.photo
        );

    }


    document.documentElement.style
        .setProperty(
            "--primary-color",
            cvData.color || "#2563eb"
        );


    document
        .querySelectorAll(".color-option")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.color ===
                cvData.color
            );

        });

}


/* =========================================================
   NEW CV
   ========================================================= */

function newCV() {

    const confirmed =
        confirm(
            "Create a new CV? Unsaved information will be cleared."
        );

    if (!confirmed) return;

    localStorage.removeItem(
        "professionalCV"
    );

    location.reload();

}


/* =========================================================
   PRINT / PDF
   ========================================================= */

function printCV() {

    updateDataFromForm();

    /*
     * Browser print dialog allows the user
     * to select "Save as PDF".
     */

    window.print();

}


/* =========================================================
   TOAST MESSAGE
   ========================================================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   HTML ESCAPE
   Prevents user input from being
   interpreted as HTML.
   ========================================================= */

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   AUTO SAVE
   ========================================================= */

setInterval(() => {

    updateDataFromForm();

    localStorage.setItem(
        "professionalCV",
        JSON.stringify(cvData)
    );

}, 30000);