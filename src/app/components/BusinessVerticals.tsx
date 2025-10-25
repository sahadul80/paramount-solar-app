'use client'

import { motion, Variants } from 'framer-motion'
import { Building, Settings, Home, TrendingUp, Target, Calendar, Image, Zap, Leaf, Users, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SolarPanelGrid } from './patterns/SolarPanelGrid'
import { SunRays } from './patterns/SunRays'
import { EnergyFlow } from './patterns/EnergyFlow'

const BusinessVerticals = () => {
  const verticals = [
    {
      id: "ipp-projects",
      icon: Building,
      title: "DEVELOPMENT OF IPP PROJECTS",
      description: "One of the lead contributors to the country's electricity supply enhancement mission",
      image: "🏭",
      imageDescription: "Large-scale solar power plant installation",
      color: "from-solar-accent to-solar-warning",
      gradient: "gradient-sunrise",
      projects: [
        "200MW HSD Power Plant, Baghabari, Sirajganj",
        "30MW Solar Power Plant, Votmari, Kaliganj, Lalmonirhat",
        "100MW Solar Park, Hemayetpur, Pabna",
        "10MW Solar Power Plant at Moulvibazar (Under Construction)"
      ],
      methods: [
        "IPP Project Development through MPPP",
        "Unsolicited IPP Project Development through PPA & IA",
        "IPP Project Development through Open Tender Method"
      ],
      stats: [
        { value: "130MW", label: "Total Capacity" },
        { value: "3", label: "Major Projects" },
        { value: "20+ Years", label: "PPA Duration" }
      ]
    },
    {
      id: "solar-epc",
      icon: Settings,
      title: "SOLAR EPC",
      description: "Leading and successful Solar EPC (Engineering, Procurement, and Construction) company",
      image: "🔧",
      imageDescription: "Solar EPC engineering and construction",
      color: "from-solar-success to-solar-primary",
      gradient: "gradient-solar",
      features: [
        "Comprehensive end-to-end solar power solutions",
        "Deep expertise in engineering",
        "Efficient procurement of high-quality components",
        "Meticulous construction management",
        "Integrated approach minimizing client risks"
      ],
      stats: [
        { value: "End-to-End", label: "Solutions" },
        { value: "Quality", label: "Components" },
        { value: "Risk Managed", label: "Approach" }
      ]
    },
    {
      id: "solar-rooftop",
      icon: Home,
      title: "SOLAR ROOFTOP",
      description: "Aiming for market leadership position with innovative business models",
      image: "🏠",
      imageDescription: "Rooftop solar installation",
      color: "from-solar-secondary to-solar-info",
      gradient: "gradient-energy",
      businessModels: [
        {
          type: "CAPEX-BASED SOLUTION",
          desc: "End to End Turnkey EPC service under fixed price fixed time execution"
        },
        {
          type: "OPEX-BASED SOLUTION",
          desc: "Zero investment model with long term Power Purchase Agreement"
        },
        {
          type: "CAPEX-FINANCING SOLUTION",
          desc: "Financing solution for customers with minimal investment"
        }
      ],
      plans: [
        {
          year: "VISION 2025",
          capacity: "30MW",
          target: "Universities and Industrial Segment"
        },
        {
          year: "PLAN 2026",
          capacity: "50MW",
          target: "Universities and Industrial Segment"
        }
      ],
      stats: [
        { value: "30MW", label: "2025 Target" },
        { value: "50MW", label: "2026 Target" },
        { value: "Zero Investment", label: "Options Available" }
      ]
    }
  ]

  // Properly typed variants with Framer Motion's Variants type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="business" className="section-padding bg-secondary relative overflow-hidden">
      <SolarPanelGrid/>
      <SunRays/>
      <EnergyFlow/>
      <div className="container-responsive relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
              BUSINESS <span className="gradient-text-solar">VERTICALS</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-32 h-1 bg-gradient-to-r from-solar-primary to-solar-accent mx-auto mb-8 rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-tertiary max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Comprehensive solar energy solutions across multiple business verticals, 
            driving <span className="text-solar-primary font-semibold">sustainable growth</span> and 
            <span className="text-solar-accent font-semibold"> clean energy innovation</span>
          </motion.p>
        </motion.div>

        {/* Vertical Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {verticals.map((vertical, index) => (
            <motion.div
              key={vertical.id}
              id={vertical.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="card card-elevated card-interactive group overflow-hidden relative"
            >
              
              {/* Header with Enhanced Glass Effect */}
              <motion.div 
                className={`glass-effect p-4 relative overflow-hidden ${vertical.gradient}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      y: [-10, 10, -10],
                      transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className="flex-shrink-0"
                  >
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                      <vertical.icon className="h-8 w-8 text-solar-accent" />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-solar-primary mb-2">{vertical.title}</h3>
                    <p className="text-solar-secondary/90 text-base leading-relaxed">{vertical.description}</p>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    className="hidden lg:block"
                  >
                    <ArrowRight className="h-6 w-6 text-white/80" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Grid */}
              <div className="flex flex-col lg:flex-row bg-secondary/50">
                {/* Visual Section */}
                <div className="w-full lg:w-2/5 p-2 sm:p-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="card card-glass p-2 sm:p-4 h-full flex flex-col items-center justify-center text-center relative overflow-hidden"
                  >
                    
                    <motion.div
                      animate={{
                        scale: [0.8, 1.2, 1],
                        transition: {
                          duration: 4,
                          repeat: Infinity
                        }
                      }}
                      className="text-6xl m-4"
                    >
                      {vertical.image}
                    </motion.div>
                    
                    <div className="flex items-center text-solar-accent m-4">
                      <Image className="h-5 w-5 mr-3" />
                      <span className="text-sm font-semibold">{vertical.imageDescription}</span>
                    </div>
                    
                    {/* Enhanced Quick Facts */}
                    <div className="w-full space-y-4">
                      <h4 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-solar-accent" />
                        Quick Facts
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {vertical.stats.map((stat, idx) => (
                          <motion.div 
                            key={idx}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="text-center p-2 rounded-xl bg-primary/5 border border-primary/10"
                          >
                            <div className="text-xl font-extrabold gradient-text-solar">{stat.value}</div>
                            <div className="text-xs text-tertiary font-medium mt-1">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-3/5 p-4 space-y-8">
                  {/* IPP Projects */}
                  {vertical.projects && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                        <Target className="h-6 w-6 text-solar-accent" />
                        Commissioned Projects
                      </h4>
                      <div className="space-y-3">
                        {vertical.projects.map((project, idx) => (
                          <motion.div 
                            key={idx}
                            whileHover={{ x: 8 }}
                            className="flex items-start gap-4 p-4 rounded-xl bg-secondary hover:bg-tertiary/50 transition-all duration-300 group cursor-pointer"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.5 }}
                              className="w-3 h-3 bg-solar-accent rounded-full mt-2 flex-shrink-0"
                            />
                            <span className="text-tertiary text-base leading-relaxed group-hover:text-primary transition-colors flex-1">
                              {project}
                            </span>
                            <ArrowRight className="h-4 w-4 text-solar-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Development Methods */}
                  {vertical.methods && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <h4 className="text-xl font-bold text-primary mb-4">Development Methods</h4>
                      <div className="flex flex-wrap gap-3">
                        {vertical.methods.map((method, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="tag tag-primary tag-lg font-medium"
                          >
                            {method}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* EPC Features */}
                  {vertical.features && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h4 className="text-xl font-bold text-primary mb-4">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {vertical.features.map((feature, idx) => (
                          <motion.div 
                            key={idx}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="flex items-start gap-4 p-4 rounded-xl bg-solar-success/10 border border-solar-success/20 hover:shadow-glow transition-all duration-300"
                          >
                            <Leaf className="h-5 w-5 text-solar-success mt-0.5 flex-shrink-0" />
                            <span className="text-tertiary text-sm leading-relaxed">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Business Models for Rooftop */}
                  {vertical.businessModels && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <h4 className="text-xl font-bold text-primary m-2">Business Models</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {vertical.businessModels.map((model, idx) => (
                          <motion.div 
                            key={idx} 
                            whileHover={{ scale: 1.05, y: -4 }}
                            className="card card-interactive p-4 bg-solar-warning/5 border-solar-warning/20 hover:shadow-strong relative overflow-hidden"
                          >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-solar-warning to-solar-accent"></div>
                            <h5 className="font-bold text-solar-warning text-base mb-3">{model.type}</h5>
                            <p className="text-tertiary text-sm leading-relaxed">{model.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Rooftop Plans */}
                  {vertical.plans && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-solar-accent" />
                        Capacity Expansion Plans
                      </h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        {vertical.plans.map((plan, idx) => (
                          <motion.div 
                            key={idx}
                            whileHover={{ scale: 1.03, y: -4 }}
                            className="card card-interactive p-4 bg-gradient-to-br from-solar-accent/10 to-solar-primary/5 border-solar-accent/20 relative overflow-hidden group"
                          >
                            <div className="absolute -right-4 -top-4 w-8 h-8 bg-solar-accent/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="font-bold text-primary text-lg">{plan.year}</h5>
                              <Calendar className="h-5 w-5 text-solar-accent" />
                            </div>
                            <p className="text-2xl font-extrabold gradient-text-energy mb-3">{plan.capacity} Capacity</p>
                            <p className="text-tertiary text-sm leading-relaxed">{plan.target}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Summary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="card card-glass p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 gradient-energy opacity-10"></div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-3xl font-extrabold text-primary mb-6"
            >
              Ready to <span className="gradient-text-solar">Partner With Us</span>?
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-tertiary text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Explore partnership opportunities across our business verticals and join us in 
              powering Bangladesh&apos;s <span className="text-solar-primary font-semibold">sustainable energy future</span>.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 btn btn-primary btn-lg hover-glow"
            >
              <Link href={"#contact"} className="flex items-center gap-2">
                Contact Business Development
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BusinessVerticals