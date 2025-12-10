import cv2

# Path to your input logo
input_path = "logo_crop_mini.png"

# Read the image
img = cv2.imread(input_path)

if img is None:
    raise FileNotFoundError(f"Could not load image: {input_path}")

# Target sizes
sizes = [(16, 16), (48, 48), (128, 128)]

# Resize and save
for w, h in sizes:
    resized = cv2.resize(img, (w, h), interpolation=cv2.INTER_AREA)
    output_path = f"logo_cm_{w}x{h}.png"
    cv2.imwrite(output_path, resized)
    print(f"Saved: {output_path}")

