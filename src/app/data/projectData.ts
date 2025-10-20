// projectData.ts
import { ProjectData } from '../components/ProjectVisualization'

export const projects: { [key: string]: ProjectData } = {
  'lalmonirhat-project': {
    name: "LALMONIRHAT",
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
    ]
  },
  'pabna-project': {
    name: "PABNA 1",
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
    technicalSpecs: {
      panels: "300,000 bifacial panels",
      inverters: "String inverters with AI optimization",
      tracking: "Single-axis tracking system",
      transmission: "132kV grid connection",
      monitoring: "AI-powered predictive maintenance",
      maintenance: "Drone-based inspection system"
    }
  },
  'bibiana-project': {
    name: "BIBIANA",
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
    landArea: "125 acres"
  }
  // Add similar enhanced data for other projects...
}