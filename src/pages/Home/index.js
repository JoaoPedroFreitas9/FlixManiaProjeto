import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading,setLoading] = useState([true]);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("movie/now_playing", {
          params: {
            api_key: "28fc232cc001c31e8a031f419d0a14ca",
            language: "pt-BR",
            page: 1,
          }
        });
        setFilmes(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      }
    }

    loadFilmes();
  }, []);


  if(loading){
    return(
      <div className="loading">
        <h2>Carregando Filmes...</h2>
      </div>
    )
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Descubra os Melhores Filmes em um Só Lugar</h1>

      <div className="filmes-list">
        {filmes.map((filme) => (
          <div key={filme.id} className="filme-item">
            {/* Título do filme */}
            <h3 className="filme-title">{filme.title}</h3>
            {/* Poster do filme */}
            <img
              src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
              alt={filme.title}
              className="filme-poster"
            />
            {/* Botão para ver detalhes */}
            <Link to={`/filme/${filme.id}`} className="filme-button">
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
