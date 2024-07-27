import React from "react"
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import params from '../constants/Params'
import Mine from './Mine'
import Flag from './Flag'

export default props => {

    const { mined, opened, nearMines, exploded, flagged } = props

    const styleField = [styles.field]

    // outros estilos
    if(opened) styleField.push(styles.opened)
    
    // se a mina estiver explodida
    if(exploded) styleField.push(styles.exploded)

    // caso esteja marcado com bandeira
    if(flagged) styleField.push(styles.flagged)

    // caso tenha apenas um estilo
    if(!opened && !exploded) styleField.push(styles.regular)

    // quantidade de minas presentes
    let color = null

    // abordagem utilizada no curso
    // if (nearMines > 0) {
    //     if (nearMines == 1) color = '#2a28d7'
    //     if (nearMines == 2) color = '#2b520f'
    //     if (nearMines > 2 && nearMines < 6) color = '#f9060a'
    //     if (nearMines >= 6) color = '#f221a9'
    // }

    const colorMap = {
        1: '#2a28d7',
        2: '#2b520f',
    };
    
    if (nearMines > 0) {
        color = colorMap[nearMines] || (nearMines < 6 ? '#f9060a' : '#f221a9');
    }

    return (
        <TouchableWithoutFeedback
         onPress={props.onOpen}
         onLongPress={props.onSelect}>
            <View style={styleField}>
                {   !mined && opened && nearMines > 0 ? 
                        <Text style={[styles.label, { color: color }]}>
                            {nearMines}
                        </Text> 
                    : false }
                {   mined && opened ? <Mine /> : false    }
                {   flagged && !opened ? <Flag /> : false    }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: '#999',
        borderTopColor: '#ccc',
        borderLeftColor: '#ccc',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red',
    },
})
