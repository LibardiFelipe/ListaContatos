import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Colors = {
    primary: '#ededed',
    secundary: '#b5b5b5',
    strongFont: '#2b2b2b',
    normalFont: '#3d3d3d'
}

export const Container = styled.View`
    flex: 1;
    width: 100%;
    padding-top: 50px;
    align-items: center;
    background-color: ${Colors.primary};
`;


const LoadingContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.primary};
`;

const LoadingText = styled.Text`
    font-size: 16px;
    color: ${Colors.normalFont};
    margin-top: 10px;
    text-align: center;
`;


interface LoadingProps {
    message: string
}
interface ProfileInfo {
    name: string,
    last: string,
    picUrl: string
}
interface InputBox {
    onChangeText: (text: string) => void; 
}

export const Loading = ({message}: LoadingProps) => {
    return (
        <LoadingContainer>
            <ActivityIndicator
                size="large"
                color={Colors.normalFont}
            />
            <LoadingText>{message}</LoadingText>
        </LoadingContainer>
    );
}

const EntryContainer = styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    padding: 10px 15px;
    align-self: center;
    border-radius: 10px;
    margin-bottom: 5px;
    background-color: ${Colors.secundary};
`;

const ProfPic = styled.Image`
    height: 40px;
    width: 40px;
    border-width: 1px;
    border-color: ${Colors.primary};
    border-radius: 20px;
`;

const ProfName = styled.Text`
    color: ${Colors.normalFont};
    font-size: 18px;
    margin: 0 15px;
`;

export const PersonEntry = ({name, last, picUrl}: ProfileInfo) => {
    // Monta o nome completo com espaçamento caso a pessoa
    // tenha um sobrenome.
    const fullName = name + (last ? ' '+last : '');

    return (
        <EntryContainer>
            <ProfPic source={{uri: picUrl}} />
            <ProfName numberOfLines={1}>{fullName}</ProfName>
        </EntryContainer>
    );
}

const SearchContainer = styled.View`
    height: 45px;
    width: 90%;
    align-self: center;
    border-radius: 10px;
    border-width: 1px;
    justify-content: center;
`;
const SearchInput = styled.TextInput`
    height: 90%;
    margin: 0 15px;
    color: #2b2b2b;
    font-size: 18px;
`;

export const SearchBar: React.FC<InputBox> = ({onChangeText}) => {
    return (
        <SearchContainer>
            <SearchInput onChangeText={onChangeText} placeholder='Procurar...' />
        </SearchContainer>
    );
}