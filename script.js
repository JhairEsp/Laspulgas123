// Registrar ScrollTrigger en GSAP
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
} else {
  console.error("GSAP no está cargado correctamente.");
}

// Productos de ejemplo por categoría
const products = {
  polos: [
    { name: "Polo Vintage", price: "$59", image: "https://source.unsplash.com/random/600x800/?vintage,tshirt" },
    { name: "Polo Eco-friendly", price: "$69", image: "https://source.unsplash.com/random/600x800/?eco,tshirt" },
    { name: "Polo Diseñador", price: "$89", image: "https://source.unsplash.com/random/600x800/?designer,tshirt" },
    { name: "Polo Artesanal", price: "$79", image: "https://source.unsplash.com/random/600x800/?handmade,tshirt" },
  ],
  jeans: [
    { name: "Jeans Clásicos", price: "$99", image: "https://source.unsplash.com/random/600x800/?classic,jeans" },
    { name: "Jeans Vintage", price: "$119", image: "https://source.unsplash.com/random/600x800/?vintage,jeans" },
    { name: "Jeans Eco-friendly", price: "$129", image: "https://source.unsplash.com/random/600x800/?eco,jeans" },
    { name: "Jeans de Diseñador", price: "$149", image: "https://source.unsplash.com/random/600x800/?designer,jeans" },
  ],
  accesorios: [
    { name: "Bolso Vintage", price: "$199", image: "https://source.unsplash.com/random/600x800/?vintage,bag" },
    { name: "Cinturón Artesanal", price: "$79", image: "https://source.unsplash.com/random/600x800/?handmade,belt" },
    { name: "Sombrero de Diseñador", price: "$159", image: "https://source.unsplash.com/random/600x800/?designer,hat" },
    { name: "Pañuelo de Seda", price: "$49", image: "https://source.unsplash.com/random/600x800/?silk,scarf" },
  ],
};

// Función para cargar productos por categoría
function loadProducts(category) {
  const carousel = document.getElementById(`${category}Carousel`);
  if (carousel) {
    carousel.innerHTML = ""; // Limpiar el carrusel antes de agregar nuevos productos
    products[category].forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">${product.price}</p>
        </div>
      `;
      carousel.appendChild(productCard);
    });
  } else {
    console.error(`Carousel for ${category} not found`);
  }
}

// Cursor personalizado
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  if (cursor && cursorFollower) {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.3 });
  }
});

// Efecto hover en elementos interactivos
document.querySelectorAll("a, button, .product-card").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    if (cursor && cursorFollower) {
      cursor.style.transform = "scale(1.5)";
      cursorFollower.style.transform = "scale(1.5)";
    }
  });
  element.addEventListener("mouseleave", () => {
    if (cursor && cursorFollower) {
      cursor.style.transform = "scale(1)";
      cursorFollower.style.transform = "scale(1)";
    }
  });
});

// Animación del header al hacer scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// Animación de la sección hero
function animateHero() {
  if (typeof gsap !== "undefined") {
    gsap.to(".hero-background", { scale: 1.1, duration: 10, ease: "none" });
    gsap.to(".main-title .word", { y: 0, opacity: 1, duration: 1, stagger: 0.25, ease: "power3.out" });
    gsap.to(".subtitle", { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" });
    gsap.to(".cta-button", { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power3.out" });
  }
}

// Animaciones de scroll
function initScrollAnimations() {
  if (typeof gsap !== "undefined") {
    gsap.utils.toArray(".section-title").forEach((title) => {
      gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: { trigger: title, start: "top bottom-=100", toggleActions: "play none none reverse" },
      });
    });

    gsap.utils.toArray(".product-card").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        scrollTrigger: { trigger: card, start: "top bottom-=50", toggleActions: "play none none reverse" },
      });
    });
  }
}

// Animación de estadísticas
function animateStats() {
  if (typeof gsap !== "undefined") {
    document.querySelectorAll(".stat-number").forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-value"));
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: { trigger: stat, start: "top bottom-=100", toggleActions: "play none none reverse" },
      });
    });
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script is running");
  loadProducts("polos");
  loadProducts("jeans");
  loadProducts("accesorios");
  animateHero();
  initScrollAnimations();
  animateStats();
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target && typeof gsap !== "undefined") {
      gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 80 }, ease: "power2.inOut" });
    }
  });
});
