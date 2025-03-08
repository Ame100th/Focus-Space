import supabase from "./supabase";

const visitorsTable = "visitors";
export async function getVisitors() {
  let { data: visitors, error } = await supabase.from(visitorsTable).select("*");
  return { visitors, error };
}