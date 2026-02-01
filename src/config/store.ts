import { StoreConfig } from "@/types/store";

export const storeConfig: StoreConfig = {
  name: "القوطاري للتجارة",
  whatsappNumber: "+967736700034",
  description: "متجر متخصص في الشيلان والأزياء التقليدية الفاخرة",
};

export const formatWhatsAppLink = (
  productName: string,
  productUrl: string,
  productPrice: number
): string => {
  const message = encodeURIComponent(
    `مرحباً، أرغب في الاستفسار عن المنتج التالي:\n\n` +
    `📦 المنتج: ${productName}\n` +
    `💰 السعر: ${productPrice} ر.ي\n` +
    `🔗 الرابط: ${productUrl}\n\n` +
    `أرجو التواصل معي لإتمام الطلب. شكراً لكم.`
  );
  
  return `https://wa.me/${storeConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${message}`;
};
