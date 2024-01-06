// db.js
const db = {
    products: [
    {
      id: 1,
      title: "Nike V2K Run",
      description: "Buty damskie",
      price: 579.88,
      image: "/images/nike/nikev2krun.webp",
      carouselImages: ["/images/nike/nikev2krun1.webp", "/images/nike/nikev2krun2.webp", "/images/nike/nikev2krun3.webp"],
      sizeChart: {
        EU: [
          { size: "35", available: false },
          { size: "36", available: true },
          { size: "37", available: true },
          { size: "38", available: true },
          { size: "39", available: true }
        ]
      }
    },
    {
      id: 2,
      title: "Nike Air VaporMax Plus",
      description: "Buty męskie",
      price: 1079.99,
      image: "/images/nike/vapormax.webp",
      carouselImages: ["/images/nike/vapormax1.webp", "/images/nike/vapormax2.webp", "/images/nike/vapormax3.webp"],
      sizeChart: {
        EU: [
          { size: "38", available: true },
          { size: "39", available: true },
          { size: "40", available: true },
          { size: "41", available: false },
          { size: "42", available: false },
          { size: "43", available: false },
          { size: "44", available: false },
          { size: "45", available: true },
          { size: "46", available: true }
        ]
      }
    },
    {
      id: 3,
      title: "Nike Air Force 1 '07",
      description: "Buty męskie",
      price: 629.99,
      image: "/images/nike/nikeairforce107.webp"
    },
    {
      id: 4,
      title: "Nike Air Force 1 '07 EasyOn",
      description: "Buty damskie",
      price: 679.99,
      image: "/images/nike/nikeairforce107easyon.webp"
    },
    {
      id: 5,
      title: "Adidas OZWEEGO",
      description: "Buty męskie",
      price: 549.99,
      image: "/images/adidas/adidasozweego.webp"
    },
    {
      id: 6,
      title: "Adidas Adi2000",
      description: "Buty damskie",
      price: 449.99,
      image: "/images/adidas/adi2000.webp"
    },
    {
      id: 7,
      title: "FENTY x PUMA Creeper Phatty",
      description: "Buty damskie",
      price: 669.99,
      image: "/images/puma/pumaxfenty.webp"
    },
    {
      id: 8,
      title: "Puma Slipstream Suede",
      description: "Buty męskie",
      price: 599.99,
      image: "/images/puma/slipstreamsuede.webp"
    }
    ]
};
  
module.exports = db;