import { StoreConfig } from "@/types/store";
import { getStoreSettings } from "@/lib/storage";

export const storeConfig: StoreConfig = {
  name: "القوطاري للتجاره",
  whatsappNumber: "+967770475574",
  description: "متجر متخصص في المستلزمات الرجالية والولادية اليمنية والخليجية الفاخرة",
  address: "صنعاء - باب اليمن - سوق النظارة",
  phones: ["+967736700034", "+967770475574"],
};

export const formatWhatsAppLink = (
  productName: string,
  productUrl: string,
  productPrice: number,
  sizeText?: string
): string => {
  const settings = getStoreSettings();
  const template = settings.whatsappMessage || 
    "مرحباً، معكم من القوطاري للتجاره\nأرغب في طلب هذا المنتج:\n\n📦 {product}\n💰 السعر: {price}\n{size}\n🔗 {url}\n\nهل هو متوفر حالياً؟";

  const message = template
    .replace("{product}", productName)
    .replace("{price}", `${productPrice} ${settings.currencySymbol || "ر.ي"}`)
    .replace("{size}", sizeText ? `📏 ${sizeText}` : "")
    .replace("{url}", productUrl);

  return `https://wa.me/${(settings.whatsappNumber || storeConfig.whatsappNumber).replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
};
