import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LandingPage from "./Pages/LandingPage";
import Navbar from "./components/NavBar";
function App() {
  return (
    <>
          <Navbar transparent />
      <LandingPage></LandingPage>
    </>
  );
}

export default App;
