import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-[#fefdfb] py-20 px-6 text-[#2b2b2b]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#006b3c] to-[#003d29] bg-clip-text text-transparent mb-4">
            About Tanveer Alam’s Blog
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#4a4a4a]">
            A digital space where ideas, stories, and creativity come together to inspire minds and spark conversations.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-[17px] md:text-lg leading-relaxed text-justify">
          <p>
            <strong className="text-[#006b3c]">Tanveer Alam’s Blog</strong> is a reflection of curiosity, creativity, and connection. 
            It was created with the purpose of sharing thoughts, experiences, and perspectives on topics that matter — 
            from technology and innovation to lifestyle, learning, and self-growth.
          </p>

          <p>
            What started as a personal journal of ideas soon became a growing community of readers who believe in learning, 
            evolving, and embracing new viewpoints. Here, each article is written with honesty, insight, and passion — 
            aiming to leave readers a little more inspired than before.
          </p>

          <p>
            Whether you're a dreamer, a doer, or simply a seeker of inspiration, this blog is your space to pause, 
            reflect, and rediscover meaning in everyday moments. Tanveer believes in using words to create change — 
            one story, one thought, and one reader at a time.
          </p>
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#e0e0e0]">
            <h2 className="text-2xl font-semibold text-[#003d29] mb-4">
              What Makes This Blog Special:
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#444]">
              <li>📝 Thoughtful articles on tech, life & growth</li>
              <li>💡 Real insights from real experiences</li>
              <li>🌱 A space for positive and mindful living</li>
              <li>🎯 Focused on learning, sharing, and evolving</li>
              <li>🌍 Built with a passion for connecting people through ideas</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#fdf6f0] to-[#fff] p-6 rounded-2xl shadow-lg border border-[#f2e9e0] flex items-center">
            <p className="text-lg leading-relaxed text-[#2d2d2d]">
              Every post is crafted with care — from <strong>deep-dive guides</strong> 
              and <strong>personal reflections</strong> to <strong>stories that inspire growth</strong>. 
              It’s not just content, it’s a journey through thoughts that matter.
            </p>
          </div>
        </div>

        {/* Closing Line */}
        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl italic text-[#006b3c] font-medium">
            ✨ “Writing is not just about words — it’s about reaching hearts.” – Tanveer Alam
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
