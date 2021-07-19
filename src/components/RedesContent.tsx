import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { ButtonIconRedes } from './ButtonIconRedes';
import { listRedes } from '../data/listRedes';

export const RedesContent = () => {
    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text>Nuestras Redes!</Text>
            </View>

            <FlatList
                horizontal={false}
                data={listRedes}
                keyExtractor={({ id }, index) => id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <ButtonIconRedes
                        type={item.props.type}
                        nameOrUrl={item.props.nameOrUrl}
                        color={item.props.color}
                        size={item.props.size}
                        descr={item.props.descr}
                    />
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        marginTop: '10%',
        alignItems: 'center'
    }
})