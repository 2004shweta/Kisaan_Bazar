import React, { useState, useEffect } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      // IMPORTANT: Replace 'YOUR_NEWS_API_KEY' with your actual NewsAPI key.
      // You can get a free API key from https://newsapi.org/
      const apiKey = '49781dc69db444f5b83ecabc29279456';
      const query = 'farmer market OR agriculture OR crops';
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

      // A mock response for development without a real API key.
      // Comment this out and uncomment the fetch block when you have your API key.
      const mockData = {
        articles: [
          {
            title: "Local Farmer's Market Sees Record Turnout",
            description: "The downtown farmer's market was bustling with activity this weekend, with vendors reporting record sales and a vibrant community atmosphere.",
            url: "#",
            urlToImage: "https://via.placeholder.com/400x250.png?text=Market+Image",
            source: { name: "Community Times" }
          },
          {
            title: "New Organic Farming Techniques Boost Crop Yields",
            description: "Local farms are adopting innovative organic methods, leading to healthier produce and higher yields without the use of chemical pesticides.",
            url: "#",
            urlToImage: "https://via.placeholder.com/400x250.png?text=Farm+Image",
            source: { name: "Green Living Monthly" }
          },
          {
            title: "The Rise of Urban Farming: A Green Revolution in the City",
            description: "Rooftop gardens and vertical farms are transforming urban landscapes, providing fresh, local produce to city dwellers.",
            url: "#",
            urlToImage: "https://via.placeholder.com/400x250.png?text=Urban+Farm",
            source: { name: "Metro News" }
          },
        ]
      };
      
      if (apiKey === 'YOUR_NEWS_API_KEY') {
        console.warn("Using mock data for news. Please replace 'YOUR_NEWS_API_KEY' in client/src/component/News.jsx to fetch real news.");
        setArticles(mockData.articles);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch news');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Latest Market News</h2>
        
        {loading && <div className="text-center">Loading news...</div>}
        {error && <div className="text-center text-red-500">Error: {error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img className="w-full h-56 object-cover" src={article.urlToImage || 'https://via.placeholder.com/400x250.png?text=News'} alt={article.title} />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{article.title}</h3>
                  <p className="text-gray-700 text-base mb-4">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                      Read More
                    </a>
                    <span className="text-sm text-gray-500">{article.source.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News; 