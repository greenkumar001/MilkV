import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "green",
      email: "green@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Flavoured Milk",
      slug: "flavoured-milk",
      category: "Diary",
      image: "/images/flavouredmilk.jpg",
      price: 50,
      countInStock: 10,
      brand: "Milkymist",
      rating: 4.9,
      numReviews: 10,
      description:
        "Kids (and kids at heart) often love flavored milk. This sweetened drink contains milk, sugar, and natural or artificial flavorings, and food colorings. Some of the most popular flavors are chocolate and strawberry.",
    },
    {
      name: "Full Cream Milk",
      slug: "full-cream-milk",
      category: "Diary",
      image: "/images/fullcreammilk.jpg",
      price: 55,
      countInStock: 0,
      brand: "Milkymist",
      rating: 4,
      numReviews: 6,
      description:
        "Full cream milk has the highest fat content of regular cow’s milk. It has a very creamy taste and texture and is often added to coffee.",
    },
    {
      name: "Organic Milk",
      slug: "oganic-milk",
      category: "Diary",
      image: "/images/organicmilk.jpg",
      price: 78,
      countInStock: 7,
      brand: "Milkymist",
      rating: 3.8,
      numReviews: 12,
      description:
        "Cows that aren’t given any antibiotics or supplemental hormones and are raised on farms that only use organic fertilizers and pesticides produce organic milk. To qualify as organic, the cows must also get 30% of their diet from the pasture.",
    },
    {
      name: "Raw Milk",
      slug: "raw-milk",
      category: "Diary",
      image: "/images/rawmilk.jpg",
      price: 43,
      countInStock: 6,
      brand: "Milkymist",
      rating: 3.5,
      numReviews: 17,
      description:
        "Raw milk is “unpasteurized” and/or has not been homogenized. This means it hasn’t been heated up for decontamination to ensure it’s safe for drinking.",
    },
    {
      name: "Skimmed Milk",
      slug: "skimmed-milk",
      category: "Diary",
      image: "/images/skimmedmilk.jpg",
      price: 77,
      countInStock: 0,
      brand: "Milkymist",
      rating: 4.6,
      numReviews: 3,
      description:
        "Also known as “fat-free milk,” skimmed milk has zero fat. This makes it significantly thinner than all other types of cow’s milk. It often has a watery consistency and may have added milk powder or other additions to enhance its taste.",
    },
    {
      name: "Whole Milk",
      slug: "whole-milk",
      category: "Diary",
      image: "/images/wholemilk.jpg",
      price: 55,
      countInStock: 20,
      brand: "Milkymist",
      rating: 3.8,
      numReviews: 15,
      description:
        "Whole milk, commonly known as “regular” milk, is thick and creamy. While it’s typically pasteurized and homogenized, it’s basically in the same format as it is when it comes out of the cow",
    },
  ],
};

export default data;
