import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MusicPlayer from "./components/MusicPlayer";
import About from "./components/About";
import FAQ from "./components/FAQ";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <Hero />
      <MusicPlayer />
      <About />
      <FAQ />
    </>
  );
}

export default App;