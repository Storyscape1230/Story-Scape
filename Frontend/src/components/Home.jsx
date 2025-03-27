import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
import Join from "../Home/Join";

function Home() {
  return (
    <div className="bg-rose-50">
      <Hero />
      <Trending />
      <Devotional />
      <Join />
    </div>
  );
}

export default Home;