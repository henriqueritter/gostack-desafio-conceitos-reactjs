import React, { useState, useEffect } from 'react';
import api from './services/api';
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data); //insert repositories in repositories array
    })
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'novo Repo',
      url: 'http://github.com/henriqueritter/novo-repo',
      techs: ['Node.js', 'ReactJS', 'React Native']
    });
    const repo = response.data;
    setRepositories([...repositories, repo]);
  }
  
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    //remove the deleted repositorie from repositories array
    const repoAfterDelete = repositories.filter(repo=>repo.id !== id)
    //update repositories array without the deleted repo
    setRepositories(repoAfterDelete);
  }

  return (
    <div>
      
      <ul data-testid="repository-list">
      {repositories.map(repo =>{
        return <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
      })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
