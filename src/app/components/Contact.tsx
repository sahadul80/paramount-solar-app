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
  ExternalLink
} from 'lucide-react'

interface ContactInfo {
  icon: React.ComponentType<any>;
  title: string;
  details: string;
  subtitle: string;
  color: string;
  expandedContent?: {
    description: string;
    additionalInfo?: string[];
    hours?: string;
    email?: string;
    phone?: string;
  };
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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

  const downloadContactPDF = () => {
    // Create a simple PDF download functionality
    const contactData = `
      Paramount Solar Ltd - Contact Information
      
      Corporate Office:
      Dhaka, Bangladesh
      
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

  const subjects = [
    'Solar Project Inquiry',
    'Partnership Opportunity',
    'Career Opportunities',
    'Technical Support',
    'General Information',
    'Investment Inquiry'
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
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
            <MessageCircle className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In <span className="text-green-600">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to start your solar energy journey? Contact us today for a free consultation and discover how we can power your future with clean, renewable energy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
              <motion.button
                onClick={downloadContactPDF}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download Info</span>
              </motion.button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => toggleCard(item.title)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`bg-gradient-to-r ${item.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <motion.div
                        animate={{ rotate: expandedCard === item.title ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {expandedCard === item.title ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </motion.div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-700 font-semibold mb-1">{item.details}</p>
                    <p className="text-gray-500 text-sm">{item.subtitle}</p>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedCard === item.title && item.expandedContent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 bg-gray-50"
                      >
                        <div className="p-6">
                          <p className="text-gray-600 mb-4">{item.expandedContent.description}</p>
                          
                          {item.expandedContent.additionalInfo && (
                            <div className="space-y-2 mb-4">
                              {item.expandedContent.additionalInfo.map((info, infoIndex) => (
                                <div key={infoIndex} className="flex items-center text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                  {info}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {item.expandedContent.email && (
                              <motion.a
                                href={`mailto:${item.expandedContent.email}`}
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                              >
                                <Mail className="h-3 w-3 mr-1" />
                                Email
                              </motion.a>
                            )}
                            {item.expandedContent.phone && (
                              <motion.a
                                href={`tel:${item.expandedContent.phone}`}
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
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
              className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full"></div>
              </div>

              <div className="relative z-10 flex items-start space-x-4">
                <MessageCircle className="h-8 w-8 text-green-200 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-3">Why Choose Paramount Solar?</h4>
                  <ul className="space-y-2 text-green-100">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mr-3"></div>
                      7+ Years of Solar Industry Experience
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mr-3"></div>
                      130MW+ of Commissioned Solar Projects
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mr-3"></div>
                      End-to-End Solar Solutions
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mr-3"></div>
                      Proven Track Record with PPA Agreements
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-200 rounded-full mr-3"></div>
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
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                <Send className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company/Organization
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  placeholder="Tell us about your solar energy needs, project requirements, or any questions you may have..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
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

              <p className="text-sm text-gray-500 text-center">
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
          className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-1 bg-gradient-to-br from-green-500 to-blue-500 p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="h-6 w-6 mr-3" />
                Our Office Location
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Corporate Headquarters</p>
                    <p className="text-green-100">Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-green-100">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Emergency Contact</p>
                    <p className="text-green-100">Available 24/7 for existing clients</p>
                  </div>
                </div>
                <motion.button
                  onClick={downloadContactPDF}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 bg-white text-green-600 font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Contact Info
                </motion.button>
              </div>
            </div>
            
            <div className="md:col-span-2 h-64 md:h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative">
              <div className="text-center text-gray-600">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <p className="text-lg font-semibold">Dhaka, Bangladesh</p>
                <p className="text-sm mb-4">Corporate Headquarters</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Maps
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact