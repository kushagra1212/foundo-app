import {
        StyleSheet,
        Text,
        View,
        TextInput,
        TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign, Entypo, Feather, FontAwesome } from '../../constants/icons';
import { COLORS, FONTS } from '../../constants/theme';

type Props = {
        isFilterOptionSelected: boolean;
        onModalOpen: () => void;
}
const AdditionalFilterOptionComponent: React.FC<Props> = ({
        isFilterOptionSelected, onModalOpen
}) => {

        return (
                <TouchableOpacity
                        style={[
                                styles.base_option
                        ]}
                        onPress={onModalOpen}
                >

                        {isFilterOptionSelected ? <FontAwesome
                                style={{ fontWeight: '100' }}
                                name="filter"
                                size={40}
                        /> : <AntDesign style={{ fontWeight: '100' }}
                                name="filter"
                                size={40} />}


                </TouchableOpacity>
        );
};

const styles = StyleSheet.create({
        base_option: {
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                margin: 10, elevation: 5,
                backgroundColor: COLORS.white,
                width: 80
        },
        selected_option_text: {
                color: COLORS.white,
        },
        not_selected_option_text: {
                color: COLORS.blackSecondary,
        },
});
export default AdditionalFilterOptionComponent;
