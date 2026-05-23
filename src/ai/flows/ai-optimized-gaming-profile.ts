
/**
 *  * @fileOverview This file defines a Genkit flow for generating an AI-optimized gaming profile.
  * It analyzes game and device data to suggest optimal performance settings, brightness, and notification controls.
   */ * */ *  */ *
 * - aiOptimizedGamingProfile - A function that handles the AI-optimized gaming profile generation process.
 * - AIOptimizedGamingProfileInput - The input type for the aiOptimizedGamingProfile function.
 * - AIOptimizedGamingProfileOutput - The return type for the aiOptimizedGamingProfile function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIOptimizedGamingProfileInputSchema = z.object({
  gameName: z.string().describe('The name of the game currently being played.'),
  gameGenre: z.string().optional().describe('The genre of the game (e.g., FPS, RPG).'),
  cpuUsagePercent: z.number().min(0).max(100).describe('Current CPU utilization percentage.'),
  ramUsageMB: z.number().describe('Current RAM usage in MB.'),
  totalRamMB: z.number().describe('Total available RAM in MB.'),
  batteryLevelPercent: z.number().min(0).max(100).describe('Current battery level percentage.'),
  deviceTemperatureCelsius: z.number().describe('Current device temperature in Celsius.'),
  currentBrightnessPercent: z.number().min(0).max(100).describe('Current screen brightness percentage.'),
  notificationsEnabled: z.boolean().describe('Whether notifications are currently enabled.'),
});
export type AIOptimizedGamingProfileInput = z.infer<typeof AIOptimizedGamingProfileInputSchema>;

const AIOptimizedGamingProfileOutputSchema = z.object({
  suggestedPerformanceProfile: z.enum(["Turbo Zero-Lag", "Performance", "Balanced", "Battery Saver"]).describe('The suggested performance profile for optimal gaming.'),
  suggestedBrightnessPercent: z.number().min(0).max(100).describe('The suggested screen brightness percentage.'),
  suggestedNotificationControl: z.enum(["Do Not Disturb", "Allow Priority Only", "All On"]).describe('The suggested notification control setting during gaming.'),
  explanation: z.string().describe('A brief explanation of why these settings are suggested.'),
});
export type AIOptimizedGamingProfileOutput = z.infer<typeof AIOptimizedGamingProfileOutputSchema>;

export async function aiOptimizedGamingProfile(input: AIOptimizedGamingProfileInput): Promise<AIOptimizedGamingProfileOutput> {
  return aiOptimizedGamingProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiOptimizedGamingProfilePrompt',
  input: { schema: AIOptimizedGamingProfileInputSchema },
  output: { schema: AIOptimizedGamingProfileOutputSchema },
  prompt: `You are an AI performance advisor for the VOID BOOST gaming optimizer app. Your task is to analyze the user's game and device status, then suggest the best gaming profile settings to maximize performance and immersion while considering device health.

Current Game: {{{gameName}}} (Genre: {{{gameGenre}}})
Device Status:
  - CPU Usage: {{{cpuUsagePercent}}}%
  - RAM Usage: {{{ramUsageMB}}}MB / {{{totalRamMB}}}MB
  - Battery Level: {{{batteryLevelPercent}}}%
  - Temperature: {{{deviceTemperatureCelsius}}}°C
  - Current Brightness: {{{currentBrightnessPercent}}}%
  - Notifications: {{#if notificationsEnabled}}Enabled{{else}}Disabled{{/if}}

Based on this information, provide the optimal gaming profile:
- Performance Profile (choose from "Turbo Zero-Lag", "Performance", "Balanced", "Battery Saver")
- Suggested Brightness Percentage (0-100)
- Suggested Notification Control (choose from "Do Not Disturb", "Allow Priority Only", "All On")
- A concise explanation for your suggestions.

Consider the following:
- For high-performance games, prioritize "Turbo Zero-Lag" or "Performance" unless battery is very low or temperature is high.
- Keep brightness adequate for immersion but adjust down if battery is low.
- Always recommend "Do Not Disturb" for optimal focus unless the user explicitly needs priority notifications.
- If the device temperature is high (e.g., > 45°C) or battery is very low (e.g., < 20%), suggest "Balanced" or "Battery Saver" profiles and provide a clear explanation regarding device health.
`,
});

const aiOptimizedGamingProfileFlow = ai.defineFlow(
  {
    name: 'aiOptimizedGamingProfileFlow',
    inputSchema: AIOptimizedGamingProfileInputSchema,
    outputSchema: AIOptimizedGamingProfileOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate optimized gaming profile.');
    }
    return output;
  }
);
