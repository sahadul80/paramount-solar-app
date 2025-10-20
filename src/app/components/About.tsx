'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Target, 
  Eye, 
  Building2, 
  Users, 
  History, 
  Goal, 
  Zap, 
  Leaf, 
  TrendingUp,
  BarChart3,
  Globe,
  Shield,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Calendar,
  LucideIcon
} from 'lucide-react'

// Type definitions
interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface StructureItem {
  level: string;
  name: string;
  value: string;
  highlight: boolean;
}

interface TimelineItem {
  year: string;
  event: string;
}

interface TargetItem {
  target: string;
  progress: number;
  color: string;
}

interface FutureItem {
  aspect: string;
  icon: LucideIcon;
}

interface Subsection {
  title: string;
  content: string;
  icon: LucideIcon;
}

interface Visualization {
  type: "stats" | "structure" | "timeline" | "targets" | "future";
  data: StatItem[] | StructureItem[] | TimelineItem[] | TargetItem[] | FutureItem[];
}

interface Section {
  icon: LucideIcon;
  title: string;
  id: string;
  content: string;
  visualization: Visualization;
  subsections: Subsection[];
}

const About = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title)
  }

  const sections: Section[] = [
    {
      icon: Building2,
      title: "COMPANY",
      id: "company",
      content: "Paramount Solar Ltd is a pioneering renewable energy company dedicated to harnessing the power of the sun to generate clean, reliable, and affordable electricity.",
      visualization: {
        type: "stats",
        data: [
          { label: "Founded", value: "2017", icon: History },
          { label: "Projects", value: "3+", icon: Zap },
          { label: "Capacity", value: "130MW", icon: TrendingUp }
        ]
      },
      subsections: [
        {
          title: "Core Focus",
          content: "Utility-scale solar power generation, contributing significantly to the national grid and helping bridge the electricity gap across Bangladesh.",
          icon: Target
        },
        {
          title: "Market Position",
          content: "Leading renewable energy company with a strong portfolio of operational solar power plants and ongoing projects.",
          icon: BarChart3
        }
      ]
    },
    {
      icon: Users,
      title: "WHO WE ARE",
      id: "who-we-are",
      content: "Paramount Solar Ltd (PSL) is a leading solar Independent Power Producer (IPP) focused on developing, financing, building, and operating large-scale solar PV projects.",
      visualization: {
        type: "structure",
        data: [
          { level: "Parent Company", name: "Paramount Textile PLC", value: "BDT 8239.37M", highlight: true },
          { level: "Subsidiary", name: "Paramount Solar Ltd", value: "100% owned", highlight: false },
          { level: "Focus", name: "Solar IPP", value: "Large-scale", highlight: false }
        ]
      },
      subsections: [
        {
          title: "Technical Expertise",
          content: "Leveraging deep technical knowledge and industry experience to deliver high-performing sustainable energy assets.",
          icon: Shield
        },
        {
          title: "Financial Strength",
          content: "Backed by the financial stability of publicly listed Paramount Textile PLC with market capitalization of BDT 8239.37 million.",
          icon: TrendingUp
        }
      ]
    },
    {
      icon: History,
      title: "COMPANY BACKGROUND",
      id: "company-background",
      content: "Established in 2017, PSL has successfully commissioned 130MW of solar IPPs in Bangladesh with a strong track record of project delivery.",
      visualization: {
        type: "timeline",
        data: [
          { year: "2017", event: "Company Established" },
          { year: "2020", event: "30MW Lalmonirhat Project" },
          { year: "2022", event: "100MW Pabna Solar Park" },
          { year: "2024", event: "10MW Moulvibazar Project" }
        ]
      },
      subsections: [
        {
          title: "Project Portfolio",
          content: "Successfully commissioned 130MW of solar IPPs including 30MW in Lalmonirhat and 100MW in Pabna with 20-year Power Purchase Agreements.",
          icon: Zap
        },
        {
          title: "Expansion",
          content: "Continuing to expand with a 10MW solar plant in Moulvibazar nearing commissioning phase.",
          icon: Globe
        }
      ]
    },
    {
      icon: Goal,
      title: "OUR GOAL",
      id: "our-goal",
      content: "Empowering a sustainable future by providing innovative and efficient solar energy solutions while reducing carbon footprint.",
      visualization: {
        type: "targets",
        data: [
          { target: "Quality", progress: 100, color: "green" },
          { target: "Innovation", progress: 90, color: "blue" },
          { target: "Sustainability", progress: 95, color: "emerald" }
        ]
      },
      subsections: [
        {
          title: "Customer Commitment",
          content: "Delivering high-quality installations, exceptional customer service, and cutting-edge technology to promote renewable energy adoption.",
          icon: Users
        },
        {
          title: "Accessibility",
          content: "Making clean, reliable, and affordable solar power accessible to everyone, fostering a greener and more resilient world.",
          icon: Globe
        }
      ]
    },
    {
      icon: Eye,
      title: "VISION",
      id: "vision",
      content: "To be a global leader in the transition to renewable energy, inspiring a world powered by clean, sustainable solar energy.",
      visualization: {
        type: "future",
        data: [
          { aspect: "Leadership", icon: Target },
          { aspect: "Innovation", icon: Lightbulb },
          { aspect: "Sustainability", icon: Leaf }
        ]
      },
      subsections: [
        {
          title: "Global Ambition",
          content: "Leading the way in solar technology innovation, education, and accessibility, making solar energy the standard choice worldwide.",
          icon: Globe
        },
        {
          title: "Environmental Impact",
          content: "Envisioning a future where solar power is the primary energy source, reducing dependence on fossil fuels and mitigating climate change.",
          icon: Leaf
        }
      ]
    }
  ]

  const renderVisualization = (viz: Visualization) => {
    switch (viz.type) {
      case "stats":
        return (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {(viz.data as StatItem[]).map((item: StatItem, index: number) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-3 bg-white rounded-lg shadow-sm"
              >
                <item.icon className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-800">{item.value}</div>
                <div className="text-xs text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        )
      
      case "structure":
        return (
          <div className="mt-4 space-y-3 flex flex-col sm:flex-row justify-between gap-2">
            {(viz.data as StructureItem[]).map((item: StructureItem, index: number) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-3 rounded-lg border-l-4 w-full h-full ${
                  item.highlight 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">{item.level}</span>
                  <span className="text-sm text-gray-600">{item.value}</span>
                </div>
                <div className="text-sm text-gray-800">{item.name}</div>
              </motion.div>
            ))}
          </div>
        )
      
      case "timeline":
        return (
          <div className="relative mt-12 w-full overflow-x-auto overflow-y-hidden">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 top-1/2 bottom-1/2 h-0.5 bg-green-200"></div>

            <div className="flex space-x-12 sm:space-x-16 min-w-max px-8 pb-12 pt-8">
              {(viz.data as TimelineItem[]).map((item: TimelineItem, index: number) => {
                const isTop = index % 2 === 0;

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: isTop ? -40 : 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Card */}
                    <div
                      className={`${
                        isTop ? "mt-28" : "mb-10"
                      } bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-[220px] sm:w-[260px] md:w-[300px] text-center`}
                    >
                      <div className="flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-500 mr-2" />
                        <span className="text-green-600 font-bold">{item.year}</span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {item.event}
                      </p>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )
      
      case "targets":
        return (
          <div className="mt-4 space-y-3">
            {(viz.data as TargetItem[]).map((target: TargetItem, index: number) => (
              <motion.div
                key={target.target}
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "100%" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="space-y-1"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{target.target}</span>
                  <span className="text-gray-600">{target.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${target.progress}%` }}
                    transition={{ duration: 2, delay: index * 0.3 }}
                    className={`h-2 rounded-full bg-${target.color}-500`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )
      
      case "future":
        return (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {(viz.data as FutureItem[]).map((item: FutureItem, index: number) => (
              <motion.div
                key={item.aspect}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-3"
              >
                <div className="bg-gradient-to-br from-green-400 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-800">{item.aspect}</div>
              </motion.div>
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-green-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Building2 className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ABOUT <span className="text-green-600">PARAMOUNT SOLAR</span>
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering renewable energy solutions for a sustainable future in Bangladesh and beyond
          </p>
        </motion.div>

        {/* Main Sections Grid */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              id={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Section Header */}
              <div 
                className="p-6 md:p-8 cursor-pointer"
                onClick={() => toggleSection(section.title)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-xl">
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 mt-1 max-w-3xl">
                        {section.content}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === section.title ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedSection === section.title ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </motion.div>
                </div>

                {/* Visualization */}
                <div className="mt-6">
                  {renderVisualization(section.visualization)}
                </div>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedSection === section.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6 md:p-8 bg-gray-50">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Detailed Overview
                      </h4>
                      
                      {/* Subsections */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {section.subsections.map((subsection, subIndex) => (
                          <motion.div
                            key={subsection.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: subIndex * 0.1 }}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                          >
                            <div className="flex items-center mb-3">
                              <subsection.icon className="h-5 w-5 text-green-500 mr-2" />
                              <h5 className="font-semibold text-gray-800">
                                {subsection.title}
                              </h5>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {subsection.content}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Environmental Impact - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Leaf className="h-12 w-12 mx-auto mb-6 text-green-200" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Environmental Impact</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { value: "145,000+", label: "Tons CO₂ Offset Annually", icon: Leaf },
                  { value: "130MW", label: "Solar Power Commissioned", icon: Zap },
                  { value: "20 Years", label: "Power Purchase Agreement", icon: Target },
                  { value: "3", label: "Major Projects", icon: Building2 }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-green-200" />
                    <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-green-100 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 text-green-100 text-lg max-w-2xl mx-auto"
              >
                Committed to creating a sustainable future through innovative solar energy solutions
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About