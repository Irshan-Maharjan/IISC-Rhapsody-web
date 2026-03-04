# Deployment & Hosting Guide for Hostinger Cloud

This document outlines the specific configuration requirements and solutions for deploying the **IISC Rhapsody 4.0** website to Hostinger Cloud Hosting. Following these rules is critical to prevent the website from being stuck on the initial loading screen.

## 1. The "Loading Screen Freeze" Issue
The website uses a **3D Disco Ball (Three.js/Fiber)** and high-quality **WebP assets**. If the server cannot correctly identify the MIME type of these files, or if there is a conflict in path routing, the site will fail to fetch the 3D model and get stuck indefinitely on the loading screen.

### Critical Fixes Implemented:
*   **Disabled Absolute SPA Routing**: Hostinger's LiteSpeed server often conflicts with `.htaccess` files containing `RewriteRule . /index.html [L]`. This was removed to prevent 500 internal server errors.
*   **Asset Pathing**: In `vite.config.js`, the `base` is set to `./` (Relative Path). This ensures the app works whether it's in the root folder or a deep subdirectory.
*   **3D Model Location**: Standard Vite builds put assets in the root `/assets/`. On Hostinger, moving 3D files (`.gltf`, `.bin`) into a nested subdirectory such as `assets/3d-models/` resolved access-denied issues.

## 2. Deployment Instructions (The Smooth Flow)

### Step 1: Building the Project
Always run the standard build command:
```bash
npm run build
```

### Step 2: The .htaccess Configuration
Ensure there is **NO** `.htaccess` in the root of the `dist` folder. Instead, a `.htaccess` file must exist inside the `dist/assets/` folder with the following content:

```apache
# Caching & MIME Type Fixes for Hostinger
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType model/gltf+json .gltf
  AddType model/gltf-binary .glb
</IfModule>
```

### Step 3: Zipping for Upload
When preparing the zip file, include all files within the `dist` folder. 
**Important**: Do not zip the `dist` folder itself; zip the **contents** within it so that `index.html` is at the root of your zip.

## 3. Reference for Future Developers/AI
If the site gets stuck on the loading screen again:
1.  **Check Browser Console (F12)**: Look for 403 or 404 errors related to `.gltf` or `.js` files.
2.  **Verify Vite Config**: Ensure `base: './'` is present.
3.  **Check .htaccess Location**: Ensure it is NOT in the root, but inside `dist/assets/`.
4.  **Confirm 3D Paths**: Ensure `ProjectorMenu.jsx` uses the path `./assets/3d-models/scene.gltf`.

---
*Maintained by the Antigravity AI Assistant.*
