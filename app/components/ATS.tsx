import React from 'react';

interface ATSProps {
    score: number;
    suggestions: { type: "good" | "improve"; tip: string }[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
    // Determine background color based on score
    const getBackgroundColor = () => {
        if (score > 69) {
            return 'bg-green-100';
        } else if (score > 49) {
            return 'bg-yellow-100';
        } else {
            return 'bg-red-100';
        }
    };

    // Get text color for score based on value
    const getScoreTextColor = () => {
        if (score > 69) {
            return 'text-green-600';
        } else if (score > 49) {
            return 'text-yellow-600';
        } else {
            return 'text-red-600';
        }
    };

    return (
        <div className={`rounded-2xl shadow-md p-6 ${getBackgroundColor()}`}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">ATS Score</h2>
                    <div className={`text-4xl font-bold ${getScoreTextColor()}`}>
                        {score}/100
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">Suggestions</h3>

                    <div className="flex flex-col gap-2">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${
                                    suggestion.type === "good"
                                        ? "bg-green-50 border border-green-200"
                                        : "bg-red-50 border border-red-200"
                                }`}
                            >
                                <div className="flex items-start gap-2">
                                    <span
                                        className={`mt-1 rounded-full p-1 ${
                                            suggestion.type === "good"
                                                ? "bg-green-200 text-green-700"
                                                : "bg-red-200 text-red-700"
                                        }`}
                                    >
                                        {suggestion.type === "good" ? "✓" : "!"}
                                    </span>
                                    <p className={`${
                                        suggestion.type === "good"
                                            ? "text-green-800"
                                            : "text-red-800"
                                    }`}>
                                        {suggestion.tip}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ATS;