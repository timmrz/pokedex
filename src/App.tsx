import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.scss';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom'
import PokemonInfo from './pages/PokemonInfo/PokemonInfo';







function App() {


  const client = new ApolloClient( {
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache()
  } );



  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pokemon/:id' element={<PokemonInfo />} />
            <Route path='/o-nas' element={<h1>About Us</h1>} />
            <Route path='*' element={<h1>Page not found</h1>} />
          </Routes>

        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
