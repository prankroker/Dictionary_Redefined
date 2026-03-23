import { getWordDefinition } from '@/services/api/dictionaryApi';
import type { MessageRequest } from '@/services/messaging/messageHandler';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message: MessageRequest, sender, sendResponse) => {

    if (message.action === 'FETCH_DEFINITION') {
      const word = message.payload.word;

      const fetchDefinition = async () => {
        try {
          const data = await getWordDefinition(word);

          sendResponse({ success: true, data });
        } catch (error: any) {
          sendResponse({ success: false, error: error.message });
        }
      };

      fetchDefinition();

      return true;
    }
  });
});