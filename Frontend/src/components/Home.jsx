import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
// import Creator from "../Home/Creator";
// import Waves from "../Home/Waves";

function Home() {
  return (
    <div > 
      {/* <div className="shadow" style={{ position: "relative", width: "100%", height: "40vh" }}>
        <Waves
        lineColor="black"
        backgroundColor="rgba(255, 255, 255, 0.2)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
      </div> */}
      
      <Hero />
      <Trending />
      <Devotional />
      {/* <Creator />  */}

    </div>
     
  );
}

export default Home;
