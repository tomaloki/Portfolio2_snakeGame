import { Candy } from '../server/candy';

interface UpdateGameDate {
    players: any[];
    candies: Candy[];
    inGame: boolean;
    lasers: any[];
    bots: any[];
    hindrances: any[];
}

export { UpdateGameDate };
