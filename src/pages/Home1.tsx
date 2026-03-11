import './Home1.css';

export default function Home1() {
  return (
    <div className="home1-page">
      <div className="section-container">
        <nav className="flex items-center justify-start h-[72px] px-0">
          <ul className="flex space-x-7 text-sm font-medium text-gray-700">
            <li className="cursor-pointer hover:text-black">Home</li>
            <li className="cursor-pointer hover:text-black">About</li>
            <li className="cursor-pointer hover:text-black">Services</li>
            <li className="cursor-pointer hover:text-black">Location</li>
            <li className="cursor-pointer hover:text-black">Contact</li>
          </ul>
        </nav>

        <div className="relative w-full mt-4">
          <div className="w-full h-[500px] overflow-hidden rounded-[22px] image-zoom">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
              alt="modern luxury architecture house"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hero-overlay rounded-[22px]"></div>
          </div>
          
          <div className="absolute left-4 md:left-8 bottom-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white hero-text-shadow">
              A1 HOME REMODELING INC.
            </h1>
            <p className="text-gray-100 text-xl italic mt-2 hero-text-shadow drop-shadow-lg">
              "Quality built to last"
            </p>
            
            <div className="mission-text text-gray-100 text-base md:text-lg mt-4 hero-text-shadow">
              <p>Our mission at A1 Home Remodeling Inc. is simple: to provide high-quality services for our valued clients. Our team goes above and beyond to cater to each project's specific needs.</p>
              <p className="mt-3">Through open communication and exceptional service, we hope you'll find what you're looking for with our Home Improvement Services.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 mb-4">
          <a href="#" className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white font-medium py-4 px-10 rounded-full transition shadow-lg text-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Schedule a Free Online Quote
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="hidden md:block"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:col-start-2">
            <div className="bg-white-card p-6 text-center">
              <span className="text-3xl font-bold text-gray-800">CSLB#</span>
              <p className="text-gray-500 text-sm mt-1">1059945</p>
            </div>
            <div className="bg-white-card p-6 text-center">
              <span className="text-3xl font-bold text-gray-800">21 Years</span>
              <p className="text-gray-500 text-sm mt-1">experience</p>
            </div>
            <div className="bg-white-card p-6 text-center">
              <span className="text-3xl font-bold text-gray-800">LICENSED</span>
              <p className="text-gray-500 text-sm mt-1">BONDED · INSURED</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12 py-6 border-y border-gray-200">
          <img src="https://placehold.co/120x40/cccccc/969696?text=CNBC" className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition" alt="CNBC" />
          <img src="https://placehold.co/120x40/cccccc/969696?text=officernd" className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition" alt="officernd" />
          <img src="https://placehold.co/120x40/cccccc/969696?text=ARCONE" className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition" alt="ARCONE" />
          <img src="https://placehold.co/120x40/cccccc/969696?text=Dezeen" className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition" alt="Dezeen" />
          <img src="https://placehold.co/120x40/cccccc/969696?text=ArchDaily" className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition" alt="ArchDaily" />
        </div>

        <div className="mt-20">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">Professional Services</h2>
          <p className="text-gray-500 text-lg max-w-2xl mb-8">
            With our constantly growing product inventory, there are many options to choose from when you decide to work with us. Our success stems from our commitment to uphold the highest standards of excellence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white-card hover-card overflow-hidden group">
              <div className="relative image-zoom h-40">
                <img src="https://images.unsplash.com/photo-1632158886252-8b7f3c3d3b5b?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" alt="roofing" />
                <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">01</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">HEAT REFLECTIVE ROOFING SYSTEMS</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">Cool roofing technology that reduces energy costs.</p>
              </div>
            </div>
            
            <div className="bg-white-card hover-card overflow-hidden group">
              <div className="relative image-zoom h-40">
                <img src="https://images.unsplash.com/photo-1605270012917-bf157a5a6e3a?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" alt="windows and doors" />
                <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">02</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">ENERGY EFFICIENT WINDOWS AND DOORS</h3>
                <p className="text-gray-500 text-sm mt-1">Reduce heat loss, improve insulation, and save energy.</p>
              </div>
            </div>
            
            <div className="bg-white-card hover-card overflow-hidden group">
              <div className="relative image-zoom h-40">
                <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="high performance coating" />
                <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">03</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">HIGH PERFORMANCE COATING SYSTEM</h3>
                <p className="text-gray-500 text-sm mt-1">Durable, reflective coatings for long-lasting protection.</p>
              </div>
            </div>
            
            <div className="bg-white-card hover-card overflow-hidden flex flex-col items-center justify-center p-5 text-center">
              <span className="text-4xl mb-2">📋</span>
              <h3 className="text-lg font-semibold text-gray-800">Free Online Quote</h3>
              <p className="text-gray-500 text-sm mt-1">424 345 2274</p>
              <p className="text-xs text-gray-400 mt-2">Culver City, CA</p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 max-w-lg">LOCATION</h2>
            <p className="text-gray-500 text-lg max-w-md mt-3 md:mt-0">Culver City / LA – visit or contact us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
            <div className="relative rounded-[18px] overflow-hidden image-zoom hover-card row-span-2 h-[400px] md:h-500">
              <img src="https://images.unsplash.com/photo-1577083552431-6e5fd0192885?q=80&w=2040&auto=format&fit=crop" className="w-full h-full object-cover" alt="Culver City office" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6">
                <span className="text-white text-2xl font-semibold">400 Corporate Point Suite 300</span>
                <p className="text-white/80 text-lg">Culver City, CA 90230</p>
              </div>
            </div>
            
            <div className="bg-white-card hover-card h-[240px] md:h-270 flex flex-col justify-center p-8">
              <h3 className="text-2xl font-semibold text-gray-800">📞 424 345 2274</h3>
              <p className="text-gray-600 text-lg mt-2">customercare@a1hrinc.com</p>
              <p className="text-gray-500 text-base mt-3">www.a1hrinc.com</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 md:col-start-2 md:row-start-2">
              <div className="bg-white-card p-5 flex flex-col items-center justify-center hover-card">
                <span className="text-3xl mb-1">📧</span>
                <span className="font-medium text-gray-700 text-sm text-center">customercare<br />@a1hrinc.com</span>
              </div>
              <div className="bg-white-card p-5 flex flex-col items-center justify-center hover-card">
                <span className="text-3xl mb-1">🌐</span>
                <span className="font-medium text-gray-700 text-sm text-center">www.a1hrinc.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button className="pill-outline border border-gray-300 text-gray-800 bg-transparent text-sm font-medium px-8 py-4 rounded-full transition-all">
            View all projects →
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white-card p-8">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">CONTACT US</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Name" className="w-full border border-gray-200 rounded-lg p-3 text-sm" />
              <input type="email" placeholder="Email" className="w-full border border-gray-200 rounded-lg p-3 text-sm" />
              <input type="text" placeholder="Address" className="w-full border border-gray-200 rounded-lg p-3 text-sm" />
              <input type="tel" placeholder="Phone" className="w-full border border-gray-200 rounded-lg p-3 text-sm" />
              <input type="text" placeholder="Subject" className="w-full border border-gray-200 rounded-lg p-3 text-sm" />
              <button className="bg-black text-white px-6 py-3 rounded-lg text-sm w-full">Submit</button>
              <p className="text-gray-400 text-xs mt-2">Thanks for submitting!</p>
            </div>
          </div>
          <div className="bg-white-card p-8">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Subscribe Form</h3>
            <div className="flex gap-2">
              <input type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-lg p-3 text-sm flex-1" />
              <button className="bg-black text-white px-6 py-3 rounded-lg text-sm">Submit</button>
            </div>
            <div className="mt-8 bg-gray-50 p-6 rounded-2xl">
              <p className="font-medium text-gray-700">400 Corporate Point Suite 300<br />Culver City, CA 90230</p>
              <p className="text-gray-500 mt-2">424 345 2274</p>
              <p className="text-blue-600 text-sm mt-1">a1hr.david@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between items-center gap-4 bg-[#e9eff8] border border-[#bfd3f0] rounded-full py-4 px-6 md:px-8">
          <span className="text-gray-800 font-medium">
            ABOUT US — We see the future with every home to create sustainable clean energy reducing our carbon footprint, and leaving a healthy legacy for our children.
          </span>
          <span className="text-sm bg-white px-4 py-2 rounded-full whitespace-nowrap">
            For each of our services we have experienced professionals
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400 mt-10 border-t border-gray-200 pt-6">
          <span className="bg-gray-100 rounded-lg px-3 py-1 flex items-center gap-2">
            <span>🏠</span> A1 Home Remodeling Inc. – Culver City / LA
          </span>
          <span>— mission text in hero</span>
        </div>
      </div>
    </div>
  );
}
