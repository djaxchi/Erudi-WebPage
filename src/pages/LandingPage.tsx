import React from 'react';

const LandingPage = () => {
  const companies = [
    { name: 'Tesla', logo: '/tesla.png' },
    { name: 'Google', logo: '/google.png' },
    { name: 'Spotify', logo: '/spotify.png' },
    { name: 'Pinterest', logo: '/pinterest.png' }
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-auto  mx-10">
          {/* Hero Section */}
          <div className="grid md:grid-cols-[55%_45%] gap-20 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-6xl font-bold text-white mb-4">
                Besoin d'un CV?
              </h1>
              <h2 className="text-4xl text-purple-400 mb-8">
                On s'en occupe
              </h2>
              <p className="text-white text-xl mb-6">
                Repondez a l'oral a une suite de questions et laissé la magie s'operer!
              </p>
              <p className="text-gray-300 mb-8 text-lg pr-7">
                Propulsé par ChatGPT, Hireo est l'outil le plus simple pour créer un CV sur mesure. 
                Il vous aide à inclure les bons mots-clés, à améliorer votre rédaction, 
                et à mettre en valeur vos points forts. Nos CV ouvrent les portes des plus grandes entreprises.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-neon-purple-2">
                Créez votre CV
              </button>
            </div>

            {/* Right Column */}
            <div className="relative">
              <div className="absolute top-1/2 transform -translate-y-1/2 bg-purple-500 p-6 pl-40 rounded-lg text-white shadow-neon-purple-3 z-3">
                <div className="ml-40">
                    <p className="text-xl mb-4 pr-20">Un CV IA taillé sur mesure et à votre goût</p>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors w-auto">
                    Modèles de CV
                    </button>
                </div>
            </div>
              <img 
                src="/images/CV.png" 
                alt="CV Preview"
                className="relative -left-10 rounded-lg z-2 "
              />
            </div>

          </div>

          {/* Companies Section */}
          <div className="mt-32">
            <p className="text-center text-white text-xl mb-12">
              Nos CV sont adaptés aux nouveaux IA de recrutement et facilite l'embauche dans les meilleures entreprises
            </p>
            <div className="flex justify-center items-center space-x-16">
              {companies.map((company) => (
                <div key={company.name} className="w-32 opacity-70 hover:opacity-100 transition-opacity">
                  <img 
                    src="/api/placeholder/120/40" 
                    alt={`${company.name} logo`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;