import { useState, useEffect, useCallback } from "react";
import { getStoreSettings, StoreSettings } from "@/lib/storage";

/**
 * Hook to get live store settings that update when changed in admin.
 * Replaces the hardcoded storeConfig across the frontend.
 */
export const useStoreSettings = () => {
  const [settings, setSettings] = useState<StoreSettings>(getStoreSettings());

  const reload = useCallback(() => {
    setSettings(getStoreSettings());
  }, []);

  useEffect(() => {
    window.addEventListener("productsUpdated", reload);
    window.addEventListener("storage", reload);
    return () => {
      window.removeEventListener("productsUpdated", reload);
      window.removeEventListener("storage", reload);
    };
  }, [reload]);

  return settings;
};
