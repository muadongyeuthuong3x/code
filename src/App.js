import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router , Route , Switch   } from 'react-router-dom'
import Creatintroduce from './curdintroduce_me/Createintroduce'
import Listintroduce from './curdintroduce_me/Listintroduce'
import   Editintroduce   from './curdintroduce_me/Editintroduce'
import IntroducecontextProvider from './Hook/Context/State';
function App() {
  return (
    <IntroducecontextProvider> 
    <Router>
    <Switch>
      <Route path="/creatintroduce"  exact component={Creatintroduce} />
      <Route path="/listintroduce"  exact component={Listintroduce} />
      <Route path="/editintroduce/:id"  exact component={Editintroduce} />
    </Switch>
  </Router>
  </IntroducecontextProvider>
  );
}

export default App;
