import './App.css';
import { Home } from './Pages/Home';

import { Routes, Route, useLocation } from 'react-router-dom';
import { MainNav } from './Components/MainNav';
import { TextToText } from './Pages/TextToText';
import { TextToAudio } from './Pages/TextToAudio';
import { AudioToText } from './Pages/AudioToText';
import { AudioToAudio } from './Pages/AudioToAudio';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Components/AuthProvider';
import { Nav } from './Components/Nav';
import "./mediaqueries.css"
import { MobieMainNav } from './Components/MobieMainNav';
import { About } from './Pages/About';
import { Service } from './Pages/Service';
import { Contact } from './Pages/Contact';
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <MainNav />
      <MobieMainNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <AuthProvider>
        {location.pathname.startsWith("/user/") && <Nav />}
        <>
          <Routes>
            <Route path='/user/text-to-text' element={<TextToText />} />
            <Route path='/user/text-to-voice' element={<TextToAudio />} />
            <Route path='/user/voice-to-text' element={<AudioToText />} />
            <Route path='/user/audio-to-audio' element={<AudioToAudio />} />
          </Routes>
        </>
      </AuthProvider>
      <Toaster position="top-center" />
    </div >
  );
}

export default App;
