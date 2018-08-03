class Node{
	constructor(data, left = null, right = null){
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class BST{
	constructor(){
		this.root = null;
	}
	
	add(data){
		const node = this.root;
		
		if(node === null){
			this.root = new Node(data);
			return;
		}
		
		const searchTree = function(node){
			if(data < node.data){
				if(node.left === null){
					node.left = new Node(data);
					return;
				}
				else{
					return searchTree(node.left);
				}
			} 
			else if(data > node.data){
				if(node.right === null){
					node.right = new Node(data);
					return;
				}
				else{
					return searchTree(node.right);
				}
			}
			else{
				return null;
			}
		};
		
		return searchTree(node);
	}
	
	remove(data){
		const removeNode = function(node, data){
			if(node === null){
				return null;
			}
			
			if(data === node.data){
				//node has no children
				if(node.left === null && node.right == null){
					return null;
				}
				//node has no left child
				if(node.left === null){
					return node.right;
				}
				//node has no right child
				if(node.right === null){
					return node.left;
				}
				//node has two children
				var tempNode = node.right;
				while(tempNode.left !== null){
					tempNode = tempNode.left;
				}
				node.data = tempNode.data;
				node.right = removeNode(node.right, tempNode.data);
				return node;
			}
			else if(data < node.data){
				node.left = removeNode(node.left, data);
				return node;
			}
			else{
				node.right = removeNode(node.right, data);
				return node;
			}
		};
		this.root = removeNode(this.root, data);
	}
	
	findMin(){
		var node = this.root;
		while(node.left !== null){
			node = node.left;
		}
		return node.data;
	}
	
	findMax(){
		var node = this.root;
		while(node.right != null){
			node = node.right;
		}
		return node.data;
	}
	
}

var bst = new BST();
bst.add(3);
bst.add(5);
bst.add(2);
bst.add(7);
bst.add(4);
console.log(JSON.stringify(bst, undefined, 2));
bst.remove(5);
console.log(JSON.stringify(bst, undefined, 2));
bst.add(5);
console.log(JSON.stringify(bst, undefined, 2));
console.log(bst.findMax());
console.log(bst.findMin());



















































