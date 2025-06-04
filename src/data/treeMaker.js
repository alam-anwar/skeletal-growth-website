// export function treeMaker(obj) {
//     const taxonomyLevels = ["Order", "Infraorder", "Level3", "Parvorder", "Family", "GenusSpecies"] 
    
//     // todo: pull from DB to get all taxonomy levels.
//     // todo: update list of taxonomy levels if levels change in the future.

//     let ret = []
//     // base case: current node has no children.
//     if (!obj.parent_of || obj.parent_of.length === 0) {
//         // add the name of the node, its long name, and any other keys that are there.
//         ret.push({
//             name: obj.name
//         });
//         // return.
//         return ret;
//     }

//     // recursive case: node has children.
//     if (obj.parent_of && obj.parent_of.length > 0) {
//         // if there's a gap between child node and parent node (i.e. Order -> Family):
//         // add empty objects until the levels are in line with each other.

//         let childrenItems = []
//         // for each child:
//         for (let child of obj.parent_of) {
//             // call treeMaker() on the child node.
//             let gap = taxonomyLevels.indexOf(child._type) - taxonomyLevels.indexOf(obj._type);
//             if (gap > 1) {
//                 let currentLevelIndex = taxonomyLevels.indexOf(obj._type) + 1;
//                 let tempParent = { ...obj }; // Create a copy to avoid modifying the original object
//                 let rootIntermediateNode = null

//                 // Add intermediate levels
//                 while (gap > 1) {
//                     let intermediateNode = {
//                         name: null, // Empty name for intermediate levels
//                         _type: taxonomyLevels[currentLevelIndex],
//                         children: []
//                     };

//                     if (!rootIntermediateNode) {
//                         rootIntermediateNode = intermediateNode
//                     }

//                     tempParent.children = [intermediateNode];
//                     tempParent = intermediateNode;
//                     currentLevelIndex++;
//                     gap--;
//                 }

//                 // Attach the child to the last intermediate node
//                 tempParent.children.push(...treeMaker(child)); // Recursively process the child
//                 childrenItems.push(rootIntermediateNode);
//             } else {
//                 childrenItems.push(...treeMaker(child)); // Recursively process the child
//             }
//         }

//         // add the node.
//         ret.push({
//             name: obj.name,
//             children: childrenItems.flat(1)
//         });
//     }

//     return ret;
// }

// TODO: KEEP TESTING THIS FUNCTION.
export function newTreeMaker(data) {
    const root = { name: "", children: [] };

    // recursive function to find/create nodes when building tree.
    function findOrCreateNode(pathParts, searchNode, toAdd) {
        if (pathParts.length === 0) return searchNode; // nothing left to traverse.

        const [currentPart, ...remainingParts] = pathParts;
        let childNode = searchNode.children.find(child => child.id === parseInt(currentPart));

        if (!childNode) {
            searchNode.children.push(toAdd);
        }

        return findOrCreateNode(remainingParts, childNode, toAdd);
    }

    // Iterate over each row in the data
    for (let row in data) {
        let currItem = {
            id: data[row][0],
            name: (data[row][1] === "@@filler" ? "" : data[row][1]), // change this to just null values?
            path: data[row][2],
            description: data[row][3],
            children: []
        }

        let path = currItem.path; // path is stored in the third column.
        let pathParts = path.split("/"); // split path into parts, delimited by slashes.
        pathParts.shift() // 1st element is often an empty string. shift() removes it.
        findOrCreateNode(pathParts, root, currItem);
    }

    return root;
}