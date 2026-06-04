import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdvancedContact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'shivamshukla2003@gmail.com', href: 'mailto:shivamshukla2003@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9717935914', href: 'tel:+919717935914' },
    { icon: MapPin, label: 'Location', value: 'Ghaziabad, India', href: null },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
        colors: ['#3b82f6', '#22d3ee', '#8b5cf6', '#ec4899'],
      });
    }

    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 py-24 px-6 overflow-hidden"
    >
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            Let's talk.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Open to AI/ML roles, research collaborations, and interesting problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group flex items-start gap-4 cursor-pointer transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white text-lg font-semibold hover:text-cyan-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white text-lg font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  style={{
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                ></div>
                <p className="text-green-400 font-semibold">Currently Available</p>
              </div>
              <p className="text-slate-300">Open to exciting opportunities in AI/ML and full-stack development</p>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Github, href: 'https://github.com/shivamshukla2003', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/shivam-shukla', label: 'LinkedIn' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center group hover:bg-blue-600 transition-all duration-300 hover:scale-110 active:scale-90"
                  >
                    <Icon className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <form
              onSubmit={handleSubmit}
              className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 space-y-6 hover:border-blue-500/50 transition-all duration-300"
            >
              {['name', 'email', 'subject'].map((field) => (
                <div key={field} className="animate-fade-in-up" style={{ animationDelay: `${100 + field.length * 50}ms` }}>
                  <label className="block text-slate-300 text-sm mb-2 capitalize font-semibold">
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    required
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    placeholder={`Your ${field}...`}
                  />
                </div>
              ))}

              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <label className="block text-slate-300 text-sm mb-2 font-semibold">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group transition-all duration-300 ${
                  !submitted ? 'hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95' : ''
                }`}
              >
                {submitted ? (
                  <>
                    <span className="animate-bounce">✓</span>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
