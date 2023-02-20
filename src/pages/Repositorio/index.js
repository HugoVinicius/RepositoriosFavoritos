import React, {useEffect, useState} from 'react';
import {  FaArrowLeft } from 'react-icons/fa'
import api from '../../services/api';
import{useParams} from 'react-router-dom';
import { Container, Loading, Owner, BackButton, 
         IssuesList, Pagination, FilterList, StatusIssues } from './style';

export default function Repositorio() {

  const {repositorio} = useParams();
  const [page, setPage] = useState(1);
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([
    {state: 'all', label: 'Todas'},
    {state: 'open', label: 'Abertas'},
    {state: 'closed', label: 'Fechadas'}
  ]);
 const [filterIndex, setFilterIndex] = useState(1);

  useEffect(() => {
    async function load() {
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params:{
            state : filters[filterIndex].state,
            page,
            per_page: 5
          }
        })
      ]);

      setRepo(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);

      console.log('Repo', repositorioData.data);
      console.log('Issues', issuesData.data);
    }

    load();
  }, [repositorio, page, filters, filterIndex]);

  if (loading) {
    return(
      <Loading>
        <h1>Carregando..</h1>
      </Loading> 
    )
  }

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }


  function handleFilter(index) {
    setFilterIndex(index);
    setPage(1);
  }
 
  return (    
    <Container>

      <BackButton to="/">
        <FaArrowLeft color="#000" size={30}/>
      </BackButton>
      
      <Owner>
        <img src={repo.owner.avatar_url} alt={repo.owner.login}/>  
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>

      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
           <button 
           type="button" 
           key={filter.label} 
           onClick={() => handleFilter(index)}>
            {filter.label}
           </button>
        ))}
      </FilterList>
        
      <IssuesList>

        {issues.map(e => (
          <li key={String(e.id)}>  
            <img src={e.user.avatar_url} alt={e.user.login} />
                                    
            <div>
              <strong>        
                <div>
                  <strong><a href={e.html_url} target="_blank" rel="noreferrer">{e.title}</a></strong>
                </div>
                
                {e.labels.map(l => (
                  <span key={String(l.id)}>{l.name}</span>
                ))}
              </strong>
              <footer>
                <p><strong>Autor: </strong>{e.user.login}</p>

                <span className={e.state}>
                    {e.state}
                </span>   
              </footer>          
            </div>
          </li>
        ))}
      </IssuesList>

      <Pagination>
        <button 
        type="button" 
        onClick={() => handlePage('back')}
        disabled={page < 2}
        >
          Voltar
        </button>
        <button type="button" onClick={() => handlePage('next')}>
          Proxima
        </button>
      </Pagination>
    </Container>
  );
}