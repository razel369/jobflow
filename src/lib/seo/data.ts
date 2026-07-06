/**
 * Static data for programmatic SEO pages.
 * Each entry generates a `best {category} for {trade} in {city}` page.
 */

export type Trade = {
  slug: string;
  name: string;
  plural: string;
  description: string;
  painPoints: string[];
  serviceTypes: string[];
};

export type City = {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  population: number;
  climateNote: string;
};

export const TRADES: Record<string, Trade> = {
  hvac: {
    slug: "hvac",
    name: "HVAC",
    plural: "HVAC technicians",
    description:
      "Heating, ventilation, and air conditioning specialists who install, repair, and maintain climate control systems in residential and commercial buildings.",
    painPoints: [
      "Emergency calls disrupting schedules",
      "Tracking refrigerant costs and inventory",
      "Coordinating multi-technician jobs",
      "Following up on maintenance contracts",
      "Seasonal demand spikes (summer AC, winter heating)",
    ],
    serviceTypes: [
      "AC repair",
      "Furnace installation",
      "Heat pump service",
      "Ductwork",
      "Thermostat installation",
      "Refrigerant recharge",
      "Annual maintenance",
      "Emergency service",
    ],
  },
};

export const CITIES: City[] = [
  { slug: "new-york", name: "New York", state: "New York", stateAbbr: "NY", population: 8336817, climateNote: "hot humid summers and cold winters create year-round HVAC demand" },
  { slug: "los-angeles", name: "Los Angeles", state: "California", stateAbbr: "CA", population: 3979576, climateNote: "Mediterranean climate means AC runs nearly year-round" },
  { slug: "chicago", name: "Chicago", state: "Illinois", stateAbbr: "IL", population: 2693976, climateNote: "extreme winters and humid summers drive heavy HVAC usage" },
  { slug: "houston", name: "Houston", state: "Texas", stateAbbr: "TX", population: 2320268, climateNote: "subtropical climate with 100°F summers creates constant AC demand" },
  { slug: "phoenix", name: "Phoenix", state: "Arizona", stateAbbr: "AZ", population: 1680992, climateNote: "desert climate with extreme summer heat makes AC critical" },
  { slug: "philadelphia", name: "Philadelphia", state: "Pennsylvania", stateAbbr: "PA", population: 1576251, climateNote: "four-season climate requires both heating and cooling expertise" },
  { slug: "san-antonio", name: "San Antonio", state: "Texas", stateAbbr: "TX", population: 1547253, climateNote: "hot subtropical climate with mild winters" },
  { slug: "san-diego", name: "San Diego", state: "California", stateAbbr: "CA", population: 1423851, climateNote: "mild coastal climate with rare freezing temperatures" },
  { slug: "dallas", name: "Dallas", state: "Texas", stateAbbr: "TX", population: 1304379, climateNote: "hot humid summers and mild winters" },
  { slug: "austin", name: "Austin", state: "Texas", stateAbbr: "TX", population: 974447, climateNote: "rapidly growing tech hub with hot summers" },
  { slug: "jacksonville", name: "Jacksonville", state: "Florida", stateAbbr: "FL", population: 949611, climateNote: "humid subtropical climate makes AC essential" },
  { slug: "fort-worth", name: "Fort Worth", state: "Texas", stateAbbr: "TX", population: 918915, climateNote: "hot summers and occasional winter freezes" },
  { slug: "columbus", name: "Columbus", state: "Ohio", stateAbbr: "OH", population: 905748, climateNote: "cold snowy winters and warm humid summers" },
  { slug: "charlotte", name: "Charlotte", state: "North Carolina", stateAbbr: "NC", population: 879709, climateNote: "humid subtropical climate with mild winters" },
  { slug: "indianapolis", name: "Indianapolis", state: "Indiana", stateAbbr: "IN", population: 867125, climateNote: "four-season climate with cold winters" },
  { slug: "san-francisco", name: "San Francisco", state: "California", stateAbbr: "CA", population: 815201, climateNote: "mild Mediterranean climate year-round" },
  { slug: "seattle", name: "Seattle", state: "Washington", stateAbbr: "WA", population: 737015, climateNote: "mild wet winters and rare extreme heat" },
  { slug: "denver", name: "Denver", state: "Colorado", stateAbbr: "CO", population: 715522, climateNote: "high-altitude climate with cold snowy winters" },
  { slug: "washington", name: "Washington", state: "District of Columbia", stateAbbr: "DC", population: 671803, climateNote: "humid subtropical climate with hot summers" },
  { slug: "boston", name: "Boston", state: "Massachusetts", stateAbbr: "MA", population: 654776, climateNote: "cold snowy winters and warm summers" },
  { slug: "nashville", name: "Nashville", state: "Tennessee", stateAbbr: "TN", population: 689447, climateNote: "humid subtropical climate with mild winters" },
  { slug: "baltimore", name: "Baltimore", state: "Maryland", stateAbbr: "MD", population: 585708, climateNote: "humid subtropical climate" },
  { slug: "oklahoma-city", name: "Oklahoma City", state: "Oklahoma", stateAbbr: "OK", population: 681054, climateNote: "hot summers and cold winters with severe weather" },
  { slug: "portland", name: "Portland", state: "Oregon", stateAbbr: "OR", population: 652503, climateNote: "mild wet winters and warm dry summers" },
  { slug: "las-vegas", name: "Las Vegas", state: "Nevada", stateAbbr: "NV", population: 641903, climateNote: "desert climate with extreme summer heat" },
  { slug: "detroit", name: "Detroit", state: "Michigan", stateAbbr: "MI", population: 632464, climateNote: "cold snowy winters and warm summers" },
  { slug: "el-paso", name: "El Paso", state: "Texas", stateAbbr: "TX", population: 678815, climateNote: "hot desert climate with mild winters" },
  { slug: "memphis", name: "Memphis", state: "Tennessee", stateAbbr: "TN", population: 633104, climateNote: "humid subtropical climate" },
  { slug: "milwaukee", name: "Milwaukee", state: "Wisconsin", stateAbbr: "WI", population: 577222, climateNote: "cold snowy winters and warm summers" },
  { slug: "albuquerque", name: "Albuquerque", state: "New Mexico", stateAbbr: "NM", population: 564559, climateNote: "high-desert climate with cold winters" },
  { slug: "tucson", name: "Tucson", state: "Arizona", stateAbbr: "AZ", population: 543303, climateNote: "hot desert climate" },
  { slug: "sacramento", name: "Sacramento", state: "California", stateAbbr: "CA", population: 525041, climateNote: "hot dry summers and mild winters" },
  { slug: "kansas-city", name: "Kansas City", state: "Missouri", stateAbbr: "MO", population: 508090, climateNote: "four-season climate with severe weather" },
  { slug: "miami", name: "Miami", state: "Florida", stateAbbr: "FL", population: 442241, climateNote: "tropical climate with hot humid summers" },
  { slug: "atlanta", name: "Atlanta", state: "Georgia", stateAbbr: "GA", population: 498715, climateNote: "humid subtropical climate" },
  { slug: "raleigh", name: "Raleigh", state: "North Carolina", stateAbbr: "NC", population: 474069, climateNote: "humid subtropical climate" },
  { slug: "minneapolis", name: "Minneapolis", state: "Minnesota", stateAbbr: "MN", population: 429954, climateNote: "extremely cold winters" },
  { slug: "tampa", name: "Tampa", state: "Florida", stateAbbr: "FL", population: 401787, climateNote: "humid subtropical climate" },
  { slug: "new-orleans", name: "New Orleans", state: "Louisiana", stateAbbr: "LA", population: 383997, climateNote: "humid subtropical climate" },
  { slug: "orlando", name: "Orlando", state: "Florida", stateAbbr: "FL", population: 309154, climateNote: "humid subtropical climate" },
  { slug: "cleveland", name: "Cleveland", state: "Ohio", stateAbbr: "OH", population: 367991, climateNote: "cold snowy winters" },
  { slug: "cincinnati", name: "Cincinnati", state: "Ohio", stateAbbr: "OH", population: 309317, climateNote: "four-season climate" },
  { slug: "pittsburgh", name: "Pittsburgh", state: "Pennsylvania", stateAbbr: "PA", population: 302971, climateNote: "cold winters and warm summers" },
  { slug: "salt-lake-city", name: "Salt Lake City", state: "Utah", stateAbbr: "UT", population: 200133, climateNote: "cold snowy winters and hot dry summers" },
  { slug: "hartford", name: "Hartford", state: "Connecticut", stateAbbr: "CT", population: 121054, climateNote: "cold snowy winters" },
];

export const CATEGORIES = [
  {
    slug: "crm",
    name: "CRM",
    title: "best CRM software for {trade}",
    description: "Manage customer relationships, service history, and follow-ups.",
  },
  {
    slug: "scheduling",
    name: "Scheduling",
    title: "best scheduling software for {trade}",
    description: "Dispatch technicians, manage appointments, and optimize routes.",
  },
  {
    slug: "invoicing",
    name: "Invoicing",
    title: "best invoicing software for {trade}",
    description: "Create professional invoices, accept payments, and track balances.",
  },
  {
    slug: "field-service",
    name: "Field Service",
    title: "best field service software for {trade}",
    description: "Run your entire service operation from the field.",
  },
  {
    slug: "estimating",
    name: "Estimating",
    title: "best estimating software for {trade}",
    description: "Generate accurate quotes and win more jobs.",
  },
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * Generate all combinations of trades × categories × cities.
 * For the initial 50+ page launch, we'll focus on HVAC × top 5 categories × top 10 cities = 50 pages.
 */
export function generateSeoPages(limit = 50) {
  const pages: Array<{
    trade: Trade;
    category: Category;
    city?: City;
    slug: string;
    title: string;
  }> = [];

  const topCities = CITIES.slice(0, 10);

  for (const trade of Object.values(TRADES)) {
    for (const category of CATEGORIES) {
      for (const city of topCities) {
        if (pages.length >= limit) break;
        const slug = `best-${category.slug}-for-${trade.slug}-in-${city.slug}`;
        const title = category.title
          .replace("{trade}", trade.plural)
          .replace("in {city}", `in ${city.name}, ${city.stateAbbr}`);
        pages.push({ trade, category, city, slug, title });
      }
      if (pages.length >= limit) break;
    }
    if (pages.length >= limit) break;
  }

  return pages;
}