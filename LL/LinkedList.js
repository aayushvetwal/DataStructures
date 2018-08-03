class Node{
	constructor(data, next = null){
		this.data = data;
		this.next = next;
	}
}

class LinkedList{
	constructor(){
		this.head = null;
	}
	
	insertFirst(data){
		if(this.head == null){
			this.head = new Node(data);
			return;
		}
		
		this.head = new Node(data, this.head);
	}
	
	getSize(){
		var node = this.head;
		var counter = 0;
		while(node){
			node = node.next;
			counter++;
		}
		return counter;
	}
	
	getFirst(){
		return this.head ? this.head.data : null;
	}
	
	getLast(){
		var node = this.head;
		while(node){
			if(!node.next) return node.data;
			node = node.next;
		}
		return null;
	}
	
	clear(){
		this.head = null;
	}
	
	removeFirst(){
		if(this.head == null) return;
		
		this.head = this.head.next;
	}
	
	removeLast(){
		if(!this.head) return;
		if(!this.head.next){
			this.head = null;
			return;
		}
		
		let prev = this.head;
		let node = this.head.next;
		
		while(node.next){
			prev = node;
			node = node.next;
		}
		
		prev.next = null;
		
	}
	
	insertLast(data){
		if(!this.head) {
			this.head = new Node(data);
			return;
		}
		let node = this.head;
		while(node.next){
			node = node.next;
		}
		node.next = new Node(data);
	}
	
	getAt(index){
		if(!this.head) return null;
		if(index == 0) return this.head;
		
		let counter = 0;
		let node = this.head;
		
		while(node.next){
			counter++;
			node = node.next;
			if(counter == index) return node;
		}
		
		return null;
	}
	
	//removeAt
	//insertAt
	//forEach
	//for
}

function display(l){
	console.log(JSON.stringify(l, undefined, 2));
	console.log('Size:',l.getSize());
	console.log('First:', l.getFirst());
	console.log('Last:', l.getLast());
}

var l = new LinkedList();
l.insertFirst(4);
l.insertFirst(5);
l.insertFirst(6);
l.insertFirst(7);
l.insertFirst('abcd');
display(l);
l.removeFirst();
display(l);
l.removeLast();
display(l);
l.removeLast();
display(l);
l.clear();
display(l);
l.insertFirst(4);
display(l);
l.removeLast();
display(l);
l.insertLast('efgh');
display(l);
l.insertLast('ijkl');
l.insertLast('mnop');
display(l);
console.log(l.getAt(1));


