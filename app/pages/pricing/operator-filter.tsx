import { memo } from "react";
import { cn } from "~/lib/utils";

interface OperatorFilterProps {
    operators: string[];
    activeOperator: string;
    onOperatorChange: (op: string) => void;
}

export const OperatorFilter = memo(function OperatorFilter({ operators, activeOperator, onOperatorChange }: OperatorFilterProps) {
    if (operators.length <= 1) return null;

    return (
        <div className="hidden lg:block bg-white dark:bg-neutral-900 rounded-2xl py-4 shadow-sm border border-neutral-100 dark:border-neutral-800">
            <h3 className="font-metropolis font-bold text-lg mb-4 px-2 dark:text-white px-4">Operator</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-4">
                {operators.map((op, idx) => (
                    <button
                        key={`${op}-${idx}`}
                        onClick={() => onOperatorChange(op)}
                        className={cn(
                            "whitespace-nowrap px-4 py-1.5 rounded-xl text-sm font-medium transition-all border flex-shrink-0",
                            activeOperator === op
                                ? "bg-neutral-900 border-neutral-900 text-white shadow-lg transform scale-105"
                                : "bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        )}
                    >
                        {op === 'all' ? 'Semua Operator' : op}
                    </button>
                ))}
            </div>
        </div>
    );
});
