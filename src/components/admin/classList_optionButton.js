import styled from 'styled-components';

// data
import theme from '../../json/theme.json';

export const OptionButton = styled.button`
  margin-right: 1em;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => (props.inView ? theme.colors.gray6 : theme.colors.gray2)};
`;
