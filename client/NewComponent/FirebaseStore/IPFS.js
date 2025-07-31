import {NFTStorage, File} from "nft.storage"
export const IPFS_key = '4e2421a0.3e4226e78d6f4a1596fa383a8c7b3dfb'

const client = new NFTStorage({token: IPFS_key});
export const uploadTOIPFS =async ({name, description, imageFile})=>{
    const metadata = await client.store({
      name,
      description,
      image: new File([imageFile], imageFile.name, {type: imageFile.type})
    });
    console.log('Metadata URL:', metadata.url);
    return metadata
}

export const uploadProfilePic = async (file, uid) => {
  const metadata = await client.store({
    name: `{user.uid} -Profile-pic`,
    description: 'User profile picture stored to IPFS',
    image: new File([file], file.name, {type: file.type})
  });
  console.log('Metadata URL:', metadata.url);
  return metadata.data.image.href || metadata.url;

} 