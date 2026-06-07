import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Zap, Globe, Linkedin, ArrowRight, Layers, BarChart3, Radio } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-electric-500 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500 opacity-20"></div>
      <div className="w-5 h-5 border-2 border-electric-500 rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500"></div>
    </div>
    <span className="text-xl font-bold tracking-tighter text-white">GOVANTIS</span>
  </div>
);

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-800/50 bg-slate-950/80">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <Logo />
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#strategy" className="hover:text-white transition-colors">Strategy</a>
        <a href="#delivery" className="hover:text-white transition-colors">Delivery</a>
        <a href="#ai" className="hover:text-white transition-colors">AI Products</a>
        <button className="px-4 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors border border-slate-700">
          Contact Us
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-electric-500/10 blur-[120px] rounded-full"></div>
    <div className="max-w-7xl mx-auto px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-semibold mb-6">
          <Zap size={14} /> AI-Native Solutions
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          Bridging Platform Strategy with <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-cyan-400">AI-Native Execution.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
          Govantis delivers governance-first AI integration and complex platform delivery for global telecom and tech leaders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-electric-500 hover:bg-electric-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-electric-500/20">
            Explore Our Solutions <ArrowRight size={18} />
          </button>
          <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold rounded-lg transition-all">
            View Case Studies
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const TrustedBy = () => (
  <section className="py-12 border-y border-slate-800/50 bg-slate-900/30">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-widest mb-8">Heritage in Excellence</p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {['DT', 'Vodafone', 'BT', 'NOS', 'prpl', 'RDK'].map((brand) => (
          <span key={brand} className="text-2xl font-bold text-slate-400 tracking-tighter">{brand}</span>
        ))}
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description, points }) => (
  <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-electric-500/50 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-xl bg-electric-500/10 flex items-center justify-center text-electric-400 mb-6 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {points.map((p, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
          <div className="w-1 h-1 rounded-full bg-electric-500"></div> {p}
        </li>
      ))}
    </ul>
  </div>
);

const Pillars = () => (
  <section className="py-24" id="strategy">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Shield}
          title="Governance & Strategy"
          description="C-level advisory focusing on the intersection of technical architecture and regulatory compliance."
          points={["AI Readiness Assessment", "Governance Frameworks", "Platform Monetization"]}
        />
        <FeatureCard 
          icon={Layers}
          title="Complex Delivery"
          description="Deep-tech engineering for mission-critical infrastructure and broadband platforms."
          points={["RDK & Android TV", "prplOS & OpenWrt", "Cloud-Native Migration"]}
        />
        <FeatureCard 
          icon={Cpu}
          title="AI Products"
          description="Custom predictive intelligence tools designed for telecom and critical infrastructure."
          points={["Predictive Maintenance", "Network Optimization", "Autonomous Ops"]}
        />
      </div>
    </div>
  </section>
);

const ValueProp = () => (
  <section className="py-24 bg-slate-900/20 relative">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Unmatched Technical Depth. <br/><span className="text-slate-500">Unbiased Impact.</span></h2>
      <div className="grid md:grid-cols-2 gap-12 text-left">
        <div className="flex gap-6">
          <div className="shrink-0 w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <BarChart3 size={24} />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Vendor Agnostic</h4>
            <p className="text-slate-400">We don't sell licenses. We sell results. Our recommendations are purely based on technical merit and business ROI.</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="shrink-0 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Radio size={24} />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Telecom DNA</h4>
            <p className="text-slate-400">Built by industry veterans. We understand the complexity of legacy migration and the demands of AI-native futures.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-start">
      <div>
        <Logo />
        <p className="mt-4 text-slate-500 text-sm">© 2026 Govantis. All rights reserved.</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Office</h4>
        <p className="text-slate-400 text-sm">Rua Castilho, n.º 39, 8.º E</p>
        <p className="text-slate-400 text-sm">1250-068 Santo António, Lisboa</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:info@govantis.pt" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            info@govantis.pt
          </a>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-electric-500/30">
      <Nav />
      <Hero />
      <TrustedBy />
      <Pillars />
      <ValueProp />
      <Footer />
    </div>
  );
}

export default App;
