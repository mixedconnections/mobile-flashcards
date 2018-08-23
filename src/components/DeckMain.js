import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class DeckMain extends React.Component {

    render() {
        let {title} = this.props.navigation.state.params;
        const questions = this.props.decks[title] && this.props.decks[title].questions;
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 34}}>{title}</Text>
                    <Text style={{fontSize: 22, marginTop: 12}}>{questions.length} cards
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('AddQuestion', {
                            title,
                            questions
                        });
                    }}
                    style={styles.addCard}>
                    <Text style={styles.addCardTitle}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('QuizMain', {
                            title,
                            questions
                        });
                    }}
                    style={styles.startQuiz}>
                    <Text style={styles.startQuizTitle}>Start Quiz</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    addCard: {
        backgroundColor: '#fff',
        margin: 24,
        padding: 10,
        borderRadius: 7,
        height: 45
    },
    addCardTitle: {
        color: '#000',
        fontSize: 22,
        textAlign: 'center'
    },
    startQuiz: {
        backgroundColor: '#000',
        margin: 24,
        padding: 10,
        height: 45,
        borderRadius: 2
    },
    startQuizTitle: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center'
    }
});

function mapStateToProps(state) {
    return { decks: state };
}

export default connect(mapStateToProps)(DeckMain);
