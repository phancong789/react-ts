import ProminentSpecies from "../Compoments/HomePage/ProminentSpecies";
import NewsZone from "../Compoments/HomePage/NewsZone";
import ExtinctionRate from "../Compoments/HomePage/ExtinctionRate";
import NavBar from "../Compoments/Shared/Navbar";
import Footer from "../Compoments/Shared/Footer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <ProminentSpecies />
      <ExtinctionRate />
      <NewsZone />
      <Footer />
    </>
  );
}
