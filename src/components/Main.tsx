import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Filter from './Filter';
import Tabs from './Tabs';
import Cards from './Cards';
import Loader from './Loader';
import { Ticket } from '../interfaces';

const StyledMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 754px;
  margin: auto;
`;

const Container = styled.div`
  width: 504px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

type MainState = {
  allTickets: Array<Ticket | never>;
  currentTickets: Array<Ticket | never>;
  numOfTransfers: Array<number | never>;
  sortName: string;
  isLoaded: boolean;
};

class Main extends React.Component<{}, MainState> {
  state: MainState = {
    allTickets: [],
    currentTickets: [],
    numOfTransfers: [0],
    sortName: 'price',
    isLoaded: false,
  };

  searchId!: number;

  timerId!: number;

  async componentDidMount() {
    const res = await axios.get('https://front-test.beta.aviasales.ru/search');
    const { searchId } = res.data;
    this.searchId = searchId;
    this.getTickets(searchId);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  getTickets = async (searchId: number, acc: Array<Ticket | never> = []) => {
    try {
      const res = await axios.get('https://front-test.beta.aviasales.ru/tickets', {
        params: { searchId },
      });
      const { stop, tickets } = res.data;
      const currentTickets: Array<Ticket | never> = [...acc, ...tickets];
      this.setState(
        { allTickets: currentTickets, currentTickets, isLoaded: stop },
        this.filterTickets
      );
      if (!stop) {
        this.timerId = setTimeout(() => this.getTickets(searchId, currentTickets), 800);
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 500') {
        this.getTickets(searchId, acc);
        return false;
      }
    }
    return false;
  };

  changeFilter = (numOfTransfers: Array<number | never>) => {
    this.setState({ numOfTransfers }, this.filterTickets);
  };

  changeSort = (event: any) => {
    this.setState({ sortName: event.target.dataset.value }, this.sortTickets);
  };

  filterTickets = () => {
    const { numOfTransfers, allTickets } = this.state;
    const currentTickets = allTickets.filter(({ segments }) => {
      return segments.every(({ stops }) => {
        return numOfTransfers.includes(stops.length);
      });
    });
    this.setState({ currentTickets }, this.sortTickets);
  };

  sortTickets = () => {
    const { sortName } = this.state;
    switch (sortName) {
      case 'price':
        this.sortTicketsByPrice();
        break;
      case 'speed':
        this.sortTicketsBySpeed();
        break;
      default:
        return false;
    }
    return false;
  };

  sortTicketsBySpeed = () => {
    const { currentTickets } = this.state;
    const tickets = currentTickets.sort(({ segments: segments1 }, { segments: segments2 }) => {
      const duration1 = segments1.reduce((acc, { duration }) => acc + duration, 0);
      const duration2 = segments2.reduce((acc, { duration }) => acc + duration, 0);
      return duration1 - duration2;
    });
    this.setState({ currentTickets: tickets });
  };

  sortTicketsByPrice = () => {
    const { currentTickets } = this.state;
    const tickets = currentTickets.sort(({ price: price1 }, { price: price2 }) => price1 - price2);
    this.setState({ currentTickets: tickets });
  };

  render() {
    const { currentTickets, numOfTransfers, sortName, isLoaded } = this.state;

    return (
      <StyledMain>
        <Filter numOfTransfers={numOfTransfers} changeFilter={this.changeFilter} />
        <Container>
          <Loader isActive={!isLoaded} />
          <Tabs changeSort={this.changeSort} sortName={sortName} />
          <Cards tickets={currentTickets.slice(0, 5)} isLoaded={isLoaded} />
        </Container>
      </StyledMain>
    );
  }
}

export default Main;
