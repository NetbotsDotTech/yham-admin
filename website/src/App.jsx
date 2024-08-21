import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Artifacts from "./components/Artifacts";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Items from "./components/Items";
import MainMenu from "./components/MainMenu";
import TopMenu from "./components/TopMenu";
import HomePage from "./Pages/Home";
import AboutUs from "./components/AboutUs";
import ItemDetails from "./components/ItemDetails";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <Router>
      <>
        <TopMenu />
        <MainMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artifacts" element={<Artifacts />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items-details/:id" element={<ItemDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
