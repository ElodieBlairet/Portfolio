'use strict';

const projectData = {
  "Volcan": {
    description: "Création d’un tableau de bord Power BI analysant l’activité volcanique dans le monde. Connexion à une API en temps réel, corrélation entre éruptions et variations climatiques, visualisations interactives et mises en forme conditionnelles."
  },
  "Crimes": {
    description: "Rapport Power BI sur la criminalité à San Francisco basé sur des données Excel. Intégration de cartes géographiques, filtres dynamiques, KPI visuels et indicateurs clés pour une lecture fluide de la sécurité urbaine."
  },
  "Gestion pédagogique": {
    description: "Application web académique de gestion pédagogique réalisée avec ASP.NET Core et Razor Pages. Suivi des professeurs, unités d’enseignement, maquettes pédagogiques et heures réalisées. Utilisation d’Entity Framework pour la gestion des données et architecture modulaire respectant les principes de la Clean Architecture."
  },
  "Artiste": {
    description: "Site vitrine développé en HTML/CSS/JavaScript pour promouvoir le travail d’une artiste. Galerie d’œuvres, actualités, liens vers les réseaux sociaux et design épuré pour mettre en valeur le contenu visuel."
  },
  "Console": {
    description: "Jeu en console C# dans lequel un héros affronte différents types de monstres. Implémentation orientée objet avec gestion des classes, des combats et de la progression du joueur dans un univers textuel."
  },
  "Ticketing": {
    description: "Dashboard Power BI mesurant la performance d’une équipe de support ticketing. Données extraites depuis un fichier Excel. Analyse des temps de traitement, répartition des demandes, et évaluation de la réactivité des agents."
  },
  "Collection": {
    description: "Interface web responsive permettant à un collectionneur de partager et documenter ses objets rares. Ajout de visuels, descriptions détaillées, et organisation par catégories pour une consultation intuitive."
  },
  "Météo": {
    description: "Rapport Power BI sur la prévision météorologique. Données issues d’API publiques, intégration de visuels importés depuis GitHub, modélisation de tendances et alertes conditionnelles selon les seuils climatiques."
  },
  "Université": {
    description: "Application web de gestion universitaire. Suivi des professeurs, gestion des unités d’enseignement (UE), des étudiants et de leurs notes. Interface moderne, navigation intuitive et structuration claire des fonctionnalités."
  }
};

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "tous") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// ====== gestion de la modale projet ======
const projectItems = document.querySelectorAll('.project-item');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const slidesContainer = document.getElementById('modal-gallery-slides');
const closeBtn = document.querySelector('.modal-close');
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');

let currentImages = [];
let currentIndex = 0;

function renderSlide(index) {
  if (!slidesContainer) return;
  slidesContainer.innerHTML = '';
  if (!currentImages.length) return;

  const slide = document.createElement('div');
  slide.classList.add('modal-slide');
  slide.style.opacity = '0';

  const img = document.createElement('img');
  img.src = currentImages[index];
  img.alt = modalTitle.textContent;
  img.loading = 'lazy';

  slide.appendChild(img);
  slidesContainer.appendChild(slide);

  requestAnimationFrame(() => {
    slide.style.opacity = '1';
  });
}

function showNextImage() {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  renderSlide(currentIndex);
}

function showPrevImage() {
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  renderSlide(currentIndex);
}

// Attacher l'écouteur sur le lien pour éviter les interférences de propagation
projectItems.forEach(item => {
  const link = item.querySelector('a');
  if (!link) return;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // éviter double gestion

    const titleEl = item.querySelector('.project-title');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const data = projectData[title] || {};

    modalTitle.textContent = title || 'Projet';
    modalDescription.textContent = data.description || "Description indisponible.";
    currentImages = Array.isArray(data.images) ? data.images.slice() : [];
    currentIndex = 0;

    renderSlide(currentIndex);
    modal.style.display = 'flex';
  });
});

nextBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  showNextImage();
});
prevBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  showPrevImage();
});

window.addEventListener('keydown', (e) => {
  if (modal.style.display !== 'flex') return;
  if (e.key === 'ArrowRight') showNextImage();
  else if (e.key === 'ArrowLeft') showPrevImage();
  else if (e.key === 'Escape') closeModal();
});

function closeModal() {
  modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
