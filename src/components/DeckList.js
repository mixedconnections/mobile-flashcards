import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Dimensions, FlatList, Animated} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from '../actions/index';
import {fetchDecks} from '../util/storage';
import DeckDetail from './DeckDetail';

class DeckList extends React.Component {
   constructor(props) {
	super(props);
	this.handlePressIn = this.handlePressIn.bind(this);
	this.handlePressOut = this.handlePressOut.bind(this);
	this.state = {
		animatedValue: new Animated.Value(1)
        }
  }
    componentDidMount() {
        const {dispatch} = this.props;
        fetchDecks().then(decks => dispatch(getDecks(decks)))
            .then(() => this.setState(() => ({ready: true})));
    }

    handlePressIn() {
       Animated.spring(this.state.animatedValue, {
		toValue: .5,
	        speed: 10,
	        bounciness: 100
       }).start();

    }

   handlePressOut() {
       Animated.spring(this.state.animatedValue, {
	             toValue: 1,
	             speed: 10,
	             bounciness: 100
           }).start()
   }


    renderItem = ({item}) => (

        <View style={styles.item}>
            <TouchableWithoutFeedback 
	    	onPressIn={this.handlePressIn} 
	    	onPressOut={this.handlePressOut} 
	    	onPress={() => this.props.navigation.navigate('DeckMain', item) }>
                <Animated.View style={{ transform: [ {scale: this.state.animatedValue},
						     {perspective: 1000} ] }}>
	    		<DeckDetail title={item.title} questions={item.questions}/>
	    	</Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );

    render() {
        return (
            <View style={styles.deck}>
                <FlatList
                    data={Object.values(this.props.decks).sort((a, b) => a.title > b.title)}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { decks: state };
}

const styles = StyleSheet.create({
    deck: {
        height: Dimensions.get('window').height,
        flexDirection: 'row'
    },
});

export default connect(mapStateToProps)(DeckList);
