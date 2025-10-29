'use client'

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import {
  Building,
  Settings,
  Home,
  TrendingUp,
  Target,
  Calendar,
  Image as ImageIcon,
  Zap,
  Leaf,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import { SolarPanelGrid } from './patterns/SolarPanelGrid';
import { SunRays } from './patterns/SunRays';
import { EnergyFlow } from './patterns/EnergyFlow';

type Stat = { value: string; label: string };
type Vertical = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageDescription: string;
  color?: string;
  projects?: string[];
  methods?: string[];
  features?: string[];
  businessModels?: { type: string; desc: string }[];
  plans?: { year: string; capacity: string; target: string }[];
  stats: Stat[];
  images: string[];
};

const BusinessVerticals: React.FC = () => {
  const verticals: Vertical[] = [
    {
      id: "ipp-projects",
      icon: Building,
      title: "DEVELOPMENT OF IPP PROJECTS",
      description: "One of the lead contributors to the country's electricity supply enhancement mission",
      image: "🏭",
      imageDescription: "Large-scale solar power plant installation",
      color: "from-solar-accent to-solar-warning",
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
      ],
      images: [
        "/images/lmh.png",
        "/images/mun.png",
        "/images/lmh1.png",
        "/images/mun1.png",
        "/images/pabna.png"
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
      ],
      images: [
        "/images/lmh2.png",
        "/images/pabna2.png",
        "/images/pabna4.png"
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
      ],
      images: [
        "/images/lmh3.png",
        "/images/mun2.png",
        "/images/mun3.png",
        "/images/mun4.png",
        "/images/mun7.png",
        "/images/mun9.png",
        "/images/pabna1.png",
        "/images/pabna3.png"
      ]
    }
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState<string>(verticals[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const setItemRef = useCallback((id: string) => {
    return (el: HTMLElement | null) => {
      itemRefs.current[id] = el;
    };
  }, []);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeId]);

  // Fixed IntersectionObserver - using viewport as root instead of container
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null, // Use viewport as root
      rootMargin: "-20% 0px -20% 0px", // Adjust these values to trigger earlier/later
      threshold: [0.3, 0.6, 0.9] // Multiple thresholds for better detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).dataset.id;
          if (id) {
            setActiveId(id);
          }
        }
      });
    }, options);

    // Observe all vertical items
    verticals.forEach(v => {
      const el = itemRefs.current[v.id];
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [verticals]);

  const handleThumbClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const activeVertical = verticals.find(v => v.id === activeId) ?? verticals[0];

  return (
    <section id="business" className="relative min-h-screen py-8"> {/* Changed from h-screen overflow-hidden */}
      <SolarPanelGrid />
      <SunRays />
      <EnergyFlow />

      <div className="container mx-auto p-2 sm:p-4 relative overflow-auto">
        {/* Mobile Gallery - Show on top for mobile */}
        <div className="block sm:hidden fixed top-12 left-0 right-0 z-10">
          <div className="shadow-lg mx-auto glass-effect p-2">
            <h4 className="text-md font-semibold text-primary text-center">{activeVertical.title}</h4>
            <div className="relative h-36 rounded-lg overflow-hidden m-2">
              <motion.img
                key={`${activeVertical.id}-${activeImageIndex}`}
                src={activeVertical.images[activeImageIndex]}
                alt={`${activeVertical.title} image ${activeImageIndex + 1}`}
                loading="lazy"
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {activeVertical.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => handleThumbClick(i)}
                  className={`flex-none rounded-md overflow-hidden border-2 ${i === activeImageIndex ? 'border-solar-accent' : 'border-transparent'}`}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={src} alt={`thumb-${i}`} className="w-16 h-12 object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start overflow-hidden">
          {/* Left: verticals list - removed overflow constraints */}
          <div className="w-full lg:w-2/3">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-primary mb-4"
              >
                BUSINESS <span className="text-solar-accent">VERTICALS</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-sm sm:text-base text-tertiary max-w-3xl mx-auto"
              >
                Comprehensive solar energy solutions across multiple business verticals, driving{" "}
                <span className="text-solar-primary font-semibold">sustainable growth</span> and{" "}
                <span className="text-solar-accent font-semibold">clean energy innovation</span>.
              </motion.p>
            </div>
            <div className="space-y-6 sm:space-y-8 p-2">
              {verticals.map((vertical, index) => (
                <motion.article
                  key={vertical.id}
                  data-id={vertical.id}
                  ref={setItemRef(vertical.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`card border border-primary backdrop-blur-sm overflow-hidden rounded-lg shadow-sm ${
                    activeId === vertical.id ? 'ring-2 ring-solar-accent shadow-md' : ''
                  }`}
                  id={vertical.id}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-solar-primary to-solar-accent p-2 sm:p-4 border-b border-primary">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-transparent backdrop-blur-sm border border-secondary">
                        <vertical.icon className="h-4 w-4 sm:h-5 sm:w-5 text-solar-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-primary mb-1 leading-tight">
                          {vertical.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-tertiary leading-relaxed">
                          {vertical.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="flex flex-col lg:flex-row">
                    {/* Visual Section */}
                    <div className="w-full lg:w-2/5 p-2 sm:p-4 border-b lg:border-b-0 lg:border-r border-primary">
                      <div className="card p-4 border border-primary/10 flex flex-col items-center justify-center text-center rounded-lg sm:rounded-xl bg-gradient-to-br from-white/2 to-white/5">
                        <div className="text-4xl sm:text-5xl">{vertical.image}</div>
                        <div className="flex items-center text-solar-accent mb-4">
                          <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          <span className="text-xs sm:text-sm font-semibold">{vertical.imageDescription}</span>
                        </div>

                        {/* Quick Facts */}
                        <div className="w-full">
                          <h4 className="font-semibold text-primary text-sm sm:text-base mb-3 flex items-center gap-2 justify-center">
                            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-solar-accent" />
                            Quick Facts
                          </h4>
                          <div className="grid grid-rows-3 gap-2 sm:gap-3">
                            {vertical.stats.map((stat, idx) => (
                              <div key={idx} className="text-center p-2 sm:p-3 rounded-lg bg-primary/5 border border-primary/10">
                                <div className="text-sm sm:text-base font-bold text-solar-accent">{stat.value}</div>
                                <div className="text-xs text-tertiary mt-1 leading-tight">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-3/5 p-2 sm:p-4">
                      {/* Projects */}
                      {vertical.projects && (
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-primary m-2 flex items-center gap-2">
                            <Target className="h-4 w-4 text-solar-accent flex-shrink-0" />
                            Commissioned Projects
                          </h4>
                          <div className="space-y-2">
                            {vertical.projects.map((project, idx) => (
                              <div key={idx} className="flex items-center justify-start gap-3 p-2 rounded-lg bg-secondary hover:bg-tertiary transition-colors">
                                <div className="w-2 h-2 bg-solar-accent rounded-full flex-shrink-0" />
                                <span className="text-sm text-tertiary flex-1 leading-relaxed">{project}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Methods */}
                      {vertical.methods && (
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-primary mb-3">Development Methods</h4>
                          <div className="flex flex-wrap gap-2">
                            {vertical.methods.map((method, idx) => (
                              <span key={idx} className="px-3 py-1 bg-solar-primary/10 text-solar-primary text-sm rounded-full border border-solar-primary/20">
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      {vertical.features && (
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-primary mb-3">Key Features</h4>
                          <div className="grid gap-2">
                            {vertical.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-solar-success/5 border border-solar-success/10">
                                <Leaf className="h-4 w-4 text-solar-success flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-tertiary leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Business Models */}
                      {vertical.businessModels && (
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-primary mb-3">Business Models</h4>
                          <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                            {vertical.businessModels.map((model, idx) => (
                              <div key={idx} className="p-3 bg-solar-warning/5 border border-solar-warning/10 rounded-lg">
                                <h5 className="font-semibold text-solar-warning text-sm mb-2 leading-tight">{model.type}</h5>
                                <p className="text-xs text-tertiary leading-relaxed">{model.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Plans */}
                      {vertical.plans && (
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-primary mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-solar-accent flex-shrink-0" />
                            Capacity Expansion Plans
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {vertical.plans.map((plan, idx) => (
                              <div key={idx} className="p-4 bg-gradient-to-br from-solar-accent/5 to-solar-primary/5 border border-solar-accent/10 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-semibold text-primary text-sm sm:text-base">{plan.year}</h5>
                                  <Calendar className="h-4 w-4 text-solar-accent" />
                                </div>
                                <p className="text-lg sm:text-xl font-bold text-solar-accent mb-1">{plan.capacity}</p>
                                <p className="text-xs text-tertiary leading-relaxed">{plan.target}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="block sm:hidden mt-8"
            >
              <div className="card p-6 border border-primary/10 bg-white/5 backdrop-blur-sm rounded-2xl text-center">
                <h3 className="text-lg font-bold text-primary mb-3">
                  Ready to <span className="text-solar-accent">Partner With Us</span>?
                </h3>
                <p className="text-sm text-tertiary mb-4">
                  Explore partnership opportunities across our business verticals and join us in powering Bangladesh&apos;s sustainable energy future.
                </p>
                <Link href={"#contact"} className="btn btn-primary inline-flex items-center gap-2 text-sm px-6 py-3">
                  Contact Business Development
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: sticky gallery - Desktop only */}
          <aside className="hidden sm:inline fixed lg:w-1/3 top-20 right-0 h-[calc(75vh)] flex-col backdrop-blur-xs m-4">
            <div className="flex flex-col bg- p-4 rounded-2xl border border-primary/10 shadow-lg">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-primary mb-1">{activeVertical.title}</h4>
                <p className="text-sm text-tertiary">{activeVertical.imageDescription}</p>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-black/5 mb-4 h-[360px]">
                <motion.img
                  key={`${activeVertical.id}-${activeImageIndex}`}
                  src={activeVertical.images[activeImageIndex]}
                  alt={`${activeVertical.title} image ${activeImageIndex + 1}`}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto p-2">
                {activeVertical.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => handleThumbClick(i)}
                    className={`flex-none rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImageIndex 
                        ? 'border-solar-accent scale-105' 
                        : 'border-transparent hover:border-solar-primary/50'
                    }`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img 
                      src={src} 
                      alt={`thumb-${i}`} 
                      className="w-16 h-12 lg:w-20 lg:h-14 object-cover" 
                      loading="lazy" 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <div className="card p-6 border border-primary/10 bg-white/5 backdrop-blur-sm rounded-2xl text-center">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Ready to <span className="text-solar-accent">Partner With Us</span>?
                </h3>
                <p className="text-tertiary mb-6">
                  Explore partnership opportunities across our business verticals and join us in powering Bangladesh&apos;s sustainable energy future.
                </p>
                <Link href={"#contact"} className="btn btn-primary inline-flex items-center gap-2 px-8 py-4">
                  Contact Business Development
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BusinessVerticals;