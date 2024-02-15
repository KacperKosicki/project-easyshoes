// db.js

const db = {
    products: [
      {
        id: 1,
        title: "Nike V2K Run",
        gender: "Buty damskie",
        price: 579.88,
        image: "/images/nike/nikev2krun.webp",
        carouselImages: ["/images/nike/nikev2krun1.webp", "/images/nike/nikev2krun2.webp", "/images/nike/nikev2krun3.webp"],
        sizeChart: {
          EU: [
            { size: 35, available: false },
            { size: 36, available: true },
            { size: 37, available: true },
            { size: 38, available: true },
            { size: 39, available: true }
          ]
        },
        available: false
      },
      {
        id: 2,
        title: "Nike Air VaporMax Plus",
        gender: "Buty męskie",
        price: 1079.99,
        image: "/images/nike/vapormax.webp",
        carouselImages: ["/images/nike/vapormax1.webp", "/images/nike/vapormax2.webp", "/images/nike/vapormax3.webp"],
        sizeChart: {
          EU: [
            { size: 38, available: true },
            { size: 39, available: true },
            { size: 40, available: true },
            { size: 41, available: false },
            { size: 42, available: false },
            { size: 43, available: false },
            { size: 44, available: false },
            { size: 45, available: true },
            { size: 46, available: true }
          ]
        },
        available: true
      },
      {
        id: 3,
        title: "Nike Air Force 1 '07",
        gender: "Buty męskie",
        price: 629.99,
        image: "/images/nike/nikeairforce107.webp",
        carouselImages: ["/images/nike/nikeairforce107-1.webp", "/images/nike/nikeairforce107-2.webp", "/images/nike/nikeairforce107-3.webp"],
        sizeChart: {
          EU: [
            { size: 38, available: true },
            { size: 39, available: true },
            { size: 40, available: true },
            { size: 41, available: false },
            { size: 42, available: false },
            { size: 43, available: false },
            { size: 44, available: false },
            { size: 45, available: true },
            { size: 46, available: true }
          ]
        },
        available: true
      },
      {
        id: 4,
        title: "Nike Air Force 1 '07 EasyOn",
        gender: "Buty damskie",
        price: 679.99,
        image: "/images/nike/nikeairforce107easyon.webp",
        carouselImages: ["/images/nike/nikeairforce107easyon1.webp", "/images/nike/nikeairforce107easyon2.webp", "/images/nike/nikeairforce107easyon3.webp"],
        sizeChart: {
          EU: [
            { size: 36, available: true },
            { size: 37, available: true },
            { size: 38, available: true },
            { size: 39, available: true },
            { size: 40, available: false },
            { size: 41, available: false }
          ]
        },
        available: false
      },
      {
        id: 5,
        title: "Adidas OZWEEGO",
        gender: "Buty męskie",
        price: 549.99,
        image: "/images/adidas/adidasozweego.webp",
        carouselImages: ["/images/adidas/adidasozweego1.webp", "/images/adidas/adidasozweego2.webp", "/images/adidas/adidasozweego3.webp"],
        sizeChart: {
          EU: [
            { size: 36, available: true },
            { size: 37, available: true },
            { size: 38, available: true },
            { size: 39, available: true },
            { size: 40, available: false },
            { size: 41, available: false }
          ]
        },
        available: true
      },
      {
        id: 6,
        title: "Nike Terra Forma x Off-White™ Mantra Orange",
        gender: "Buty męskie",
        price: 999.99,
        image: "/images/nike/nikemantraorange.jpg",
        carouselImages: ["/images/nike/nikemantraorange1.jpg", "/images/nike/nikemantraorange2.jpg", "/images/nike/nikemantraorange3.jpg"],
        sizeChart: {
          EU: [
            { size: 36, available: true },
            { size: 37, available: true },
            { size: 38, available: true },
            { size: 39, available: true },
            { size: 40, available: false },
            { size: 41, available: false }
          ]
        },
        available: true,
        premium: true
      },
      {
        id: 7,
        title: "Adidas Adi2000",
        gender: "Buty damskie",
        price: 449.99,
        image: "/images/adidas/adi2000.webp",
        available: true
      },
      {
        id: 8,
        title: " Puma FENTY x PUMA Creeper Phatty",
        gender: "Buty męskie",
        price: 669.99,
        image: "/images/puma/pumaxfenty.webp",
        carouselImages: ["/images/puma/pumaxfenty1.webp", "/images/puma/pumaxfenty2.webp", "/images/puma/pumaxfenty3.webp"],
        sizeChart: {
          EU: [
            { size: 36, available: false },
            { size: 37, available: false },
            { size: 38, available: true },
            { size: 39, available: true },
            { size: 40, available: false },
            { size: 41, available: true }
          ]
        },
        available: false
      },
      {
        id: 9,
        title: "Puma Slipstream Suede",
        gender: "Buty męskie",
        price: 599.99,
        image: "/images/puma/slipstreamsuede.webp",
        carouselImages: ["/images/puma/slipstreamsuede1.webp", "/images/puma/slipstreamsuede2.webp", "/images/puma/slipstreamsuede3.webp"],
        sizeChart: {
          EU: [
            { size: 36, available: true },
            { size: 37, available: false },
            { size: 38, available: false },
            { size: 39, available: true },
            { size: 40, available: false },
            { size: 41, available: false }
          ]
        },
        available: true
      },
      {
        id: 10,
        title: "Nike Air Force 1 Mid x Off-White™ White and Varsity Maize",
        gender: "Buty męskie",
        price: 899.99,
        image: "/images/nike/nikeairforcemid1.jpg",
        carouselImages: ["/images/nike/nikeairforcemid1-1.jpg", "/images/nike/nikeairforcemid1-2.jpg", "/images/nike/nikeairforcemid1-3.jpg"],
        sizeChart: {
          EU: [
            { size: 40, available: true },
            { size: 41, available: true },
            { size: 42, available: false },
            { size: 43, available: false },
            { size: 44, available: false },
            { size: 45, available: true },
            { size: 46, available: true }
          ]
        },
        available: true,
        premium: true
      },
      {
        id: 11,
        title: "Nike Air More Uptempo Low x AMBUSH Lilac and Apple Green",
        gender: "Buty męskie",
        price: 1029.99,
        image: "/images/nike/nikeairmore.jpg",
        carouselImages: ["/images/nike/nikeairmore1.jpg", "/images/nike/nikeairmore2.jpg", "/images/nike/nikeairmore3.jpg"],
        sizeChart: {
          EU: [
            { size: 40, available: true },
            { size: 41, available: false },
            { size: 42, available: false },
            { size: 43, available: false },
            { size: 44, available: false },
            { size: 45, available: false },
            { size: 46, available: true }
          ]
        },
        available: false,
        premium: true
      },
      {
        id: 12,
        title: "Nike Air Force 1 Experimental",
        gender: "Buty męskie",
        price: 679.99,
        image: "/images/nike/nikeairforceexperimental.webp",
        carouselImages: ["/images/nike/nikeairforceexperimental1.webp", "/images/nike/nikeairforceexperimental2.webp", "/images/nike/nikeairforceexperimental3.webp"],
        sizeChart: {
          EU: [
            { size: 40, available: false },
            { size: 41, available: false },
            { size: 42, available: false },
            { size: 43, available: true },
            { size: 44, available: true },
            { size: 45, available: true },
            { size: 46, available: false }
          ]
        },
        available: false,
        premium: true
      },
    ]
};
  
module.exports = db;