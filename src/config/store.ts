import { StoreConfig } from "@/types/store";

export const storeConfig: StoreConfig = {
  name: "القوطاري للتجاره",
  whatsappNumber: "+967770475574",
  description: "متجر متخصص في الشيلان والأزياء التقليدية الفاخرة",
  address: "صنعاء - باب اليمن - سوق النظارة",
  phones: ["+967736700034", "+967770475574"],
};

export const formatWhatsAppLink = (
  productName: string,
  productUrl: string,
  productPrice: number,
  sizeText?: string
): string => {
  let message =
    `مرحباً، معكم من القوطاري للتجارة\n` +
    `أرغب في طلب هذا المنتج:\n\n` +
    `📦 ${productName}\n` +
    `💰 السعر: ${productPrice} ر.ي\n`;

  if (sizeText) {
    message += `📏 ${sizeText}\n`;
  }

  message +=
    `🔗 ${productUrl}\n\n` +
    `هل هو متوفر حالياً؟`;

  return `https://wa.me/${storeConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
};
