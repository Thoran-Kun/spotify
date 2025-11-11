function loadCSS(cssPath, id) {
  if (document.getElementById(id)) {
    return;
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = cssPath;

  document.head.appendChild(link);
}

async function loadComponent(componentPath, targetId) {
  try {
    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(`Errore HTTP! status: ${response.status}`);
    }

    const html = await response.text();

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.innerHTML = html;
    } else {
    }
  } catch (error) {
    console.error(` Errore nel caricamento di ${componentPath}:`, error);
    console.error(`Suggerimento: Stai usando Live Server o un server locale?`);
  }
}

function setActivePage() {
  const currentPage =
    window.location.pathname.split("/").pop() || "homepage.html";

  const pageMap = {
    "homepage.html": "home",
    "album.html": "album",
    "artist.html": "artist",
    "search.html": "search",
  };

  const currentPageId = pageMap[currentPage] || "home";

  console.log(`Pagina corrente: ${currentPage} (ID: ${currentPageId})`);

  setTimeout(() => {
    const navLinks = document.querySelectorAll(".sidebar-left .nav-link");

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("data-page") === currentPageId) {
        link.classList.add("active");
      }
    });
  }, 100);
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log(" Avvio Component Loader...");

  loadCSS("assets/css/sidebar-left.css", "sidebar-left-css");
  loadCSS("assets/css/sidebar-right.css", "sidebar-right-css");
  loadCSS("assets/css/player.css", "player-css");

  await Promise.all([
    loadComponent("components/sidebar-left.html", "sidebar-left-container"),
    loadComponent("components/sidebar-right.html", "sidebar-right-container"),
    loadComponent("components/player.html", "player-container"),
  ]);

  setActivePage();
});
