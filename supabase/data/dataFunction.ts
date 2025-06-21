import { supabase } from '../supabase';

export const fetchItemData = async (category_id: number) => {
    const { data, error } = await supabase
        .from('items_data')
        .select('*')
        .eq('category_id', category_id);
    console.log('Category ID:', category_id, typeof category_id);
    if (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message };
    }
    console.log("data from api", JSON.stringify(data, null, 2));
    return { success: true, message: "item data successfully retrieved.", data };
};


export const fetchCategory = async () => {
    const { data, error } = await supabase
        .from('category_table')
        .select('*');
    if (error) {
        console.log('Error fetching data:', error);
        return { success: false, message: error.message };
    }
    console.log("data from api", JSON.stringify(data, null, 2));
    return { success: true, message: "category data successfully retrieved.", data };
};

