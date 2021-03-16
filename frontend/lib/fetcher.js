export default async function fetcher(...args) {
  try { 
    const res = await fetch(...args);
    if (res.ok) {
    const data = await res.json(); 
      return data;
    } else {
      const error = new Error("There is some error , try again");
      error.data = data;
      throw error;
    }
  } catch (err) {
    if (!err.data) {
      err.data = { message: err.message };
    }
    throw err;
  }
}
