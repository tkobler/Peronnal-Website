/**
 * Device / viewport definitions used across responsive and visual tests.
 */

export interface DeviceProfile {
  name: string;
  width: number;
  height: number;
  isMobile: boolean;
  hasTouch: boolean;
  deviceScaleFactor: number;
}

export const DEVICES: DeviceProfile[] = [
  { name: "iPhone SE",       width: 375,  height: 667,  isMobile: true,  hasTouch: true,  deviceScaleFactor: 2 },
  { name: "iPhone 14",       width: 390,  height: 844,  isMobile: true,  hasTouch: true,  deviceScaleFactor: 3 },
  { name: "iPad Portrait",   width: 810,  height: 1080, isMobile: true,  hasTouch: true,  deviceScaleFactor: 2 },
  { name: "iPad Landscape",  width: 1080, height: 810,  isMobile: true,  hasTouch: true,  deviceScaleFactor: 2 },
  { name: "Desktop 1440p",   width: 1440, height: 900,  isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
  { name: "Ultrawide",       width: 2560, height: 1080, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
];

export const ROUTES = [
  "/",
  "/projects",
  "/experience",
  "/hobby",
  "/contact",
  "/about",
] as const;

export const LOCALES = ["en", "fr"] as const;
