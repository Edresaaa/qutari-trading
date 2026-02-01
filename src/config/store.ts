import { StoreConfig } from "@/types/store";

export const storeConfig: StoreConfig = {
  name: "القوطاري للتجارة",
  whatsappNumber: "+967770475574",
  description: "متجر متخصص في الشيلان والأزياء التقليدية الفاخرة",
  address: "صنعاء - باب اليمن - سوق النظارة",
  phones: ["+967736700034", "+967770475574"],
};

export const formatWhatsAppLink = (
  productName: string,
  productUrl: string,
  productPrice: number,
  productImage?: string
): string => {
  const message = encodeURIComponent(
    `مرحباً، أرغب في الاستفسار عن المنتج التالي:\n\n` +
    `📦 المنتج: ${productName}\n` +
    `💰 السعر: ${productPrice} ر.ي\n` +
    `🔗 رابط المنتج: ${productUrl}\n` +
    (productImage ? `🖼️ صورة المنتج: ${productImage}\n` : "") +
    `\nأرجو التواصل معي لإتمام الطلب. شكراً لكم.`
  );
  
  return `https://wa.me/${storeConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${message}`;
};
