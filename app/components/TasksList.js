import React, { Component } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import styles from '../assets/styles';

export default class TasksList extends Component{

    render(){
        console.log(this.props.data);
        this.props.data.forEach(e => {
            console.log(e.title);
        });

        return (
            <FlatList 
                data = {this.props.data}
                renderItem = {({item}) => 
                    <Text style={ styles.listItem }>{item.title}</Text>}
            ></FlatList>
        );
    }
}

