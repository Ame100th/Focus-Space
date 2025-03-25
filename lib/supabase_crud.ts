import supabase from "./supabase";

const TABLE_NAME = "users";
export async function getUser(){
    let {data, error} = await supabase.from(TABLE_NAME).select("*");
    if(error){
        throw new Error(error.message);
    }
    return data;
}

export async function createuser(item: {username: string, password: string}){
    let {data, error} = await supabase.from(TABLE_NAME).insert(item)
    if(error){
        throw new Error(error.message)
    }
    return data;
}
