import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBapi'

class Search extends React.Component {


  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.searchedText= ""
    this.state = {films: [],
      isLoading : false
           // Initialisation de notre donnée searchedText dans le state}
  }
}

  _searchTextInputChanged(text) {
        this.searchedText = text
    }


  _loadFilms() {
    this.setState({isLoading:true})
    if(this.searchedText.length > 0){
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films : [ ...this.state.films, ...data.results ],
          isLoading : false
        })
      })
    }
}
  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [],
        }, () => {
            this._loadFilms()
        })
      }

      _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail" ,{idFilm: idFilm} )
      }

  render() {

      console.log(this.state.isLoading)
    return (
        <View style={styles.main_container}>
            <TextInput style={styles.textinput} placeholder='Titre du film'
              onChangeText={(text) => this._searchTextInputChanged(text)}
              onSubmitEditing={(text) => this._searchFilms()}
            />
        <Button style ={{ marginLeft: 10 }} title='Rechercher' onPress={() => this._searchFilms()}/>

        <FlatList style={{ marginTop:5}}
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          onEndReachThreashold={0.75}
          onEndReached={() => {
            if(this.page < this.totalPages){
              this._loadFilms()
            }
            console.log("on end reached");
          }}
          renderItem={({item}) => <FilmItem film={item}
          displayDetailForFilm={this._displayDetailForFilm} />}
        />

        {this._displayLoading()}
      </View>

    )
}
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    margin: 5

  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    marginBottom: 3
  },
  botona: {
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    borderWidth: 1,
    marginBottom: 3
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
