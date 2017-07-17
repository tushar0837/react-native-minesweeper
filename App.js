/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import {
  Navigator,
} from 'react-native-deprecated-custom-components'
import Gameboard from './gameboard';
import IndexPage from './index';


// const styles = {
//   view: {flex: 1, alignItems: 'center', justifyContent: 'center'}
// };

export default class App extends React.Component {
  
  render () {
    return (
        <Navigator
            initialRoute={{id: 'IndexPage', name: 'Index'}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.VerticalDownSwipeJump;
      }}/>
    );
   }
   renderScene ( route, navigator ) {
    var routeId = route.id;
    if (routeId === 'IndexPage') {
        return (
            <IndexPage
                navigator={navigator}/>
        );
    }
    if (routeId === 'Gameboard') {
        return (
            <Gameboard
                x={8} y={8} difficulty={0.2} navigator={navigator}/>
        );
    }
  }
}

AppRegistry.registerComponent('App', () => App);
