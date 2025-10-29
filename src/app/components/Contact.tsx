'use client'

import { motion } from 'framer-motion'
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
      Phone: +880 1722 191757

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
      details: '+880 1722 191757',
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
        phone: '+880 1722 191757'
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
    <section id="contact" className="p-2 sm:p-4 bg-primary relative overflow-hidden z-20">
      <SolarPanelGrid/>
      <div className="relative container m-2 p-2 sm:m-4 sm:p-4 space-y-8 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
            Get In <span className="text-solar-accent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-solar-accent mx-auto mb-4"></div>
          <p className="text-tertiary max-w-2xl mx-auto">
            Ready to start your solar energy journey? Contact us today for a free consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-primary">Contact Information</h3>
              <button
                onClick={downloadContactInfo}
                className="btn btn-secondary text-sm"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download Info</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card border border-primary/10 bg-white/5 backdrop-blur-sm overflow-hidden"
                >
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleCard(item.title)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`bg-gradient-to-r ${item.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-primary">{item.title}</h4>
                        <p className="text-primary font-medium text-sm">{item.details}</p>
                        <p className="text-tertiary text-xs">{item.subtitle}</p>
                      </div>
                    </div>
                    <div>
                      {expandedCard === item.title ? (
                        <ChevronUp className="h-4 w-4 text-tertiary" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-tertiary" />
                      )}
                    </div>
                  </div>

                  {/* Expandable Content */}
                  {expandedCard === item.title && item.expandedContent && (
                    <div className="border-t border-primary/10 p-4">
                      <p className="text-tertiary text-sm mb-3">{item.expandedContent.description}</p>
                      
                      {item.expandedContent.additionalInfo && (
                        <div className="space-y-2 mb-3">
                          {item.expandedContent.additionalInfo.map((info, infoIndex) => (
                            <div key={infoIndex} className="flex items-center text-sm text-tertiary">
                              <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-2"></div>
                              {info}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        {item.expandedContent.email && (
                          <a
                            href={`mailto:${item.expandedContent.email}`}
                            className="btn btn-secondary text-xs"
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </a>
                        )}
                        {item.expandedContent.phone && (
                          <a
                            href={`tel:${item.expandedContent.phone}`}
                            className="btn btn-secondary text-xs"
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="card p-4 border border-primary/10 bg-solar-primary/5 mt-6"
            >
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-solar-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-primary mb-2">Why Choose Paramount Solar?</h4>
                  <ul className="space-y-1 text-sm text-tertiary">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-2"></div>
                      7+ Years of Solar Industry Experience
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-2"></div>
                      130MW+ of Commissioned Solar Projects
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-solar-success rounded-full mr-2"></div>
                      End-to-End Solar Solutions
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card border border-primary bg-transparent backdrop-blur-xs"
          >
            <div className="flex items-center p-4 border-b border-primary/10">
              <div className="bg-solar-primary w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <Send className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary">Send us a Message</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-primary">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tertiary" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input pl-10 w-full"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-primary">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tertiary" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input pl-10 w-full"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-primary">
                    Company/Organization
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tertiary" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input pl-10 w-full"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-primary">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tertiary" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input pl-10 w-full"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-primary">
                  Subject *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tertiary" />
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input pl-10 w-full appearance-none"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tertiary pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-primary">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="input w-full resize-none"
                  placeholder="Tell us about your solar energy needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-tertiary text-center">
                We typically respond within 24 hours. Your information is secure and confidential.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card border border-primary/10 bg-white/5 backdrop-blur-sm overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/5 bg-solar-primary/10 p-4">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Our Office Location
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Building className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Corporate Headquarters</p>
                    <p className="text-solar-accent text-sm">Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Business Hours</p>
                    <p className="text-solar-accent text-sm">Sunday - Thursday: 9AM-6PM</p>
                  </div>
                </div>
                <button
                  onClick={downloadContactInfo}
                  className="btn btn-secondary w-full text-sm mt-2"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download Contact Info
                </button>
              </div>
            </div>
            
            <div className="w-full lg:w-3/5">
              <div className="h-48 lg:h-full">
                <iframe
                  loading="lazy"
                  src={mapSrc}
                  title="Paramount Solar Office Location"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="border-t border-primary/10 p-3 text-center">
            <button
              onClick={() => setIsMapOpen(true)}
              className="btn btn-ghost text-sm"
            >
              <Maximize className="h-4 w-4 mr-1" />
              Open Map in Fullscreen
            </button>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Map Modal */}
      {isMapOpen && (
        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          locationURL={mapSrc}
        />
      )}
    </section>
  )
}

export default Contact