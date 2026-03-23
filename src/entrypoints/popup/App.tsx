import { getSettings, saveSettings, TriggerKey } from '@/utils/storage';

function App() {
    const [triggerKey, setTriggerKey] = useState<TriggerKey>('none');
    const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSettings().then((settings) => {
      setTriggerKey(settings.triggerKey);
    });
  }, []);

  async function handleSave() {
    await saveSettings({ triggerKey });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
      <div className="border border-gray-200 rounded-2xl p-8 max-w-md bg-white shadow-sm font-sans text-gray-700">
        <h1 className="font-bold text-xl text-gray-800 mb-6">Extension Options</h1>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Pop-up options
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="text-base font-medium">Trigger key:</label>
            <select
                value={triggerKey}
                onChange={(e) => setTriggerKey(e.target.value as TriggerKey)}
                className="w-1/2 border-2 border-[#FEF08A] bg-[#FEF9C3]/30 rounded-xl px-4 py-2 text-base focus:outline-none focus:border-[#FCD34D] transition-colors cursor-pointer text-gray-800"
            >
              <option value="none">None</option>
              <option value="ctrl">Ctrl</option>
              <option value="alt">Alt</option>
              <option value="shift">Shift</option>
            </select>
          </div>
          <button
              type="button"
              className="mt-2 bg-[#FEF08A] hover:bg-[#FDE68A] text-gray-800 font-medium py-2.5 px-6 rounded-xl w-fit transition-colors shadow-sm"
              onClick={handleSave}
          >
            { saved? "Saved" : "Save Options"}
          </button>
        </form>
      </div>
  );
}

export default App;
