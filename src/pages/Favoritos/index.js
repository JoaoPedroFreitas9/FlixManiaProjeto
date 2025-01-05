import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    // Carrega os filmes salvos no localStorage
    const minhaLista = localStorage.getItem('@favoritos');
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    const novaLista = filmes.filter((filme) => filme.id !== id);
    setFilmes(novaLista);
    localStorage.setItem('@favoritos', JSON.stringify(novaLista));
    toast.error('Filme Excluido Da Lista!');
  }

  if (filmes.length === 0) {
    return (
      <div className="favoritos">
        <h1>Meus Filmes Favoritos</h1>
        <p>Você não tem nenhum filme salvo nos favoritos.</p>
        <Link to="/" className="voltar-home">Voltar para a Home</Link>
      </div>
    );
  }

  return (
    <div className="favoritos">
      <h1>Meus Filmes Favoritos</h1>
      <ul>
        {filmes.map((filme) => (
          <li key={filme.id}>
            <span>{filme.title}</span>
            <div>
              <Link to={`/filme/${filme.id}`} className="ver-detalhes">Ver Detalhes</Link>
              <button onClick={() => excluirFilme(filme.id)} className="excluir">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;
