import React, { Component } from 'react';
import { AsyncStorage, FlatList, Text, TextInput, View } from 'react-native';
import Item from './Item';
import styles from '../assets/styles';

export default class TasksList extends Component{

    componentDidMount() {
        this.updateList();
    }
    
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

    async addItem(){
        let index = this.state.data.length != 0 ? this.state.data[this.state.data.length-1].key : 0;
        console.log("key of the last one: "+index); 
        const lastItem = {
            completed: false, 
            key: ++index,
            name: this.state.text,
        }
        let listOfTasks = [...this.state.data, lastItem];
        await AsyncStorage.setItem('listOfItems', JSON.stringify(listOfTasks));
        this.updateList();        
    }

    updateList(){
        AsyncStorage.getItem('listOfItems')
        .then((resp) => {return JSON.parse(resp)})
        .then((parsedResp) => {this.setState({ data: parsedResp || [] }) } );
        console.log("data: "+this.state.data);
        this.textInputChanged('');
    }

    renderItems(item){
        return (
            <Item 
                completed = {item.completed}
                key= {item.key}
                onPress = { () => this.markAsCompleted(item.key) }
                name = {item.name}
            ></Item>
        );
    };


    async markAsCompleted( key ){
        console.log("key: "+key);
        try {
			const itemToUpdate = {
				...this.state.data[key-1],
				completed: !this.state.data[key-1].completed
			};
			const listOfItems = this.state.data.slice();
			listOfItems[key -1] = itemToUpdate;
			await AsyncStorage.setItem('listOfItems', JSON.stringify(listOfItems));
		}
		catch (error) {
			console.log('error updating the list');
		}
		this.updateList();

    }

    renderHeader = () => {
        return  <TextInput 
            placeholder = 'Enter item...'
            autoCorrect = { false }
            onChangeText = { (text) => this.textInputChanged(text) }
            onSubmitEditing = { () => this.addItem() }
            returnKeyType = { 'done' }
            style = { styles.textInput }
            value = { this.state.text } 
        ></TextInput>
    }


}

