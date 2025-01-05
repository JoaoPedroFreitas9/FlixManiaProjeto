import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import './filme.css';

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: '28fc232cc001c31e8a031f419d0a14ca',
            language: 'pt-BR',
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log('FILME NAO ENCONTRADO');
        });
    }

    loadFilme();

    return () => {
      console.log('COMPONENTE FOI DESMONTADO');
    };
  }, [id]);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }
  function salvarFilme() {
    const minhaLista = localStorage.getItem('@favoritos');
    let filmesSalvos = JSON.parse(minhaLista) || [];
  
    // Verificar se o filme já está salvo
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
  
    if (hasFilme) {
      toast.error('Esse filme já está na sua lista!');
      return;
    }
  
    // Adicionar o novo filme
    filmesSalvos.push(filme);
    localStorage.setItem('@favoritos', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!');
  }
  

  function verTrailer() {
    const trailerUrl = `https://www.youtube.com/results?search_query=${filme.title} trailer`;
    window.open(trailerUrl, '_blank');
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="botoes">
        <button onClick={salvarFilme} className="botao-salvar">Salvar</button>
        <button onClick={verTrailer} className="botao-trailer">Ver Trailer</button>
      </div>
    </div>
  );
}

export default Filme;
