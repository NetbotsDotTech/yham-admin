import Artifacts from "./components/Artifacts";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Items from "./components/Items";
import MainMenu from "./components/MainMenu";
import Testimonials from "./components/Testimonials";
import TopMenu from "./components/TopMenu";

function App() {
  return (
    <>
      <TopMenu />
      <MainMenu />
      <HeroSection/>
      <Artifacts/>
      <Testimonials/>
      <Items/>
      <Footer/>
    </>
  );
}

export default App;
