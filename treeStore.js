export class TreeStore {
    constructor(node) {
        this.node = node;
        this.mapIndexes = this.createMapIndexes(node);
    }

    createMapIndexes(arr) {
        const tmp = {};

        for (let i = 0; i < arr.length; i++) {
            let id = Number(arr[i].id);
            let parent = arr[i].parent;

            if (tmp[id] === undefined) {
                tmp[id] = {
                    index: i,
                    children: [],
                    parent: [],
                };
            }

            if (typeof parent === "number") {
                tmp[parent].children.push(id);
                tmp[id].parent.push(parent);
            }
        }

        return tmp;
    }

    getAll() {
        return this.node;
    }

    getItem(id) {
        if (!id || this.mapIndexes[id] === undefined) return null;

        const index = this.mapIndexes[id].index;

        return this.node[index];
    }

    getChildren(id) {
        if (!id || this.mapIndexes[id] === undefined) return null;

        const children = this.mapIndexes[id].children;

        return children.map((id) => {
            let index = id - 1;
            return this.node[index];
        });
    }

    getAllChildren(id) {
        if (!id || this.mapIndexes[id] === undefined) return null;

        const result = [];
        const childrens = this.mapIndexes[id].children;

        if (!childrens.length) {
            return result;
        }

        const stack = [...childrens];

        while (stack.length) {
            const index = stack.shift();
            let nextChildren = this.mapIndexes[index];
            let nextChildrenIndex = nextChildren.index;

            if (
                Array.isArray(nextChildren.children) &&
                nextChildren.children.length
            ) {
                stack.push(...nextChildren.children);
            }

            const node = this.node[nextChildrenIndex];
            result.push(node);
        }

        return result;
    }

    getAllParents(id) {
        if (!id || this.mapIndexes[id] === undefined) return null;

        const result = [];
        let parentId = this.mapIndexes[id].parent.shift();

        if (!parentId) {
            return result;
        }

        let prevParent = this.mapIndexes[parentId];
        let prevParentIndex = prevParent.index;
        let node = this.node[prevParentIndex];
        result.push(node);

        if (!Array.isArray(prevParent.parent) || !prevParent.parent.length) {
            return result;
        }

        const stack = [...prevParent.parent];

        while (stack.length) {
            parentId = stack.pop();
            prevParent = this.mapIndexes[parentId];
            prevParentIndex = prevParent.index;
            node = this.node[prevParentIndex];
            result.push(node);

            if (Array.isArray(prevParent.parent) && prevParent.parent.length) {
                stack.push(...prevParent.parent);
            }
        }

        return result;
    }
}
