const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

const menuButton = document.querySelector("[data-menu-button]");
const menuPanel = document.querySelector("[data-menu-panel]");

if (menuButton && menuPanel) {
  const openIcon = menuButton.querySelector("[data-menu-open]");
  const closeIcon = menuButton.querySelector("[data-menu-close]");

  const setMenuState = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuPanel.classList.toggle("hidden", !isOpen);
    if (openIcon) openIcon.classList.toggle("hidden", isOpen);
    if (closeIcon) closeIcon.classList.toggle("hidden", !isOpen);
  };

  setMenuState(false);

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });
}
