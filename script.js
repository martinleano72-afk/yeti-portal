// La navegación sigue visible si JavaScript no está disponible.
const botonMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

if (botonMenu && menu) {
  document.documentElement.classList.add("js-menu");
  botonMenu.hidden = false;

  function cambiarMenu(abierto) {
    menu.classList.toggle("is-open", abierto);
    botonMenu.setAttribute("aria-expanded", String(abierto));
    botonMenu.textContent = abierto ? "Cerrar menú" : "Menú";
  }

  botonMenu.addEventListener("click", () => {
    const abierto = botonMenu.getAttribute("aria-expanded") === "true";
    cambiarMenu(!abierto);
  });

  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      cambiarMenu(false);
    });
  });

  document.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Escape" &&
      botonMenu.getAttribute("aria-expanded") === "true"
    ) {
      cambiarMenu(false);
      botonMenu.focus();
    }
  });

  // Evita conservar abierto el menú al cambiar de tamaño.
  const pantallaMovil = window.matchMedia("(max-width: 900px)");

  pantallaMovil.addEventListener("change", () => {
    cambiarMenu(false);
  });
}

// Marca el enlace de la sección que ocupa la zona central de lectura.
const enlacesSecciones = document.querySelectorAll(
  '#menu-principal a[href^="#"]'
);

const secciones = [...enlacesSecciones]
  .map((enlace) => document.querySelector(enlace.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        enlacesSecciones.forEach((enlace) => {
          const activo =
            enlace.getAttribute("href") === `#${entrada.target.id}`;

          enlace.classList.toggle("is-active", activo);

          if (activo) {
            enlace.setAttribute("aria-current", "location");
          } else {
            enlace.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-15% 0px -55% 0px",
      threshold: 0
    }
  );

  secciones.forEach((seccion) => observador.observe(seccion));
}