import zlib
import os
import glob
from PIL import Image
import io

def svga_to_webp(svga_path, output_path):
    try:
        with open(svga_path, 'rb') as f:
            compressed = f.read()
        
        try:
            data = zlib.decompress(compressed)
        except Exception as e:
            print(f"✗ Decompress failed {svga_path}: {e}")
            return
        
        png_sig = b'\x89PNG\r\n\x1a\n'
        frames = []
        pos = 0
        
        while True:
            idx = data.find(png_sig, pos)
            if idx == -1:
                break
            next_idx = data.find(png_sig, idx + 8)
            chunk = data[idx:next_idx] if next_idx != -1 else data[idx:]
            try:
                img = Image.open(io.BytesIO(chunk)).convert("RGBA")
                frames.append(img.copy())
            except:
                pass
            pos = idx + 8
        
        if not frames:
            print(f"✗ No frames: {os.path.basename(svga_pa")
            return
        
        w, h = frames[0].size
        resized = []
        for img in frames:
            if img.size != (w, h):
                img = img.resize((w, h), Image.LANCZOS)
            resized.append(img)
        
        resized[0].save(
            output_path,
            format='WEBP',
            save_all=True,
            append_images=resized[1:],
            loop=0,
            duration=50
        )
        print(f"✓ {os.path.basename(svga_path)} → {os.path.basename(output_path)} ({len(resized)} frames)")
    
    except Exception as e:
        print(f"✗ {os.path.basename(svga_path)}: {e}")

for svga in glob.glob("assets/emoji/emoji/vip/*.svga"):
    name = os.path.splitext(os.path.basename(svga))[0]
    svga_to_webp(svga, f"assets/emoji/emoji/vip/{name}.webp")

print("Done!")
