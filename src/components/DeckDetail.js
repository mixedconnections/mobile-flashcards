import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class DeckDetail extends React.Component {

    render() {
        const {title, questions} = this.props;

        return <View style={styles.deck}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22}}>{title}</Text>
                <Text style={{fontSize: 18, color: '#666666'}}>
                     {questions && questions.length} cards
                </Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        marginTop: 12,
        height: 120,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
