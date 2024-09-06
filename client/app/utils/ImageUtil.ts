// image compless, remix sample
import imageCompression from "browser-image-compression";

export const ImageUtil = {
  // 画像ファイルを取得
  async getCompressImageFileAsync(file: any) {
    const options = {
      //      maxSizeMB: 1, // 最大ファイルサイ
      maxWidthOrHeight: 400, // max-width
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("getCompressImageFileAsync is error", error);
      throw error;
    }
  },
  // dataurlを取得
  getImageURLAsync: async (file: File): Promise<string> => {
    try {
      return await imageCompression.getDataUrlFromFile(file);
    } catch (error) {
      console.error("getDataUrlFromFile is error", error);
      throw error;
    }
  },
};
