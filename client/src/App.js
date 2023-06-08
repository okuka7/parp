import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Music from "./pages/Music/Music";
import Dance from "./pages/Dance/Dance";
import Act from "./pages/Act/Act";
import Art from "./pages/Art/Art"
import Etc from "./pages/Etc/etc";
import PartyPages from './pages/partyPages/partyPages';
import Header from './components/Header';
import Modal from './components/modal';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Ticketpay from './pages/ticketing/ticketpay';

function App() {
  return (
    <div className="container">
	  <div className="wrapper">
	  	<BrowserRouter>
	  	<Header/>
	  	<Modal/>
	  		<ScrollToTop/>
	  		<Routes>
	  			<Route path="/" element={<Home/>}/>
	  			<Route path="Music" element={<Music/>}/>
	  			<Route path="Dance" element={<Dance/>}/>
	  			<Route path="Act" element={<Act/>}/>
	  			<Route path="art" element={<Art/>}/>
	  			<Route path="Etc" element={<Etc/>}/>
	  			<Route path="PartyPages" element={<PartyPages/>}/>
	  			<Route path="Ticketpay" element={<Ticketpay/>}/>
	  		</Routes>
	  	</BrowserRouter>
	  </div>
		<Footer/>
	</div>
  );
}
export default App;
