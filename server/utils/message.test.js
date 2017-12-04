const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('function generateMessage', ()=>{
	it('Should generate the correct message object.', ()=>{
		var testObject = {from: 'adan', text: 'the text'}
		var result = generateMessage(testObject.from, testObject.text);
		expect(result.from).toBe(testObject.from);
		expect(result.text).toBe(testObject.text);
		expect(result.createAt).toBeA('number');
	});
});

describe('function generateLocationMessage', ()=>{
	it('Should generate the correct URL', ()=>{
		var testObject = {from:'adan', latitude:1, longitude:1};
		var result = generateLocationMessage(testObject.from, testObject.latitude, testObject.longitude);
		expect(result.from).toBe(testObject.from);
		expect(result.url).toBe('https://www.google.com/maps?q=1,1');
	});
});