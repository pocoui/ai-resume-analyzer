import React, { useState } from 'react';
import { cn } from '../lib/utils';

// Define the Feedback type based on the structure from constants/index.ts
interface Tip {
    type: "good" | "improve";
    tip: string;
    explanation: string;
}

interface CategoryFeedback {
    score: number;
    tips: Tip[];
}

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: { type: "good" | "improve"; tip: string }[];
    };
    toneAndStyle: CategoryFeedback;
    content: CategoryFeedback;
    structure: CategoryFeedback;
    skills: CategoryFeedback;
}

interface DetailsProps {
    feedback?: Feedback;
}

// Helper component: ScoreBadge
interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    const getBadgeStyles = () => {
        if (score > 69) {
            return {
                bg: 'bg-green-100',
                text: 'text-green-700',
                border: 'border-green-200',
                icon: '✓',
            };
        } else if (score > 39) {
            return {
                bg: 'bg-yellow-100',
                text: 'text-yellow-700',
                border: 'border-yellow-200',
                icon: '!',
            };
        } else {
            return {
                bg: 'bg-red-100',
                text: 'text-red-700',
                border: 'border-red-200',
                icon: '!',
            };
        }
    };

    const badge = getBadgeStyles();

    return (
        <div className={cn('flex items-center gap-2 rounded-full px-3 py-1 border', badge.bg, badge.border)}>
            <span className={cn('text-sm font-medium', badge.text)}>{score}/100</span>
            <span className={cn('rounded-full p-1 text-xs', badge.bg)}>{badge.icon}</span>
        </div>
    );
};

// Helper component: CategoryHeader
interface CategoryHeaderProps {
    title: string;
    categoryScore: number;
    isOpen: boolean;
    onToggle: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, categoryScore, isOpen, onToggle }) => {
    return (
        <div
            className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={onToggle}
        >
            <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <ScoreBadge score={categoryScore} />
            </div>
            <span className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </div>
    );
};

// Helper component: CategoryContent
interface CategoryContentProps {
    tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            {/* Two-column grid for tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className={cn('flex items-start gap-3 p-3 rounded-lg',
                            tip.type === 'good' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                        )}
                    >
            <span className={cn('mt-1 rounded-full p-1 text-sm',
                tip.type === 'good' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
            )}>
              {tip.type === 'good' ? '✓' : '!'}
            </span>
                        <p className={cn('text-sm',
                            tip.type === 'good' ? 'text-green-800' : 'text-red-800'
                        )}>
                            {tip.tip}
                        </p>
                    </div>
                ))}
            </div>

            {/* Explanations list */}
            <div className="flex flex-col gap-3">
                <h4 className="text-md font-semibold text-gray-700">Detailed Explanations</h4>
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className={cn('p-4 rounded-lg shadow-sm',
                            tip.type === 'good' ? 'bg-white border-l-4 border-green-500' : 'bg-white border-l-4 border-red-500'
                        )}
                    >
                        <p className={cn('font-medium mb-2',
                            tip.type === 'good' ? 'text-green-700' : 'text-red-700'
                        )}>
                            {tip.tip}
                        </p>
                        <p className="text-sm text-gray-600">{tip.explanation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Details component
const Details: React.FC<DetailsProps> = ({ feedback }) => {
    // State for accordion open sections
    const [openSection, setOpenSection] = useState<string | null>(null);

    // Handle accordion toggle
    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    // If no feedback, show placeholder
    if (!feedback) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-500">No feedback available</p>
            </div>
        );
    }

    // Categories to display
    const categories = [
        { id: 'toneAndStyle', title: 'Tone & Style', data: feedback.toneAndStyle },
        { id: 'content', title: 'Content', data: feedback.content },
        { id: 'structure', title: 'Structure', data: feedback.structure },
        { id: 'skills', title: 'Skills', data: feedback.skills },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Feedback</h2>

            <div className="flex flex-col gap-4">
                {categories.map((category) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <CategoryHeader
                            title={category.title}
                            categoryScore={category.data.score}
                            isOpen={openSection === category.id}
                            onToggle={() => toggleSection(category.id)}
                        />

                        {openSection === category.id && (
                            <CategoryContent tips={category.data.tips} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Details;