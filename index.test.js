import { TreeStore } from "./treeStore.js";
import { treeStoreNodes } from "./treeStoreNodes.js";

describe("treeStore getAll", () => {
    const treeStore = new TreeStore(treeStoreNodes);

    test("defines getAll", () => {
        expect(treeStore.getAll).toEqual(expect.any(Function));
    });

    test("getAll is called", () => {
        expect(treeStore.getAll()).toEqual(treeStoreNodes);
    });
});

describe("treeStore getItem", () => {
    const treeStore = new TreeStore(treeStoreNodes);

    test("defines getItem", () => {
        expect(treeStore.getItem).toEqual(expect.any(Function));
    });

    test("getItem is called with correct arguments", () => {
        const expected = { id: 7, parent: 4, type: null };

        expect(treeStore.getItem(7)).toEqual(expect.objectContaining(expected));
    });

    test("getItem is called with incorrect arguments", () => {
        expect(treeStore.getItem(-7)).toBeNull();
        expect(treeStore.getItem()).toBeNull();
        expect(treeStore.getItem({})).toBeNull();
    });
});

describe("treeStore getChildren", () => {
    const treeStore = new TreeStore(treeStoreNodes);

    test("defines getChildren", () => {
        expect(treeStore.getChildren).toEqual(expect.any(Function));
    });

    test("getChildren is called with correct arguments. ", () => {
        const expected = [
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ];

        expect(treeStore.getChildren(4)).toEqual(
            expect.arrayContaining(expected)
        );

        expect(treeStore.getChildren(5)).toEqual([]);
    });

    test("getChildren is called with incorrect arguments", () => {
        expect(treeStore.getChildren()).toBeNull();
        expect(treeStore.getChildren(-5)).toBeNull();
        expect(treeStore.getChildren({})).toBeNull();
    });
});

describe("treeStore getAllChildren", () => {
    const treeStore = new TreeStore(treeStoreNodes);

    test("defines getAllChildren", () => {
        expect(treeStore.getAllChildren).toEqual(expect.any(Function));
    });

    test("getAllChildren is called with correct arguments. contain parent", () => {
        const expected = [
            { id: 4, parent: 2, type: "test" },
            { id: 5, parent: 2, type: "test" },
            { id: 6, parent: 2, type: "test" },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ];

        expect(treeStore.getAllChildren(2)).toEqual(
            expect.arrayContaining(expected)
        );

        expect(treeStore.getAllChildren(5)).toEqual([]);
    });

    test("getItem is called with incorrect arguments", () => {
        expect(treeStore.getAllChildren()).toBeNull();
        expect(treeStore.getAllChildren(-5)).toBeNull();
        expect(treeStore.getAllChildren({})).toBeNull();
    });
});

describe("treeStore getAllParents", () => {
    const treeStore = new TreeStore(treeStoreNodes);

    test("defines getAllParents", () => {
        expect(treeStore.getAllParents).toEqual(expect.any(Function));
    });

    test("getAllParents is called with correct arguments.", () => {
        const expected = [
            { id: 4, parent: 2, type: "test" },
            { id: 2, parent: 1, type: "test" },
            { id: 1, parent: "root" },
        ];

        expect(treeStore.getAllParents(7)).toEqual(
            expect.arrayContaining(expected)
        );

        expect(treeStore.getAllParents(1)).toEqual([]);
    });

    test("getAllParents is called with incorrect arguments", () => {
        expect(treeStore.getAllParents()).toBeNull();
        expect(treeStore.getAllParents(-5)).toBeNull();
        expect(treeStore.getAllParents({})).toBeNull();
    });
});
