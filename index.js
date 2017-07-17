import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Button,
} from 'react-native';

const styles = {	
  view: {flex: 1, alignItems: 'center', justifyContent: 'center'}
};


export default class index extends React.Component {

    
  	render()  {
  		var navigator = this.props.navigator;
  		
	  	return(
			<View style={styles.view}>
	        	<Button
			  		onPress={() => {navigator.replace({id: 'Gameboard',});}}
			  		title='New Game'
			  		color="#841584"
			  		accessibilityLabel=""
			  	/>
	      	</View >
	  );
  }
}
