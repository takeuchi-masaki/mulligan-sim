import { isUndefined } from 'util';
import { extractDeckHash } from '../src/utils/deck_manager';

describe('extractHashFromDeckURL', () => {
    test('should extract hash from deck URL', () => {
        const url1 = 'https://shadowverse-portal.com/deck/3.6.7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o?lang=en';
        expect(extractDeckHash(url1)).toEqual('7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o');
    });
    test('JP URL', () => {
        const jp_url = 'https://shadowverse-portal.com/deck/3.6.7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o?lang=ja';
        expect(extractDeckHash(jp_url)).toEqual('7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o');
    });
    test('no language code', () => {
        const jp_url = 'https://shadowverse-portal.com/deck/3.6.7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o';
        expect(extractDeckHash(jp_url)).toEqual('7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o');
    });
    test('deckbuilder', () => {
        const url2 = 'https://shadowverse-portal.com/deckbuilder/create/6?hash=3.6.7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o&lang=en';
        expect(extractDeckHash(url2)).toEqual('7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o');
    });
    test('bad hash', () => {
        const bad_url = 'https://shadowverse-portal.com/deck/3.6.7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4';
        expect(extractDeckHash(bad_url) === undefined);
    });
    test('bad url', () => {
        const bad_url = 'shadowverse-portal.com/deck/3.6.7gfdI.7gfdI.7gfdI.7gioQ.7gioQ.7gioQ.7ePaY.7ePaY.7ePaY.7ePqA.7ePqA.7ePqA.7Y-vC.7Y-vC.7Y-vC.7gfdS.7gfdS.7gfdS.7gi3Y.7gi3Y.7gi3Y.7gkVy.7gkVy.7gkVy.7RPoA.7RPoA.7RPoA.7RRVY.7RRVY.7gkVo.7gkVo.7gkVo.7RP3I.7RP3I.7VI56.7VI56.7VI56.7VI4o.7VI4o.7VI4o';
        expect(extractDeckHash(bad_url) === undefined);
    });
});