/*
 * Sidebar
 *
 * LOGIN CONTAINER
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Switch from 'react-switch';
import styled  from 'styled-components';


import { toggleTheme } from './actions';

import ImgWrapper from './ImgWrapper';
import Span from '../../Components/Span';
import Icon from '../../Components/Icon';
import SidebarLink from '../../Components/Sidebar/SidebarLink';
import { createStructuredSelector } from 'reselect';
import { checkMobile } from '../../utils/mobile';
import { makeSelectAppTheme, makeSelectCurrentUser, makeSelectUserData } from '../App/selectors';

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: ${checkMobile() ? 'row' : 'column'};
  border-bottom: ${props => (checkMobile() ? `1px solid ${props.theme.borders}` : 'none')};
  width: ${checkMobile() ? `100vw` : 'auto'};
  justify-content: flex-start;
  background-color: ${props => (props.theme.bgColor)};
  z-index: 2;
  align-items: center;
  text-align: center;
`;

const Spacer = styled.div`
  margin: 0.75em 1em;
`;


export class Sidebar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      checked: true,
    }
  }

  handleChange = checked => {
    this.setState(st => ({
      checked,
    }));
    this.props.onToggleTheme();
  }

  checkActive = name => {
    const { pathname } = this.props.location;
    return pathname.slice(pathname.indexOf(`/`) + 1) === name
      ? this.props.theme.highlight
      : this.props.theme.fontColor;
  }
  
  render() {
    const iconProps = {
      width: `3em`,
      height: `3em`,
    }

    const { checked } = this.state;
    const { userData } = this.props;
    return (
      <SidebarWrapper>
        <h1>
          
        </h1>
        <Spacer>
          <SidebarLink to="/home">
            <Icon name="home" { ...iconProps } fill={this.checkActive('home')} />
          </SidebarLink>
        </Spacer>
        <Spacer>
          <SidebarLink to="hot">
            <Icon name="hot" { ...iconProps } fill={this.checkActive('55')} />
          </SidebarLink>
        </Spacer>
        <Spacer>
          <ImgWrapper { ...userData } />
        </Spacer>
        <Spacer>
          <label>
            <Switch
              onChange={this.handleChange}
              checked={checked}
              onColor={this.props.theme.highlight}
            />
            <div>
              <Span fontSize=".7em">{checked ? 'night' : 'day'}</Span>
            </div>
          </label>
        </Spacer>
      </SidebarWrapper>  
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  userData: makeSelectUserData(),
  theme: makeSelectAppTheme(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onToggleTheme: () => dispatch(toggleTheme()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const connected = compose(withConnect)(Sidebar);

export default withRouter(connected)