
const LandingPage = () => {
  const companies = [
    { name: 'Tesla', logo: './images/tesla-color.svg'},
    { name: 'Google', logo: './images/google-color.svg'},
    { name: 'Spotify', logo: './images/spotify-color.svg'},
    { name: 'Pinterest', logo: './images/pinterest-color.svg'}
  ];

  return (
    <div className="relative min-h-screen h-[100%] bg-black overflow-hidden">
      {/* Main Content */}
      <main className="relative mx-auto pt-10 pb-20 px-8 max-h-screen-xl">
        <div className="max-w-auto mx-24 mt-36">
          {/* Hero Section */}
          <div className="grid sm:grid-rows lg:grid-cols-[55%_45%] items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-8xl font-bold text-white mb-4">
                Besoin d'un CV?
              </h1>
              <h2 className="text-6xl text-purple-400 mb-8">
                On s'en occupe
              </h2>
              <p className="text-white text-2xl mb-6">
                Repondez a l'oral a une suite de questions et laissé la magie s'operer!
              </p>
              <p className="text-gray-300 mb-8 text-xl pr-7">
                Propulsé par ChatGPT, Hireo est l'outil le plus simple pour créer un CV sur mesure. 
                Il vous aide à inclure les bons mots-clés, à améliorer votre rédaction, 
                et à mettre en valeur vos points forts. Nos CV ouvrent les portes des plus grandes entreprises.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-2xl font-medium transition-colors shadow-neon-purple-2">
                Créez votre CV
              </button>
            </div>
            
            {/* Right Column */}
            <div className="relative flex items-center justify-start">
              {/* Rectangle */}
              <div className="absolute bg-gradient-to-b from-[#8300E0] to-[#47007A] p-8 w-[130%] h-[370px] transform -rotate- translate-x-[5%] rounded-lg shadow-neon-purple-3 flex items-center z-3">
                {/* Image */}
                <img 
                  src="/images/CV.png" 
                  alt="CV Preview"
                  className=" h-auto rounded-lg mr-6"
                />

                {/* Text Content */}
                <div className="relative w-[335px] -left-24 mx-36 flex flex-col items-center justify-center">
                  <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white mb-10 text-center">
                    Un CV IA taillé sur mesure et à votre goût
                  </p>
                  <button className="text-sm sm:text-lg md:text-xl lg:text-2xl bg-gray-800 hover:bg-gray-700 text-white -bottom-4 px-6 py-3 rounded-lg transition-colors">
                    Modèles de CV
                  </button>
                </div>
              </div>
            </div>



          </div>

          {/* Companies Section */}
          <div className="mt-32 w-[50%]">
            <p className="text-left text-gray-300 text-xl mb-4">
              Nos CV sont adaptés aux nouveaux IA de recrutement et facilite l'embauche dans les meilleures entreprises
            </p>
            <div className="flex justify-left items-center space-x-24">
              {companies.map((company) => (
                <div key={company.name} className="w-10 opacity-70 hover:opacity-100 transition-opacity">
                  <img 
                    src={`${company.logo}`} 
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