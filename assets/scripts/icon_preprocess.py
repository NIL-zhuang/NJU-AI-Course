import os

from PIL import Image


def compress_and_crop_image(input_image_path, output_image_path, size=(224, 224)):
    """
    压缩并裁剪图像为指定大小，并保存为 PNG 格式

    :param input_image_path: 输入图像的路径
    :param output_image_path: 输出压缩后图像的路径
    :param size: 输出图像的尺寸，默认为 (336, 336)
    """
    with Image.open(input_image_path) as img:
        # 保持图像中心裁切
        white_background = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode in ("RGBA", "LA"):  # 如果图像具有透明通道
            white_background.paste(img, mask=img.split()[3])  # 使用 alpha 通道作为掩码
        else:
            white_background.paste(img)
        img = white_background.resize(size, Image.Resampling.BICUBIC)
        img.save(
            output_image_path, format="JPEG", optimize=True, quality=85
        )  # 使用 PNG 格式保存，启用压缩


def get_file_size_in_kb(fpath):
    return os.path.getsize(fpath) / 1024


# 指定输入和输出的文件路径
input_dir = "assets/icons_raw"  # 输入图像文件夹路径
output_dir = "static/icons"  # 输出压缩后图像文件夹路径

for file_name in os.listdir(input_dir):
    if any([file_name.endswith(suffix) for suffix in (".png", ".jpg", ".jpeg")]):
        input_path = os.path.join(input_dir, file_name)
        new_fname = os.path.splitext(file_name)[0] + ".jpg"
        output_path = os.path.join(output_dir, new_fname)
        compress_and_crop_image(input_path, output_path)

        origin_size = get_file_size_in_kb(input_path)
        compressed_size = get_file_size_in_kb(output_path)

        print(
            f"压缩并裁剪图像 {file_name} 完成，输出路径为: {output_path}, "
            f"原图大小: {origin_size:.2f} KB, 压缩后大小: {compressed_size:.2f} KB"
        )
