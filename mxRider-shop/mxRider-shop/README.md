
## 📂 Struttura del Progetto

- `index.html`: La struttura principale del sito e dei modali.
- `styles.css`: Tutti i fogli di stile (con commenti divertenti inclusi! 😉).
- `script.js`: La logica che fa funzionare il carrello, i filtri e il caricamento dati.
- `products.js`: Il "database" dei prodotti in formato JSON/Array.
- `assets/`: Cartella contenente le immagini dei prodotti e l'eroe della homepage.

---

## ➕ Come aggiungere un nuovo prodotto

Per aggiungere un prodotto, non devi toccare il codice del sito, ma solo il file `products.js`.

1. Apri `products.js`.
2. Copia uno dei blocchi esistenti e incollalo nell'array `productsData`.
3. Modifica i campi seguendo questo schema:

```javascript
{
    name: "Nome del Tuo Prodotto",
    category: "helmets", // Scegli tra: helmets, gear, parts
    section: "Novità",    // Testo che apparirà sull'etichetta della card
    price: 199.99,      // Prezzo (usa il punto per i decimali)
    image: "assets/nuova-immagine.png", // Percorso dell'immagine
    brand: "Marca",
    specs: [            // Lista delle caratteristiche tecniche
        "Caratteristica 1",
        "Caratteristica 2"
    ],
    reviews: []         // Lascia vuoto [] o aggiungi recensioni simulate
}
```

4. Salva il file e ricarica `index.html` nel browser.


