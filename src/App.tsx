import { createSignal, onMount } from 'solid-js';
import { initCardList } from './utils/import_json';

const App = () => {
    initCardList();
    return <>
        <div>Hello, World!</div>
    </>;
};

export default App;
