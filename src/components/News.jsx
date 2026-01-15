import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function NewsHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://news-server.ubautomation.com/api/v1/home")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center font-serif">Loading news...</div>;
  if (!data) return <div className="p-10 text-center text-red-500">Failed to load news</div>;

  return (
    <>
     <Navbar />
    <div className="max-w-7xl mx-auto px-4 py-2 bg-white text-[#333] font-serif">
      {/* --- Navigation Bar --- */}
    

      {/* --- Top News Section (Image Design Followed) --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Top News 1 (Main Big Card) */}
        {data.top_news?.[0] && (
          <div className="md:col-span-5 border-r border-gray-200 pr-6">
            <img src={data.top_news[0].image} alt="Main" className="w-full h-auto mb-4" />
            <span className="text-red-700 font-sans text-xs font-bold uppercase tracking-widest">China</span>
            <h1 className="text-4xl font-bold leading-tight mt-2 hover:underline cursor-pointer">
              {data.top_news[0].title}
            </h1>
          </div>
        )}

        {/* Top News 2 & 3 (Middle Column) */}
        <div className="md:col-span-4 border-r border-gray-200 pr-6 space-y-8">
          {data.top_news?.slice(1, 3).map((item, i) => (
            <div key={i} className={i === 1 ? "pt-6 border-t border-gray-100" : ""}>
              {i === 0 && <img src={item.image} alt="News" className="w-full h-auto mb-3" />}
              <span className="text-red-700 font-sans text-xs font-bold uppercase">
                {i === 0 ? "Business" : "Asia"}
              </span>
              <h2 className={`font-bold mt-1 hover:underline cursor-pointer leading-snug ${i === 0 ? "text-2xl text-blue-900" : "text-2xl"}`}>
                {item.title}
              </h2>
              <p className="font-sans text-sm text-gray-600 mt-2 line-clamp-2">
                {item.description || "Looking for the latest updates? Read more about this story here."}
              </p>
            </div>
          ))}
        </div>

        {/* Top News 4 (Right Column with Chart Mockup) */}
        <div className="md:col-span-3">
          <div className="mb-4">
             <h3 className="font-sans text-[10px] font-bold uppercase mb-2">Pension reform index</h3>
             {/* Simple CSS Chart to match image */}
             <div className="space-y-1 mb-4">
                {[100, 90, 85, 40, 75].map((w, i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-2 bg-red-600" style={{ width: `${w}%` }}></div>
                  </div>
                ))}
             </div>
          </div>
          {data.top_news?.[3] && (
            <>
              <h2 className="text-xl font-bold leading-tight hover:underline cursor-pointer">
                {data.top_news[3].title}
              </h2>
              <span className="text-xs text-gray-400 font-sans mt-2 block">2 min read</span>
            </>
          )}
        </div>
      </div>

      <hr className="border-gray-300 mb-8" />

      {/* --- Latest News 4 (Horizontal Row) --- */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {data.latest_news?.slice(0, 4).map((item, index) => (
            <div key={index} className="group">
              <img src={item.image} className="w-full h-44 object-cover mb-3" alt="" />
              <h3 className="font-bold text-lg leading-snug group-hover:underline cursor-pointer">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 font-sans line-clamp-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Trending News 5 (Video/Vertical Section) --- */}
      <section className="bg-white pt-6 border-t-4 border-black">
        <h2 className="text-2xl font-bold italic mb-6">ভিডিও</h2>
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
          {data.trending_news?.map((item, index) => (
            <div key={index} className="min-w-[240px] relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
              <img 
                src={item.image} 
                className="w-full h-[350px] object-cover" 
                alt={item.title}
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                <span className="text-[10px] uppercase font-bold text-red-500">The Insider</span>
                <h4 className="text-md font-bold leading-tight mt-1 line-clamp-3">
                  {item.title}
                </h4>
                <div className="mt-3 flex items-center text-[10px] opacity-80">
                   <span className="border border-white rounded-full p-1 mr-2">▶</span> 2:45
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}