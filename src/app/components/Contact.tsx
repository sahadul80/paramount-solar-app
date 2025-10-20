'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react'

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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@paramountsolar.com',
      subtitle: 'Send us an email anytime',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+880 XXXX-XXXXXX',
      subtitle: 'Mon to Fri, 9am to 6pm',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Corporate Office, Dhaka',
      subtitle: 'Bangladesh',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Sunday - Thursday',
      subtitle: '9:00 AM - 6:00 PM',
      color: 'from-purple-500 to-pink-500'
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`bg-gradient-to-r ${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-700 font-semibold mb-1">{item.details}</p>
                  <p className="text-gray-500 text-sm">{item.subtitle}</p>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white"
            >
              <div className="flex items-start space-x-4">
                <MessageCircle className="h-8 w-8 text-green-200 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Why Choose Paramount Solar?</h4>
                  <ul className="space-y-2 text-green-100">
                    <li>• 7+ Years of Solar Industry Experience</li>
                    <li>• 130MW+ of Commissioned Solar Projects</li>
                    <li>• End-to-End Solar Solutions</li>
                    <li>• Proven Track Record with PPA Agreements</li>
                    <li>• Commitment to Sustainable Development</li>
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
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                  placeholder="Tell us about your solar energy needs..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-sm text-gray-500 text-center">
                We'll get back to you within 24 hours. Your information is safe with us.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-1 bg-gradient-to-br from-green-500 to-blue-500 p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Office Location</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
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
              </div>
            </div>
            
            <div className="md:col-span-2 h-64 md:h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <p className="text-lg font-semibold">Dhaka, Bangladesh</p>
                <p className="text-sm">Interactive map would be integrated here</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact