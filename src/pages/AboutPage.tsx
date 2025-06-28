import { AnimatedSection } from '../assets/animatedSection';

// Dynamic background particles + gradient
const FloatingParticles = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full animate-float filter blur-sm opacity-50"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `2s`,
          animationDelay: `2s`,
        }}
      />
    ))}
  </div>
);



export const AboutPage = () => {
  const availableModels = [
    { name: 'Mistral-7B', desc: "A high-performance, open-source 7B LLM. Fine-tune locally with Erudi's no-code interface." },
    // ...
  ];

  const requirements = [
    'NVIDIA GPU with ≥8 GB VRAM (CUDA-capable)',
    '16 GB RAM recommended',
    'Windows 10+ / macOS 12+ / Linux (x86_64)',
    'Disk space: ~20 GB for model weights',
  ];

  const team = [
    { name: 'Djalil Chikhi', role: 'Team Lead', img: '../../images/djalil.png', bio: 'Leads the team and drives product vision.' },
    { name: 'Rayan Hanader', role: 'AI Engineer', img: '../../images/rayan.png', bio: 'Develops and optimizes machine learning tasks.' },
    { name: 'Sami Taider', role: 'Full Stack Engineer', img: '../../images/sami.png', bio: 'Implements user interfaces and integrates APIs.' },
    { name: 'Youssef Chaouki', role: 'Data Engineer', img: '../../images/YoussefC.png', bio: 'Designs and maintains dataset cleaning pipelines.' },
    { name: 'Nabil Dakoune', role: 'DevOps Specialist', img: '../../images/nabil.png', bio: 'Ensures smooth deployment and development.' },
    { name: 'Youssef Laatar', role: 'Infrastructure Engineer', img: '../../images/youssefL.png', bio: 'Works on computational resources and their optimization.' },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(0,193,124,0.15), transparent 70%), radial-gradient(circle at bottom right, rgba(0,193,124,0.1), transparent 60%)',
        }} />
      <FloatingParticles />

      <div className="relative z-10 mt-28 container mx-auto px-4 py-16">

        {/* Hero Section */}
<AnimatedSection delay={0}>
  <div className="relative  backdrop-blur-lg rounded-2xl p-10 mb-20 overflow-visible">
    <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-10 overflow-visible">
      
      {/* Text column */}
      <div className="flex-1 space-y-4 z-10">
        <h1 className="text-4xl lg:text-5xl mb-14 font-extrabold text-emerald-400">
          About Erudi
        </h1>
        <div className="space-y-6 text-gray-300">
          <p className="text-lg text-white">
            Do you find your AI too general, not connected enough to your field?
          </p>
          <p className="text-lg text-white">
            Want to leverage your data for superior performance while keeping it secure?
          </p>
          <p className="text-lg font-thin text-white">
            No pipeline hassles or CLI needed—Erudi handles cleaning, analysis, and fine-tuning for you.
          </p>
          <p className="text-lg font-thin text-white">
            Access models, drag & drop your folders, and hit Train. Instantly infuse your custom dataset.
          </p>
          <p className="text-lg font-thin text-white">
            Compare models in Arena, tweak creativity or token limits, and explore differences in the Infinite Sandbox.
          </p>
        </div>
      </div>

      {/* Image column: overflows to the right */}
      <div className="relative overflow-visible z-0">
        <img
          src="/images/about-us-image-1.png"
          alt="About Us Hero"
          className="
            object-cover  h-[300px] lg:h-[400px]
            max-w-full
            transform scale-105 
            shadow-2xl 
            rounded-2xl
          "
        />
      </div>

    </div>
  </div>
</AnimatedSection>


        {/* Beta Requirements */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 mx-8">
            <div>
              <div className=" bg-[#041915]/80 backdrop-blur-xl shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Beta Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-200 mb-6">
                  {requirements.map((r,i) => <li key={i}>{r}</li>)}
                </ul>
                <button className="block mt-8 mx-auto w-80 bg-transparent border-2 border-emerald-400 text-emerald-400 py-3 rounded-lg hover:bg-emerald-400 hover:text-gray-900 transition">
                  Try It
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-full h-80 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <img
                  src="/images/about-us-image-3.png"
                  alt="About Us Hero"
                  className="object-cover object-center w-full h-full transform shadow-2xl rounded-2xl"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Available Models */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 mx-8">
            <div className="hidden lg:block">
                <div className="w-full h-64 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden mx-auto">
                  <img
                  src="/images/about-us-image-2.png"
                  alt="About Us Hero"
                  className="object-cover object-center w-full h-full transform shadow-2xl rounded-2xl"
                  />
                </div>
            </div>
            <div>
              <div className=" bg-[#041915]/80 backdrop-blur-xl shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Available Models</h2>
                {availableModels.map((m,i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-lg font-bold text-white">• {m.name}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                ))}
                <button className="block mt-8 mx-auto w-80 bg-transparent border-2 border-emerald-400 text-emerald-400 py-3 rounded-lg hover:bg-emerald-400 hover:text-gray-900 transition">
                  Try It
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Meet The Team */}
        <AnimatedSection delay={200}>
          <div className="mb-32 text-left mx-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-emerald-400">Meet The Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 mx-8">
            {team.map((p, i) => (
              <AnimatedSection key={i} delay={200 + i*100}>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
                    <div className="w-48 h-48 -mt-28 mb-4 bg-white/5 backdrop-blur-md rounded-full overflow-hidden flex items-center justify-center mx-auto">
                    <img src={p.img} alt={`Photo of ${p.name}`} className="object-cover transform scale-110 hover:scale-125 transition-all duration-300 w-full h-full" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-emerald-300 text-sm mb-2">{p.role}</p>
                  <p className="text-gray-200 text-sm leading-relaxed">{p.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
};

export default AboutPage;
