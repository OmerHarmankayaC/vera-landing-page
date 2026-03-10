from PIL import Image

def remove_white_bg(image_path, output_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # If the pixel is close to white, make it transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_white_bg("/Users/omerharmankaya/Desktop/AntiGravity/Vera-Landing/assets/logo.png", "/Users/omerharmankaya/Desktop/AntiGravity/Vera-Landing/assets/logo_transparent.png")
print("Logo converted successfully.")
