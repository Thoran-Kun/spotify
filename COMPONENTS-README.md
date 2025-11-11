# 🎵 Sistema di Componenti Modulari

> Sidebar, player e altri elementi condivisi caricati automaticamente in tutte le pagine

---

## 📁 Struttura

```
epicode-S4-BW2_Spotify_Clone/
├── components/                # Componenti riutilizzabili
│   ├── sidebar-left.html      # Navigazione + playlist
│   ├── sidebar-left.css       # Stili sidebar sinistra
│   ├── sidebar-right.html     # Attività amici
│   ├── sidebar-right.css      # Stili sidebar destra
│   ├── player.html            # Player musicale
│   └── player.css             # Stili player
├── assets/
│   ├── css/
│   │   ├── common.css         # Stili globali comuni
│   │   └── main-content.css   # Stili contenuto centrale
│   └── js/
│       └── components-loader.js   # Script che carica componenti + CSS
└── *.html                     # Pagine del sito
```

**Principio:** Modifichi 1 componente (HTML o CSS) → Cambia in tutte le pagine!

---

## 🔍 Come Funziona

**4 passi semplici:**

1. **Pagina HTML** → Dichiara contenitori vuoti (`<div id="sidebar-left-container">`)
2. **Browser** → Carica `components-loader.js`
3. **Loader** → Carica i CSS dei componenti dinamicamente
4. **Loader** → Scarica i componenti HTML e li inserisce nei contenitori

```javascript
// Codice semplificato del loader
// 1. Carica CSS
loadCSS("components/sidebar-left.css", "sidebar-left-css");

// 2. Carica HTML
fetch("components/sidebar-left.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("sidebar-left-container").innerHTML = html;
  });
```

**Bonus:** Il loader evidenzia automaticamente il link della pagina attiva nel menu.

---

## 🎨 Architettura CSS

**CSS Modulare:** Ogni componente ha il suo CSS, stili comuni separati.

| File CSS            | Contenuto                                          |
| ------------------- | -------------------------------------------------- |
| `common.css`        | Stili globali (body, scrollbar, animazioni, hover) |
| `main-content.css`  | Stili contenuto centrale (header, album, cards)    |
| `sidebar-left.css`  | Solo stili sidebar sinistra                        |
| `sidebar-right.css` | Solo stili sidebar destra                          |
| `player.css`        | Solo stili player musicale                         |

**Come si caricano i CSS:**

- `common.css` e `main-content.css` → Caricate nella pagina HTML (`<link>`)
- `sidebar-left.css`, `sidebar-right.css`, `player.css` → Caricate automaticamente da `components-loader.js`

**Vantaggi:**

- ✅ Modifichi `player.css` → Cambia solo il player
- ✅ File CSS più piccoli e organizzati
- ✅ Ogni componente è completamente autonomo (HTML + CSS)

---

## 🚀 Usare i Componenti in una Pagina

**Template base:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>La Mia Pagina</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <!-- Stili comuni globali -->
    <link rel="stylesheet" href="assets/css/common.css" />
    <!-- Stili contenuto centrale -->
    <link rel="stylesheet" href="assets/css/main-content.css" />
  </head>
  <body class="bg-black text-white">
    <div class="container-fluid p-0">
      <div class="row g-0 min-vh-100">
        <!-- Placeholder per componenti -->
        <div id="sidebar-left-container"></div>

        <div class="col-7 main-content">
          <!-- IL TUO CONTENUTO QUI -->
        </div>

        <div id="sidebar-right-container"></div>
      </div>
    </div>

    <div id="player-container"></div>

    <!-- Script obbligatorio -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/components-loader.js"></script>
    <!-- ☝️ Questo script carica automaticamente i CSS dei componenti! -->
  </body>
</html>
```

**Regole:**

- ✅ I 3 `<div id="...">` con ID esatti: `sidebar-left-container`, `sidebar-right-container`, `player-container`
- ✅ `components-loader.js` alla fine del `<body>` (carica automaticamente i CSS dei componenti)
- ✅ `common.css` e `main-content.css` nel `<head>`
- ❌ Non cambiare gli ID dei placeholder
- ❌ Non caricare manualmente `sidebar-left.css`, `sidebar-right.css`, `player.css` (ci pensa il loader!)

---

## 🔧 Modificare Componenti

**Modifica `components/sidebar-left.html` → Cambia in TUTTE le pagine!**

**Esempio - Aggiungere playlist:**

```html
<!-- components/sidebar-left.html -->
<li class="nav-item">
  <a href="#" class="nav-link">
    <span class="playlist-text">🎸 Rock Classics</span>
  </a>
</li>
```

Salva → Ricarica qualsiasi pagina → La nuova playlist appare ovunque!

---

## ➕ Aggiungere Nuovo Componente

**3 passi:**

1. **Crea** `components/navbar.html`
2. **Aggiungi in `components-loader.js`:**

   ```javascript
   await Promise.all([
     loadComponent("components/sidebar-left.html", "sidebar-left-container"),
     loadComponent("components/navbar.html", "navbar-container"), // ← Nuovo
     // ...
   ]);
   ```

3. **Aggiungi placeholder** nelle pagine: `<div id="navbar-container"></div>`

---

## ➖ Rimuovere Componente

**2 passi:**

1. **Commenta in `components-loader.js`:**

   ```javascript
   // loadComponent("components/sidebar-right.html", "sidebar-right-container"),
   ```

2. **Rimuovi placeholder** dalle pagine

---

## ⚙️ Setup Obbligatorio

**🚨 Devi usare un server locale!**

❌ Doppio click su HTML = NON funziona  
✅ Server locale = Funziona

**Opzione 1 - Live Server (VS Code):**

1. Extensions → Cerca "Live Server" → Install
2. Click destro su `homepage-modular.html` → "Open with Live Server"

**Opzione 2 - Python:**

```bash
python -m http.server 8000
# Vai a http://localhost:8000/homepage-modular.html
```

**Opzione 3 - Node.js:**

```bash
npx http-server
# Vai a http://localhost:8080/homepage-modular.html
```

---

## 🐛 Problemi Comuni

### Componenti non si caricano (spazi vuoti)

**Causa:** File aperto direttamente invece che con server locale  
**Soluzione:** Usa Live Server o Python/Node

### Link pagina attiva non evidenziato

**Causa:** Pagina non nel `pageMap` di `components-loader.js`  
**Soluzione:** Aggiungi la pagina:

   ```javascript
const pageMap = {
  "homepage.html": "home",
  "search.html": "search", // ← Aggiungi
};
   ```

### Modifiche non appaiono

**Causa:** Cache del browser  
**Soluzione:** `Ctrl + Shift + R` (hard reload)

---

## ✅ Best Practices

1. **Componenti generici:** Non mettere contenuto specifico di una pagina nei componenti
2. **Testa subito:** Modifica → Salva → Ricarica tutte le pagine per verificare
3. **Backup:** Copia il componente prima di modifiche grandi
4. **Commenti:** Documenta le modifiche importanti

---

## 🎯 Cheat Sheet

| Azione            | Come Fare                                       |
| ----------------- | ----------------------------------------------- |
| **Usare sistema** | Aggiungi 3 placeholder + `components-loader.js` |
| **Modificare**    | Apri `components/[nome].html` → Salva           |
| **Aggiungere**    | Crea file + Aggiungi in loader + Placeholder    |
| **Rimuovere**     | Commenta in loader + Rimuovi placeholder        |

**Documentazione completa:** Leggi i commenti in `assets/js/components-loader.js`

---
