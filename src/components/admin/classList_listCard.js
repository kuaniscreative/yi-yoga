import React from 'react';
import styled from 'styled-components';

// components
import NameTag from '../ui/nameTag';

// functions
import keyGen from '../../functions/keyGen';

// data
import theme from '../../json/theme.json';

const CardBase = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 456px;
  padding: 32px 24px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.gray2};
  /* box-shadow: 0 0 20px -14px gray; */
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: normal;
  line-height: 2.5em;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: normal;
  color: ${theme.colors.gray4};
  margin-bottom: 2rem;
`;

const ListWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 80%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  margin-bottom: 2rem;
`;

const ListTitle = styled.h6`
  font-size: 0.75rem;
  color: ${theme.colors.gray3};
  margin: 0.5em 0;
`;

const ListItem = styled.li`
  position: relative;
  padding: 0.75em 0;
  border-bottom: 1px solid ${theme.colors.gray1};
`;

const NoStudentMessage = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.gray3};
`;

const ListCard = (props) => {
  const {
    title,
    subtitle,
    students,
    pendingStudents,
    rescheduleStudents
  } = props;
  return (
    <CardBase>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <ListWrapper>
        {students.length ? (
          <List>
            <ListTitle>學生</ListTitle>
            {students.map((student) => {
              return (
                <ListItem key={keyGen()}>
                  <NameTag name={student.name} nickName={student.nickName} />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <NoStudentMessage>沒有學生</NoStudentMessage>
        )}
        {rescheduleStudents.length ? (
          <List>
            <ListTitle>補課學生</ListTitle>
            {rescheduleStudents.map((student) => {
              return (
                <ListItem key={keyGen()}>
                  <NameTag name={student.name} nickName={student.nickName} />
                </ListItem>
              );
            })}
          </List>
        ) : null}
        {pendingStudents.length ? (
          <List>
            <ListTitle>候補學生</ListTitle>
            {pendingStudents.map((student) => {
              return (
                <ListItem key={keyGen()}>
                  <NameTag name={student.name} nickName={student.nickName} />
                </ListItem>
              );
            })}
          </List>
        ) : null}
      </ListWrapper>
    </CardBase>
  );
};

export default ListCard;
