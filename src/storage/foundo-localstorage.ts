
import * as SecureStore from 'expo-secure-store';

export const setItemToLocalStorage = async (jwtToken: string, key: string) => {
        try {
                await SecureStore.setItemAsync(key, jwtToken);
        } catch (err) {
                console.log(err);
        }
}
export const getTokenFromLocalStorage = async (key: string) => {
        let token = null;
        try {
                token = await SecureStore.getItemAsync(key);
        } catch (err) {
                console.log(err);
        }
        return token;
}

export const removeItemFromLocalStroage = async (key: string) => {
        try {
                const res = await SecureStore.deleteItemAsync(key);

        } catch (err) {
                console.log(err);
        }

}