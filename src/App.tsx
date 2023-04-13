import { createSignal, onMount } from 'solid-js';
import { CardJson, initCardList, updateJsonFiles } from './import_json';

const App = () => {
    initCardList();

    return <div>Hello, World!</div>;
};

export default App;
