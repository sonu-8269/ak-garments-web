import os

base_dir = r"ak-garments-prioject"

def replace_in_file(rel_path, replacements):
    fpath = os.path.join(base_dir, rel_path)
    if not os.path.exists(fpath):
        print(f"[MISSING] {fpath}")
        return
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    modified = content
    for old, new in replacements:
        if old in modified:
            modified = modified.replace(old, new)
            print(f"[REPLACED] '{old}' -> '{new}' in {rel_path}")
        else:
            print(f"[NOTE] '{old}' not found in {rel_path}")
            
    if modified != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(modified)
        print(f"[UPDATED] {rel_path}")
    else:
        print(f"[NO CHANGE] {rel_path}")

# 1. index.html
replace_in_file("index.html", [
    ("<title>ATELIER & CO. — Luxury Garments & Bespoke Tailoring Studio</title>",
     "<title>AK GARMENTS — Luxury Garments & Bespoke Tailoring Studio</title>"),
    ("ATELIER & CO.", "AK GARMENTS"),
])

# 2. Navbar.tsx
replace_in_file(os.path.join("src", "components", "Navbar.tsx"), [
    ("LINEUP", "AK GARMENTS"),
    ("Fall '26 Runway & Bespoke Atelier", "Fall '26 Runway & Bespoke Collection"),
    ("ATELIER & CO.", "AK GARMENTS"),
    ("Call Atelier Concierge", "Call AK Garments Concierge"),
])

# 3. Footer.tsx
replace_in_file(os.path.join("src", "components", "Footer.tsx"), [
    ("The Atelier Private Journal", "The AK Garments Private Journal"),
    ("registered for our private atelier dispatches", "registered for our private AK Garments dispatches"),
    ("ATELIER & CO.", "AK GARMENTS"),
    ("concierge@atelierandco.com", "concierge@akgarments.com"),
    ("© 2026 ATELIER & CO. S.p.A. All rights reserved.", "© 2026 AK GARMENTS. All rights reserved."),
    ("Flagship Atelier:", "Flagship Store:"),
])

# 4. HeroSection.tsx
replace_in_file(os.path.join("src", "components", "HeroSection.tsx"), [
    ("Atelier & Co.", "AK Garments"),
    ("alt=\"Atelier Luxury Fashion Campaign\"", "alt=\"AK Garments Luxury Fashion Campaign\""),
])

# 5. InfiniteClothingRack.tsx
replace_in_file(os.path.join("src", "components", "InfiniteClothingRack.tsx"), [
    ("ATELIER & CO.", "AK GARMENTS"),
])

# 6. CheckoutModal.tsx
replace_in_file(os.path.join("src", "components", "CheckoutModal.tsx"), [
    ("client@atelierandco.com", "client@akgarments.com"),
    ("Secure Atelier Checkout", "Secure AK Garments Checkout"),
    ("Atelier Studio Collection", "AK Garments Studio Collection"),
])

# 7. CartDrawer.tsx
replace_in_file(os.path.join("src", "components", "CartDrawer.tsx"), [
    ("ATELIER10", "AK10"),
    ("VIP", "AKVIP"),
    ("placeholder=\"Promo code (e.g. ATELIER10)\"", "placeholder=\"Promo code (e.g. AK10)\""),
])

# 8. CraftsmanshipStory.tsx
replace_in_file(os.path.join("src", "components", "CraftsmanshipStory.tsx"), [
    ("Atelier & Co.", "AK Garments"),
])

# 9. EditorialLookbook.tsx
replace_in_file(os.path.join("src", "components", "EditorialLookbook.tsx"), [
    ("Plate 02 · Atelier Studio", "Plate 02 · AK Garments Studio"),
    ("Head Pattern Cutter, Atelier & Co.", "Head Pattern Cutter, AK Garments"),
])

# 10. TailoringStudio.tsx
replace_in_file(os.path.join("src", "components", "TailoringStudio.tsx"), [
    ("ATELIER-BESPOKE-", "AK-GARMENTS-BESPOKE-"),
    ("Atelier Studio Appointment", "AK Garments Studio Appointment"),
    ("client@atelier.com", "client@akgarments.com"),
])

# 11. TrustBar.tsx
replace_in_file(os.path.join("src", "components", "TrustBar.tsx"), [
    ("30-Day Atelier Alterations", "30-Day AK Garments Alterations"),
    ("Atelier & Co.", "AK Garments"),
])

# 12. SizeGuideModal.tsx
replace_in_file(os.path.join("src", "components", "SizeGuideModal.tsx"), [
    ("Atelier Size & Metric Guide", "AK Garments Size & Metric Guide"),
])

# 13. Garment3DModal.tsx
replace_in_file(os.path.join("src", "components", "Garment3DModal.tsx"), [
    ("Atelier Fabric Specification", "AK Garments Fabric Specification"),
])

# 14. package.json
replace_in_file("package.json", [
    ("\"name\": \"atelier-luxury-fashion\"", "\"name\": \"ak-garments\""),
])

# 15. App.tsx
replace_in_file(os.path.join("src", "App.tsx"), [
    ("atelier_cart", "ak_garments_cart"),
    ("atelier_wishlist", "ak_garments_wishlist"),
])

# 16. mockData.ts
replace_in_file(os.path.join("src", "data", "mockData.ts"), [
    ("archival Atelier branding", "archival AK Garments branding"),
    ("Includes complimentary atelier alterations", "Includes complimentary AK Garments alterations"),
    ("Atelier Leather Weekender Duffle", "AK Garments Leather Weekender Duffle"),
    ("Womenswear Atelier", "AK Garments Womenswear Atelier"),
])

print("\n=== ALL NAME REPLACEMENTS COMPLETED! ===")

