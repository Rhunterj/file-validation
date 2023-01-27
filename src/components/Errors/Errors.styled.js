import styled from 'styled-components';

export const errorContainer = styled.div`
  border-radius: 4px;
  padding: 5px;
  color: black;
  background-color: #ffffff;
  padding: 30px;
  margin: 20px;  
  box-shadow: rgba(250, 250, 250, 0.25) 0px 14px 28px, rgba(250, 250, 250, 0.22) 0px 10px 10px;
  width: 400px;

  h3 {
    margin-bottom: 15px;
  }
  `;

  export const table = styled.table`
    th {
      text-align: left;

      &:first-of-type {
        padding-right: 15px 
      }
    }

    td {
      color: grey;
    }
  `

  export const informationWrapper = styled.div`
    border-bottom: 1px solid rgba(50, 50, 50, 0.1);
    padding-bottom: 30px;
    
    p {
      margin-top: 3px;
      margin-bottom: 3px;
    }
  `

  export const progressbar = styled.div`
    width: 100%;
    background-color: #00695C;
    height: 20px;
  `

  export const innerBar = styled.div`
    width: ${props => props.width}%;
    background-color: #B00020;
    height: 20px;
  `