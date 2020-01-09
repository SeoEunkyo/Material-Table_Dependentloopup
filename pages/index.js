import React from 'react'
import {Container, Paper} from '@material-ui/core'
import Title from '../components/GoogleHome/Title'
import SearchBar from '../components/GoogleHome/SearchBar'
import DataTable from '../components/DataTable'


const Home = () => (
  <Container>
    <Title />
    <SearchBar />
    <Paper  style={{marginTop : '5%'}}>
      <DataTable/>
    </Paper>
  </Container>
)

export default Home
