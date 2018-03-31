import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'src/view/util/PropTypes';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import Colors from 'src/view/styles/colors';


const SessionHeader = ({session, activityInstance, category}) => {
  debugger

  const {name} = session;
  const Container = styled.View`
    height: 30px;
  `;
  const Row = styled.View`
    flex: 1;
    flexDirection: row
    justifyContent: center
    alignItems: center

    opacity: .70
    backgroundColor: ${category.color}
  `;
  const SessionName = styled.Text`
    fontFamily: Nunito-SemiBold
    fontSize: 18
    color: ${Colors.text.whiteGray}
  `;

  return (
    <Container>
      <Row>
        <SessionName>
          {name}
        </SessionName>
      </Row>
    </Container>
  );
}

SessionHeader.propTypes = {
  session: PropTypes.object.isRequired,
  activityInstance: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
}


export default SessionHeader;
