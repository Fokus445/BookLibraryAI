
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import { BookDetails, Footer, Header, Library, Profile } from './containers';
import { Navbar } from './components';

import './App.css';





const App = () => {


  return (
    <Router>
      <div className="App">
        <Navbar/>
          <Routes>
            <Route path="/" element={
            <>
            <Header/>
            <Library/>
            </>
            } />
            <Route path="/books/:id" element={<BookDetails/>} />
            <Route path="/profiles/me/" element={<Profile/>} />
          </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
