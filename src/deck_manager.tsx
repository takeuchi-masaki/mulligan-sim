import HashMap from "hashmap";
import { deckcode_to_card_id_list, deckhash_to_cardid_list } from "./import_deckcode";
import { all_map } from "./import_json";

interface Card {
    card_name: string,
    card_id: number,
    cnt: number,
    img_src: string,
    pp_cost: number,
    draw_cnt: number,
    search_cnt: number,
    search: string[] // list of card_id s
}

interface Deck {
    cards: Card[]
}

export function extractDeckHash(url: string): string | undefined {
    const deckUrl = 'https://shadowverse-portal.com/deck/';
    const deckbuilderUrl = 'https://shadowverse-portal.com/deckbuilder/create/';
    if (url.startsWith(deckUrl)) {
        const suffix = '?lang=';
        const hashStartIndex = deckUrl.length + 4;
        let suffixIndex = url.indexOf(suffix, hashStartIndex + 200);
        if (suffixIndex == undefined) {
            suffixIndex = url.length;
        }
        return url.slice(hashStartIndex, suffixIndex);
    } else if (url.startsWith(deckbuilderUrl)) {
        const prefix = '?hash=';
        const suffix = '&lang=';
        const hashStartIndex = url.indexOf(prefix) + prefix.length + 4;
        let suffixIndex = url.indexOf(suffix, hashStartIndex + 200);
        if (suffixIndex == undefined) {
            suffixIndex = url.length;
        }
        return url.slice(hashStartIndex, suffixIndex);
    }
    return undefined;
}

export async function createDeckFromDeckcode(deckcode: string, deckname: string) {
    const card_id_list = await deckcode_to_card_id_list(deckcode);
    createDeck(card_id_list, deckname);
}

export async function createDeckFromDecklist(decklist: string, deckname: string) {
    let deckhash = extractDeckHash(decklist);
    if (deckhash == undefined) {
        return;
    }
    const card_id_list = deckhash_to_cardid_list(deckhash);
    createDeck(card_id_list, deckname);
}

async function createDeck(card_id_list: number[], deckname: string) {
    let lang: string = 'en'
    let img_url: string = 'https://svgdb.me/assets/cards/' + lang + '/C_';
    let deck_map = new HashMap<number, number>();
    let deck: Deck = { cards: [] };
    card_id_list.forEach(id => {
        let curr_val = deck_map.get(id);
        if (curr_val != undefined) {
            deck_map.set(id, curr_val + 1);
        } else {
            deck_map.set(id, 1);
        }
    });

    for (let [id, count] of deck_map.entries()) {
        let newCard: Card = {
            card_name: all_map.get(id)?.card_name ?? '',
            card_id: id,
            cnt: count,
            img_src: img_url + id + '.png',
            pp_cost: all_map.get(id)?.cost ?? 0,
            draw_cnt: 0,
            search_cnt: 0,
            search: []
        };
        deck.cards.push(newCard);
    }
    localStorage.setItem(deckname, JSON.stringify(deck));
}

export function loadDeck(deckname: string) {
    const deckString = localStorage.getItem(deckname);
    if (deckString) {
        const deck: Deck = JSON.parse(deckString);
        return deck;
    } else {
        return null;
    }
}
