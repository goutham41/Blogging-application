import React from 'react'
 import styled from 'styled-components'

 const PrimaryButton = styled.button`
  border:2px solid ${props => props.borderprimary ? `${props.borderprimary}` : "#2490fe"  };;
  padding:5px 10px;
  padding-left:30px;
  padding-right:30px;
  height:35px;
  width:auto;
  background-color:${props => props.primary ? `${props.primary}` : "#2490fe"  };
  color:#fff;
  font-weight:600;
  border-radius:3px;
  cursor:pointer; 
 `;
export default PrimaryButton;
