import {DefinitionsPopupProps} from "@/components/uiTypes.ts";

function DefinitionsPopup(props: DefinitionsPopupProps) {
    const positionStyles = {
        top: `${props.coords.y + 5}px`,
        left: `${props.coords.x + 5}px`,
    };
    if (!Array.isArray(props.definitions) || !props.definitions.length) {
        return (
            <div
                className="absolute bg-white border border-[#FEF08A] rounded-xl shadow-md p-4 z-99999 min-w-40 text-center"
                style={positionStyles}
            >
                <p className="text-sm font-medium text-gray-500 font-sans">
                    No definition found
                </p>
            </div>
        );
    }
    const word = props.definitions[0].word;
    const definition = props.definitions[0].meanings[0].definitions[0].definition;

    return (
        <div
            className="absolute bg-white border border-gray-200 rounded-2xl shadow-lg p-5 z-99999 max-w-sm font-sans"
            style={positionStyles}
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-6 bg-[#FCD34D] rounded-full"></div>
                <h1 className="font-bold text-xl text-gray-800 capitalize">
                    {word}
                </h1>
            </div>

            <p className="text-base text-gray-600 leading-relaxed">
                {definition}
            </p>
        </div>
    );
}
export default DefinitionsPopup;