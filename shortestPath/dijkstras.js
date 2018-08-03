const graph = {
	start: {A: 5, B: 2},
	A: {C: 4, D: 2},
	B: {A: 8, D: 7},
	C: {D: 6, finish: 3},
	D: {finish: 1},
	finish: {}
};

const lowestCostNode = (costs, processed) => {
	return Object.keys(costs).reduce((lowest, node) => {
		if(lowest === null || costs[node] < costs[lowest]){
			if(!processed.includes(node)){
				lowest = node;
			}
		}
		return lowest;
	}, null);
};

//console.log(lowestCostNode({A: 8, D: 7}, []));

const dijkstras = (graph) => {
	let costs = Object.assign({finish: Infinity}, graph.start);
	let parents = {finish: null};
	for(let node in graph.start){
		parents[node] = 'start';
	}
	let processed = [];
	
	let node = lowestCostNode(costs, processed);
	while(node){
		let cost = costs[node];
		let children = graph[node];
		
		for(let n in children){
			let newCost = cost + children[n];
			if(!costs[n]){
				costs[n] = newCost;
				parents[n] = node;
			}
			if(costs[n] > newCost){
				costs[n] = newCost;
				parents[n] = node;
			}
		}
		processed.push(node);
		node = lowestCostNode(costs, processed);
	}
	
	let optimalPath = ['finish'];
	let parent = parents.finish;
	while(parent){
		optimalPath.unshift(parent);
		parent = parents[parent];
	}
	
	const result = {
		leastCost: costs.finish,
		path: optimalPath
	};
	
	return result;
};

console.log(JSON.stringify(dijkstras(graph), null, 2));