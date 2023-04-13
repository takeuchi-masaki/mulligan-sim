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
export let all_map: HashMap<number, CardJson>;

function updateMap() {
    all_cards.forEach(card => {
        all_map.set(card.card_id, card);
    });
}

export function initCardList() {
    fetch('data/rot_cards.json')
        .then(response => response.json())
        .then(data => {
            rot_cards = data;
        })
        .catch(error => console.error(error));

    fetch('/data/all_cards.json')
        .then(response => response.json())
        .then(data => {
            all_cards = data.data.cards;
        })
        .catch(error => console.error(error));

    updateMap();
}
