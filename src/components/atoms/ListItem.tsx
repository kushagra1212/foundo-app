import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '../../constants/icons';
import { ITEMCAT_TO_NUM, ITEM_STANDARD_COLORS } from '../../constants/item';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { FilterItemOn } from '../../interfaces';
import MiniItemColorIcon from './MiniItemColorIcon';
import MiniItemTextIcon from './MiniItemTextIcon';
interface PropsType1 extends FilterItemOn {
  text: string;
  arrowText: string;
  viewAllHandler: () => void;
  items: any;
  icon?: JSX.Element;
}

const ListFilterItemViewAllType: React.FC<PropsType1> = ({
  text,
  icon,
  ...rest
}) => {
  return (
    <View
      style={{ backgroundColor: COLORS.white }}
      onTouchStart={rest.viewAllHandler}
    >
      <View style={styles.list_item}>
        <View style={styles.text}>
          {icon}
          <Text style={{ margin: 5, ...FONTS.h4 }}>{text}</Text>
        </View>
        <View style={styles.view_all}>
          <Text style={FONTS.h4}>{rest.arrowText}</Text>
          <Ionicons
            style={{ margin: 10, ...FONTS.h1 }}
            name="chevron-forward"
            size={30}
          />
        </View>
      </View>
      <View style={{ width: '60%' }}>
        {rest?.items !== undefined && rest?.items !== '' && (
          <MiniItemTextIcon
            isSelected={true}
            text={rest?.items}
            updateItemFilterOption={() => {}}
          />
        )}
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: COLORS.lightGrayPrimary,
          elevation: 1,
        }}
      />
    </View>
  );
};
interface PropsType2 extends FilterItemOn {
  text: string;
  options: FilterItemOn;
  handleChangeSlideDownButton: () => void;
  updateItemFilterOption: (options: FilterItemOn) => void;
}
const ListFilterItemSlideDownList: React.FC<PropsType2> = ({
  text,
  options,
  updateItemFilterOption,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const colors = useMemo(() => {
    let colors: Array<[string, string]> = [];
    for (let element of ITEM_STANDARD_COLORS.entries()) {
      colors.push(element);
    }
    return colors;
  }, [ITEM_STANDARD_COLORS]);
  const onClose = () => {
    setOpen(false);
  };
  const onSelect = (options: FilterItemOn) => {
    onClose();
    updateItemFilterOption(options);
  };
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <View style={styles.list_item}>
        <View style={styles.text}>
          <Text style={{ margin: 5, ...FONTS.h4 }}>{text}</Text>
        </View>
        <View style={styles.view_all} onTouchStart={() => setOpen(!open)}>
          <Ionicons
            style={{ margin: 10, ...FONTS.h1 }}
            name={open ? 'chevron-up' : 'chevron-down'}
            size={30}
          />
        </View>
      </View>
      <View style={{ width: '50%' }}>
        {rest?.color !== undefined && rest?.color !== '' && (
          <MiniItemTextIcon
            isSelected={true}
            text={rest?.color}
            updateItemFilterOption={() => {}}
          />
        )}
      </View>
      {open && (
        <FlatList
          data={colors}
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'baseline',
            paddingBottom: 10,
            marginLeft: '10%',
          }}
          numColumns={3}
          renderItem={({ item }) => (
            <MiniItemColorIcon
              isSelected={options?.color === item[0]}
              text={item[0]}
              color={item[1]}
              onSelect={onSelect}
            />
          )}
          keyExtractor={(item) => {
            return item[1].toString();
          }}
        />
      )}

      {options?.color !== undefined && options.color !== '' && (
        <View style={{ width: '60%' }}>
          <MiniItemColorIcon
            isSelected={true}
            text={options.color}
            color={`${ITEM_STANDARD_COLORS.get(options.color)}`}
            onSelect={() => {}}
          />
        </View>
      )}
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: COLORS.lightGrayPrimary,
          elevation: 1,
        }}
      />
    </View>
  );
};
interface PropsType3 extends FilterItemOn {
  text: string;
  options: any;
  desc: string;
  handleChangeSlideDownButton: () => void;
  updateItem: (options: FilterItemOn) => void;
}
const ListFilterItemSlideDownInput: React.FC<PropsType3> = ({
  text,
  options,
  desc,
  updateItem,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [brandName, setBrandName] = useState<string>('');
  const onClose = () => {
    setOpen(false);
  };
  const onSelect = (options: FilterItemOn) => {
    onClose();
    updateItem(options);
  };
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <View style={styles.list_item}>
        <View style={styles.text}>
          <Text style={{ ...FONTS.h4 }}>{text}</Text>
        </View>
        <View style={styles.view_all} onTouchStart={() => setOpen(!open)}>
          <Ionicons
            style={{ margin: 10, ...FONTS.h1 }}
            name={open ? 'chevron-up' : 'chevron-down'}
            size={30}
          />
        </View>
      </View>
      <View style={{ width: '50%' }}>
        {rest?.color !== undefined && rest?.color !== '' && (
          <MiniItemTextIcon
            isSelected={true}
            text={options?.brand}
            updateItemFilterOption={() => {}}
          />
        )}
      </View>
      {open && (
        <KeyboardAvoidingView keyboardVerticalOffset={500} behavior="position">
          <TextInput
            placeholder={desc}
            onChangeText={setBrandName}
            value={brandName}
            placeholderTextColor={COLORS.GraySecondary}
            autoFocus={true}
            onBlur={() => onSelect({ brand: brandName })}
            style={{
              backgroundColor: COLORS.black,
              elevation: 100,
              borderRadius: 10,
              padding: 10,
              fontSize: SIZES.h3,
              margin: 10,
              color: COLORS.white,
            }}
          />
        </KeyboardAvoidingView>
      )}
      <View style={{ width: '60%' }}>
        {options?.brand !== undefined && options?.brand !== '' && (
          <MiniItemTextIcon
            isSelected={true}
            text={options?.brand}
            updateItemFilterOption={() => {}}
          />
        )}
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: COLORS.lightGrayPrimary,
          elevation: 1,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  list_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: 5,
    alignItems: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  view_all: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 5,
  },
});

export {
  ListFilterItemViewAllType,
  ListFilterItemSlideDownList,
  ListFilterItemSlideDownInput,
};
