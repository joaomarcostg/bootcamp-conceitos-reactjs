import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api.js";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("/repositories");
      setRepositories(response.data);
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const title = `Repository ${Date.now()}`;
    const url = "https://www.github.com/joaomarcostg";
    const techs = ["Node", "React", "Angular"];

    const repository = {
      title,
      url,
      techs,
    };

    const response = await api.post("/repositories", repository);
    console.log(response.data)
    
    setRepositories([...repositories, response.data]);
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(
      (repository) => id === repository.id
    );
    
    const repocopy = [...repositories];
    console.log(repocopy)
    repocopy.splice(repositoryIndex, 1)
    console.log(repocopy)
    setRepositories(repocopy);
    console.log(repositories)

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
              <div key={repository.id}>
                <li key={repository.id}>{repository.title}</li>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </div>
            ))
         }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
