import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { ref } from "firebase/storage";
import { NextRequest } from "next/server";
import { buffer } from "stream/consumers";

export async function POST(req:NextRequest) {
    const data= await req.json();
    const {url}=data;
    const base64Image="data:image/png;base64,"+await convertImage(url);
    const filename=Date.now()+","
    const imageRef=ref(storage,filename)
}
export const convertImage=async(imageUrl:string)=>{
    try{
        const response=await axios.get(imageUrl,{responseType:'arraybuffer'});
        const base64Image=Buffer.from(response.data).toString('base64');
        return base64Image;
    }catch(e){
        console.log("error converting base64 image")
    }
}