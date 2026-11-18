# Likha Lokal static website

This version uses HTML, CSS, and JavaScript only. Open `index.html` in a browser to preview it, or publish the folder as a static site such as GitHub Pages.

## Files

- `index.html` is the entry page.
- `style.css` contains the layout and visual styles.
- `app.js` contains the collection data, cart, checkout flow, demo admin page, and page navigation.
- `assets/` contains the product photos and brand images.

## Demo order storage

Cart contents and demo orders are saved in the current browser's local storage. They do not sync to the group or appear on other visitors' devices. A shared admin dashboard and central order database require a server or online database.

Before publishing, replace the demo phone number, email, and social links in `app.js`. Do not upload `likha.sqlite`; it belongs to the former PHP version and is not used by this static site.
