// =============================================================
// ui.js — fonctions d'AFFICHAGE
// Elles reçoivent des données et modifient la page. Elles ne changent jamais les données.
// Utilisez createElement, textContent, classList, setAttribute / dataset, append.
// (Pas de innerHTML avec des données : seulement innerHTML = "" pour vider une zone.)
// =============================================================

const typesBox = document.querySelector("#types");
const grid = document.querySelector("#grid");
const count = document.querySelector("#count");
const detail = document.querySelector("#detail");
const cartList = document.querySelector("#cart-list");
const cartCountEl = document.querySelector("#cart-count");
const cartTotalEl = document.querySelector("#cart-total");
const statsBox = document.querySelector("#stats");

// -------------------------------------------------------------
// Petites aides (déjà écrites, utilisez-les)
// -------------------------------------------------------------

/** 1 → "#001" */
export const formatNumero = (id) => "#" + String(id).padStart(3, "0");

/** 12 → "12 DH" */
export const formatPrix = (prix) => prix + " DH";

/** "Électrik" → "type-electrik" (la classe CSS de couleur du type) */
export const typeClass = (type) =>
  "type-" + type.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Crée un élément avec une classe et un texte : el("p", "card__num", "#001") */
export function el(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}

// -------------------------------------------------------------
// PALIER 1
// -------------------------------------------------------------

/**
 * Affiche les boutons de type dans #types.
 * counts = { Feu: 3, Eau: 3, … } (résultat de countByType) ; activeType = "Tous" ou un type.
 * Modèle d'un bouton :
 *   <button class="type-btn is-active" type="button" data-type="Feu">Feu (3)</button>
 * Le premier bouton est « Tous (12) » avec data-type="Tous" (12 = la somme des compteurs).
 * Seul le bouton du type actif a la classe is-active.
 */
export function renderTypes(counts, activeType) {
  typesBox.innerHTML = ""
  let total = 0
  for (const typeName in counts ) {
    total += counts[typeName]
  }
  const allButton = el("button", "type-btn", "Tous (" + total + ")")
  allButton.setAttribute("type", "button")
  allButton.dataset.type = "Tous"
  typesBox.append(allButton)
  if(activeType === "Tous"){
    allButton.classList.add("is-active")
  }
  for(const typeName in counts) {
    const button = el("button", "type-btn", typeName + " (" + counts[typeName] + ")")
    button.setAttribute("type", "button")
    button.dataset.type = typeName
    if(activeType === typeName) {
      button.classList.add("is-active")
    }
    typesBox.append(button)
  }

  // TODO 1. Videz #types
  // TODO 2. Créez le bouton « Tous (…) »
  // TODO 3. Pour chaque type de counts (for...in ou Object.keys), créez un bouton
}

/**
 * Affiche le nombre de cartes visibles dans #count : "5 cartes", "1 carte" ou "Aucune carte".
 */
export function renderCount(n) {
  if(n === 0){
    count.textContent = "Aucune carte"
  } else if (n === 1) {
    count.textContent = "1 carte"
  } else {
    count.textContent = n + " cartes" 
  }
}

export function renderGrid(list, cart) {
  grid.innerHTML = "";
  if (list.length === 0) {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "Aucune carte trouvée"
    emptyMessage.classList.add("empty")
    grid.append(emptyMessage)
    return
  }
  for(const card of list ){
    const article = el("article", "card");
    article.dataset.id = card.id
    const cardName = el("h3", "card__name", card.nom)
    const image = el("img", "card__img")
    image.setAttribute("src", card.image)
    image.setAttribute("alt", card.nom)
    const number = el("p", "card__num", formatNumero(card.id))
    const meta = el("p", "card__meta")
    const typeBadge = el("span", "badge" + " " + typeClass(card.type), card.type)
    const rarity = el("span", "rarity", card.rarete)
    const price = el("p", "card__price", formatPrix(card.prix))
    const button = el("button", "btn btn--primary", "Ajouter")
    button.setAttribute("type", "button")
    button.dataset.add = card.id
    meta.append(typeBadge, rarity)
    article.append(image, number, cardName, meta, price, button)
    grid.append(article)
    if(card.stock === 0){
      article.classList.add("out-of-stock")
      button.disabled = true
    }
  }
}

/**
 * Affiche la fiche d'une carte dans #detail : image, nom (h3), numéro + badge du type,
 * description, puis une liste <dl> : Rareté, Prix, Stock (« Rupture » si 0).
 */
export function renderDetail(card) {
  // TODO
}

// -------------------------------------------------------------
// PALIER 2
// -------------------------------------------------------------

/**
 * Affiche le panier.
 * cart = [{ id, quantite }] ; cards = toutes les cartes (pour le nom, le prix, le stock).
 * Modèle d'une ligne :
 *   <li class="cart-line" data-id="1">
 *     <span class="cart-line__name">Emberkit</span>
 *     <button class="btn btn--small" type="button" data-action="minus">−</button>
 *     <span class="cart-line__qty">2</span>
 *     <button class="btn btn--small" type="button" data-action="plus">+</button>
 *     <button class="btn btn--small" type="button" data-action="remove">Retirer</button>
 *   </li>
 * - le bouton + est désactivé quand la quantité atteint le stock
 * - panier vide : <li class="empty">Votre panier est vide</li>
 * - #cart-count : "3 cartes" (ou "1 carte", "0 carte") ; #cart-total : "54 DH"
 *   → total et nbCards sont déjà calculés par main.js (cartTotal et cartCount de cart.js)
 * - pour le nom et le stock d'une ligne, retrouvez la carte dans cards avec find
 */
export function renderCart(cart, cards, total, nbCards) {
  // TODO
}

// -------------------------------------------------------------
// PALIER 3 (bonus)
// -------------------------------------------------------------

/**
 * Affiche les statistiques dans #stats : 4 blocs
 *   <div class="stat"><p class="stat__value">1 234 DH</p><p class="stat__label">Valeur du stock</p></div>
 */
export function renderStats(stats) {
  // TODO
}

/**
 * Affiche les erreurs du formulaire : errors = { nom: "…", prix: "…" }
 * Pour chaque champ (nom, prix, stock) : écrit le message dans [data-error-for="…"]
 * et ajoute ou retire la classe field-error sur le champ #form-….
 */
export function showFormErrors(errors) {
  // TODO
}
