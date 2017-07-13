/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
// import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ListView,
  ViewPagerAndroid,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { includes, each, flatten, slice, indexOf } from 'lodash';


const flex = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

const styles = {  
  view: flex,
  buttonView: {
    height: 35, width: 35, borderStyle: 'solid',
    borderWidth: 1, borderColor: 'white'
  },
  button: {color: 'white', backgroundColor: 'grey', textAlign: 'center', fontWeight: 'bold', paddingVertical: 7}
};
const styles1 = {  
  view: {alignItems: 'center', justifyContent: 'center', paddingVertical: 20}
};
const styles2 = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
  }
});


export default class Gameboard extends Component {

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    difficulty: PropTypes.number
  };

  static defaultProps = {
    x: 9,
    y: 7,
    difficulty: 0.3
  };

  colors = {
    0: '#EEEEEE',
    1: '#7FFF00',
    2: 'blue',
    bomb: 'black',
    flag: 'red',
    default: 'red'
  };

  bomb = "💣";
  flag = "🚩";

  constructor(props) {
    super(props);
    this.state = {
    	board: [],
      revealedButtons: [],
      flaggedButtons: []
    }    
  }

  getAllBombs = (gameboard, allbombs) => {
    let board = flatten(gameboard || this.state.board);
    let bombs = allbombs || [];
    let firstIndex = indexOf(board, this.bomb);
    if(firstIndex >= 0) {
      const remainingBoard = slice(board, firstIndex+1, board.length);
      bombs = [firstIndex, ...bombs, ...this.getAllBombs(remainingBoard, allbombs)];
      firstIndex = indexOf(remainingBoard, this.bomb);
    }
    return bombs;
  };

  getCoordinatesFromIndex = (index) => {
    const y = (index % this.props.x);
    const x = Math.floor(index / this.props.x);
    return [x,y];
  };

  revealAllBombs = () => {
    const bombs = this.getAllBombs(this.state.board, []);
    let indexFromBase = 0;
    each(bombs, (bomb, i) => {
      indexFromBase += i ? bomb + 1 : bomb;
      this.revealArray(...this.getCoordinatesFromIndex(indexFromBase), true);
    });
  };

  revealArray = (i,j, stopRecursion) => {
    const { revealedButtons }= this.state;
    revealedButtons.push(i*10 + j);
    this.setState({ revealedButtons });
    if (!stopRecursion) {
      if (this.state.board[i][j]==this.bomb){
        this.revealAllBombs();
      }
      
      if (this.state.board[i][j] == 0){
        if (i < this.props.x-1 && !includes(this.state.revealedButtons, (i+1)*10+j)) {
          this.revealArray(i+1, j);
        }
                
        if (j < this.props.y-1 && !includes(this.state.revealedButtons, i*10+j+1)) {
          this.revealArray(i, j+1);
        }
        
        if (i > 0 && !includes(this.state.revealedButtons, (i-1)*10+j)) {
          this.revealArray(i-1, j);
        }
        
        if (j > 0 && !includes(this.state.revealedButtons, i*10+j-1)) {
          this.revealArray(i, j-1);
        }      
      }
    }

  }

  flags = (i,j) => {
    let { flaggedButtons } = this.state;
    const weightedIndex = i*10 + j;
    const flagIndex = flaggedButtons.indexOf(weightedIndex);
    if (flagIndex >= 0) {
      flaggedButtons.splice(flagIndex, 1);
    } else {
      flaggedButtons.push(weightedIndex);
    }
    this.setState({ flaggedButtons });
  }

  componentWillMount = () => {
    const cols=this.props.x;
    const rows=this.props.y;
    const c = [];
    
    for (let j=0; j<cols; j++){
      const array1 =[]
      for(var i=0; i<rows; i++){
        array1.push(Math.random() < this.props.difficulty ? 0 : 1)
      }
      c.push(array1)

    }

    for (var a=0; a<cols; a++){
        for(var b=0; b<rows; b++){
          if (c[a][b]==0) {
            if (a!=cols-1 && c[a+1][b]!=0) {
              c[a+1][b]=c[a+1][b]+1;
            }

            
            if (b!=rows-1 && c[a][b+1]!=0) {
              c[a][b+1]=c[a][b+1]+1;
            
            }
            if (a!=cols-1 && b!=rows-1 && c[a+1][b+1]!=0) {
              c[a+1][b+1]=c[a+1][b+1]+1;
            
            }
            if (a!=0 && c[a-1][b]!=0) {
              c[a-1][b]=c[a-1][b]+1;
            }
            
            if (b!=0 && c[a][b-1]!=0) {
              c[a][b-1]=c[a][b-1]+1;
            }
            
            if (a!=0 && b!=0 && c[a-1][b-1]!=0) {
              c[a-1][b-1]=c[a-1][b-1]+1;
            }
            
            if (a!=0 && b!=rows-1 && c[a-1][b+1]!=0) {
              c[a-1][b+1]=c[a-1][b+1]+1;
            }
            
            if (b!=0 && a!=cols-1 && c[a+1][b-1]!=0) {
              c[a+1][b-1]=c[a+1][b-1]+1;
            }
          
          }
        }

    }
    for (var a=0; a<cols; a++){
        for(var b=0; b<rows; b++){
          if (c[a][b]==0){
            c[a][b]="💣"
          }
          else {
            c[a][b]=c[a][b]-1       
          }
        }
    }
    this.setState({ board: c });

  };

  checkIfRevealed = (i, j, flag) => {
    const index = i*10 + j;
    return includes(flag ? this.state.flaggedButtons : this.state.revealedButtons, index);
  };

  buttons = () => this.state.board.map((rowButtons, x) => {
  	return(
  		<View style={{flexDirection: 'row'}} key={x}>
  		{rowButtons.map((rowButton, y) => {
        const isFlagged = this.checkIfRevealed(x, y, true);
  			return(
  				<View style={styles.buttonView} key={y}> 
		  			<TouchableHighlight style={flex}
	  			  		onPress={() => this.revealArray(x, y)}
                onLongPress={() => this.flags(x, y)}>
                <Text style={{
                  ...flex,
                  ...styles.button,
                  ...styles.buttonView,
                  color: isFlagged ? this.colors.flag : this.colors[this.state.board[x][y]] || this.colors.default
                }}>
	  			  		  {isFlagged ? this.flag : this.checkIfRevealed(x,y) ? `${this.state.board[x][y]}` : ''}
                </Text>
		  			</TouchableHighlight>
	  			</View>
			)}
  		)}
  		</View>		

  		)
  });
  
  render()  {
    var navigator = this.props.navigator;
	  return(
		<ScrollView contentContainerStyle={styles2.contentContainer}>
      <View style={styles1.view}>
        <Button
                onPress={() => {navigator.replace({id: 'IndexPage',});}}
                title="Back to Main Menu"
                color="#841584"
                accessibilityLabel=""
        />
      </View>
      <View style={styles.view}>
		    {this.buttons()}
      </View>
		</ScrollView>

	  );
  }

}
