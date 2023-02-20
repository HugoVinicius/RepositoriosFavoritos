import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const Loading = styled.div`
    color: #FFF
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  padding: 30px;
  margin: 50px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 250px;
    border-radius: 20%;
    margin: 20px 0;
  }

  h1 {
    font-size: 30px;
    color: #0D2636;
  }

  P {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    line-height: 1.4;
    max-width: 500px;
  }

`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;


export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style-type: none;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 12px;
    }

    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }


    div{
      flex: 1;
      margin: 5px;

      footer{
        display: flex;
        align-items: center;        
      }

      span{        
        padding: 5px 10px;
        border-radius: 10px;
        margin-left: 50px;
      }
      
      .open {
        background: #008000;        
        color: #FFF;
      }

      .closed {
        background: #0071db;
        color: #FFF;
      }

      p{
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }

    strong{
      font-size: 15px;
      margin-bottom: 10px;

      a{
        text-decoration: none;
        color: #222;
        transform: 0.3s;

        &: hover {
          color: #0071db;
        }
      }

      span{
        background: #222;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        margin: 30px 10px;
        padding: 5px 7px;
      }
    }
  }
`;

export const Pagination = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  
  button{
    padding: 5px 10px;
    outline: 0;
    background: #222;
    color: #fff;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`

export const FilterList = styled.div`
  margin-top: 30px;

  button{
    outline:0;
    border: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 0 3px;

    &:nth-child(${props => props.active + 1}){
      background: #0071db;
      color: #FFF;
    }
  }
`;