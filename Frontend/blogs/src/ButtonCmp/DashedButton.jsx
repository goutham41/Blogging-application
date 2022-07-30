import React from 'react'

import styled from 'styled-components';

 const DashedButton = styled.button`
  border:1px dashed ${props => props.borderprimary ? `${props.borderprimary}` : "gainsboro"  };
  padding:5px 10px;

  padding-left:30px;
  padding-right:30px;
  height:35px;
  width:auto;
  background-color:${props => props.primary ? `${props.primary}` : "#fff"  };;
  color:darkslategray;
  font-weight:600;
  border-radius:3px;
  cursor:pointer;

 `
 
export default DashedButton
