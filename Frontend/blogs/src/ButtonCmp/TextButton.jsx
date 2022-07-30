import React from 'react'

import styled from 'styled-components';

 const TextButton = styled.button`
  outline:none;
  border : 1.5px solid ${props => props.borderprimary ? `${props.borderprimary}` : "#fff"  };
  padding:5px 10px;
    padding-left:30px;
  padding-right:30px;
  height:35px;
  width:auto;
  background-color:${props => props.primary ? `${props.primary}` : "#fff"  };
  color:darkslategray;
  font-weight:600;
  border-radius:3px;
  cursor:pointer;

 `

export default TextButton