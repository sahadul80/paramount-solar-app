'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
  Lightbulb,
  Calendar,
  ChevronDown,
  ChevronUp,
  LucideIcon
} from 'lucide-react'
import { SolarPanelGrid } from './patterns/SolarPanelGrid';
import { GreenEnergy } from './patterns/GreenEnergy';
import { useState } from 'react';

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
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

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
          { target: "Quality", progress: 100, color: "bg-solar-primary" },
          { target: "Innovation", progress: 90, color: "bg-solar-secondary" },
          { target: "Sustainability", progress: 95, color: "bg-solar-accent" }
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
          <div className="grid grid-cols-3 gap-2 m-2">
            {(viz.data as StatItem[]).map((item: StatItem, index: number) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-2 text-center relative overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="sm:p-4 rounded-2xl bg-solar-primary/10 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-solar-accent" />
                </div>
                <div className="text-xl font-extrabold gradient-text-solar mb-2">{item.value}</div>
                <div className="text-sm text-tertiary font-medium">{item.label}</div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        )
      
      case "timeline":
        return (
          <div className="relative m-2 w-full overflow-auto">
            {/* Mobile Vertical Timeline */}
            <div className="block md:hidden">
              
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-8 top-0 bottom-0 w-1 bg-solar-secondary rounded-full origin-top"
              />

              <div className="">
                {(viz.data as TimelineItem[]).map((item: TimelineItem, index: number) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex flex-row items-center m-2 sm:m-4 gap-4"
                  >

                    <div className="">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-solar-accent rounded-full border-4 border-secondary shadow-lg flex items-center justify-center"
                      >
                        <Zap className="h-3 w-3 text-secondary" />
                      </motion.div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="card card-glass card-interactive p-6 rounded-xl shadow-lg w-full text-left relative overflow-hidden"
                    >
                      <div className="flex items-center mb-3">
                        <Calendar className="h-5 w-5 text-solar-accent mr-3" />
                        <span className="text-solar-accent font-bold text-lg">{item.year}</span>
                      </div>
                      <p className="text-tertiary text-base leading-relaxed">
                        {item.event}
                      </p>

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Horizontal Timeline */}
            <div className="hidden md:block">
              <div className="absolute left-0 right-0 top-1/2 h-4 bg-gradient-to-r from-solar-primary via-solar-accent to-solar-warning rounded-full"></div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-0 right-0 top-1/2 h-1 bg-solar-secondary rounded-full origin-left"
              />

              <div className="flex justify-between min-w-max px-8 py-16">
                {(viz.data as TimelineItem[]).map((item: TimelineItem, index: number) => {
                  const isTop = index % 2 === 0;

                  return (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: isTop ? -40 : 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative flex flex-col items-center mx-auto"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        className={`card card-glass card-interactive p-6 rounded-2xl shadow-lg w-56 text-center relative overflow-hidden ${
                          isTop ? "mt-40" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center mb-3">
                          <Calendar className="h-6 w-6 text-solar-accent mr-3" />
                          <span className="text-solar-accent font-bold text-xl">{item.year}</span>
                        </div>
                        <p className="text-tertiary text-base leading-relaxed">
                          {item.event}
                        </p>

                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.8 }}
                        />
                      </motion.div>

                      <div className="absolute top-1/2 transform -translate-y-1/2 z-10">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-10 h-10 bg-solar-accent rounded-full border-4 border-secondary shadow-lg flex items-center justify-center"
                        >
                          <Zap className="h-4 w-4 text-secondary" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      
      case "targets":
        return (
          <div className="mt-8 space-y-6">
            {(viz.data as TargetItem[]).map((target: TargetItem, index: number) => (
              <motion.div
                key={target.target}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card card-glass p-2 relative overflow-hidden hover:scale-95 transition-transform duration-300"
              >
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-primary text-lg">{target.target}</span>
                  <span className="text-solar-accent font-bold text-lg">{target.progress}%</span>
                </div>
                <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${target.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-2 rounded-full ${target.color} shadow-inner`}
                  />
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        )
      
      case "future":
        return (
          <div className="grid grid-cols-3 gap-2 m-4">
            {(viz.data as FutureItem[]).map((item: FutureItem, index: number) => (
              <motion.div
                key={item.aspect}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card card-glass card-interactive p-2 text-center relative overflow-hidden group hover:scale-95 transition-transform duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-gradient-to-br from-solar-primary to-solar-secondary w-12 h-12 rounded-lg flex items-center justify-center mx-auto m-2 shadow-lg"
                >
                  <item.icon className="h-8 w-8 text-primary" />
                </motion.div>
                <div className="text-md font-bold text-primary">{item.aspect}</div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <section id="about" className="section-padding bg-secondary relative overflow-hidden z-20">
      <SolarPanelGrid/>
      <div className="container-responsive relative">
        {/* Enhanced Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center m-2 sm:m-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="inline-flex items-center gap-4"
          >
            <p className="text-2xl lg:text-4xl font-bold">
              ABOUT <span className="gradient-text-solar">PARAMOUNT SOLAR</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-32 h-1 bg-gradient-to-r from-solar-primary to-solar-accent mx-auto mb-8 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-xl text-tertiary max-w-3xl mx-auto leading-relaxed"
          >
            Pioneering <span className="text-solar-primary font-semibold">renewable energy solutions</span> for a sustainable future in Bangladesh and beyond
          </motion.p>
        </motion.div>

        {/* Main Sections Grid */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              id={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-elevated overflow-hidden relative group"
            >
              {/* Section Header */}
              <div className="p-2 sm:p-4">
                <div className="flex flex-row items-center gap-8">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    className="flex-shrink-0"
                  >
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-solar-primary to-solar-secondary shadow-2xl">
                      <section.icon className="h-10 w-10 text-primary" />
                    </div>
                  </motion.div>
                  
                  <div className="text-left">
                    <motion.h3 
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-2xl sm:text-3xl font-extrabold text-primary"
                    >
                      {section.title}
                    </motion.h3>
                  </div>
                </div>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="m-4 text-xl text-tertiary leading-relaxed max-w-4xl"
                >
                  {section.content}
                </motion.p>

                {/* Visualization */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {renderVisualization(section.visualization)}
                </motion.div>

                {/* Details Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 flex justify-center"
                >
                  <motion.button
                    onClick={() => toggleSection(section.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-solar-primary to-solar-accent text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                  >
                    {expandedSections[section.id] ? 'Hide Details' : 'Show Details'}
                    <motion.div
                      animate={{ rotate: expandedSections[section.id] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedSections[section.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </motion.div>
                  </motion.button>
                </motion.div>

                {/* Subsections - Animated */}
                <AnimatePresence>
                  {expandedSections[section.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-8 border-t-3 pt-8"
                      >
                        <h4 className="text-2xl font-bold text-primary m-4 flex items-center justify-center lg:justify-start gap-4">
                          <div className="w-2 h-10 bg-solar-accent rounded-full"></div>
                          Detailed Overview
                          <div className="w-2 h-10 bg-solar-accent rounded-full"></div>
                        </h4>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {section.subsections.map((subsection, subIndex) => (
                            <motion.div
                              key={subsection.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: subIndex * 0.1 + 0.3 }}
                              className="card card-glass p-4 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
                            >
                              <div className="flex flex-col items-start">
                                <div className="p-4 rounded-2xl bg-solar-accent/10 flex flex-row gap-6 flex-shrink-0">
                                  <subsection.icon className="h-8 w-8 text-solar-accent" />
                                  <h5 className="text-xl font-bold text-primary">
                                    {subsection.title}
                                  </h5>
                                </div>
                                <div>
                                  <p className="text-tertiary text-lg leading-relaxed">
                                    {subsection.content}
                                  </p>
                                </div>
                              </div>

                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "200%" }}
                                transition={{ duration: 0.8 }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-10 w-32 h-32 bg-solar-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-solar-primary rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="card card-glass p-4 relative overflow-hidden">
            <GreenEnergy/>
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-solar-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
                >
                  <Leaf className="h-10 w-10 text-primary" />
                </motion.div>
                <h3 className="text-2xl lg:text-4xl font-extrabold text-primary m-2 sm:m-4">
                  Environmental <span className="gradient-text-solar">Impact</span>
                </h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl sm:p-4 mx-auto">
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
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="card card-glass p-6 text-center relative overflow-hidden group hover:scale-110 transition-transform duration-300"
                    >
                      <div className="bg-solar-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="h-8 w-8 text-solar-accent" />
                      </div>
                      <div className="text-2xl font-extrabold gradient-text-energy mb-2">{stat.value}</div>
                      <div className="text-tertiary text-sm font-medium leading-tight">{stat.label}</div>

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-solar-accent/5 to-transparent -skew-x-12"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.8 }}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl text-tertiary max-w-2xl mx-auto leading-relaxed"
                >
                  Committed to creating a <span className="text-solar-primary font-semibold">sustainable future</span> through innovative solar energy solutions that power communities while protecting our planet
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About