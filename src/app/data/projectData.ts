import { ProjectData } from '../components/ProjectVisualization'

export const projects: { [key: string]: ProjectData } = {
  'lalmonirhat-project': {
    name: "INTRACO SOLAR POWER LTD",
    type: "30MW Solar Power Plant",
    status: "Operational",
    capacity: "30MW",
    location: "Lalmonirhat District, Rangpur Division",
    coordinates: { lat: 25.9974, lng: 89.1524 },
    slug: "lalmonirhat-project",
    commissioningDate: "June 2023",
    investment: "$25 Million",
    developer: "Green Energy Bangladesh Ltd.",
    annualGeneration: "45 GWh",
    co2Reduction: "28,000 tons annually",
    householdsPowered: "35,000+",
    landArea: "75 acres",
    map: "https://www.google.com/maps?q=25.9975541,89.1499235&z=17&hl=en-GB&output=embed",
    technicalSpecs: {
      panels: "87,000 monocrystalline panels",
      inverters: "Central inverters with smart monitoring",
      tracking: "Fixed tilt mounting system",
      transmission: "33kV grid connection",
      monitoring: "Real-time SCADA system",
      maintenance: "Robotic cleaning system"
    },
    milestones: [
      { date: "Q1 2022", event: "Project Planning & Feasibility Study" },
      { date: "Q2 2022", event: "Land Acquisition & Environmental Clearance" },
      { date: "Q3 2022", event: "Construction Commencement" },
      { date: "Q1 2023", event: "Panel Installation Completed" },
      { date: "Q2 2023", event: "Grid Integration & Commissioning" },
      { date: "Q3 2023", event: "Commercial Operations Date" }
    ],
    environmentalImpact: [
      { metric: "CO2 Reduction", value: "28,000 tons/year", description: "Equivalent to planting 1.2 million trees" },
      { metric: "Water Savings", value: "50 million liters/year", description: "Compared to conventional power plants" },
      { metric: "Air Pollution", value: "Zero emissions", description: "No SO2, NOx, or particulate matter" },
      { metric: "Land Use", value: "Dual-purpose ready", description: "Compatible with agricultural use" }
    ],
    images: [
      {src: "lmh.png"},
      {src: "lmh1.png"},
      {src: "lmh2.png"},
      {src: "lmh3.png"},
    ]
  },
  'pabna-project': {
    name: "DYNAMIC SUN ENERGY POWER LTD",
    type: "100MW Solar Park",
    status: "Operational",
    capacity: "100MW",
    location: "Pabna District, Rajshahi Division",
    coordinates: { lat: 23.9637, lng: 89.1584 },
    slug: "pabna-project",
    commissioningDate: "December 2023",
    investment: "$85 Million",
    developer: "Solar Energy Bangladesh Corp.",
    annualGeneration: "150 GWh",
    co2Reduction: "95,000 tons annually",
    householdsPowered: "120,000+",
    landArea: "200 acres",
    map: "https://www.google.com/maps?q=23.9637532,89.1562717&z=15&hl=en-GB&output=embed",
    technicalSpecs: {
      panels: "300,000 bifacial panels",
      inverters: "String inverters with AI optimization",
      tracking: "Single-axis tracking system",
      transmission: "132kV grid connection",
      monitoring: "AI-powered predictive maintenance",
      maintenance: "Drone-based inspection system"
    },
    milestones: [
      { date: "Q1 2022", event: "Project Planning & Feasibility Study" },
      { date: "Q2 2022", event: "Land Acquisition & Environmental Clearance" },
      { date: "Q3 2022", event: "Construction Commencement" },
      { date: "Q1 2023", event: "Panel Installation Completed" },
      { date: "Q2 2023", event: "Grid Integration & Commissioning" },
      { date: "Q3 2023", event: "Commercial Operations Date" }
    ],
    environmentalImpact: [
      { metric: "CO2 Reduction", value: "28,000 tons/year", description: "Equivalent to planting 1.2 million trees" },
      { metric: "Water Savings", value: "50 million liters/year", description: "Compared to conventional power plants" },
      { metric: "Air Pollution", value: "Zero emissions", description: "No SO2, NOx, or particulate matter" },
      { metric: "Land Use", value: "Dual-purpose ready", description: "Compatible with agricultural use" }
    ],
    images: [
      {src: "pabna.png"},
      {src: "pabna1.png"},
      {src: "pabna2.png"},
      {src: "pabna3.png"},
      {src: "pabna4.png"},
    ]
  },
  'bibiana-project': {
    name: "MOULVIBAZAR SOLAR POWER LTD",
    type: "50MW Power Plant",
    status: "Pipeline",
    capacity: "50MW",
    location: "Sylhet Division",
    coordinates: { lat: 24.5045, lng: 91.6334 },
    slug: "bibiana-project",
    investment: "$42 Million",
    developer: "Renewable Power Solutions Ltd.",
    annualGeneration: "75 GWh",
    co2Reduction: "47,000 tons annually",
    householdsPowered: "60,000+",
    landArea: "125 acres",
    map: "https://www.google.com/maps?q=24.49807,91.6304196&z=14&hl=en-GB&output=embed",
    images: [
      {src: "mun.png"},
      {src: "mun1.png"},
      {src: "mun2.png"},
      {src: "mun3.png"},
      {src: "mun4.png"},
      {src: "mun7.png"},
      {src: "mun9.png"},
    ]
  }
}