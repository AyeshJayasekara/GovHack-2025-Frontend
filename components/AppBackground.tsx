import { ImageBackground } from "expo-image";
import React from "react";
import { Platform, StyleSheet, useColorScheme, View } from "react-native";
import { useTheme } from "react-native-paper";

// @ts-ignore
export default function AppBackground({children}) {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const colorScheme = useColorScheme();

    if (colorScheme === 'dark') {
        return (
            <ImageBackground
                source={Platform.OS === 'web' ? require("../assets/images/general/Background-dark-web.png") :
                    require("../assets/images/general/Background-dark-native.png")}
                imageStyle={{opacity: 0.9}}
                style={styles.background}
            >
                <View style={styles.container}>
                    {children}
                </View>
            </ImageBackground>
        );
    } else {
        return (
            <ImageBackground
                source={Platform.OS === 'web' ? require("../assets/images/general/Background-dark-web.png") :
                    require("../assets/images/general/Background-dark-web.png")}
                imageStyle={{opacity: 0.5}}
                style={styles.background}
            >
                <View style={styles.container}>
                    {children}
                </View>
            </ImageBackground>
        );
    }


}

// @ts-ignore
const makeStyles = (theme) => StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});