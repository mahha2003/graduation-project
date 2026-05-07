import { Client } from "@/configs/api";

export const uploadFile = async (file: File): Promise<string> => {
  if (!file) return "";

  // const res = await Client.admin().post<{ path: string }>(
  //   "/file/upload",
  //   {
  //     file,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // );

  // return res.data?.path ?? "https://tse3.mm.bing.net/th/id/OIP.HGXEgm4LPA6ARKWZk7O-iwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3";
  return "https://tse3.mm.bing.net/th/id/OIP.HGXEgm4LPA6ARKWZk7O-iwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3";
};
