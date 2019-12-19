const path = require('path');
const sassGraph = require('sass-graph');

class SASSGraph {
  constructor() {
    console.log('Initializing SASS graph');
    const t0 = process.hrtime();
    // We own this guy so we can update him
    this.graph = sassGraph.parseDir(
        path.join(__dirname, '../../'),
        { exclude: /node_modules/ }
      ).index;

    const t1 = process.hrtime();
    console.log(`Initialized SASS graph in ${(t1[0] - t0[0]) * 1000 + (t1[1] - t0[1]) / 1000000}ms`);
  }

  mergeSASSGraphs(graph1, graph2) {
    return { ...graph1, ...graph2 };
  }

  visit(graphNode, acc) {
    if (!graphNode) {
      return acc;
    }
    graphNode.importedBy
      .forEach(file => {
        acc.push(file);
        this.visit(this.graph[file], acc);
      });
    
    return acc;
  }

}

module.exports = SASSGraph;