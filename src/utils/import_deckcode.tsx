import HashMap from 'hashmap';

const KEY = new HashMap<string, number>();
const keystr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
for (let i = 0; i < keystr.length; i++) {
    KEY.set(keystr[i], i);
}

interface DeckcodeResponse {
    text: string,
    clan: string,
    hash: string,
    errors: string[],
}

export function cardhash_to_cardid(card_hash: string): number {
    let id: number = 0;
    for (const c of card_hash) {
        id *= 64;
        id += KEY.get(c)!;
    }
    return id;
}

export function deckhash_to_cardid_list(deck_hash: string): number[] {
    const cardid_list: number[] = [];
    let prev_hash = deck_hash.slice(0, 4);
    for (let i = 0; i < 40; i++) {
        let next_hash: string = prev_hash.slice();
        if (prev_hash.length > 5) {
            next_hash = prev_hash.slice(5);
        }
        cardid_list.push(cardhash_to_cardid(prev_hash));
        prev_hash = next_hash.slice(1);
    }
    return cardid_list;
}

export async function deckcode_to_card_id_list(deckcode: string): Promise<number[]> {
    if (deckcode.length !== 4) {
        throw new Error("Invalid deckcode length");
    }
    const url = "https://shadowverse-portal.com/api/v1/deck/import";
    const params = new URLSearchParams([["format", "json"], ["deck_code", deckcode]]);
    const res = await fetch(`${url}?${params.toString()}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const resp = await res.json();
    const deck_hash: string = resp.data.hash;
    return deckhash_to_cardid_list(deck_hash);
}
