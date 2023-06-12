import Header from "./layout/Header";
import Footer from "./layout/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import TrackModal from "./components/TrackModal";
import { Route, Routes } from "react-router-dom";
import TracksProvider from "./store/TracksProvider";
import { AudioProvider } from "./store/AudioProvider";
import { AuthProvider } from "./store/AuthProvider";
import { Home, Login } from "./components";

function App() {
  return (
    <AuthProvider>
      <TracksProvider>
        <AudioProvider>
          <Header />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/modal/:trackId" element={<TrackModal />} />
          </Routes>
          <Footer />
        </AudioProvider>
      </TracksProvider>
    </AuthProvider>
  );
}

export default App;
