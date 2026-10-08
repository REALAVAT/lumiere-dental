/** Ask Unsplash for a sensibly sized source; next/image then resizes per device. */
export function unsplash(url: string, width = 1600) {
  return `${url}?auto=format&fit=crop&w=${width}&q=80`;
}

export const images = {
  hero: "https://images.unsplash.com/photo-1629909615184-74f495363b67",
  interior: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
  reception: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6",
  xray: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  smile: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
};
