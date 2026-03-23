import {createRoot} from "react-dom/client";
import {cleanup} from "@/utils/helpers.ts";
import {requestDefinition} from "@/services/messaging/messageHandler.ts";
import DefinitionsPopup from "@/components/DefinitionsPopup.tsx";
import LoadComponent from "@/components/LoadComponent.tsx";
import "@/entrypoints/popup/style.css"
import {getSettings, TriggerKey} from "@/utils/storage.ts";

function isTriggerKeyPressed(e: MouseEvent, triggerKey: TriggerKey):boolean {
  switch (triggerKey) {
    case 'ctrl':
      return e.ctrlKey || e.metaKey;
    case 'alt':
      return e.altKey;
    case 'shift':
      return e.shiftKey;
    case 'none':
    default:
      return true;
  }
}

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  main(ctx) {
    let ui: any = null;

    document.addEventListener('dblclick', async (event: MouseEvent) => {
      const settings = await getSettings();

      if (!isTriggerKeyPressed(event, settings.triggerKey)) {
        return;
      }
      const selectedText = window.getSelection()?.toString() || '';
      const word = cleanup(selectedText.toLowerCase());

      if (!word) return;

      try {

        if (ui) ui.remove();

        ui = await createShadowRootUi(ctx, {
          name: 'dictionary-redefined-loading-popup',
          position: 'inline',
          onMount: (container) => {
            const root = createRoot(container);
            root.render(
                <LoadComponent
                    x = {event.pageX}
                    y = {event.pageY}
                />
            );
            return root;
          },
          onRemove: (root) => {
            root?.unmount();
          }
        })

        ui.mount();

        const definitions = await requestDefinition(word);

        if (ui) ui.remove();

        ui = await createShadowRootUi(ctx, {
          name: 'dictionary-redefined-popup',
          position: 'inline',
          onMount: (container) => {
            const root = createRoot(container);
            root.render(
                <DefinitionsPopup
                    definitions={definitions}
                    coords={{ x: event.pageX, y: event.pageY }}
                    onClose={() => {
                      ui.remove();
                      ui = null;
                    }}
                />
            );
            return root;
          },
          onRemove: (root) => {
            root?.unmount();
          },
        });

        ui.mount();
      } catch (error) {
        console.error('Failed to fetch definition:', error);
      }
    });

    document.addEventListener('click', () => {
      if (ui && window.getSelection()?.isCollapsed) {
        ui.remove();
        ui = null;
      }
    });
  },
});
