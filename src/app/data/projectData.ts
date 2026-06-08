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
    name: "Dynamic Sun Energy Private Limited",
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
  },
  'moulvibazar-project': {
    name: "PARAMOUNT SOLAR - 25MW IPP",
    type: "25MW Grid-Tied Solar Photovoltaic",
    status: "Planning",
    capacity: "25MW",
    location: "Athangiri, Kagabala, Moulvibazar",
    coordinates: { lat: 24.4900, lng: 91.7750 },
    slug: "moulvibazar-project",
    investment: "22.3 Million USD",
    developer: "Paramount Solar Ltd.",
    annualGeneration: "48,300 MWh",
    co2Reduction: "23,377 tons annually",
    householdsPowered: "120,000+",
    landArea: "70 Acres",
    map: "https://www.google.com/maps?q=24.4900,91.7750&z=14&hl=en-GB&output=embed",
    technicalSpecs: {
      panels: "High-efficiency Monocrystalline PERC or Bifacial Modules (35 MWp DC)",
      inverters: "String Inverters with MPPT",
      tracking: "Fixed-tilt structures",
      transmission: "Step-up transformer to 33kV (17km transmission line to Moulvibazar Grid Substation)",
      monitoring: "Real-time SCADA remote monitoring and control",
      maintenance: "Weather stations, cleaning systems and security fencing"
    },
    milestones: [
      { date: "2025", event: "Notice of Award (NOA) Received" },
      { date: "28 days from NOA", event: "Contract Signing" },
      { date: "2025–2026", event: "Land Acquisition (50% complete) & NOC Clearances" },
      { date: "2026", event: "Construction Commencement" },
      { date: "2026–2027", event: "Panel Installation & Grid Integration" },
      { date: "2027", event: "Commercial Operations Date" }
    ],
    environmentalImpact: [
      { metric: "CO₂ Offset", value: "23,377 MTon/year", description: "Significant annual carbon reduction" },
      { metric: "Water Usage", value: "Mostly Rain Water", description: "Minimal water footprint through rainwater harvesting" },
      { metric: "Air Pollution", value: "Zero Emissions", description: "No SO₂, NOₓ or particulate matter released" },
      { metric: "Jobs Created", value: "250+ Construction", description: "~50 permanent O&M roles created locally" }
    ],
    images: [
      { src: "mun.png" },
      { src: "mun1.png" },
      { src: "mun2.png" },
      { src: "mun3.png" },
      { src: "mun4.png" },
      { src: "mun7.png" },
      { src: "mun9.png" }
    ]
  },
  'moulvibazar-project2': {
    name: "PARAMOUNT SOLAR - 50MW IPP",
    type: "50MW Grid-Tied Solar Photovoltaic",
    status: "Planning",
    capacity: "50MW",
    location: "Athangiri, Kagabala, Moulvibazar",
    coordinates: { lat: 24.4920, lng: 91.7780 },
    slug: "moulvibazar-project2",
    investment: "50.3 Million USD",
    developer: "Paramount Solar Ltd.",
    annualGeneration: "96,400 MWh",
    co2Reduction: "46,658 tons annually",
    householdsPowered: "241,000+",
    landArea: "140 Acres",
    map: "https://www.google.com/maps?q=24.4920,91.7780&z=14&hl=en-GB&output=embed",
    technicalSpecs: {
      panels: "High-efficiency Monocrystalline PERC or Bifacial Modules (70 MWp DC)",
      inverters: "String Inverters with MPPT",
      tracking: "Fixed-tilt structures",
      transmission: "Step-up transformer to 132kV (10km line to Bibiyana 132/230kV Grid Substation, Nobiganj, Hobiganj)",
      monitoring: "Real-time SCADA remote monitoring and control",
      maintenance: "Weather stations, cleaning systems and security fencing"
    },
    milestones: [
      { date: "2025", event: "Notice of Award (NOA) Received" },
      { date: "28 days from NOA", event: "Contract Signing" },
      { date: "2025–2026", event: "Land Acquisition (50% complete) & NOC Clearances" },
      { date: "2026", event: "Construction Commencement" },
      { date: "2026–2027", event: "Panel Installation & Grid Integration" },
      { date: "2027", event: "Commercial Operations Date" }
    ],
    environmentalImpact: [
      { metric: "CO₂ Offset", value: "46,658 MTon/year", description: "Significant annual carbon reduction" },
      { metric: "Water Usage", value: "Mostly Rain Water", description: "Minimal water footprint through rainwater harvesting" },
      { metric: "Air Pollution", value: "Zero Emissions", description: "No SO₂, NOₓ or particulate matter released" },
      { metric: "Jobs Created", value: "500+ Construction", description: "~100 permanent O&M roles created locally" }
    ],
    images: [
      { src: "mun.png" },
      { src: "mun1.png" },
      { src: "mun2.png" },
      { src: "mun3.png" },
      { src: "mun4.png" },
      { src: "mun7.png" },
      { src: "mun9.png" }
    ]
  },
  'pabna-project2': {
    name: "PARAMOUNT SOLAR - 70MW IPP",
    type: "70MW Grid-Tied Solar Photovoltaic",
    status: "Planning",
    capacity: "70MW",
    location: "Bhabanipur, Hemyetpur, Pabna",
    coordinates: { lat: 24.0600, lng: 89.3500 },
    slug: "pabna-project2",
    investment: "72.4 Million USD",
    developer: "Paramount Solar Ltd.",
    annualGeneration: "135,240 MWh",
    co2Reduction: "65,456 tons annually",
    householdsPowered: "338,000+",
    landArea: "190 Acres",
    map: "https://www.google.com/maps?q=24.0600,89.3500&z=14&hl=en-GB&output=embed",
    technicalSpecs: {
      panels: "High-efficiency Monocrystalline PERC or Bifacial Modules (98 MWp DC)",
      inverters: "String Inverters with MPPT",
      tracking: "Fixed-tilt structures",
      transmission: "Step-up transformer to 132kV (22km transmission line to Pabna 33/132kV Grid Substation)",
      monitoring: "Real-time SCADA remote monitoring and control",
      maintenance: "Weather stations, cleaning systems and security fencing"
    },
    milestones: [
      { date: "2025", event: "Notice of Award (NOA) Received" },
      { date: "28 days from NOA", event: "Contract Signing" },
      { date: "2025–2026", event: "Land Acquisition & NOC Clearances" },
      { date: "2026", event: "Construction Commencement" },
      { date: "2026–2027", event: "Panel Installation & Grid Integration" },
      { date: "2027", event: "Commercial Operations Date" }
    ],
    environmentalImpact: [
      { metric: "CO₂ Offset", value: "65,456 MTon/year", description: "Significant annual carbon reduction" },
      { metric: "Water Usage", value: "Mostly Rain Water", description: "Minimal water footprint through rainwater harvesting" },
      { metric: "Air Pollution", value: "Zero Emissions", description: "No SO₂, NOₓ or particulate matter released" },
      { metric: "Jobs Created", value: "700+ Construction", description: "~150 permanent O&M roles created locally" }
    ],
    images: [
      { src: "pabna.png" },
      { src: "pabna1.png" },
      { src: "pabna2.png" },
      { src: "pabna3.png" },
      { src: "pabna4.png" }
    ]
  },
  'pabna-project3': {
    name: "PARAMOUNT SOLAR - 150MW IPP",
    type: "150MW Grid-Tied Solar Photovoltaic",
    status: "Planning",
    capacity: "150MW",
    location: "Ratanpur, Hemyetpur, Pabna",
    coordinates: { lat: 24.0550, lng: 89.3600 },
    slug: "pabna-project3",
    investment: "122.9 Million USD",
    developer: "Paramount Solar Ltd.",
    annualGeneration: "289,800 MWh",
    co2Reduction: "140,263 tons annually",
    householdsPowered: "724,000+",
    landArea: "420 Acres",
    map: "https://www.google.com/maps?q=24.0550,89.3600&z=14&hl=en-GB&output=embed",
    technicalSpecs: {
      panels: "High-efficiency Monocrystalline PERC or Bifacial Modules (210 MWp DC)",
      inverters: "String Inverters with MPPT",
      tracking: "Fixed-tilt structures",
      transmission: "Step-up transformer to 132kV (15km line to Ishwardi 33/132/230kV Grid Substation, Joynagar)",
      monitoring: "Real-time SCADA remote monitoring and control",
      maintenance: "Weather stations, cleaning systems and security fencing"
    },
    milestones: [
      { date: "2025", event: "Notice of Award (NOA) Received" },
      { date: "28 days from NOA", event: "Contract Signing" },
      { date: "2025–2026", event: "Land Acquisition & NOC Clearances" },
      { date: "2026", event: "Construction Commencement" },
      { date: "2026–2027", event: "Panel Installation & Grid Integration" },
      { date: "2027–2028", event: "Commercial Operations Date" }
    ],
    environmentalImpact: [
      { metric: "CO₂ Offset", value: "140,263 MTon/year", description: "Largest carbon offset in the portfolio" },
      { metric: "Water Usage", value: "Mostly Rain Water", description: "Minimal water footprint through rainwater harvesting" },
      { metric: "Air Pollution", value: "Zero Emissions", description: "No SO₂, NOₓ or particulate matter released" },
      { metric: "Jobs Created", value: "1,000+ Construction", description: "~250 permanent O&M roles created locally" }
    ],
    images: [
      { src: "pabna.png" },
      { src: "pabna1.png" },
      { src: "pabna2.png" },
      { src: "pabna3.png" },
      { src: "pabna4.png" }
    ]
  }
}