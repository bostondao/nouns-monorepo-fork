import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

export const generateMerkleTree = (values: any[][]): StandardMerkleTree<any> => {
    return StandardMerkleTree.of(values, ["address"])
};

export const generateMerkleProof = (tree: StandardMerkleTree<any>, address: string): string[] => {
  for (const [i, v] of tree.entries()) {
    if (v[0] == address) {
      return tree.getProof(i)
    }
  }
  return []
};