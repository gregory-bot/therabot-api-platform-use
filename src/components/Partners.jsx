const partners = [
  {
    name: 'Microsoft',
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    description: 'AI Innovation Partner',
  },
  {
    name: 'Google Cloud',
    logo: 'https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_2x1.jpg',
    description: 'Cloud Infrastructure',
  },
  {
    name: 'OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png',
    description: 'AI Technology Partner',
  },
  {
    name: 'WHO',
    logo: 'https://www.who.int/Images/SchemaOrg/schemaOrg.jpg',
    description: 'Mental Health Guidelines',
  },
  {
    name: 'W3C',
    logo: 'https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg',
    description: 'Accessibility Standards',
  },
];

export default function Partners() {
  return (
    <section id="partners" className="py-20 px-6 bg-gradient-to-br from-purple-50 via-white to-purple-50" aria-labelledby="partners-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="partners-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Committed to delivering the highest standards in accessible mental health care
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-purple-100 focus-within:ring-2 focus-within:ring-purple-500 flex flex-col items-center justify-center"
              tabIndex="0"
              role="article"
              aria-label={partner.name}
            >
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center"><span class="text-purple-500 font-bold text-xl">${partner.name[0]}</span></div>`;
                  }}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
