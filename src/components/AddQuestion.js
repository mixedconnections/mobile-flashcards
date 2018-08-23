import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import {addQuestion} from '../actions';
import {addQuestionForDeck} from '../util/storage';

class AddQuestion extends React.Component {

    state = {
        question: '', answer: ''
    };

    submitQuestion = () => {
        let alert = {};
        const {question, answer} = this.state;
        const {title, questions} = this.props.navigation.state.params;

        if (question === '') {
            Alert.alert('Mandatory', 'Question cannot be blank');
            return;
        }
        if (answer === '') {
            Alert.alert('Mandatory', 'Answer cannot be blank');
            return;
        }

        const params = {title, questions, question, answer};

        this.props.dispatch(addQuestion(params));

        addQuestionForDeck({
            card: {question, answer},
            deckName: title
        });

        Alert.alert('Successful', 'New Question Added Successfully',
            [
                {
                    text: 'OK', onPress: () =>
                    this.props.navigation.goBack()
                }
            ],);
    };

    render() {
        const {question, answer} = this.state;

        return (
            <View style={style.container}>
                <Text>Question is </Text>
                <TextInput
                    defaultValue="Question"
                    value={question}
                    style={style.input}
                    onChangeText={question => this.setState({question})}/>
                <Text>Answer is </Text>
                <TextInput
                    defaultValue="Answer"
                    value={answer}
                    style={style.input}
                    onChangeText={answer => this.setState({answer})}/>

                <TouchableOpacity
                    onPress={this.submitQuestion}
                    style={style.submitButton}>
                    <Text style={style.submitText}>Submit</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 22
    },
    input: {
        width: 310,
        height: 56,
        padding: 10,
        borderWidth: 1,
        margin: 16,
        borderColor: '#7f7f7f'
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    },
    submitButton: {
        backgroundColor: '#000',
        padding: 12,
        height: 44
    },
});

function mapStateToProps(state) {
    return { decks: state };
}

export default connect(mapStateToProps)(AddQuestion);
