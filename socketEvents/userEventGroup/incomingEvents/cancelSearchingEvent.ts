import { Client, SearchingModel } from '../../../types';
import _ from 'lodash';
import { printRemainingUsers } from './startSearchingEvent';

export default (searchingClients: Client[], searchingModel: SearchingModel) => {
  _.remove(searchingClients, (x) => x.userId === searchingModel.userId);

  printRemainingUsers(searchingClients);
};
