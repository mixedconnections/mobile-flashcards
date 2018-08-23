import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {View} from 'react-native';
import reducer from '../reducers/index.js';
import {setNotification} from '../util/notification';
import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import AddDeck from './AddDeck';
import DeckList from './DeckList';
import DeckMain from './DeckMain';
import AddQuestion from './AddQuestion';
import QuizMain from './QuizMain';

const Tabs = createMaterialTopTabNavigator({
        DeckList: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: 'All Decks'
            },
        },
        AddDeck: {
            screen: AddDeck,
             navigationOptions: {
                tabBarLabel: 'New Deck',
            },
        },
    }
);

const AppNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {title: 'Home'},
    },
    DeckMain: {
        screen: DeckMain,
        navigationOptions: {
            headerTintColor: '#000',
        },
    },
    QuizMain: {
        screen: QuizMain,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: '#000',
        },
    },
    AddQuestion: {
        screen: AddQuestion,
        navigationOptions: {
            title: 'Add Question',
            headerTintColor: '#000',
        },
    },
});

export default class Index extends React.Component {

    componentDidMount() {
        setNotification();
    }

    render() {
        return <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
                <AppNavigator />
            </View>
        </Provider>
    }
}
