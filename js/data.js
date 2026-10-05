/* Data used by the home page. Photo paths are relative to the site root. */
const slug=n=>n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
/* name, region, days, grade, season, short text */
const T=[
  ["Kedarkantha", "Uttarakhand", 6, "Easy to Moderate", "Winter", "Snow summit and pine forests"],
  ["Dayara Bugyal", "Uttarakhand", 5, "Easy", "Spring", "Open meadows and snow views"],
  ["Brahmatal", "Uttarakhand", 6, "Easy to Moderate", "Winter", "Frozen lakes and ridge walks"],
  ["Valley of Flowers", "Uttarakhand", 6, "Easy to Moderate", "Monsoon", "Alpine flowers and Hemkund Sahib"],
  ["Roopkund", "Uttarakhand", 8, "Difficult", "Summer", "Glacial lake and high ridges"],
  ["Hampta Pass", "Himachal Pradesh", 5, "Moderate", "Summer", "Green valley to cold desert"],
  ["Kashmir Great Lakes", "Kashmir", 8, "Moderate", "Summer", "Seven alpine lakes"],
  ["Markha Valley", "Ladakh", 8, "Moderate", "Summer", "Villages, gompas and high passes"],
  ["Sandakphu", "West Bengal", 7, "Moderate", "Spring", "Sunrise over Kanchenjunga and Everest"],
  ["Goechala", "Sikkim", 11, "Difficult", "Spring", "Close views of Kanchenjunga"],
  ["Annapurna Base Camp", "Nepal", 9, "Moderate", "Autumn", "Teahouse trek to the sanctuary"],
  ["Everest Base Camp", "Nepal", 13, "Difficult", "Autumn", "Classic route to Everest base camp"],
  ["Chandratal Lake", "Himachal Pradesh", 4, "Easy to Moderate", "Summer", "Clear mountain lake in Spiti"],
  ["Kedarnath Trek", "Uttarakhand", 5, "Moderate", "Summer", "Temple trek below snow peaks"]
];
/* photos for each trek: first photo is the card photo, the second shows on hover */
const IMG={
  "Chandratal Lake":["images/chandratal-lake-1.jpg", "images/chandratal-lake-2.jpg"],
  "Roopkund":["images/roopkund-1.jpg"],
  "Valley of Flowers":["images/valley-of-flowers-1.jpg"],
  "Brahmatal":["images/brahmatal-1.jpg"],
  "Dayara Bugyal":["images/dayara-bugyal-1.jpg"],
  "Kedarnath Trek":["images/kedarnath-trek-1.jpg", "images/kedarnath-trek-2.jpg"],
  "Everest Base Camp":["images/everest-base-camp-1.jpg"],
  "Annapurna Base Camp":["images/annapurna-base-camp-1.jpg"],
  "Goechala":["images/goechala-1.jpg"],
  "Sandakphu":["images/sandakphu-1.jpg"],
  "Markha Valley":["images/markha-valley-1.jpg"],
  "Kashmir Great Lakes":["images/kashmir-great-lakes-1.jpg"]
};
const col=["from-sky-700", "from-emerald-700", "from-violet-700", "from-amber-700", "from-rose-700"];
/* home page banner slides */
const slides=[
 {
  "t": "Snow trails and winter treks",
  "s": "Walk through fresh snow on Himalayan winter routes",
  "img": "images/hero-1.jpg",
  "c": [
   "#0f2a3a",
   "#2f6f7e"
  ]
 },
 {
  "t": "Cold deserts and mountain valleys",
  "s": "Ladakh-style landscapes, high passes and wide skies",
  "img": "images/hero-2.jpg",
  "c": [
   "#0f2a3a",
   "#2f6f7e"
  ]
 },
 {
  "t": "Forest trails with Himalayan views",
  "s": "Cedar forests and snow peaks on the horizon",
  "img": "images/hero-3.jpg",
  "c": [
   "#0f2a3a",
   "#2f6f7e"
  ]
 }
];
