import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Dance from "./pages/Dance";
import Act from "./pages/Act";
import Art from "./pages/Art"
import Header from './components/Header';
import Modal from './components/modal';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
	  <div className="wrapper">
	  	<BrowserRouter>
	  	<Header/>
	  	<Modal/>
	  		<Routes>
	  			<Route path="/" element={<Home/>}/>
	  			<Route path="Music" element={<Music/>}/>
	  			<Route path="Dance" element={<Dance/>}/>
	  			<Route path="Act" element={<Act/>}/>
	  			<Route path="art" element={<Art/>}/>
	  		</Routes>
	  	</BrowserRouter>
	  </div>
		<Footer/>
	</div>
  );
}
export default App;
