import React from 'react'
import styled from 'styled-components';

 const LinkButton = styled.button`
  outline:none;
  border : 1.5px solid  ${props => props.borderprimary ? `${props.borderprimary}` : "#fff"  };
  padding:5px 10px;
  padding-left:30px;
  padding-right:30px;
  height:35px;
  width:auto;
  background-color:${props => props.primary ? `${props.primary}` : "#fff"};
  color:steelblue;
  font-weight:600;
  text-decoration:none;
  cursor:pointer;
 `
 
 const Buttonhref = styled.a`
  text-decoration:none;
  outline:none;
  color:${props => props.primaryColor ? `${props.primaryColor}` : "#2490fe"};
 `
 

export  { LinkButton,Buttonhref }