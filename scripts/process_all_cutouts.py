import os
import sys
import numpy as np
from PIL import Image
from rembg import remove, new_session

PUBLIC_DIR = r"ak-garments-prioject\public\images"

def clean_alpha(img_rgba):
    """
    Cleans up minor stray alpha noise (e.g. alpha < 12 set to 0),
    and ensures pure transparency in background areas.
    """
    arr = np.array(img_rgba)
    alpha = arr[:, :, 3]
    # Set subtle noise to pure 0
    alpha[alpha < 12] = 0
    arr[:, :, 3] = alpha
    return Image.fromarray(arr)

def process_file(session, src_file, dest_file):
    src_path = os.path.join(PUBLIC_DIR, src_file)
    dest_path = os.path.join(PUBLIC_DIR, dest_file)
    
    if not os.path.exists(src_path):
        print(f"[SKIP] Source file not found: {src_path}")
        return
    
    print(f"[PROCESS] {src_file} -> {dest_file}...")
    img = Image.open(src_path)
    # Remove background with rembg
    out = remove(img, session=session)
    cleaned = clean_alpha(out)
    cleaned.save(dest_path, "PNG")
    
    # Calculate transparency percentage
    alpha = np.array(cleaned)[:, :, 3]
    zero_pct = (alpha == 0).mean() * 100
    print(f"  [DONE] Saved {dest_file} (size: {cleaned.size}, transparent: {zero_pct:.1f}%)")

def main():
    print("Initializing BiRefNet session...")
    # default session uses birefnet-general
    session = new_session("birefnet-general")
    
    # 1. Men Runway Models
    men_jobs = [
        ("runway-men-1.png", "cutout-men-1.png"),
        ("runway-men-2.jpg", "cutout-men-2.png"),
        ("runway-men-3.jpg", "cutout-men-3.png"),
        ("runway-men-4.jpg", "cutout-men-4.png"),
        ("runway-men-5.png", "cutout-men-5.png"),
        ("runway-men-6.png", "cutout-men-6.png"),
    ]
    
    print("\n--- Processing Men Runway Cutouts ---")
    for src, dst in men_jobs:
        process_file(session, src, dst)
        
    # 2. Women Runway Models
    women_jobs = [
        ("runway-women-1.jpg", "cutout-women-1.png"),
        ("runway-women-2.jpg", "cutout-women-2.png"),
        ("runway-women-3.jpg", "cutout-women-3.png"),
        ("runway-women-4.jpg", "cutout-women-4.png"),
        ("runway-women-5.jpg", "cutout-women-5.png"),
        ("runway-women-6.jpg", "cutout-women-6.png"),
    ]
    
    print("\n--- Processing Women Runway Cutouts ---")
    for src, dst in women_jobs:
        process_file(session, src, dst)
        
    # 3. Clothing Rack Garments
    rack_jobs = [
        ("rack-blazer-clean.png", "rack-blazer-clean.png"),
        ("rack-cardigan-clean.png", "rack-cardigan-clean.png"),
        ("rack-crewneck-clean.png", "rack-crewneck-clean.png"),
        ("rack-hoodie-clean.png", "rack-hoodie-clean.png"),
        ("rack-sherwani-clean.png", "rack-sherwani-clean.png"),
        ("rack-shirt-clean.png", "rack-shirt-clean.png"),
        ("rack-suit-clean.png", "rack-suit-clean.png"),
    ]
    
    print("\n--- Processing Clothing Rack Garments ---")
    for src, dst in rack_jobs:
        # Save to temporary first if src == dst
        temp_src = os.path.join(PUBLIC_DIR, f"orig_{src}")
        orig_file = os.path.join(PUBLIC_DIR, src)
        if not os.path.exists(temp_src):
            import shutil
            shutil.copy2(orig_file, temp_src)
        process_file(session, f"orig_{src}", dst)
        
    print("\n=== All background removals completed successfully! ===")

if __name__ == "__main__":
    main()

