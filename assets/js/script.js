"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

function setMenuState(isOpen) {
    if (!menuToggle || !menu) return;
    menu.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", isOpen);

    const icon = menuToggle.querySelector("i");
    if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
    }
}

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => setMenuState(!menu.classList.contains("active")));
    document.addEventListener("click", (event) => {
        if (window.innerWidth <= 991 && menu.classList.contains("active") && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
            setMenuState(false);
        }
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) setMenuState(false);
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        setMenuState(false);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const header = document.getElementById("header");
function updateHeader() {
    if (!header) return;
    const scrolled = window.scrollY > 80;
    header.style.background = scrolled ? "rgba(0,0,0,.98)" : "rgba(0,0,0,.92)";
    header.style.boxShadow = scrolled ? "0 10px 25px rgba(0,0,0,.35)" : "none";
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const counters = document.querySelectorAll(".counter");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function formatCounter(value) { return value.toLocaleString("pt-BR"); }
function startCounter(counter) {
    const target = Number(counter.dataset.target);
    if (!Number.isFinite(target)) return;
    if (reduceMotion) { counter.textContent = formatCounter(target); return; }

    const duration = 1300;
    const startTime = performance.now();
    function updateCounter(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        counter.textContent = formatCounter(Math.floor(target * easedProgress));
        if (progress < 1) requestAnimationFrame(updateCounter);
        else counter.textContent = formatCounter(target);
    }
    requestAnimationFrame(updateCounter);
}

if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.45 });
    counters.forEach((counter) => counterObserver.observe(counter));
} else counters.forEach(startCounter);

const revealElements = document.querySelectorAll(".owner-card, .especialidade-card, .servico-card, .cliente-card, .diferencial-card, .depoimento-card, .counter-box, .info-card");
if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("show"));
} else {
    revealElements.forEach((element) => element.classList.add("hidden"));
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
    revealElements.forEach((element) => revealObserver.observe(element));
}

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("close-lightbox");
let lastFocusedElement = null;

function openLightbox(image) {
    if (!lightbox || !lightboxImg) return;
    lastFocusedElement = document.activeElement;
    lightboxImg.src = image.currentSrc || image.src;
    lightboxImg.alt = image.alt || "Imagem ampliada da galeria";
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeLightbox?.focus();
}

function hideLightbox() {
    if (!lightbox || !lightboxImg || lightbox.getAttribute("aria-hidden") === "true") return;
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

galleryImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${image.alt || "Imagem da galeria"}. Abrir imagem ampliada.`);
    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(image);
        }
    });
});

lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) hideLightbox();
});
closeLightbox?.addEventListener("click", hideLightbox);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenuState(false);
        hideLightbox();
    }
});

const whatsappButton = document.querySelector(".whatsapp-float");
window.addEventListener("load", () => {
    if (!whatsappButton || reduceMotion) return;
    whatsappButton.style.opacity = "0";
    whatsappButton.style.transform = "translateY(30px)";
    window.setTimeout(() => {
        whatsappButton.style.transition = "opacity .8s ease, transform .8s ease";
        whatsappButton.style.opacity = "1";
        whatsappButton.style.transform = "translateY(0)";
    }, 350);
});

const form = document.getElementById("orcamento-form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const nome = String(data.get("nome") || "").trim();
        const telefone = String(data.get("telefone") || "").trim();
        const email = String(data.get("email") || "").trim() || "Não informado";
        const mensagem = String(data.get("mensagem") || "").trim() || "Não informado";
        const texto = `Olá, Tornearia Barbosa!\n\nGostaria de solicitar um orçamento.\n\nNome: ${nome}\nTelefone: ${telefone}\nE-mail: ${email}\n\nServiço:\n${mensagem}`;
        const url = `https://wa.me/5531999968132?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    });
}
