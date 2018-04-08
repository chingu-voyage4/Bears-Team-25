import styled from 'styled-components';
import { TableCell, TableRow as TableRowMUI } from 'material-ui/Table';

export const ButtonWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const LinkCell = styled(TableCell)`
  &:hover {
    font-weight: 500;
    text-decoration: underline;
  }
`;

export const TableRow = styled(TableRowMUI)`
  &:hover {
    background-color: #f9f9f9;
  }
  cursor: pointer;
`;

export const Wrapper = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 2rem 0;
  max-width: 60rem;
`;
Wrapper.displayName = 'Wrapper';
