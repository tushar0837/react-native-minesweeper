import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Button,
  Picker,
} from 'react-native';

const styles = {  
  view: {flex: 1, alignItems: 'center', justifyContent: 'center'}
};


export default class index extends React.Component {
  state = {
      difficulty: "Medium",
      boardSize: "Small",
      diff: 0.1,
      x: 4,
      y: 4
    };
    updateBoardsize = (boardSize) => {
      if (boardSize=="Small") {
        this.setState({x: 4, y: 4, boardSize: "Small"})
      }
      else if (boardSize=="Mid"){
        this.setState({x:8, y: 8, boardSize: "Mid"})
      }
      else if (boardSize=="Large"){
        this.setState({x:14, y: 10, boardSize: "Large"})
      }
    };
    updateDifficulty = (diffValue) => {
      if (diffValue=="Easy") {
        this.setState({diff: 0.1, difficulty: "Easy"})
      }
      else if (diffValue=="Medium"){
        this.setState({diff: 0.2, difficulty: "Medium"})
      }
      else if (diffValue=="Hard"){
        this.setState({diff: 0.3, difficulty: "Hard"})
      }
    };

    render()  {
      var navigator = this.props.navigator;
       
      return(
      <View style={styles.view}>  
        <Picker
          style={{width: 200}}
          selectedValue={this.state.difficulty}
          onValueChange={(diffValue) => this.updateDifficulty(diffValue)}
          >
          <Picker.Item label="Easy" value="Easy"/>
          <Picker.Item label="Medium" value="Medium"/>
          <Picker.Item label="Hard" value="Hard"/>
        </Picker>
        <Picker
          style={{width: 200}}
          selectedValue={this.state.boardSize}
          onValueChange={(lang) => this.updateBoardsize(lang)}
          >
          <Picker.Item label="Small" value="Small" />
          <Picker.Item label="Mid" value="Mid" />
          <Picker.Item label="Large" value="Large" />
        </Picker>
          <Button
            onPress={() => {
              this.props.setParams(this.state.x, this.state.y, this.state.diff);
              navigator.replace({id: 'Gameboard',});
            }}
            title='New Game'
            color="#841584"
            accessibilityLabel=""
          />
          </View>
    );
  }
}
