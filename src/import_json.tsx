import * as fs from 'fs';
import axios from 'axios';

export interface CardJson {
    card_id: number,
    foil_card_id: number,
    card_set_id: number,
    card_name: string | null,
    card_name_ruby: string,
    is_foil: number,
    char_type: number,
    clan: number,
    tribe_name: string,
    skill: string,
    skill_condition: string,
    skill_target: string,
    skill_option: string,
    skill_preprocess: string,
    skill_disc: string,
    org_skill_disc: string,
    evo_skill_disc: string,
    org_evo_skill_disc: string,
    cost: number,
    atk: number,
    life: number,
    evo_atk: number,
    evo_life: number,
    rarity: number,
    get_red_ether: number,
    use_red_ether: number,
    description: string,
    evo_description: string,
    cv: string,
    copyright: string | null,
    base_card_id: number,
    normal_card_id: number,
    format_type: number,
    restricted_count: number,
    restricted_count_co_main: number,
    restricted_count_co_sub: number,
}

interface AllCardsJson {
    data_headers: {
        udid: boolean;
        viewer_id: number;
        sid: string;
        servertime: number;
        result_code: number;
    };
    data: {
        cards: Array<CardJson>,
        errors: Array<string>
    }
}

export let rot_cards: CardJson[] = [];
export let all_cards: CardJson[] = [];

export function initCardList() {
    if (!fs.existsSync('./data/all_cards.json') ||
        !fs.existsSync('./data/rot_cards.json')) {
        updateJsonFiles();
    } else {
        let all_cards_file = require('./data/all_cards.json') as AllCardsJson;
        all_cards = all_cards_file.data.cards;
        rot_cards = require('./data/rot_cards.json') as CardJson[];
    }
}

export async function updateJsonFiles() {
    const response = await axios.get<AllCardsJson>('https://shadowverse-portal.com/api/v1/cards?format=json&lang=en&clan=0');
    const cards = response.data.data.cards;
    const data: AllCardsJson = {
        data_headers: response.data.data_headers,
        data: {
            cards: cards,
            errors: response.data.data.errors,
        },
    };

    let set = new Set<number>();
    let latestSet = -1;
    cards.forEach(card => {
        if ((card.card_set_id / 10000) === 1) {
            if (card.card_set_id > latestSet) {
                latestSet = card.card_set_id;
            }
        }
    });

    const rotation_cards: Array<CardJson> = [];
    cards.forEach(card => {
        if (card.card_set_id <= latestSet &&
            card.card_set_id >= (latestSet - 4)) {
            set.add(card.card_id);
            rotation_cards.push(card);
        }
    });
    cards.forEach(card => {
        if ((card.card_set_id / 10000) === 7) {
            if (set.has(card.base_card_id)) {
                rotation_cards.push(card);
            }
        }
    });

    const allJson = JSON.stringify(data);
    fs.writeFileSync('data/all_cards.json', allJson);

    const rotJson = JSON.stringify(rotation_cards);
    fs.writeFileSync('data/rot_cards.json', rotJson);

    let all_cards_file = require('./data/all_cards.json') as AllCardsJson;
    all_cards = all_cards_file.data.cards;
    rot_cards = require('./data/rot_cards.json') as CardJson[];
}
