import React, {useState, useEffect, useCallback} from 'react';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Main () {

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState(() => {
    const save = localStorage.getItem("repos");
    return JSON.parse(save) || [];
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert(null);

      try {
        if (newRepo === ''){
          throw new Error('É necessário informar o nome do repositório.')
        }

        const hasRepo = repositorios.find(repo => repo.name === newRepo);

        if (hasRepo) {
          throw new Error('Repositorio duplicado');
        }

        const response = await api.get(`repos/${newRepo}`);
     
        const data = {
          name: response.data.full_name
        }
    
        setRepositorios([...repositorios, data]);
        setNewRepo('');
      } catch(error) {
        console.error(error);
        setAlert(true);
      } finally {
        setLoading(false);
      }
    }
    
    submit();
  }, [newRepo, repositorios]);


  const handleDelete = useCallback((repo) => {
    console.log("delete");
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios]);

  function handleinputChange(e) {    
    setAlert(null);
    setNewRepo(e.target.value);
  }

  return (
    <Container>
        <h1><FaGithub size={25}/> Meus Repositorios</h1>
        <Form onSubmit={() => {}} error={alert}>
         
          <input 
          type="text" 
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleinputChange}          
          /> 
          
          <SubmitButton onClick={handleSubmit} loading={loading ? 1 : 0} >
            {
              loading ? (
                  <FaSpinner color="#FFF" size={14} />
              ): (
                  <FaPlus color="#FFF" size={14}/>
              )
            }
          </SubmitButton>
        </Form>

        <List>
            {repositorios.map(repo => (
                <li key={repo.name}> 
                  <span>
                    <DeleteButton onClick={() => handleDelete(repo.name)}>
                      <FaTrash size={14}/>
                    </DeleteButton>
                    {repo.name}
                  </span>
                  <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                    <FaBars size={20}/>
                  </Link>
                </li>
              ))}          
        </List>
    </Container>
  );
}