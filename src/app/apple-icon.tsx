import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { BrandMark } from "./brand-mark";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<BrandMark size={180} radius={0} primary={siteConfig.theme.primary} accent="#2a8fdc" />, size);
}
