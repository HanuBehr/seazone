export const demoProperties = [
  {
    code: "SYD001",
    name: "Harbour Loft Sydney",
    location: "The Rocks, Sydney",
    market: "Australia",
    type: "Harbour apartment",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=82",
  },
  {
    code: "BLI001",
    name: "Bali Beach Villa",
    location: "Canggu, Bali",
    market: "Indonesia",
    type: "Beach villa",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=82",
  },
  {
    code: "NYG001",
    name: "Greenwich Village Condo",
    location: "Greenwich Village, NYC",
    market: "United States",
    type: "City condo",
    image:
      "https://images.unsplash.com/photo-1522444195799-478538b28823?auto=format&fit=crop&w=900&q=82",
  },
  {
    code: "MEL001",
    name: "Laneway Apartment Melbourne",
    location: "Melbourne CBD",
    market: "Australia",
    type: "CBD apartment",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=82",
  },
  {
    code: "TYO001",
    name: "Shibuya Micro Studio",
    location: "Shibuya, Tokyo",
    market: "Japan",
    type: "Micro studio",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=82",
  },
  {
    code: "SFO001",
    name: "Mission District Townhouse",
    location: "Mission District, San Francisco",
    market: "United States",
    type: "Townhouse",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=82",
  },
  {
    code: "RIO001",
    name: "Ipanema Ocean View Flat",
    location: "Ipanema, Rio de Janeiro",
    market: "Brazil",
    type: "Ocean-view flat",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=82",
  },
  {
    code: "LIS001",
    name: "Alfama Terrace Apartment",
    location: "Alfama, Lisbon",
    market: "Portugal",
    type: "Terrace apartment",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=82",
  },
] as const;

export const demoPropertyCodes = demoProperties.map((property) => property.code);
