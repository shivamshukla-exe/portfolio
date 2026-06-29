import { useEffect, useRef, useState } from 'react';
import { Code, Database, Brain, Zap } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = {
    languages: ['Python', 'JavaScript', 'SQL', 'R', 'Java', 'C', 'HTML', 'CSS'],
    frameworks: ['Flask', 'Django', 'React', 'FastAPI', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn'],
    tools: ['Git', 'Docker', 'Selenium', 'Tableau', 'Power BI', 'Kaggle', 'Google Colab', 'Anaconda'],
    ml: ['Machine Learning', 'Deep Learning', 'NLP', 'LLMs', 'Computer Vision', 'EDA'],
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-slate-900 py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">About Me</h2>
          <div className="w-24 h-1 bg-blue-500 mb-16"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Background</h3>
            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              I'm a final-year AI/ML student who builds things that go into production.
              My internship at BISAG-N under MeitY had me doing satellite image segmentation
              for the PM Gatishakti national initiative — real government infrastructure, real stakes.
            </p>
            <p className="text-lg text-slate-200 leading-relaxed mb-6">
              Before that I was at Unified Mentor doing data science — pipelines, dashboards,
              the unglamorous work that actually makes ML useful. I also have a patent application
              filed for a multimodal emotion detection system that ties into Spotify.
            </p>
            <p className="text-lg text-slate-200 leading-relaxed">
              I went to Delhi Public School (93.6% in XII, 91% in X), now wrapping up a B.Tech
              in AI &amp; ML at AKGEC. I speak English, Hindi, and a little French.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Education</h3>
            <div className="space-y-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">
                      B.Tech in AI &amp; ML
                    </h4>
                    <p className="text-blue-400 font-medium mb-2">
                      Ajay Kumar Garg Engineering College
                    </p>
                    <div className="flex justify-between items-center text-sm text-slate-300 font-mono">
                      <span>CGPA: 7.88</span>
                      <span>2021 – 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-600">
                    <Zap className="w-6 h-6 text-slate-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">Class XII &amp; X</h4>
                    <p className="text-slate-300 font-medium mb-2">
                      Delhi Public School, Mathura Road
                    </p>
                    <div className="flex justify-between items-center text-sm text-slate-300 font-mono">
                      <span>XII: 93.6% &nbsp;|&nbsp; X: 91%</span>
                      <span>2020 – 2021</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="experience"
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h3 className="text-3xl font-bold text-white mb-8">Experience</h3>
          <div className="space-y-6 mb-20">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="text-xl font-semibold text-white">AI/ML Intern</h4>
                    <span className="text-xs text-slate-300 font-mono">Jul 2024 – present</span>
                  </div>
                  <p className="text-blue-400 font-medium mb-3">BISAG-N / MeitY — Government of India</p>
                  <ul className="text-slate-200 text-sm space-y-1 list-disc list-inside">
                    <li>Rooftop segmentation on satellite imagery using DeepLabV3+ (ResNet-101 backbone)</li>
                    <li>Part of the PM Gatishakti national infrastructure digitisation initiative</li>
                    <li>Improved mIoU by ~15% over the baseline U-Net approach</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-600">
                  <Database className="w-6 h-6 text-slate-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="text-xl font-semibold text-white">Data Science Intern</h4>
                    <span className="text-xs text-slate-300 font-mono">May – Jul 2024</span>
                  </div>
                  <p className="text-slate-300 font-medium mb-3">Unified Mentor</p>
                  <ul className="text-slate-200 text-sm space-y-1 list-disc list-inside">
                    <li>Built end-to-end ML pipelines for classification and regression tasks</li>
                    <li>Created data visualisation dashboards with Tableau and Power BI</li>
                    <li>Worked with Pandas, NumPy, and Scikit-learn for EDA and modelling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h3 className="text-3xl font-bold text-white mb-12">Technical Skills</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Code className="w-7 h-7 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-900 text-slate-200 text-sm rounded font-mono border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center mb-6 border border-slate-600">
                <Database className="w-7 h-7 text-slate-300" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-900 text-slate-200 text-sm rounded font-mono border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center mb-6 border border-slate-600">
                <Zap className="w-7 h-7 text-slate-300" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">Tools</h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-900 text-slate-200 text-sm rounded font-mono border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Brain className="w-7 h-7 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">AI/ML</h4>
              <div className="flex flex-wrap gap-2">
                {skills.ml.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-900 text-slate-200 text-sm rounded font-mono border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
