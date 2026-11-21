const themeInput = document.querySelector(".theme .input");
const navbar = document.querySelector(".hn_wrap");
const navLinks = document.querySelectorAll(".hnLink");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeInput.checked = false;
}

themeInput.addEventListener("change", () => {
  const darkTheme = !themeInput.checked;
  document.body.classList.toggle("dark-theme", darkTheme);
  localStorage.setItem("theme", darkTheme ? "dark" : "light");
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("navbarActive", window.scrollY > 20);

  const sections = ["home", "about", "resume", "projects", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const currentSection = [...sections].reverse().find((section) => {
    return window.scrollY >= section.offsetTop - 140;
  });

  if (currentSection) {
    navLinks.forEach((link) => {
      link.classList.toggle(
        "activeNH",
        link.getAttribute("href") === `#${currentSection.id}`,
      );
    });
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("activeNH"));
    link.classList.add("activeNH");
  });
});

const contactForm = document.querySelector(".contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${email}`);
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
}
