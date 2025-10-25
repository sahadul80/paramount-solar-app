'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  Download,
  ChevronDown,
  ChevronUp,
  Building,
  User,
  FileText,
  Maximize,
  LucideIcon
} from 'lucide-react'
import MapModal from './MapModal';
import { SolarPanelGrid } from './patterns/SolarPanelGrid';

interface ExpandedContent {
  description: string;
  additionalInfo?: string[];
  hours?: string;
  email?: string;
  phone?: string;
}

interface ContactInfo {
  icon: LucideIcon;
  title: string;
  details: string;
  subtitle: string;
  color: string;
  expandedContent?: ExpandedContent;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  const toggleCard = (title: string) => {
    setExpandedCard(expandedCard === title ? null : title)
  }

  const downloadContactInfo = () => {
    const contactData = `
      Paramount Solar Ltd - Contact Information

      Corporate Office:
      House#22, Road#113/A, Gulshan-2,
      Dhaka-1212, Dhaka, Bangladesh

      Contact Details:
      Email: info@paramountsolar.com
      Phone: +880 XXXX-XXXXXX

      Business Hours:
      Sunday - Thursday: 9:00 AM - 6:00 PM

      Emergency Contact:
      Available 24/7 for existing clients

      Generated on: ${new Date().toLocaleDateString()}
    `

    const blob = new Blob([contactData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Paramount-Solar-Contact-Information.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@paramountsolar.com',
      subtitle: 'Send us an email anytime',
      color: 'from-blue-500 to-cyan-500',
      expandedContent: {
        description: 'For general inquiries, project proposals, and partnership opportunities.',
        additionalInfo: [
          'Response time: Within 24 hours',
          'Project inquiries: projects@paramountsolar.com',
          'Career opportunities: careers@paramountsolar.com'
        ],
        email: 'info@paramountsolar.com'
      }
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+880 XXXX-XXXXXX',
      subtitle: 'Mon to Fri, 9am to 6pm',
      color: 'from-green-500 to-emerald-500',
      expandedContent: {
        description: 'Speak directly with our solar energy consultants and technical experts.',
        additionalInfo: [
          'Main office: +880 XXXX-XXXXXX',
          'Technical support: +880 XXXX-XXXXXX',
          'Emergency line: +880 XXXX-XXXXXX'
        ],
        hours: 'Sunday - Thursday: 9:00 AM - 6:00 PM',
        phone: '+880 XXXX-XXXXXX'
      }
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Corporate Office, Dhaka',
      subtitle: 'Bangladesh',
      color: 'from-orange-500 to-yellow-500',
      expandedContent: {
        description: 'Visit our corporate headquarters for face-to-face consultations and project discussions.',
        additionalInfo: [
          'Address: Corporate Headquarters, Dhaka, Bangladesh',
          'Parking available on premises',
          'Meeting rooms available by appointment'
        ]
      }
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Sunday - Thursday',
      subtitle: '9:00 AM - 6:00 PM',
      color: 'from-purple-500 to-pink-500',
      expandedContent: {
        description: 'Our standard business hours for all departments and services.',
        additionalInfo: [
          'General office: Sunday - Thursday, 9AM-6PM',
          'Technical support: 24/7 for existing clients',
          'Project consultations: By appointment'
        ],
        hours: 'Sunday - Thursday: 9:00 AM - 6:00 PM'
      }
    }
  ]

  const subjects: string[] = [
    'Solar Project Inquiry',
    'Partnership Opportunity',
    'Career Opportunities',
    'Technical Support',
    'General Information',
    'Investment Inquiry'
  ]

  // Coordinates / embed src for the office
  const mapSrc = "https://www.google.com/maps?q=House%2022%20Rd%20No%20113%2FA&z=17&output=embed"

  return (
    <section id="contact" className="section-padding bg-primary mx-auto">

      <SolarPanelGrid/>
      <div className="container-responsive space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-solar-secondary w-20 h-20 rounded-full flex-center mx-auto"
          >
            <MessageCircle className="h-10 w-10 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto m-4"></div>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Ready to start your solar energy journey? Contact us today for a free consultation and discover how we can power your future with clean, renewable energy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-2 max-w-7xl">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex-between p-4">
              <h3 className="text-2xl font-bold text-primary">Contact Information</h3>
              <motion.button
                onClick={downloadContactInfo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
                aria-label="Download contact information"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:flex">Download Info</span>
              </motion.button>
            </div>
            
            <div className="grid-responsive px-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="card card-interactive"
                  onClick={() => toggleCard(item.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCard(item.title) }}
                >
                  <div className="flex flex-row justify-between">
                    <div className="w-3/20 flex-between p-4">
                      <div className={`bg-gradient-to-r ${item.color} w-12 h-12 rounded-lg flex-center`}>
                        <item.icon className="h-6 w-6 text-quaternary" />
                      </div>
                    </div>
                    <div className="w-16/20 p-2">
                      <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                      <p className="text-primary font-semibold">{item.details}</p>
                      <p className="text-text-tertiary text-sm">{item.subtitle}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCard === item.title ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-1/20 flex items-center justify-center"
                    >
                      {expandedCard === item.title ? (
                        <ChevronUp className="h-5 w-5 text-text-tertiary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-text-tertiary" />
                      )}
                    </motion.div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedCard === item.title && item.expandedContent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-primary"
                      >
                        <div className="p-2">
                          <p className="text-secondary">{item.expandedContent.description}</p>
                          
                          {item.expandedContent.additionalInfo && (
                            <div className="space-y-2">
                              {item.expandedContent.additionalInfo.map((info, infoIndex) => (
                                <div key={infoIndex} className="flex items-center text-sm text-secondary">
                                  <div className="w-1.5 h-1.5 bg-success rounded-full mr-3"></div>
                                  {info}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-wrap">
                            {item.expandedContent.email && (
                              <motion.a
                                href={`mailto:${item.expandedContent.email}`}
                                whileHover={{ scale: 1.05 }}
                                className="tag tag-info"
                              >
                                <Mail className="h-3 w-3 mr-1" />
                                Email
                              </motion.a>
                            )}
                            {item.expandedContent.phone && (
                              <motion.a
                                href={`tel:${item.expandedContent.phone}`}
                                whileHover={{ scale: 1.05 }}
                                className="tag tag-success"
                              >
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="gradient-primary rounded-2xl m-2 p-4 text-primary relative overflow-hidden glass-effect"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 bg-solar-primary rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-solar-primary rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-solar-primary rounded-full"></div>
              </div>

              <div className="relative z-10 flex items-start">
                <MessageCircle className="h-8 w-8 text-solar-primary flex-shrink-0 m-2" />
                <div>
                  <h4 className="text-xl font-bold mb-3">Why Choose Paramount Solar?</h4>
                  <ul className="space-y-2 text-solar-primary">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-3"></div>
                      7+ Years of Solar Industry Experience
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-3"></div>
                      130MW+ of Commissioned Solar Projects
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-3"></div>
                      End-to-End Solar Solutions
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-3"></div>
                      Proven Track Record with PPA Agreements
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-3"></div>
                      Commitment to Sustainable Development
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="card card-elevated m-4"
          >
            <div className="flex items-center p-4">
              <div className="gradient-primary w-10 h-10 rounded-lg flex-center mr-4">
                <Send className="h-5 w-5 text-quaternary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Send us a Message</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="label">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="label">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="label">
                    Company/Organization
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="label">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="label">
                  Subject *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input pl-10 appearance-none"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="input resize-none"
                  placeholder="Tell us about your solar energy needs, project requirements, or any questions you may have..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary btn-lg btn-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-sm text-text-tertiary text-center">
                We typically respond within 24 hours. Your information is secure and confidential.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card card-elevated overflow-hidden m-2"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="w-full h-full sm:w-2/6 gradient-primary p-4 text-primary">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="h-6 w-6 mr-3" />
                Our Office Location
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Corporate Headquarters</p>
                    <p className="text-solar-accent">Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-solar-accent">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Emergency Contact</p>
                    <p className="text-solar-accent">Available 24/7 for existing clients</p>
                  </div>
                </div>
                <motion.button
                  onClick={downloadContactInfo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary btn-full mt-4"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Contact Info
                </motion.button>
              </div>
            </div>
            
            <div className="w-full h-cover sm:w-3/6 gradient-secondary text-primary flex flex-col justify-between">
              {/* Inline small map */}
              <iframe
                loading="lazy"
                src={mapSrc}
                title="House 22 Rd No 113/A - Google Maps"
                className={`w-full h-full`}
              />
              {/* Open fullscreen modal */}
              <button
                onClick={() => setIsMapOpen(true)}
                className="btn btn-ghost glass-effect w-full"
                aria-label="Open map in fullscreen"
              >
                <Maximize className="h-6 w-6 text-accent text-bold text-center" />
                Open in Fullscreen
              </button>
            </div>
            <div className="w-full sm:w-1/6 text-center text-primary flex flex-col justify-center bg-solar-primary">
              <MapPin className="h-8 w-8 sm:h-16 sm:w-16 mx-auto m-2 letters-3D text-solar-accent" />
              <p className="text-sm sm:text-lg font-semibold">Dhaka, Bangladesh</p>
              <p className="text-xs">Corporate Headquarters</p>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Fullscreen modal for the map (with search + theme toggle) */}
      <AnimatePresence>
        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          locationURL={mapSrc}
        />
      </AnimatePresence>
    </section>
  )
}

export default Contact
