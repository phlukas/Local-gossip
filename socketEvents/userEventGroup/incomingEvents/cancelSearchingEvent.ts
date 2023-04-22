import { Client, SearchingModel } from '../../../types';
import _ from 'lodash';

export default (searchingClients: Client[], searchingModel: SearchingModel) => {
  _.remove(searchingClients, (x) => x.userId === searchingModel.userId);

  console.log(`User '${searchingModel.userId}' stopped searching for partner.`);
};
