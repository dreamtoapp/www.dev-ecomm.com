"use server"; // This marks the file as a Server Action


export interface SendMessageResponse {
    success: boolean;
    data?: any; // The data returned by the API
    error?: string; // Error message if the request fails
}
// Helper function to validate phone numbers
function validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^\+[1-9]\d{1,14}$/; // International phone number format (E.164)
    return phoneNumberRegex.test(phoneNumber);
}

export async function sendMessage(phoneNumber: string, messageText: string): Promise<SendMessageResponse> {
    try {
        // Debug: Log environment variables
        console.debug("[DEBUG] Environment Variables - PHONE_NUMBER_ID:", process.env.WHATSAPP_PHONE_NUMBER_ID);
        console.debug("[DEBUG] Environment Variables - ACCESS_TOKEN:", process.env.WHATSAPP_PERMANENT_TOKEN);

        // Retrieve environment variables
        const accessToken = process.env.WHATSAPP_PERMANENT_TOKEN;
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

        // Validate environment variables
        if (!accessToken || !phoneNumberId) {
            console.error("[ERROR] Missing required environment variables.");
            return { success: false, error: "Missing required environment variables." };
        }

        // Validate phone number format
        if (!validatePhoneNumber(phoneNumber)) {
            console.error(`[ERROR] Invalid phone number format: ${phoneNumber}`);
            return { success: false, error: "Invalid phone number format. Use international format (e.g., +1234567890)." };
        }

        // Define the Graph API endpoint
        const endpoint = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;

        // Prepare the request body
        const requestBody = {
            messaging_product: "whatsapp",
            to: phoneNumber, // Recipient's phone number in international format
            type: "text",
            text: {
                body: messageText,
            },
        };

        // Debug: Log the request payload
        console.debug("[DEBUG] Sending WhatsApp message with payload:", JSON.stringify(requestBody, null, 2));

        // Make a POST request to the Graph API
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
        });

        // Parse the response
        const data = await response.json();

        // Debug: Log the API response
        console.debug("[DEBUG] WhatsApp API Response:", JSON.stringify(data, null, 2));

        // Check if the response contains an error
        if (data.error) {
            console.error(`[ERROR] WhatsApp API Error: ${data.error.message}`);
            return { success: false, error: data.error.message };
        }

        // Debug: Log success
        console.log("[SUCCESS] WhatsApp message sent successfully:", data);

        // Return the successful response
        return { success: true, data };
    } catch (error) {
        console.error("[ERROR] Unexpected error while sending WhatsApp message:", error);
        return { success: false, error: "An unexpected error occurred. Check logs for details." };
    }
}