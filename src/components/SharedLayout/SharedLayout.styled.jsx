import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(NavLink)`
  color: black;
  &.active {
    color: orange;
  }
`;

export const Nav = styled.nav`
  padding: 20px;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid black;
`