export interface MockFolder {
  id: number;
  folderName: string;
  imageUrl?: string | null;
  folderOrder: number;
  imageId?: number | null;
}

export async function getMockFolders(): Promise<MockFolder[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          folderName: '디어리',
          imageUrl:
            'https://i.namu.wiki/i/PvBNqcPR79Eg_MFLuNBEjB49s9CHrFVwmqqpwIfNAKpanE3P26j1UZqTY7zFBNUWrbl0gNclaXfjttApncYfByJ8Pe0cePGYBPH3Q4LlneOvqbngueyTetaWRhQmqQEouKOcM_7U12C1JIwAeiJzKQ.svg',
          folderOrder: 1,
          imageId: null,
        },
        {
          id: 2,
          folderName: '기본',
          imageUrl: null,
          folderOrder: 2,
          imageId: null,
        },
      ]);
    }, 200);
  });
}
