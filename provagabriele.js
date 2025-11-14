// ===========================
// Search History Management
// ===========================

class SearchHistory {
  constructor() {
    this.storageKey = "spotifySearchHistory";
    this.maxItems = 20;
    this.initializeSearch();
    this.loadAndDisplayHistory();
  }

  // Initialize search functionality
  initializeSearch() {
    const searchInput = document.querySelector(
      'input[placeholder="Cosa vuoi ascoltare?"]'
    );

    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const query = searchInput.value.trim();
          if (query.length > 0) {
            this.addSearchItem(query);
            searchInput.value = "";
          }
        }
      });
    }
  }

  // Add a new search item
  addSearchItem(name, type = "album") {
    const searches = this.getSearches();

    // Remove duplicate if exists
    const filtered = searches.filter((item) => item.name !== name);

    // Create new search item
    const newItem = {
      id: Date.now(),
      name: name,
      type: type, // 'album' or 'artist'
      image: "https://placebear.com/120/120",
      timestamp: new Date().toISOString(),
    };

    // Add to beginning and limit to maxItems
    const updated = [newItem, ...filtered].slice(0, this.maxItems);

    // Save to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(updated));

    // Refresh display
    this.loadAndDisplayHistory();
  }

  // Get all searches from localStorage
  getSearches() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading search history:", error);
      return [];
    }
  }

  // Delete a specific search item
  deleteSearchItem(id) {
    const searches = this.getSearches();
    const updated = searches.filter((item) => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    this.loadAndDisplayHistory();
  }

  // Clear all search history
  clearAllHistory() {
    localStorage.removeItem(this.storageKey);
    this.loadAndDisplayHistory();
  }

  // Load and display history on the page
  loadAndDisplayHistory() {
    const container = document.getElementById("search-history-container");
    if (!container) return;

    const searches = this.getSearches();

    if (searches.length === 0) {
      container.innerHTML = `
        <div class="empty-history">
          <i class="fas fa-history"></i>
          <p>Nessuna ricerca recente</p>
        </div>
      `;
      return;
    }

    container.innerHTML = searches
      .map((item) => this.createSearchItemElement(item))
      .join("");

    // Add event listeners to delete buttons
    container.querySelectorAll(".delete-search-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        this.deleteSearchItem(id);
      });
    });

    // Add event listeners to items for navigation
    container.querySelectorAll(".search-history-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        if (!e.target.closest(".delete-search-btn")) {
          const id = parseInt(item.dataset.id);
          const search = searches.find((s) => s.id === id);
          if (search) {
            console.log("Navigating to:", search);
            // Here you can add navigation logic
          }
        }
      });
    });
  }

  // Create HTML element for a search item
  createSearchItemElement(item) {
    const imageClass = item.type === "artist" ? "artist" : "";

    return `
      <div class="search-history-item" data-id="${item.id}">
        <div class="search-item-content">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="search-item-image ${imageClass}"
          />
          <div class="search-item-info">
            <span class="search-item-type">${item.type}</span>
            <p class="search-item-name">${this.escapeHtml(item.name)}</p>
          </div>
        </div>
        <button class="delete-search-btn" data-id="${
          item.id
        }" title="Elimina ricerca">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  }

  // Escape HTML special characters
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.searchHistory = new SearchHistory();
});

// Make searchHistory available globally for testing
if (typeof window !== "undefined") {
  window.SearchHistory = SearchHistory;
}
