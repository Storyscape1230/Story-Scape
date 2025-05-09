import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
import Join from "../Home/Join";
import LatestBlogs from "../Home/LatestBlogs";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100">
      <Hero />
      <Trending />
      <Devotional />
      <LatestBlogs />
      <Join />
    </div>
  );
}

export default Home;