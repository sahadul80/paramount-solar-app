'use client'

import { motion } from 'framer-motion'
import { Award, Globe, Building, User, Zap, Leaf, Target, TrendingUp } from 'lucide-react'
import { SolarInstallation } from './patterns/SolarInstallation'
import { RenewableEnergy } from './patterns/RenewableEnergy'

const CompanyBoard = () => {
  const industries = [
    'Textile', 'Energy', 'Insurance', 'Ventures', 
    'Brand Building', 'Garments', 'Housing', 
    'Technology', 'Agro-based Industries'
  ]

  return (
    <section id="board" className="p-2 sm:p-4 bg-primary relative overflow-hidden z-20">
      <SolarInstallation/>
      <RenewableEnergy/>
      <div className="container mx-auto m-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center m-4"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-primary m-2 sm:m-4">
            COMPANY <span className="text-solar-accent">LEADERSHIP</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-gradient-to-r from-solar-primary to-solar-accent mx-auto m-2 sm:m-4 rounded-full"
          />
          <p className="text-tertiary max-w-2xl mx-auto">
            Guided by visionary leadership committed to <span className="text-solar-primary font-semibold">sustainable energy</span> and <span className="text-solar-accent font-semibold">innovative solutions</span>
          </p>
        </motion.div>

        {/* Main Board Member Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="card border border-primary/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="p-2 sm:p-4">
              {/* Profile Header */}
              <div className="flex flex-row items-center justify-between text-center sm:m-4 p-4">
                <div className="relative">
                  <div className="w-32 sm:h-64 h-32 sm:w-64 bg-gradient-to-br from-solar-primary to-solar-accent rounded-full p-2 shadow-lg mx-auto">
                    <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center">
                      <User className="h-12 sm:h-24 w-12 sm:w-24 text-solar-accent" />
                    </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-solar-success rounded-full border-2 border-secondary flex items-center justify-center">
                    <Zap className="h-2 w-2 text-primary" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Mr. Shadab Hossain
                  </h3>

                  <div className="space-y-1">
                    <p className="text-solar-accent font-semibold">MANAGING DIRECTOR</p>
                    <p className="text-tertiary text-md">PARAMOUNT SOLAR LTD.</p>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Education & Background */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card p-4 border border-primary/10"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-solar-primary/10">
                      <Award className="h-4 w-4 text-solar-primary" />
                    </div>
                    <h4 className="text-xl font-semibold text-primary">Education & Background</h4>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Bachelor of Science in International Economics from Suffolk University, Boston, USA",
                      "IB Diploma from the International Baccalaureate",
                      "Dynamic leadership and entrepreneurial spirit",
                      "Extensive experience across diverse industries"
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-tertiary text-md leading-relaxed"
                      >
                        <div className="w-1.5 h-1.5 bg-solar-accent rounded-full mt-1.5 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Expertise & Focus */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card p-4 border border-primary/10"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-solar-accent/10">
                      <Globe className="h-4 w-4 text-solar-accent" />
                    </div>
                    <h4 className="text-xl font-semibold text-primary">Expertise & Focus</h4>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Passionate about brand building and technology integration",
                      "Environmentally friendly and sustainable business practices",
                      "Active public spokesman on contemporary issues",
                      "Prominent young business personality"
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-tertiary text-md leading-relaxed"
                      >
                        <div className="w-1.5 h-1.5 bg-solar-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Industry Experience */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="card p-4 border border-primary/10"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-solar-accent/10">
                    <Building className="h-4 w-4 text-solar-accent" />
                  </div>
                  <h4 className="text-xl font-semibold text-primary">Industry Experience</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-solar-primary/10 text-solar-primary text-md rounded-full border border-solar-primary/20"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Leadership Impact */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mt-6 pt-6 border-t border-primary/20"
              >
                <div className="grid grid-cols-3 gap-1 sm:gap-4">
                  {[
                    { icon: Target, value: "Visionary", desc: "Strategic Leadership" },
                    { icon: TrendingUp, value: "Innovator", desc: "Growth Mindset" },
                    { icon: Leaf, value: "Sustainable", desc: "Eco-Conscious" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-3"
                    >
                      <div className="bg-solar-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <item.icon className="h-4 w-4 text-solar-accent" />
                      </div>
                      <div className="text-base font-semibold text-primary mb-1">{item.value}</div>
                      <div className="text-tertiary text-sm">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="card p-6 border border-primary/10 bg-white/5 backdrop-blur-sm max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Driving <span className="text-solar-accent">Solar Innovation</span>
            </h3>
            <p className="text-tertiary">
              Under visionary leadership, Paramount Solar continues to pioneer renewable energy solutions, 
              setting new standards for <span className="text-solar-primary font-semibold">sustainable development</span> and 
              <span className="text-solar-accent font-semibold"> technological innovation</span> in Bangladesh&apos;s energy sector.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CompanyBoard