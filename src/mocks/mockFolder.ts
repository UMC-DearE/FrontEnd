export interface MockFolder {
  id: number;
  folderName: string;
  imageUrl?: string | null;
  folderOrder: number;
}

export async function getMockFolders(): Promise<MockFolder[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 17,
          folderName: "6자이내",
          imageUrl: "https://bucket.s3.../folderImg.jpg",
          folderOrder: 1,
        },
        {
          id: 91,
          folderName: "순서에맞게",
          imageUrl: null,
          folderOrder: 2,
        },
        {
          id: 30,
          folderName: "조회가능",
          imageUrl: "https://bucket.s3.../imgaasdf32579.jpg",
          folderOrder: 3,
        },
      ]);
    }, 200);
  });
}
