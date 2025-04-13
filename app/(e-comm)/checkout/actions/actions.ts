"use server";

const fetchWithRetry = async (
  url: string,
  retries: number = 3,
  timeout: number = 10000
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(timeout),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (i === retries - 1) throw error; // Throw error on last attempt
      console.log(`Attempt ${i + 1} failed. Retrying...`);
    }
  }
};

export const fetchAddressFromCoordinates = async (lat: number, lng: number) => {
  try {
    const response = await fetchWithRetry(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      3, // Retry up to 3 times
      10000 // 10-second timeout
    );
    const data = await response?.json();
    console.log("Nominatim response:", data); // Debugging
    if (data.display_name) {
      return { success: true, address: data.display_name }; // Return the address
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return {
      success: false,
      error: "فشل في جلب العنوان. يرجى المحاولة مرة أخرى.",
    };
  }
  return { success: false, error: "لا يوجد عنوان متاح." };
};
