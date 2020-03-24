import React, { Component } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import styles from '../assets/styles';

export default class TasksList extends Component{

    
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: [],
        }
    }

    render(){
        console.log(this.state.data);

        return (
            <View>
                <FlatList 
                    data = {this.state.data}
                    renderItem = {({item}) => this.renderItems(item)}
                    ListHeaderComponent = {this.renderHeader}
                    keyExtractor = {item => item.key}
                ></FlatList>
            </View>
        );
    }


    textInputChanged(text){
        this.setState({ text });
        console.log("text: "+text);
    }

    addTask(){
        let index = 0;
        let listOfItems = this.state.data.map((i) => {return {key: ++index, value: i.value}});
        listOfItems = [...listOfItems, {key: ++index, value: this.state.text}];
        console.log(listOfItems);
        this.setState({ data: listOfItems });
        this.textInputChanged('');
    }

    renderItems(item){
        return (<Text style={ styles.listItem }>{item.value}</Text>);
    }


    renderHeader = () => {
        return  <TextInput 
            placeholder = 'Enter an item'
            autoCorrect = { false }
            onChangeText = { (text) => this.textInputChanged(text) }
            onSubmitEditing = { () => this.addTask() }
            returnKeyType = { 'done' }
            style = { styles.textInput }
            value = { this.state.text } 
        ></TextInput>
    }
}

