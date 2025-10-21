// Static images for each tour id; fallback to dynamic provider when missing
// Paths are relative to public/
const TOUR_IMAGES = {
  // Iguazu Argentine side
  'ar-iguacu-ar': '/images/tour-sec/argentina-falls.jpg',
  // Gran Aventura (Argentina) – use dedicated image from tour-sec
  'ar-gran-aventura': '/images/tour-sec/gran-aventura.png',
  // Saltos del Monday (Paraguay)
  'py-saltos-monday': '/images/tour-sec/monday.jpg',
  // Iguazu Brazilian side — use curated image in tour-sec
  'br-iguacu-br': '/images/tour-sec/cataratas-brazil.jpg',

  // Itaipu tours
  // Night lights from tour-sec
  'br-itaipu-night': '/images/tour-sec/itaipu-night-lights.jpg',
  // For now, pick coherent images from gallery for Panoramic and Refuge (can be swapped if you add /tour-sec variants)
  'br-itaipu-panoramico': '/images/gallery/SaveClip.App_419493917_1095094421816187_4659197450807997565_n.jpg',
  // Biological Refuge: use jaguar image from gallery
  'br-itaipu-refugio': '/images/gallery/jaguar.jpg',

  // Macuco Safari (Brazilian boat)
  'br-macuco-safari': '/images/macuco.jpeg',

  // Ciudad del Este shopping (use specific asset from tour-sec)
  'py-shopping-cde': '/images/tour-sec/ciudad-del-este.jpeg',
}

export default TOUR_IMAGES
