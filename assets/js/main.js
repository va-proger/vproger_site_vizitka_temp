import { initScrollAnimations } from "./modules/scroll-animations.js";
import { initGithubProjects } from "./modules/github-projects.js";
// initActivePage теперь вызывается из site.ts (TypeScript)
// import { initNav } from "./modules/nav.js";
import { initCertificates } from "./modules/certificates.js";

function init() {
  initScrollAnimations();
  initGithubProjects();
  // initNav();
  initCertificates();
  // initScrollToTop и initActivePage теперь вызываются из site.ts (TypeScript)
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  // DOM уже загружен
  init();
}
