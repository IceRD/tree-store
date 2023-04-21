import { TreeStore } from "./treeStore.js";
import { treeStoreNodes } from "./treeStoreNodes.js";

const ts = new TreeStore(treeStoreNodes);

console.log("getAll()", ts.getAll());
console.log("getItem(7)", ts.getItem(7));
console.log("getChildren(4)", ts.getChildren(4));
console.log("getChildren(5)", ts.getChildren(5));
console.log("getChildren(2)", ts.getChildren(2));
console.log("getAllChildren(2)", ts.getAllChildren(2));
console.log("getAllParents(7)", ts.getAllParents(7));
