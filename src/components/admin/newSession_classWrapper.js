import React from 'react';
import styled from 'styled-components';

// components
import DeleteIcon from '../ui/deleteIcon';
import DateSingle from '../ui/dateSingle';

// functions
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const Wrapper = styled.div`
  width: 100%;
  padding: 1.5rem 0.75rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${theme.colors.gray2};
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: normal;
  margin-bottom: 1em;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 2.5rem;
  border-bottom: 1px solid ${theme.colors.gray1};
  letter-spacing: normal;

  .dateSingle_other {
    display: none;
  }
`;

const ItemMain = styled.div`
  flex: 1 0;
`;

const ClassWrapper = (props) => {
  const { courseInfo, classes, removeClass } = props;
  return (
    <Wrapper>
      <Title>{courseInfo.name}</Title>
      <ul>
        {classes.map((classInfo) => {
          return (
            <ListItem key={keyGen()}>
              <ItemMain>
                <DateSingle date={classInfo.date} />
              </ItemMain>
              <button
                onClick={() => {
                  removeClass(classInfo.id);
                }}
              >
                <DeleteIcon />
              </button>
            </ListItem>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default ClassWrapper;
