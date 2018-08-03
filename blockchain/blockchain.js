const SHA256 = require('crypto-js/sha256');

class Transaction{
	constructor(fromAddress, toAddress, amount){
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}

class Block{
	constructor(transactions, timestamp, previousHash = ''){
		this.transactions = transactions;
		this.timestamp = timestamp,
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}
	
	calculateHash(){
		return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
	}
	
	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log('block mined:', this.hash)
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}
	
	createGenesisBlock(){
		return new Block([], Date.parse('07/27/2018'), 0);
	}
	
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}
	
	createTransaction(transaction){
		this.pendingTransactions.push(transaction);
	}
	
	minePendingTransaction(rewardAddress){
		let block = new Block(this.pendingTransactions, Date.now(), this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);
		console.log('block successfully mined');
		this.chain.push(block);
		
		this.pendingTransactions = [new Transaction(null, rewardAddress, this.miningReward)];
	}
	
	getBalanceOf(address){
		let balance = 0;
		for(const block of this.chain){
			for (const transaction of block.transactions){
				if(transaction.fromAddress === address) balance -= transaction.amount;
				else if(transaction.toAddress === address) balance += transaction.amount;
			}
		}
		return balance;
	}
	
	isChainValid(){
		for(let i = 1; i < this.chain.length; i++){
			let previousBlock = this.chain[i-1];
			let currentBlock = this.chain[i];
			
			if(currentBlock.hash !== currentBlock.calculateHash()) return false;
			if(previousBlock.hash !== currentBlock.previousHash) return false;
			
			return true;
		}
	}
}

let blockchain = new Blockchain();
blockchain.createTransaction(new Transaction('addr1', 'addr2', 100));
blockchain.createTransaction(new Transaction('addr2', 'addr1', 50));

console.log('starting mining..');
blockchain.minePendingTransaction('myAddr');

console.log('balance on myAddr:', blockchain.getBalanceOf('myAddr'));
console.log('balance on myAddr:', blockchain.getBalanceOf('addr1'));
console.log('balance on myAddr:', blockchain.getBalanceOf('addr2'));

console.log('starting mining again..');
blockchain.minePendingTransaction('myAddr');
console.log('balance on myAddr:', blockchain.getBalanceOf('myAddr'));
