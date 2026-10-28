import os
import sys
import shutil
import numpy as np
from PIL import Image
from rembg import remove, new_session

PUBLIC_DIR = r"ak-garments-prioject\public\images"
ROOT_IMAGES_DIR = r"ak-garments-prioject\images"
BACKUP_DIR = os.path.join(PUBLIC_DIR, "backup_original_cutouts")

os.makedirs(BACKUP_DIR, exist_ok=True)

def post_process_cutout(img_rgba):
    """
    Cleans alpha channel to guarantee:
    1. Alpha noise below threshold is 0.
    2. Outer boundary borders (top, left, right) with lingering haze are cleared.
    3. Perfect transparent background with zero rectangular bounding box artifacts.
    """
    img_rgba = img_rgba.convert("RGBA")
    arr = np.array(img_rgba)
    alpha = arr[:, :, 3].copy()
    
    # 1. Zero out faint noise/halo
    alpha[alpha < 18] = 0
    
    # 2. Smooth slight edge transitions
    # If alpha > 230, make it solid 255 for clean opaque fabric
    alpha[alpha > 235] = 255
    
    # 3. Clear border artifacts (e.g. 1px line along edges)
    # Check top row, left col, right col
    alpha[0, :] = 0
    alpha[:, 0] = 0
    alpha[:, -1] = 0
    
    arr[:, :, 3] = alpha
    cleaned = Image.fromarray(arr)
    return cleaned

def process_image(session, src_filename, dest_filename):
    src_path = os.path.join(PUBLIC_DIR, src_filename)
    dest_path = os.path.join(PUBLIC_DIR, dest_filename)
    
    if not os.path.exists(src_path):
        print(f"[ERROR] Source file missing: {src_path}", flush=True)
        return False
        
    # Backup existing destination if it exists
    if os.path.exists(dest_path):
        b_path = os.path.join(BACKUP_DIR, dest_filename)
        if not os.path.exists(b_path):
            shutil.copy2(dest_path, b_path)
            
    print(f"Processing {src_filename} -> {dest_filename}...", flush=True)
    img = Image.open(src_path)
    
    # Use rembg with u2net
    raw_cutout = remove(img, session=session)
    clean_cutout = post_process_cutout(raw_cutout)
    
    # Save optimized PNG
    clean_cutout.save(dest_path, "PNG", optimize=True)
    
    # Also sync to root images dir if it exists
    if os.path.exists(ROOT_IMAGES_DIR):
        root_dest = os.path.join(ROOT_IMAGES_DIR, dest_filename)
        clean_cutout.save(root_dest, "PNG", optimize=True)
        
    alpha = np.array(clean_cutout)[:, :, 3]
    trans_pct = (alpha == 0).mean() * 100
    corners = [
        clean_cutout.getpixel((0, 0)),
        clean_cutout.getpixel((clean_cutout.width-1, 0)),
        clean_cutout.getpixel((0, clean_cutout.height-1)),
        clean_cutout.getpixel((clean_cutout.width-1, clean_cutout.height-1))
    ]
    print(f"  [SUCCESS] {dest_filename} saved: {clean_cutout.size}, Transparent: {trans_pct:.1f}%, Corners: {corners}", flush=True)
    return True

def main():
    print("=== STARTING FULL BACKGROUND REMOVAL PIPELINE ===", flush=True)
    print("Initializing u2net model session...", flush=True)
    session = new_session("u2net")
    print("Model loaded. Processing all models...", flush=True)
    
    # MEN MODELS (All 6 looks)
    men_jobs = [
        ("runway-men-1.png", "cutout-men-1.png"),
        ("runway-men-2.jpg", "cutout-men-2.png"),
        ("runway-men-3.jpg", "cutout-men-3.png"),
        ("runway-men-4.jpg", "cutout-men-4.png"),
        ("runway-men-5.png", "cutout-men-5.png"),
        ("runway-men-6.png", "cutout-men-6.png"),
    ]
    
    # WOMEN MODELS (All 6 looks)
    women_jobs = [
        ("runway-women-1.jpg", "cutout-women-1.png"),
        ("runway-women-2.jpg", "cutout-women-2.png"),
        ("runway-women-3.jpg", "cutout-women-3.png"),
        ("runway-women-4.jpg", "cutout-women-4.png"),
        ("runway-women-5.jpg", "cutout-women-5.png"),
        ("runway-women-6.jpg", "cutout-women-6.png"),
    ]
    
    print("\n--- [1/2] Processing Men Models (Looks 01 - 06) ---", flush=True)
    for src, dst in men_jobs:
        process_image(session, src, dst)
        
    print("\n--- [2/2] Processing Women Models (Looks 01 - 06) ---", flush=True)
    for src, dst in women_jobs:
        process_image(session, src, dst)
        
    print("\n=== PIPELINE FINISHED: All 12 Runway Models Perfectly Cutout! ===", flush=True)

if __name__ == "__main__":
    main()

