import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Colors = {
    loadingIco: '#6e6e6e',
    loadingText: '#6e6e6e',
    background: '#eee',
    details: '#e33d6f',
    searchText: '#2b2b2b',
    searchPlaceholderText: '#6e6e6e',
    profileName: '#2b2b2b'
}

export const Container = styled.View`
    flex: 1;
    width: 100%;
    padding-top: 60px;
    align-items: center;
    background-color: ${Colors.background};
`;


const LoadingContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const LoadingText = styled.Text`
    font-size: 16px;
    margin-top: 10px;
    text-align: center;
    color: ${Colors.loadingText};
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
    onChangeText: (text: string) => void,
    onBlur: () => void,
    onFocus: () => void,
    highlight: boolean
}

export const Loading = ({message}: LoadingProps) => {
    return (
        <LoadingContainer>
            <ActivityIndicator
                size="large"
                color={Colors.loadingIco}
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
    margin-bottom: 10px;
`;

const ProfPic = styled.Image`
    height: 46px;
    width: 46px;
    border-color: ${Colors.details};
    border-width: 2px;
    border-radius: 23px;
`;

const ProfName = styled.Text`
    font-size: 18px;
    margin: 0 15px;
    flex: 1;
    color: ${Colors.profileName};
`;

const CallButton = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
`;

const CallIco = styled.Image`
    width: 100%;
    height: 100%;
`;

export const PersonEntry = ({name, last, picUrl}: ProfileInfo) => {
    // Monta o nome completo com espaçamento caso a pessoa
    // tenha um sobrenome.
    const fullName = name + (last ? ' '+last : '');

    return (
        <EntryContainer>
            <ProfPic source={{uri: picUrl}} />
            <ProfName numberOfLines={1}>{fullName}</ProfName>
            <CallButton>
                <CallIco
                style={{
                    tintColor: (Colors.details)
                }}
                    source={require('../assets/call.png')}
                />
            </CallButton>
        </EntryContainer>
    );
}

interface SearchCont {
    highlight: boolean
}
const SearchContainer = styled.View<SearchCont>`
    height: 45px;
    width: 90%;
    align-self: center;
    border-color: ${Colors.details};
    border-bottom-width: ${props => props.highlight ? '2px' : '0px'};
    justify-content: center;
`;
const SearchInput = styled.TextInput`
    height: 90%;
    margin: 0 15px;
    font-size: 18px;
    color: ${Colors.searchText};
`;

export const SearchBar: React.FC<InputBox> = ({onChangeText, onBlur, onFocus, highlight}) => {
    return (
        <SearchContainer highlight={highlight}>
            <SearchInput
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChangeText}
                placeholder='Procurar...'
                placeholderTextColor={Colors.searchPlaceholderText}
            />
        </SearchContainer>
    );
}