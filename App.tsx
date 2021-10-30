import React,
  {useState, useEffect}
from 'react';
import {FlatList} from 'react-native';

// Contém todos os componentes usados
import * as GS from './src/globalStyles';

// yarn add axios
import axios from 'axios';

interface Users {
  name: {
    first: string,
    last: string
  },
  picture: {
    medium: string
  }
}

const App = () => {
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [filteredData, setFilteredData] = useState<Users[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>("Carregando dados da API");

  useEffect(() => {
    const requestData = async () => {
      const url = 'https://randomuser.me/api/?results=20';
      const res = await axios.get(url);

      if (res.data) {
        setUsersData(res.data.results);
        setFilteredData(usersData);
        setIsLoading(false);
      } else {
        setLoadingMessage("Erro ao carregar dados!");
      }
    };

    requestData();
  }, []);

  const filterItem = (text: string) => {
    if (text) {
      const newData = usersData.filter((item) => {
        let fullName = `${item.name.first} ${item.name.last}`;
        return fullName.toLowerCase().search(text.toLowerCase()) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(usersData);
    }
  }

  // Exibe a tela de loading até os dados da API,
  // serem obtidos (ou não :/).
  if (isLoading)
    return(<GS.Loading message={loadingMessage} />);

  // Exibe a tela principal com a barra de pesquisa
  // e os resultados obtidos da API
  return (
    <GS.Container>
      <GS.SearchBar onChangeText={(text: string) => filterItem(text)} />
      <FlatList
      style={{
        flex: 1,
        width: '100%',
        marginTop: 10
      }}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <GS.PersonEntry name={item.name.first} last={item.name.last} picUrl={item.picture.medium} />}
      />
    </GS.Container>
  );
}
export default App;