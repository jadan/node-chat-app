const expect = require('expect');
const {isRealString} = require('./validations');

describe('Is real string?', ()=>{
    it('Should reject nonstring values ', ()=>{
        var a = 12;
        var b = true;
        var c = {name: 'stuff'};

        var res = isRealString(a);
        expect(res).toBe(false);
        res=isRealString(b);
        expect(res).toBe(false);
        res=isRealString(c);
        expect(res).toBe(false);
    });

    it('Should reject string only whitespace values ', ()=>{
        expect(isRealString('   ')).toBe(false);
    });
    it('Should allow  values ', ()=>{
        expect(isRealString('  andrew  ')).toBe(true);
    });
});
